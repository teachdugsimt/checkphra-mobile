import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl, ImageBackground, Image } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../Redux/PromotionRedux'
import Icon2 from "react-native-vector-icons/FontAwesome";
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

let { width, height } = Dimensions.get('window')
class Promotion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listPromotion: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.promotion
        console.log(newProps)
        return {
            listPromotion: plist
        }
    }

    _PressPromotion(item) {
        // console.log(item)
        this.props.setMoney(item.price)
        this.popupDialog.show()
    }

    _Banking = () => {
        this.props.navigation.navigate("banking")
        this.popupDialog.dismiss()
    }

    _Promptpay = () => {
        this.props.navigation.navigate("promptpay")
        this.popupDialog.dismiss()
    }

    _Creditcard = () => {
        this.props.navigation.navigate("creditcard")
        this.popupDialog.dismiss()
    }

    _renderItem = ({ item, index }) => {
        let img = ''
        if (item.point < 150) {
            img = Images.coin2
        } else if (item.point > 149 && item.point < 300) {
            img = Images.coin1
        } else if(item.point > 299){
            img = Images.coin3
        }
        console.log(img)
        return (
            <TouchableOpacity style={{ height: 110 }} onPress={() => this._PressPromotion(item)}>
                <View style={{ height: 110, backgroundColor: 'white', marginTop: 1 }}>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.brownText }}>{item.detail}</Text>
                            <Image source={img} style={{
                                width: width / 2,
                                height: height / 8
                            }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', color: 'orange', fontSize: 24, marginTop: 15 }}>{item.point}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 15, color: Colors.brownText }}> แต้ม</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', color: 'brown', textAlign: 'right' }}>{item.price} ฿</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    _reload = () => {
        this.props.getPromotion()
    }

    componentDidMount() {
        this.props.getPromotion()
    }
    render() {
        // console.log('HERE PROMOTION')
        // console.log(this.props.promotion)
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.fetching == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>ยังไม่มี Promotion</Text>}
                    data={this.state.listPromotion}
                    renderItem={this._renderItem}
                />
                <PopupDialog
                    dialogTitle={<DialogTitle title="กรุณาเลือกวิธีการชำระเงิน" titleTextStyle={{ fontSize: 18 }} />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={0.7}
                    height={0.26}
                    onDismissed={() => { this.setState({}) }}
                >
                    <View style={{}}>
                        <TouchableOpacity onPress={this._Banking} style={{
                            height: 42, flexDirection: 'row',
                            borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center', borderTopColor: 'lightgrey', borderTopWidth: 1
                        }}>
                            <Icon2
                                name="money"
                                size={26}
                                color={Colors.brownText}
                                style={{ marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16 }}>โอนผ่านบัญชีธนาคาร</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._Promptpay} style={{
                            height: 42, flexDirection: 'row',
                            borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center'
                        }}>
                            <Icon2
                                name="mobile-phone"
                                size={26}
                                color={Colors.brownText}
                                style={{ marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16 }}>โอนผ่าน Promptpay</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._Creditcard} style={{
                            height: 42, flexDirection: 'row',
                            borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center'
                        }}>
                            <Icon2
                                name="credit-card"
                                size={26}
                                color={Colors.brownText}
                                style={{ marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16 }}>บัตรเครดิต</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        promotion: state.promotion.data,
        fetching: state.promotion.fetching,
        profile: state.question.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPromotion: () => dispatch(PromotionActions.promotionRequest()),
        setMoney: (m) => dispatch(PromotionActions.setMoney(m)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion)