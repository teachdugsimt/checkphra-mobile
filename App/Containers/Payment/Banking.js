import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from '../../Redux/PaymentRedux'
// import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";

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
        }
    }

    saveAndLinkData = () => {
        let data = {
            money: this.state.money,
            type: this.state.type
        }
        this.props.paymentBanking(data)
        this.props.navigation.goBack()
        this.props.navigation.navigate("historyAddPoint")
    }

    _pressButton = () => {
        Alert.alert(
            'Check Phra',
            'กรุณาแจ้งสลิปในหน้าประวัติการเติมเงิน',
            [
                { text: 'ตกลง', onPress: this.saveAndLinkData }
            ],
            { cancelable: false }
        )

    }

    _changeText = (text) => {
        this.setState({ money: text })
    }

    render() {
        console.log(this.props.money)
        const img = [Images.ktb, Images.scb, Images.kbank]
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 18, }}>เลือกบัญชีธนาคารและจำนวนเงินที่ต้องการเติม</Text>
                <Text style={{ alignSelf: 'center', marginTop: 8, fontSize: 20, fontWeight: 'bold' }}>นาย ทดสอบ ทดสอบ</Text>

                <View style={{ justifyContent: 'flex-start', alignItems: 'center', height: '60%', width: '100%' }}>
                    <Image source={img[0]} style={{ height: '18%', width: '80%', marginTop: 15 }} />
                    <Text style={{ color: Colors.brownText, fontSize: 18 }}>753-0-11694-0</Text>

                    <Image source={img[1]} style={{ height: 75, width: '70%', marginTop: 10 }} />
                    <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 5 }}>519-2-81889-8</Text>

                    <Image source={img[2]} style={{ height: 75, width: '65%', marginTop: 5 }} />
                    <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 5 }}>019-3-90118-2</Text>
                </View>

                <View style={{}}>
                    {/* <View style={{ width: '65%', alignSelf: 'center' }}>
                        <TextInput
                            style={{ margin: 5, borderRadius: 12 }}
                            placeholder={'ใส่จำนวนเงินที่ต้องการเติม'}
                            value={this.state.money}
                            keyboardType={'numeric'}
                            numberOfLines={1}
                            onChangeText={(text) => this._changeText(text)} />
                    </View> */}

                    <View style={{ width: '65%', alignSelf: 'center' }}>
                        <RoundedButton
                            style={{ marginHorizontal: 10 }}
                            title={`ตกลง`}
                            onPress={this._pressButton}  // can use
                            // onPress={() => this._pressButton}  // can use
                            fetching={this.props.fetching}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // promotion: state.promotion.data,
        // fetching: state.promotion.fetching,
        // profile: state.question.profile,

        fetching: state.payment.fetching,
        money: state.promotion.money,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // paymentBanking: (money, type) => dispatch(PaymentActions.paymentRequest(money, type)),
        paymentBanking: (data) => dispatch(PaymentActions.paymentRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banking)