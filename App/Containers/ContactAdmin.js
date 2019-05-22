// ==================================
// ***************** ห้องแชทรวม ในหมวด "พระของคนอื่น" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal, Linking
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import RealtimeActions from '../Redux/RealtimeRedux'
import ChatActions from '../Redux/ChatRedux'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase, { messaging } from 'react-native-firebase';
import VersatileActions from '../Redux/VersatileRedux'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 10
let check = true
class ContactAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hide: false,
            text: null,
            modalVisible: false,
            index: 0,
            img: null,
            mlist: null,
            tlist: null,

            list: null,
            timestamp: null,
            message: null,
            tmp_messages: null
            // _isMounted: null,
        }
        // this.adminContact = firebase.database().ref('messages/adminchat/' + this.props.user_id);
        this.adminContact = firebase.database().ref('messages/adminchat/' + this.props.user_id + "/");
        this.tmpMessages = firebase.database().ref('tmp_admin_messages/' + this.props.user_id)
    }

    static getDerivedStateFromProps(newProps, prevState) {

        if (newProps.data_messageAdmin && newProps.data_messageAdmin != null) {
            if (prevState.tmp_messages != newProps.data_messageAdmin) {
                return {
                    tmp_messages: newProps.data_messageAdmin
                }
            }
        }

        return {

        }
    }
    getMessage = () => {
        this.adminContact.limitToLast(10).on('value', messages => {
            if (messages.val()) {
                this.props.setMessage(Object.values(messages._value))
                console.log(Object.values(messages._value))
            }
            console.log('-------------------- FRUCK HERE ------------------')
        })
    }

    getMessage2 = () => {
        count = count + 10
        this.adminContact.limitToLast(count).on('value', messages => {
            if (messages.val()) {
                this.props.setMessage(Object.values(messages._value))
                console.log(Object.values(messages._value))
            }
            console.log('-------------------- FRUCK HERE222 ------------------')
        })
    }

    handleChange = (event) => {
        this.setState({
            message: event.target.value,
            timestamp: new Date().getTime()
        });
    }

    handleSend = (message) => {
        console.log('-------------------- SEND MESSAGE ZONE ------------------------')
        if (message) {
            let newItem = {
                _id: message[0]._id,
                text: message[0].text,
                createdAt: message[0].createdAt,
                user: {
                    _id: message[0].user._id,
                    name: message[0].user.name,
                    avatar: message[0].user.avatar,
                    email: message[0].user.email,
                    fb_id: message[0].user.fb_id,
                },
            }
            this.adminContact.push(newItem)
            let tmp_item = {
                user_id: message[0].user._id,
                name: message[0].user.name,
                avatar: message[0].user.avatar,
                email: message[0].user.email,
                fb_id: message[0].user.fb_id,
                last_message: message[0].text,
                createdAt: message[0].createdAt,
            }
            this.tmpMessages.set(tmp_item)
        }
    }


    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        return {
            // mlist: message_list,
            // mlist: newProps.data_sendMessageTheirAmulet && newProps.data_sendMessageTheirAmulet
            // tlist: tmp_messages
        }
    }

    componentDidMount() {
        count = 10
        this.getMessage()
    }

    componentWillUnmount() {
        count = 10
    }

    // ************************ NEW SCHOOL ************************** //
    _reload = () => {  // reload เพื่อดูข้อความเก่า
        // count = 1
        // this.props.getMessageTheirAmulet(count)
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count++
            this.props.getMessageTheirAmulet(count)
        }
    }

    _onScrollEndList = () => {  // เลื่อนลงสุดเพื่อดูข้อความใหม่
        console.log('END LIST AGAIN')
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count = 1
            this.props.getMessageTheirAmulet(count)
        }
    }
    // ************************ NEW SCHOOL ************************** //

    _renderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                {item.messages.map((e, i) => {  //myArray.slice(0).reverse().map(
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: e.uid == this.props.user_id ? 'flex-end' : 'flex-start' }}>
                            {e.uid != this.props.user_id && !e.fb_id && <TouchableOpacity style={{ height: 32, width: 32, borderRadius: 16 }} onPress={() => { }}><Image style={{ height: 32, width: 32, borderRadius: 16, alignSelf: 'flex-start' }}
                                source={Images.user} /></TouchableOpacity>}

                            {e.uid != this.props.user_id && e.fb_id && <TouchableOpacity style={{ marginTop: 2.5 }} onPress={() => this._goToURL(e.fb_id)}><Image style={{ height: 32, width: 32, borderRadius: 16, alignSelf: 'flex-start' }}
                                source={{ uri: 'https://graph.facebook.com/' + e.fb_id + '/picture' }} /></TouchableOpacity>}

                            <View style={{
                                backgroundColor: '#FCF3CF', marginVertical: 2.5, marginHorizontal: 2.5,
                                borderRadius: 10, flexDirection: 'row',
                            }}>
                                <Text style={{ marginVertical: 5, marginHorizontal: 8, fontSize: 15 }}>{e.message}</Text>
                            </View>

                        </View>
                    )
                })}
            </View>
        )
    }

    render() {
        I18n.locale = this.props.language
        console.log(count)
        // console.log(this.props.data_amulet)
        // console.log(this.props.data_their)
        console.log('--------------------- Contact Admin -------------------------')
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

                <GiftedChat
                    showUserAvatar={false}
                    user={{
                        _id: this.props.user_id,
                        name: this.props.profile && this.props.profile.firstname ? (this.props.profile.firstname + (this.props.profile.lastname ? this.props.profile.lastname : "")) : "-",
                        avatar: this.props.profile && this.props.profile.image ? "https://s3-ap-southeast-1.amazonaws.com/core-profile/images/" + this.props.profile.image : (this.props.profile && this.props.profile.fb_id ? 'https://graph.facebook.com/' + this.props.profile.fb_id + "/picture?width=500&height=500" : "-"),
                        email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
                        fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
                    }}
                    messages={this.props.data_messageAdmin ? this.props.data_messageAdmin : []}
                    onSend={message => {
                        this.handleChange
                        this.handleSend(message)
                    }}
                    loadEarlier={true}
                    onLoadEarlier={this.getMessage2}
                />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        profile: state.question.profile,

        // data_their: state.showroom.data_their,  // data set to this page (ChatTheirAmulet)

        request2: state.chat.request,  //  request send message of their amulet 
        data_sendMessageTheirAmulet: state.chat.data_sendMessage,  // request send message of their amulet

        request3: state.chat.request2,  // request for get message of this room
        data_messageTheirAmulet: state.chat.data_message, // request for get message of this room

        data_messageAdmin: state.realtime.data_messageAdmin,  // store data message of admin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessageTheirAmulet: (message) => dispatch(ChatActions.sendMessageAdmin(message)),  // send message **
        getMessageTheirAmulet: (page) => dispatch(ChatActions.getMessageAdmin(page)), // get message
        clearTheirAmuletMessage: () => dispatch(ChatActions.clearCacheGetData()),
        editTheirAmuletMessage: (data) => dispatch(ChatActions.editDataMessage(data)), // edit array
        getVersatile: () => dispatch(VersatileActions.getNormalData()),
        setMessage: (data) => dispatch(RealtimeActions.setAdminMessage(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactAdmin)

//