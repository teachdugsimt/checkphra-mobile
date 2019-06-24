// Upload new amulet screen , have not amuet 
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Picker
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images, ApplicationStyles } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import QuestionActions from '../Redux/QuestionRedux'
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
let check = true
let region = [{ name: "North", id: 1 }, { name: "Central & West", id: 2 }, { name: "East", id: 3 }, { name: "North East", id: 4 }, { name: "South", id: 5 }]
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
            type2: null,

            tmp_type: null,
            tmp_type2: null,

            type_name1: null,
            type_name2: null,
            zone_name: null,

            tmp_sendAmulet: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        let tlist = newProps.data_typeAmulet
        let tlist2 = newProps.data_typeAmulet2

        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            tlist = newProps.data_typeAmulet
        }

        if (newProps.data_typeAmulet2 && newProps.data_typeAmulet2 != null) {
            tlist2 = newProps.data_typeAmulet2
        }

        // if (newProps.data_sendAmulet && newProps.data_sendAmulet != null) {
        //     if (prevState.tmp_sendAmulet != newProps.data_sendAmulet) {
        //         console.log('----------- COME HERE TO UPDATE -----------')
        //         newProps.editListMyMarket(newProps.data_sendAmulet)  // new redux
        //         return {
        //             tmp_sendAmulet: newProps.data_sendAmulet
        //         }
        //     }
        // }

        return {
            tmp_type: tlist,
            tmp_type2: tlist2
        }
    }

    componentWillUnmount() {
        this.props.getProfile()
        check = true
        this.setState({
            type: null, type2: null, tmp_type: null,
            tmp_type2: null,
        })
    }

    componentDidMount() {
        this.props.getListTypeAmulet()
        if (this.props.profile && this.props.profile != null) {
            if (this.props.profile.firstname && this.props.profile.lastname) {
                let fullName = this.props.profile.firstname + " " + this.props.profile.lastname
                this.setState({ owner: fullName })
            } else if (this.props.profile.firstname && !this.props.profile.lastname) {
                this.setState({ owner: this.props.profile.firstname })
            }

            if (this.props.profile.store && this.props.profile.store != null && this.props.profile.store.contact && this.props.profile.store.contact != null) {
                this.setState({ contact: this.props.profile.store.contact })
            }
        }
        // this.setState({ owner: name, contact: this.props.profile.store.contact })
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
        // else if (!this.state.zone) {
        //     alert(I18n.t('checkZone'))
        // }
        // else if (this.state.type == null && this.state.type2 == null) {
        //     alert(I18n.t('checkType'))
        // }
        else if (count < 2) {
            alert(I18n.t('atLeast2Image'))
        }

        if (this.state.price && count >= 2) {

            // name, temple, price, owner, contact, zone, type
            this.props.setMainData({
                name: this.state.name,
                temple: this.state.temple,
                price: this.state.price,
                owner: this.state.owner,
                contact: this.state.contact,
                // zone: this.state.zone,
                // type: this.state.type ? this.state.type : this.state.type2
            })
            this.props.sendDataAmuletMarket()

            this.setState({
                name: null,
                temple: null,
                price: null,
                // owner: null,
                // contact: null,
                zone: null,
                type: null,
                type2: null,

                // tmp_type: null,
                tmp_type2: null,

                type_name1: null,
                type_name2: null,
                zone_name: null,
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

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>Select Amulet Region</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >
                    <ScrollView style={{ flex: 1 }}>
                        {region.map((e, i) => {
                            return (
                                <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                    this.setState({
                                        zone: e.id, type: null, zone_name: e.name,
                                        tmp_type2: null, type_name2: null, type2: null
                                    })
                                    this.props.getListTypeAmulet2(e.id)
                                    this.popupDialog.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>Select Amulet Type</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    onDismissed={() => { this.setState({ type_name1: null, }) }} >


                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_type2 && this.state.tmp_type2 != null && this.state.tmp_type2.map((e, i) => {
                            if (i == 0 && (e.id == 45 || e.id == 46 || e.id == 47 || e.id == 48 || e.id == 49)) {
                                // return (
                                //     <View style={{ marginTop: 5, marginHorizontal: 5, marginBottom: 2.5, padding: 10, borderRadius: 10, backgroundColor: 'orange' }}>
                                //         <Text style={{ textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                //     </View>
                                // )
                            } else {
                                return (
                                    <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ type2: e.id, type: null, type_name2: e.name })
                                        this.popupDialog2.dismiss()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </ScrollView>

                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>Select Normal Categories</Text></View>}
                    ref={(popupDialog) => { this.popupDialog3 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    onDismissed={() => { this.setState({ type_name2: null }) }} >

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_type && this.state.tmp_type.map((e, i) => {
                            if (e.parent_id == null) {
                                return (
                                    <View style={{ marginTop: 5, marginHorizontal: 5, marginBottom: 2.5, padding: 10, borderRadius: 10, backgroundColor: 'orange' }}>
                                        <Text style={{ textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ type: e.id, type2: null, tmp_type2: null, type_name1: e.name })
                                        this.popupDialog3.dismiss()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </ScrollView>

                </PopupDialog>

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




                        {/* {this.state.type == null && <TouchableOpacity style={{ padding: 10, backgroundColor: '#fff5', borderRadius: 10, marginTop: 10, marginHorizontal: 15 }} onPress={() => this.popupDialog.show()}>
                            <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }}>{this.state.zone_name ? this.state.zone_name : I18n.t('zone2')}</Text>
                        </TouchableOpacity>}

                        {this.state.type == null && this.state.zone && <TouchableOpacity style={{ padding: 10, backgroundColor: '#fff5', borderRadius: 10, marginTop: 10, marginHorizontal: 15 }} onPress={() => this.popupDialog2.show()}>
                            <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }}>{this.state.type_name2 ? this.state.type_name2 : I18n.t('typeAmuletMarket')}</Text>
                        </TouchableOpacity>}

                        {(this.state.type2 == null || this.state.zone == null) && <TouchableOpacity style={{ padding: 10, backgroundColor: '#fff5', borderRadius: 10, marginTop: 10, marginHorizontal: 15 }} onPress={() => this.popupDialog3.show()}>
                            <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }}>{this.state.type_name1 ? this.state.type_name1 : I18n.t('typeAmuletMarket2')}</Text>
                        </TouchableOpacity>} */}




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
        data_typeAmulet2: state.market.data_typeAmulet2, // store skin amulet 22222222
        request: state.market.request,  // for request to get type amulet

        request1: state.market.request1,  // send data amulet
        data_sendAmulet: state.market.data_sendAmulet   // data send amulet to save to server
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getListTypeAmulet: (geo_id) => dispatch(MarketActions.getListTypeAmulet(geo_id)),
        getListTypeAmulet2: (geo_id) => dispatch(MarketActions.getListTypeAmulet2(geo_id)),
        sendDataAmuletMarket: () => dispatch(MarketActions.sendDataAmuletMarket()),
        setMainData: (data) => dispatch(MarketActions.setMainData(data)),
        editListMyMarket: (data) => dispatch(MarketActions.editListMyMarket(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketUpload1)
