import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from 'react-native-image-zoom-viewer';
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images, ApplicationStyles } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import moment from 'moment'
import 'moment/locale/th'
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import WebboardActions from '../Redux/WebboardRedux'
import styles from './Styles/WebboardStyle'
import ImageList2 from './ImageList/ImageList2'
import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1

let is_new = true
let is_new1 = true

class AddCoins extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        I18n.locale = this.props.language
        // const data = [{ name: 'Olive oil', topic: "แฉพระชื่อดัง", detail: "เมื่อวันที่ 16 มกราคม 2562 เวลาประมาณ 16.24น. ได้มีการค้นพบพระชื่อดังจาก หลุมลึกขนาดใหญ่ บริเวณไซต์ก่อสร้าง เบื้องต้นคาดว่าน่าจะเป็นพระสมเด็จโต จากซากวัดในสมัยก่อน", comment: [{ com: '5555', like: 12, name: 'Janeny', date: '1 Jan 19' }, { com: '666', like: 13, name: 'Johny Wat', date: '2 Jan 19' }, { com: '777', like: 0, name: 'Johny Wat', date: '14:36' }], date: '16/01/2562' },
        // { name: 'Doggy', topic: "New Amulet SOMDEJ", detail: "เมื่อวันที่ 16 มกราคม 2562 เวลาประมาณ 16.24น. ได้มีการค้นพบพระชื่อดังจาก หลุมลึกขนาดใหญ่ บริเวณไซต์ก่อสร้าง เบื้องต้นคาดว่าน่าจะเป็นพระสมเด็จโต จากซากวัดในสมัยก่อน", comment: [{ com: 'somdej to', like: 1229, name: 'WTF', date: '11 Jan 19' }, { com: 'Sathu', like: 13000, name: 'AdminBLue', date: '15:58' }], date: '16/01/2562' }]
        console.log("---------------------- ADDCOINS 1 ----------------------")
        console.log(this.props.data_allBoard)

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container} >
                <Image source={Images.watermarkbg} style={styles.mainBackground} resizeMode='contain' />

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        profile: state.auth.profile,

        request: state.webboard.request, // for get list all board
        data_allBoard: state.webboard.data_allBoard, // store all webboard

        request1: state.webboard.request1, // for get list me post board
        data_meBoard: state.webboard.data_meBoard, // store my post board

        request3: state.webboard.request3, // for add post 
        data_addpost: state.webboard.data_addpost, // store my add post board

        tmp_my: state.webboard.tmp_my,  // store temp my webboard
        tmp_all: state.webboard.tmp_all,  // store temp all webboard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        setWebboard: (data) => dispatch(WebboardActions.setWebboard(data)),

        getListAll: (page) => dispatch(WebboardActions.getListAll(page)),
        addPost: (topic, content) => dispatch(WebboardActions.addPost(topic, content)),
        getListMe: (page) => dispatch(WebboardActions.getListMe(page)),
        setMyBoard: (data) => dispatch(WebboardActions.setMyBoard(data)),
        setAllBoard: (data) => dispatch(WebboardActions.setAllBoard(data)),

        updateMyBoard: (id, updated_at, status) => dispatch(WebboardActions.updateMyBoard(id, updated_at, status)),
        updateAllBoard: (id, updated_at, status) => dispatch(WebboardActions.updateAllBoard(id, updated_at, status)),

        addMyNewPost: (data) => dispatch(WebboardActions.addMyNewPost(data)),
        clearListMyAll: () => dispatch(WebboardActions.clearListMyAll()),
        clearTmp: () => dispatch(WebboardActions.clearTmp()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCoins)