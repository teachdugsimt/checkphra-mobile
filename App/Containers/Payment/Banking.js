import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from '../../Redux/PaymentRedux'
// import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton2 from '../../Components/RoundedButton2'
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Entypo";
import moment from 'moment'
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

class Banking extends Component {
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
                    <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>Bangking</Text>
                </TouchableOpacity>
            )
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            money: this.props.money,
            type: 'transfer',
            bank: '',
            avatarSource: '',
        }
    }

    componentWillMount() {
        this.props.deleteImage()
    }

    componentWillUnmount() {
        this.props.deleteImage()
    }

    _pressButtonOk = () => {
        let day = new Date()
        let f = moment(day).format()
        let time1 = f.slice(0, 10)
        let time2 = f.slice(11, 19)
        let full = time1 + " " + time2
        if (!this.state.avatarSource) {
            alert('กรุณาเลือกรูปภาพ')
        } else {
            if (!this.state.bank) {
                alert('กรุณาระบุธนาคารที่ทำการโอนเงิน')
            } else {
                Alert.alert(
                    'Check Phra',
                    'ยืนยันการทำรายการ?',
                    [
                        {
                            text: 'ok', onPress: () => {
                                let item = {
                                    user_id: this.props.user_id,
                                    price: this.props.money,
                                    bank: this.state.bank,
                                    date: full,
                                    file: this.props.image,
                                    type: this.state.type,
                                }
                                this.props.sendSlip(item)

                                setTimeout(() => {
                                    this.props.navigation.goBack()
                                    this.props.navigation.navigate("historyAddPoint")
                                }, 3000);
                            }
                        },
                        { text: 'cancel' }
                    ],
                    { cancelable: false }
                )

            }
        }

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

                this.setState({
                    avatarSource: source
                });

                this.props.setImage({
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                })
            }
        });
    }

    _changeText = (text) => {
        this.setState({ money: text })
    }

    render() {
        let heightView = 60
        let widthView = '50%'
        let heightImg = 60
        let widthImg = 60
        console.log(this.props.money)
        const img = [Images.capture1, Images.capture2, Images.capture3, Images.capture4, Images.capture5]
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 18, }}>เลือกบัญชีธนาคารและจำนวนเงินที่ต้องการเติม</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 8, fontSize: 20, fontWeight: 'bold' }}>นาย ทดสอบ ทดสอบ</Text>

                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', height: 330, width: '100%', marginTop: 15 }}>

                        <View style={{ flexDirection: 'row', height: heightView, width: widthView }}>
                            <Image source={img[0]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>753-0-11694-0</Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: heightView, width: widthView }}>
                            <Image source={img[1]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>519-2-81889-8</Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: heightView, width: widthView }}>
                            <Image source={img[2]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>019-3-90118-2</Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: heightView, width: widthView }}>
                            <Image source={img[3]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>019-3-90118-2</Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: heightView, width: widthView }}>
                            <Image source={img[4]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>019-3-90118-2</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16, alignSelf: 'center' }}>จำนวนเงินที่ต้องชำระ </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green', alignSelf: 'center' }}>{this.props.money}</Text>
                    </View>

                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
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

                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={{ width: '75%' }}
                            value={this.state.bank}
                            placeholder={'ธนาคารที่ทำการโอน เช่น กรุงไทย, ไทยพาณิชย์'}
                            onChangeText={(text) => this.setState({ bank: text })} />
                        <View style={{ margin: 10, width: 200 }}>
                            <RoundedButton2 text={'ตกลง'}
                                onPress={() => this._pressButtonOk()}
                                fetching={this.props.request2} />
                        </View>
                    </View>

                    <View style={{ height: 30 }}>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        money: state.promotion.money,
        user_id: state.auth.user_id,
        image: state.payment.img_slip,
        request2: state.payment.request2,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        paymentBanking: (data) => dispatch(PaymentActions.paymentRequest(data)),

        deleteImage: () => dispatch(PaymentActions.deleteImage()),
        sendSlip: (item) => dispatch(PaymentActions.sendSlipRequest(item)),
        setImage: (source) => dispatch(PaymentActions.setImage(source)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banking)