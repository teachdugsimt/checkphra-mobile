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
            headerTitle: (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: "white" }} numberOfLines={1}>
                        {I18n.t('market')}
                    </Text>
                </View>
            ),

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

    }

    componentWillUnmount() {
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


                <Text style={{ fontSize: 18, fontFamily: "Prompt-SemiBold", marginTop: 10, textAlign: 'center' }}>Coming Soon ...</Text>



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