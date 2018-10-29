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

class DetailPoint extends Component {

    // static navigationOptions = ({ navigation }) => {
    //     const params = navigation.state.params || {};

    //     return {
    //         headerLeft: (
    //             <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
    //                 <Text
    //                     style={{
    //                         marginLeft: 20,
    //                         fontSize: 18,
    //                         fontFamily: "Prompt-SemiBold",
    //                         color: Colors.brownText
    //                     }}
    //                 >
    //                     {"< กลับ "}
    //                 </Text>
    //                 <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>รายละเอียดการเติมเงิน</Text>
    //             </TouchableOpacity>
    //         )
    //     };
    // };

    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null,
            bank: null,
        }
    }

    render() {
        let id = this.props.item.id
        let status = this.props.item.status == 0 ? 'รออนุมัติ' : 'เสร็จสมบูรณ์'
        let status_color = this.props.item.status == 0 ? 'orange' : 'green'
        let product = this.props.item.price
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
                <ScrollView>
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
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>หมายเลขการทำรายการ</Text>
                        <Text style={{ fontSize: 16, marginRight: 10 }}>{id}</Text>
                    </View>


                </ScrollView>
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