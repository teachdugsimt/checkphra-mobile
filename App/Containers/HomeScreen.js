import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../Redux/PromotionRedux'
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import PaymentActions from '../Redux/PaymentRedux'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true

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

    static navigationOptions = ({ navigation }) => {
        // console.log(navigation)
        // console.log(I18n.locale)

        return {
            title: I18n.t('package'),
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        // let plist = newProps.promotion
        console.log(newProps)
        console.log('============  HOME PAGE =============')
        return {
            // listPromotion: plist
        }
    }


    componentWillUnmount() {
        RNIap.endConnection()
        this.popupDialog.dismiss()
    }

    _renderItem = ({ item, index }) => {
        let img = ''
        if (item.point < 150) {
            img = Images.coin2
        } else if (item.point > 149 && item.point < 300) {
            img = Images.coin1
        } else if (item.point > 299) {
            img = Images.coin3
        }
        console.log(img)
        return (
            <TouchableOpacity style={{ height: 110 }} onPress={() => this._PressPromotion(item)}>
                <View style={{ height: 110, backgroundColor: '#f5f5f5', marginTop: 1 }}>
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
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 15, color: Colors.brownText }}> {I18n.t('coin')}</Text>
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
        if (Platform.OS == 'ios') {
            // console.log(Platform.OS)
            // console.log('------ PLATFORM-------')
            this.props.getPromotion(Platform.OS)
        } else if (Platform.OS == 'android') {
            // console.log(Platform.OS)
            // console.log('------ PLATFORM-------')
            this.props.getPromotion(Platform.OS)
            // this.props.getPromotion('ios')
        }
    }
    render() {
        I18n.locale = this.props.language
        const list = [{ name: I18n.t('checkAmuletScreen') },
        { name: I18n.t('showAmuletReal') },
        { name: I18n.t('chat')}]

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.fetching == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePromotion')}</Text>}
                    data={this.state.listPromotion}
                    renderItem={this._renderItem}
                />

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // promotion: state.promotion.data,
        // fetching: state.promotion.fetching,
        // profile: state.question.profile,
        language: state.auth.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getPromotion: (platform) => dispatch(PromotionActions.promotionRequest(platform)),
        // setMoney: (m) => dispatch(PromotionActions.setMoney(m)),
        // setPackage: (pack) => dispatch(PaymentActions.setPackage(pack)),
        // paypal: () => dispatch(PaymentActions.paypalRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
