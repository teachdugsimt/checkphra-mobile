import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";
import { Colors } from "../Themes";
import PaymentActions from '../Redux/PaymentRedux'
// import Picker2 from '../Components/Picker2';
import RoundedButton from "../Components/RoundedButton";

var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
class DetailPoint extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            fontSize: 18,
                            fontFamily: "Prompt-SemiBold",
                            color: Colors.brownText
                        }}
                    >
                        {"< กลับ "}
                    </Text>
                    <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>รายละเอียดการเติมเงิน</Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null,
            bank: null,
        }
    }

    componentWillMount() {
        this.props.deleteImage()
    }

    componentWillUnmount() {
        this.props.deleteImage()
    }

    pick = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // console.log(response)
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });

                // this.props.setImage({
                //     uri: response.uri,
                //     type: response.type,
                //     name: response.fileName,
                //     error: 0,
                //     size: response.fileSize,
                // })

                this.props.setImage({
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                })
                // this.props.setImage(response)
            }
        });
    }

    _pressButtonOk = () => {
        if (!this.state.avatarSource) {
            alert('กรุณาเลือกรูปภาพ')
        } else {
            if (!this.state.bank) {
                alert('กรุณาระบุธนาคารที่ทำการโอนเงิน')
            } else {
                let item = {
                    user_id: this.props.item.user_id,
                    price: this.props.item.price,
                    bank: this.state.bank,
                    date: this.props.item.date,
                    // file: this.state.avatarSource.uri
                    file: this.props.image
                }
                this.props.sendSlip(item)
                this.props.navigation.goBack()
            }
        }

    }

    render() {
        let status = this.props.item.status == 0 ? 'รออนุมัติ' : 'เสร็จสมบูรณ์'
        let status_color = this.props.item.status == 0 ? 'orange' : 'green'
        let product = this.props.item.price + " point"
        let time = this.props.item.date.slice(11, this.props.item.date.length - 3)
        let type = ''
        if (this.props.item.type == 1) {
            type = 'โอนเงินผ่านบัญชีธนาคาร'
        } else if (this.props.item.type == 2) {
            type = 'โอนเงินผ่าน Promptpay'
        } else if (this.props.item.type == 3) {
            type = 'ตัดเงินผ่านบัตรเครดิต'
        }
        console.log(this.props.item)
        console.log(status)
        console.log('Detail point')
        return (
            <View style={{}}>

                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 75, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <Text style={{ color: status_color, fontSize: 20 }}>{status}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>สินค้า</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{product}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>เวลาที่ทำรายการ</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{time}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>ประเภทการทำรายการ</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{type}</Text>
                </View>

                {this.props.item.status == 0 && status == 'รออนุมัติ' && <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 16 }}>กรุณาอัพโหลดสลิปการโอนเงิน</Text>

                    <TouchableOpacity style={{}} onPress={this.pick}>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center', borderWidth: 3,
                            borderColor: Colors.brownTextTran, borderRadius: 10, margin: 5, overflow: 'hidden', height: 150, width: 150
                        }}>
                            <Icon3
                                name="camera"
                                size={40}
                                color={Colors.brownTextTran}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    fontFamily: 'Prompt-SemiBold', fontSize: 25, color: Colors.brownTextTran,
                                }}>สลิป</Text>

                                {this.props.image && < Icon3
                                    style={{ marginLeft: 40 }}
                                    name="squared-cross"
                                    size={24}
                                    color={'red'}
                                    onPress={() => { this.props.deleteImage() }}
                                />}
                            </View>

                            <Image source={this.state.avatarSource && this.props.image ? this.state.avatarSource : ''} style={{ width: '100%', height: '100%' }} />
                        </View>
                    </TouchableOpacity>

                    <TextInput
                        style={{ width: '75%' }}
                        value={this.state.bank}
                        placeholder={'ธนาคารที่ทำการโอน เช่น กรุงไทย, ไทยพาณิชย์'}
                        onChangeText={(text) => this.setState({ bank: text })} />
                    <View style={{ margin: 10, width: 140 }}>
                        <RoundedButton title='ตกลง' onPress={() => this._pressButtonOk()}
                            fetching={this.props.request2} />
                    </View>
                </View>}

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        // data_history: state.payment.data_history,
        // profile: state.question.profile,
        item: state.payment.data_point,
        image: state.payment.img_slip,
        request2: state.payment.request2,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getHistory: (page) => dispatch(PaymentActions.historyAddpointRequest(page)),
        setImage: (source) => dispatch(PaymentActions.setImage(source)),
        deleteImage: () => dispatch(PaymentActions.deleteImage()),
        sendSlip: (item) => dispatch(PaymentActions.sendSlipRequest(item)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPoint)