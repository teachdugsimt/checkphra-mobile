// ==================================
// ***************** ห้องดูรายการข้อความของพระ... และไปห้องแชทรวมพระ... ในหมวด "พระของฉัน" *****************
// ==================================
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
import Icon2 from "react-native-vector-icons/FontAwesome";
import moment from 'moment'
import 'moment/locale/th'
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import ChatActions from '../Redux/ChatRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class AdminContactUser extends Component {

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        return (
            <TouchableOpacity style={{ height: 100, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }}
                onPress={() => this._goToChat(item)}>

                <Text style={{ padding: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{I18n.t('messages') + " " + (index + 1)}</Text>
                <Text style={{ padding: 10, color: Colors.brownTextTran, fontSize: 14 }}>{date}</Text>
            </TouchableOpacity>
        )
    }

    _goToChat = (item) => {
        this.props.setDataGroupChat(item)
        this.props.navigation.navigate('chat3')
    }

    componentDidMount() {
        count = 1
        this.props.getMyMessageFromOther(count)
    }

    componentWillUnmount() {
        count = 1
    }

    _reload = () => {
        count = 1
        this.props.getMyMessageFromOther(count)
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_myMessageFromOther && this.props.data_myMessageFromOther.length >= 10 && (this.props.request7 == false || this.props.request7 == null)) {
            count++
            this.props.getMyMessageFromOther(count)
        }
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)

        // console.log('***************************************')
        return (
            <LinearGradient
                colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
            >
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request7 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.props.data_myMessageFromOther}
                    renderItem={this._renderItem} />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        // profile: state.question.profile,
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        // data_amulet: state.showroom.data_amulet,

        request7: state.chat.request3,  // request for get data my real amulet message from other person ( Chat Solo )
        data_myMessageFromOther: state.chat.data_listUser,  // data for store my message from other person ( Chat Solo )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        // setDetailPhra: (data) => dispatch(ShowRoomActions.setDetailPhra(data)),
        getMyMessageFromOther: (page) => dispatch(ChatActions.getListUserContact(page)),
        setDataGroupChat: (data) => dispatch(ChatActions.setGroupChatAdmin(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactUser)