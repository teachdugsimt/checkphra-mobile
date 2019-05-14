// THAILAND MAP
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Alert
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
import QuestionActions from '../Redux/QuestionRedux'
import MarketActions from '../Redux/MarketRedux'
import styles from './Styles/HomeScreenStyle'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')

class MarketHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id_type: null,
            id_province: null,
            area: null,

            search_text: null,
            show_icon: true,

            data_skin: null,
            tmp_region: null,
            slist: null,
            slist2: null,
            slist3: null,
            tmp_open: null,
            canSee: false,

            tmp_follow: null,
            tmp_profile: null,
            tmp_province: null,
            check_follow: null,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            // title: params.getName,  // change title => String
            // headerTitle: (
            //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            //         <Text style={{ fontSize: 18, color: "white" }} numberOfLines={1}>
            //             {params.getName}
            //         </Text>
            //     </View>
            // ),
            headerRight: (
                <TouchableOpacity style={{ backgroundColor: Colors.milk, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, marginRight: 7.5 }} onPress={params.showDialog}>
                    <Text style={{ fontSize: 18, color: Colors.brownText, fontWeight: 'bold' }}>{I18n.t("shop")}</Text>
                    <Icon2 name={'shopping-cart'} size={20} style={{ paddingLeft: 5 }} />
                </TouchableOpacity>
            )
        };
    };

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        let tmp_region = null
        if (newProps.data_region && newProps.data_region != null) {
            tmp_region = newProps.data_region
        }

        let tmp_province = newProps.province
        if (newProps.province && newProps.province != null) {
            if (prevState.tmp_province != newProps.province) {
                tmp_province = newProps.province
            }
        }


        let slist = newProps.data_typeAmulet2
        if (newProps.data_typeAmulet2 && newProps.data_typeAmulet2 != null) {
            slist = newProps.data_typeAmulet2
        }

        let slist2 = newProps.data_typeAmulet
        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            slist2 = newProps.data_typeAmulet
        }

        if (newProps.data_open && newProps.data_open != null) {
            if (prevState.tmp_open != newProps.data_open) {
                newProps.editProfile(newProps.data_open)
                return {
                    tmp_open: newProps.data_open
                }
            }
        }

        if (newProps.data_follow && newProps.data_follow != null) {
            if (prevState.tmp_follow != newProps.data_follow) {
                newProps.getProfile()
                return {
                    tmp_follow: newProps.data_follow
                }
            }
        }


        if (newProps.profile && newProps.profile != null) {
            if (prevState.tmp_profile != newProps.profile) {
                newProps.editProfile2(newProps.profile)
                let check_follow
                if (newProps.profile && (!newProps.profile.my_follow || newProps.profile.my_follow == null)) {
                    check_follow = "none"
                } else if (newProps.profile && newProps.profile.my_follow && newProps.profile.my_follow != null) {
                    if (newProps.profile.my_follow.length < 3) {
                        check_follow = "none"
                    } else if (newProps.profile.my_follow.length >= 3) {
                        check_follow = "auto"
                    }
                }
                return {
                    tmp_profile: newProps.profile,
                    check_follow
                }

            }
        }

        return {
            data_skin: slist,
            tmp_region,
            slist,
            slist2,
            slist3: newProps.data_alltype,
            tmp_province
        }
    }

    showDialog = () => {
        this.props.getProvince()
        this.popupDialogProvince.show()
    }

    componentDidMount() {
        this.props.getListTypeAmulet()
        this.props.getProfile()
        this.props.navigation.setParams({ showDialog: this.showDialog })
        if (!this.props.data_alltype) {
            this.props.requestAllTypeAmulet()
        }

        if (this.props.profile && !this.props.profile.my_follow && this.props.profile.role != "admin") {
            this.popupDialogFix.show()
        } else if (this.props.profile && this.props.profile.my_follow && this.props.profile.role != "admin") {
            if (this.props.profile.my_follow.length < 3) {
                this.popupDialogFix.show()
            }
        }

    }

    componentWillUnmount() {
        this.props.getProfile()
        this.props.clearDataOpen()
        this.props.clearDataFollow()
    }

    _north = () => {
        this.setState({ area: 1 })
        // this.props.getRegion(1)
        this.props.getListTypeAmulet2(1)
        this.popupDialog2.show()
    }

    _northEast = () => {
        this.setState({ area: 4 })
        // this.props.getRegion(4)
        this.props.getListTypeAmulet2(4)
        this.popupDialog2.show()
    }

    _central = () => {
        this.setState({ area: 2 })
        // this.props.getRegion(2)
        this.props.getListTypeAmulet2(2)
        this.popupDialog2.show()
    }

    _east = () => {
        this.setState({ area: 3 })
        // this.props.getRegion(3)
        this.props.getListTypeAmulet2(3)
        this.popupDialog2.show()
    }

    _south = () => {
        this.setState({ area: 5 })
        // this.props.getRegion(5)
        this.props.getListTypeAmulet2(5)
        this.popupDialog2.show()
    }

    _openStore = () => {
        if (this.props.profile.store == null) {
            this.props.navigation.navigate("marketStore")
        } else {
            if (this.props.profile.store && this.props.profile.store.status == 1) {
                this.popupDialog3.show()
            } else if (this.props.profile.store && this.props.profile.store.status == 5) {
                this.props.navigation.navigate("marketMylistAmulet")
            } else if (this.props.profile.store && this.props.profile.store.status == 0) {
                Alert.alert(
                    'Check Phra',
                    I18n.t('failureOpen'),
                    [
                        { text: I18n.t('registerStore'), onPress: () => { this.props.navigation.navigate("marketStore") } },
                        { text: I18n.t('cancel'), onPress: () => { } }
                    ],
                )
            }
        }
    }

    handleInputFocus = () => this.setState({ show_icon: false })

    handleInputBlur = () => this.setState({ show_icon: true })

    _pressSearch = () => {
        if (this.state.search_text) {
            this.props.searchRequest(this.state.search_text)
            this.setState({ search_text: null })
            this.props.navigation.navigate("marketSearch1")
        } else {

        }
    }

    render() {
        // console.log(this.props.profile)
        console.log(this.state.tmp_profile)
        if (this.props.profile && this.props.profile.my_follow) {
            console.log(this.props.profile.my_follow.find(e => e.is_new == true))
        }
        console.log('--------------- SKIN AMULET --------------')

        // if(this.props.lastIDofGroupAmulet && this.props.lastIDofGroupAmulet != null){
        //     console.log(this.props.lastIDofGroupAmulet.filter(e => e.region_id == null).find(b => b.status == false))
        //     console.log('------------- HERE RESULT 55 --------------')
        // }
        // console.log()
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <Image source={Images.map2} style={styles.map} />

                <TextInput value={this.state.search_text} onChangeText={(text) => this.setState({ search_text: text })}
                    style={{ width: '80%', height: 40, backgroundColor: '#fff5', paddingVertical: 8, paddingHorizontal: 30, borderRadius: 8, alignSelf: 'center', marginTop: 2.5, zIndex: 2 }}
                    // onFocus={() => this.setState({ show_icon: false })} 
                    ref={(textfield) => { this.textfield = textfield }}
                    placeholder={I18n.t('amuletOrProvince')}
                    placeholderStyle={{ marginLeft: 15 }}
                    underlineColorAndroid={'transparent'}
                    onFocus={this.handleInputFocus}  // when focus text input
                    onBlur={this.handleInputBlur}  // when not focus text input
                    onSubmitEditing={this._pressSearch}
                />
                {!this.state.show_icon && <TouchableOpacity style={{ position: 'absolute', top: 7.5, right: width / 9, zIndex: 2 }} onPress={this._pressSearch}><Icon2 name={'arrow-right'} size={24} style={{}} /></TouchableOpacity>}

                {this.state.show_icon && < Icon2 name={'search'} size={24} color={Colors.brownTextTran} style={{ position: 'absolute', top: 7.5, left: width / 9 }} />}

                <TouchableOpacity style={styles.touchPin1} onPress={this._north}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>{I18n.t("north")}</Text>
                    {this.props.profile && this.props.profile.my_follow != null && this.props.profile.my_follow.filter(e => e.region_id == 1).find(b => b.is_new == true) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin2} onPress={this._northEast}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>{I18n.t("north_east")}</Text>
                    {this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow.filter(e => e.region_id == 4).find(b => b.is_new == true) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin3} onPress={this._central}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>{I18n.t("central")}</Text>
                    {this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow.filter(e => e.region_id == 2).find(b => b.is_new == true) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchPin4, { right: this.props.language == "th" ? width / 6.25 : width / 3.6 }]} onPress={this._east}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>{I18n.t("east")}</Text>
                    {this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow.filter(e => e.region_id == 3).find(b => b.is_new == true) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin5} onPress={this._south}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>{I18n.t("south")}</Text>
                    {this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow.filter(e => e.region_id == 5).find(b => b.is_new == true) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: Colors.milk, borderRadius: 12, padding: 10, width: width / 2.75, position: 'absolute', right: 10, bottom: this.props.profile && this.props.profile.role != "admin" ? 100 : 12, zIndex: 2 }} onPress={() => this.popupDialog4.show()}>
                    <Icon2 name={"th"} size={28} />
                    <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 16, marginLeft: 7.5 }}>{I18n.t('normalCate')}</Text>
                    {this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow.filter(e => e.region_id == null).find(b => b.is_new == true) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>


                {/* *******************OPEN STORE ZONE******************* */}
                {
                    this.props.profile && this.props.profile.role != "admin" && <TouchableOpacity style={{ width: (width / 3.7), height: (height / 8.5), position: 'absolute', bottom: 7.5, right: 10, zIndex: 2 }} onPress={this._openStore}>
                        <Image source={Images.chat} style={{ width: width / 3.7, height: height / 8.5 }} />
                        <Text style={{ position: 'absolute', bottom: height / 14, right: 34, fontFamily: "Prompt-SemiBold" }}>{this.props.profile.store == null ? I18n.t("registerOpenStore1") : I18n.t("goto")}</Text>
                        <Text style={{ position: 'absolute', bottom: (height / 14) - 20, right: 22, fontFamily: "Prompt-SemiBold" }}>{this.props.profile.store == null ? I18n.t("registerOpenStore2") : I18n.t('mystore')}</Text>
                    </TouchableOpacity>
                }
                {/* *******************OPEN STORE ZONE******************* */}



                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('detailShop')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog3 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={(height / 2.75)}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >
                    {this.props.profile && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Status : "}</Text>
                            {this.props.profile.store && <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.status == 1 ? I18n.t('waitVerify') : this.props.profile.store.status == 5 ? I18n.t('successVerify') : I18n.t('cancelHire')}</Text>}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Name : "}</Text>
                            {this.props.profile.store && <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.store_name}</Text>}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Contact : "}</Text>
                            {this.props.profile.store && <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.contact}</Text>}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Contact : "}</Text>
                            {this.props.profile.store && <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.province_name}</Text>}
                        </View>
                    </View>}
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t("selectAmuletType")}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.75}
                    // height={150}
                    onDismissed={() => { this.setState({ id_type: null, area: null }) }}
                >
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.slist && this.state.slist != null && this.state.slist.map((e, i) => {
                            let icon_use
                            let color_use
                            if (this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow != null) {
                                // icon_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "plus-square" : "window-close"
                                // color_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "green" : Colors.bloodOrange
                                icon_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "ติดตาม" : "ยกเลิก"
                                color_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "green" : Colors.bloodOrange
                            } else {
                                // icon_use = "plus-square"
                                // color_use = "green"
                                icon_use = "ติดตาม"
                                color_use = "green"
                            }
                            if (i != 0) {
                                return (
                                    <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ id_province: e.id })
                                        this.props.setZoneSkin(this.state.area, e.id)  // zone & province
                                        this.props.navigation.navigate('marketListArea1')
                                        this.props.setTypeName(e.name)
                                        this.popupDialog2.dismiss()
                                    }} >
                                        <Text style={{ alignSelf: 'center', fontSize: 15, color: Colors.brownText, marginTop: 10 }}>{e.name}</Text>
                                        <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{"( " + e.follow + " " + I18n.t('follow') + " )"}</Text>

                                        <TouchableOpacity style={{ position: 'absolute', left: 0, top: -1.5 }} onPress={() => this.props.followGroupAmulet(e.id)}>
                                            {/* <Icon2 name={icon_use} size={20} color={color_use} /> */}
                                            <Text style={{ borderRadius: 10, paddingVertical: 2.5, paddingHorizontal: 7.5, backgroundColor: color_use, color: "white", fontSize: 12 }}>{icon_use}</Text>
                                        </TouchableOpacity>
                                        {this.props.profile && this.props.profile.my_follow != null && this.props.profile.my_follow.find(b => b.type_id == e.id && b.is_new == true) != undefined && <View
                                            style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: -0.25, right: 0 }}></View>}
                                    </TouchableOpacity>)

                            }
                        })
                        }
                    </ScrollView>
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('normalCate')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog4 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.slist2 && this.state.slist2.map((e, i) => {

                            let icon_use
                            let color_use
                            if (this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow != null) {
                                // icon_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "plus-square" : "window-close"
                                // color_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "green" : Colors.bloodOrange
                                icon_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "ติดตาม" : "ยกเลิก"
                                color_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "green" : Colors.bloodOrange
                            } else {
                                // icon_use = "plus-square"
                                // color_use = "green"
                                icon_use = "ติดตาม"
                                color_use = "green"
                            }
                            if (e.parent_id == null) {
                                return (
                                    <View style={{ marginTop: 5, marginHorizontal: 5, marginBottom: 2.5, padding: 10, borderRadius: 10, backgroundColor: 'orange' }}>
                                        <Text style={{ textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ id_province: e.id })
                                        this.props.setZoneSkin(this.state.area, e.id)  // zone & province => zone & id type amulet
                                        this.props.navigation.navigate('marketListArea1')
                                        this.props.setTypeName(e.name)
                                        this.popupDialog4.dismiss()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold', marginTop: 10 }}>{e.name}</Text>
                                        <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{"( " + e.follow + " " + I18n.t('follow') + " )"}</Text>
                                        <TouchableOpacity style={{ position: 'absolute', left: 0, top: -1.5 }} onPress={() => {
                                            this.props.followGroupAmulet(e.id)
                                        }}>
                                            {/* <Icon2 name={icon_use} size={20} color={color_use} /> */}
                                            <Text style={{ borderRadius: 10, paddingVertical: 2.5, paddingHorizontal: 7.5, backgroundColor: color_use, color: "white", fontSize: 12 }}>{icon_use}</Text>
                                        </TouchableOpacity>
                                        {this.props.profile && this.props.profile.my_follow != null && this.props.profile.my_follow.find(b => b.type_id == e.id && b.is_new == true) != undefined && <View
                                            style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: -0.25, right: 0 }}></View>}
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </ScrollView>

                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t("f3t")}</Text>
                        {this.state.check_follow == "auto" && <TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={() => this.popupDialogFix.dismiss()}><Icon2 name={"window-close"} size={22} /></TouchableOpacity>}
                    </View>}
                    ref={(popupDialog) => { this.popupDialogFix = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    // overlayPointerEvents={"none"} // use to fix follow at least 3 type
                    overlayPointerEvents={this.state.check_follow}
                    onDismissed={() => { this.setState({}) }} >

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.slist3 && this.state.slist3.map((e, i) => {
                            // let icon_use
                            // let color_use
                            let icon_use
                            let color_use
                            if (this.props.profile && this.props.profile.my_follow && this.props.profile.my_follow != null) {
                                // icon_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "plus-square" : "window-close"
                                // color_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "green" : Colors.bloodOrange
                                icon_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "ติดตาม" : "ยกเลิก"
                                color_use = this.props.profile.my_follow.find(c => c.type_id == e.id) == undefined ? "green" : Colors.bloodOrange
                            } else {
                                // icon_use = "plus-square"
                                // color_use = "green"
                                icon_use = "ติดตาม"
                                color_use = "green"
                            }
                            if ((e.parent_id == null || e.parent_id == 1) || (e.parent_id == 2 || e.parent_id == 3) || (e.parent_id == 4 || e.parent_id == 5)) {

                            } else {
                                return (
                                    <View style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ id_province: e.id })
                                        this.props.setZoneSkin(this.state.area, e.id)  // zone & province => zone & id type amulet
                                        this.props.navigation.navigate('marketListArea1')
                                        this.popupDialog4.dismiss()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold', marginTop: 10 }}>{e.name}</Text>
                                        <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{"( " + e.follow + " " + I18n.t('follow') + " )"}</Text>
                                        <TouchableOpacity style={{ position: 'absolute', right: 0, top: -1.5 }} onPress={() => {
                                            this.props.followGroupAmulet(e.id)
                                        }}>
                                            {/* <Icon2 name={icon_use} size={20} color={color_use} /> */}
                                            <Text style={{ borderRadius: 10, paddingVertical: 2.5, paddingHorizontal: 7.5, backgroundColor: color_use, color: "white", fontSize: 12 }}>{icon_use}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })}
                    </ScrollView>

                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('selectProvince')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialogProvince = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_province && this.state.tmp_province.map((e, i) => {
                            return (
                                <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                    this.props.setJangwad(e.id, e.name)
                                    this.props.navigation.navigate("marketListShop")
                                    this.popupDialogProvince.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold', marginTop: 10 }}>{e.name}</Text>
                                </TouchableOpacity>
                            )

                        })}
                    </ScrollView>

                </PopupDialog>


                <Spinner
                    visible={(this.props.request || (this.props.request_profile || (this.props.request5 || (this.props.request15 || this.props.request4))))}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

            </LinearGradient >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,
        request_profile: state.question.request_profile,
        request5: state.market.request5,
        data_open: state.market.data_open,

        store_name: null,  // tmp store name open store
        tmp_province: null,  // tmp province name about open store
        tmp_contact: null,  // tmp contact about open store

        data_typeAmulet: state.market.data_typeAmulet,  // store skin amulet 
        data_typeAmulet2: state.market.data_typeAmulet2, // store skin amulet 222222222
        request: state.market.request,  // for request to get type amulet

        request7: state.market.request7,  // get province in each region
        data_region: state.market.data_region,  // store province n each region

        data_follow: state.market.data_follow, // store follow group amulet
        // data_areaAmulet_store: state.market.data_areaAmulet_store,  // store last amulet id from list area/group amulet

        lastIDofGroupAmulet: state.question.data_follow,

        request15: state.market.request15,  // for request all type amulet
        data_alltype: state.market.data_alltype,  // store all type amulet

        request4: state.market.request4,  // request get province
        province: state.market.province,  // store province
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        // getListTypeAmulet: () => dispatch(MarketActions.getListTypeAmulet()),  // here api get group amulet
        getListTypeAmulet: () => dispatch(MarketActions.getListTypeAmulet()),  // here api get group amulet
        getListTypeAmulet2: (geo_id) => dispatch(MarketActions.getListTypeAmulet2(geo_id)),

        setZoneSkin: (zone, province) => dispatch(MarketActions.setZoneSkin(zone, province)),
        getRegion: (geo_id) => dispatch(MarketActions.getRegion(geo_id)),
        searchRequest: (text) => dispatch(MarketActions.searchRequest(text)),
        editProfile: (data) => dispatch(QuestionActions.editProfile(data)),
        editProfile2: (data) => dispatch(QuestionActions.editProfile2(data)),
        clearDataOpen: () => dispatch(MarketActions.clearDataOpen()),
        clearDataFollow: () => dispatch(MarketActions.clearDataFollow()),

        followGroupAmulet: (type_id) => dispatch(MarketActions.followGroupAmulet(type_id)),

        updateProfileFollow: (data) => dispatch(QuestionActions.updateProfileFollow(data)),

        addRedDotData: (data) => dispatch(QuestionActions.addRedDotData(data)),
        deleteRedDotData: (type_id) => dispatch(QuestionActions.deleteRedDotData(type_id)),
        editRedDotData2: (last_id, type_id) => dispatch(QuestionActions.editRedDotData2(last_id, type_id)),
        requestAllTypeAmulet: () => dispatch(MarketActions.requestAllTypeAmulet()),
        setTypeName: (name) => dispatch(MarketActions.setTypeName(name)),
        
        getProvince: () => dispatch(MarketActions.getProvince()),
        setJangwad: (id, name) => dispatch(MarketActions.setJangwad(id, name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketHome)