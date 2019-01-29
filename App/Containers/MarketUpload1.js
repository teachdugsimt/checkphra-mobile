import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Picker
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import MarketActions from '../Redux/MarketRedux'
import styles from './Styles/HomeScreenStyle'
import Picker2 from '../Components/PickerMarket';
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')

class MarketUpload1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            temple: null,
            price: null,
            owner: null,
            contact: null,
            zone: null,
            type: null,

            tmp_type: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        let tlist = newProps.data_typeAmulet

        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            tlist = newProps.data_typeAmulet
        }

        return {
            tmp_type: tlist
        }
    }

    componentDidMount() {
        this.props.getListTypeAmulet()
    }

    _onPressButton = () => {
        let count = 0
        this.props.data_image.forEach((e, i) => {
            if (e != undefined) {
                count++
            }
        })
        if (!this.state.price) {
            alert(I18n.t('checkPrice'))
        }
        else if (!this.state.zone) {
            alert(I18n.t('checkZone'))
        }
        else if (!this.state.type) {
            alert(I18n.t('checkType'))
        }
        else if (count < 2) {
            alert(I18n.t('atLeast2Image'))
        }

        if (this.state.price && this.state.zone && this.state.type && count >= 2) {

            // name, temple, price, owner, contact, zone, type
            this.props.setMainData({
                name: this.state.name,
                temple: this.state.temple,
                price: this.state.price,
                owner: this.state.owner,
                contact: this.state.contact,
                zone: this.state.zone,
                type: this.state.type
            })
            this.props.sendDataAmuletMarket()

            this.setState({
                name: null,
                temple: null,
                price: null,
                owner: null,
                contact: null,
                zone: null,
                type: null,
            })
            // this.props.sendDataAmuletMarket(this.state.name, this.state.temple, this.state.price, this.state.owner, this.state.contact, this.state.zone, this.state.type)
            // this.props.navigation.goBack()
        }
    }

    _onPressCancel = () => {
        this.props.navigation.goBack()
    }

    render() {
        console.log(this.props.data_image)
        console.log('-------------  MARKET UPLOAD 1 ---------------')
        // console.log(this.state.zone)

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>

                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />

                <ScrollView style={{ flex: 1 }}>
                    <View style={{ height: 60, justifyContent: "center" }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: "Prompt-Regular",
                                alignSelf: "center",
                                color: Colors.brownText
                            }}>
                            {I18n.t('pickImage')}
                        </Text>
                    </View>

                    <View style={{ height: (width - 40) / 3, flexDirection: 'row', paddingHorizontal: 10 }}>
                        <Picker2 title={I18n.t('frontSide')} id={0} />
                        <Picker2 title={I18n.t('backSide')} id={1} />
                        <Picker2 title={I18n.t('leftSide')} id={2} />
                    </View>
                    <View style={{ height: (width - 40) / 3, flexDirection: 'row', paddingHorizontal: 10 }}>
                        <Picker2 title={I18n.t('rightSide')} id={3} />
                        <Picker2 title={I18n.t('bottomSide')} id={4} />
                        <Picker2 title={I18n.t('otherSide')} id={5} />
                    </View>

                    <View style={{ alignSelf: 'center' }}>

                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('amuletName') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.name} onChangeText={(text) => this.setState({ name: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>

                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('templeName') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.temple} onChangeText={(text) => this.setState({ temple: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>

                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('priceMarket') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.price} onChangeText={(text) => this.setState({ price: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>

                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('ownerName') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.owner} onChangeText={(text) => this.setState({ owner: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>

                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('contact') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.contact} onChangeText={(text) => this.setState({ contact: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>


                        <Picker
                            selectedValue={this.state.zone}
                            style={{ height: 45, width: width / 2, alignSelf: 'center', marginTop: 12 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ zone: itemValue })}>
                            <Picker.Item label="Select your region" value={null} />
                            <Picker.Item label="North" value="1" />
                            <Picker.Item label="Central + West" value="2" />
                            <Picker.Item label="East" value="3" />
                            <Picker.Item label="North East" value="4" />
                            <Picker.Item label="South" value="5" />
                        </Picker>

                        {this.state.tmp_type && <Picker
                            selectedValue={this.state.type}
                            style={{ height: 45, width: width / 2, alignSelf: 'center', marginTop: 12 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
                            <Picker.Item label="Select your amulet type" value={null} />
                            {this.state.tmp_type && this.state.tmp_type.map((e, i) => {
                                return (
                                    <Picker.Item label={e.name} value={e.id} />
                                )
                            })}
                        </Picker>}

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <View style={{ width: '40%', height: 40 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('ok')}
                                    onPress={this._onPressButton}
                                />
                            </View>
                            <View style={{ width: '40%', height: 40 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('cancel')}
                                    onPress={this._onPressCancel}
                                />
                            </View>
                        </View>

                        <View style={{ height: 30 }}>
                        </View>
                    </View>
                </ScrollView>

                <Spinner
                    visible={this.props.request1 == true}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,
        data_image: state.market.data_image,

        data_typeAmulet: state.market.data_typeAmulet,  // store skin amulet 
        request: state.market.request,  // for request to get type amulet

        request1: state.market.request1  // send data amulet 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListTypeAmulet: () => dispatch(MarketActions.getListTypeAmulet()),
        sendDataAmuletMarket: () => dispatch(MarketActions.sendDataAmuletMarket()),
        setMainData: (data) => dispatch(MarketActions.setMainData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketUpload1)





// height: (width - 40) / 3,
//     flexDirection: 'row',
//     paddingHorizontal: 10