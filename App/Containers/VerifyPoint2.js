import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Modal, Alert } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";
import { Colors } from "../Themes";
import ImageViewer from 'react-native-image-zoom-viewer';
import ExpertActions from '../Redux/ExpertRedux'
import RoundedButton2 from "../Components/RoundedButton2";

class VerifyPoint2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            index: 0,
        }
    }

    _onPressVerify = () => {
        Alert.alert(
            'Check Phra',
            'คุณต้องการอนุมัติรายการนี้?',
            [
                {
                    text: 'ตกลง', onPress: () => {
                        this.props.addTransfer(this.props.item.id)
                        this.props.navigation.goBack()
                        this.props.getVerify()
                    }
                },
                { text: 'ยกเลิก' }
            ],
            { cancelable: false }
        )
    }

    render() {
        let status = this.props.item.status == 10 ? 'เสร็จสมบูรณ์' : 'รออนุมัติ'
        let status_color = this.props.item.status == 0 ? 'orange' : 'green'
        let product = this.props.item.price + " point"
        let time = this.props.item.date.slice(11, this.props.item.date.length - 3)
        let type = this.props.item.bank ? 'บัญชี ' + this.props.item.bank : 'credit-card'
        // console.log(this.props.item.image)

        let img2 = []
        img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + this.props.item.image })
        // console.log(img2)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 75, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <Text style={{ color: status_color, fontSize: 20 }}>{status}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>ราคาที่ต้องชำระ</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{product} ฿</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>เวลาที่ทำรายการ</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{time}</Text>
                </View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>ประเภทการทำรายการ</Text>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>{type}</Text>
                </View>

                <View style={{ flex: 0.5 }}>
                    <ImageViewer
                        saveToLocalByLongPress={false}
                        imageUrls={img2}
                        backgroundColor={'lightgrey'}
                        onClick={(e) => {
                            console.log('Show modal')
                            this.setState({ modalVisible: true })
                        }}
                        index={this.state.index}
                    />
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}>
                        <ImageViewer
                            saveToLocalByLongPress={false}
                            imageUrls={img2}
                            backgroundColor={'lightgrey'}
                            index={this.state.index}
                            onSwipeDown={() => {
                                console.log('onSwipeDown');
                                this.setState({ modalVisible: false })
                            }}
                            enableSwipeDown={true}
                        />
                    </Modal>
                </View>

                {status == 'รออนุมัติ' && this.props.item.status == 0 && <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <RoundedButton2
                        style={{ marginHorizontal: 10, width: 140 }}
                        text={'อนุมัติการเติมเงิน'}
                        onPress={this._onPressVerify}
                        fetching={this.props.request}
                    />
                </View>}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.expert.data_point,
        request: state.expert.fetch3,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTransfer: (id) => dispatch(ExpertActions.acceptRequest(id)),
        getVerify: () => dispatch(ExpertActions.getProfileRequest()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyPoint2)