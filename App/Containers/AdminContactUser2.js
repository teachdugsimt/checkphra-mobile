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
import ChatActions from '../Redux/ChatRedux'
import RealtimeActions from '../Redux/RealtimeRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "react-native-firebase"
import AdminContactUser from './AdminContactUser';
// import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 10
let check = true
class AdminContactUser2 extends Component {
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

      timestamp: null,
      message: null,
    }
    this.adminContact = firebase.database().ref('messages/adminchat/' + this.props.tmp_user.user_id);
    this.tmpMessages = firebase.database().ref('tmp_admin_messages/' + this.props.tmp_user.user_id)
  }


  handleChange = (event) => {
    this.setState({ timestamp: new Date().getTime() });
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
        user_id: this.props.tmp_user.user_id,
        name: this.props.tmp_user.name,
        avatar: this.props.tmp_user.avatar,
        email: this.props.tmp_user.email,
        fb_id: this.props.tmp_user.fb_id,
        last_message: message[0].text,
        createdAt: message[0].createdAt,
      }
      this.tmpMessages.set(tmp_item)
    }
  }


  getMessage = () => {
    this.adminContact.limitToLast(10).on('value', messages => {
      if (messages.val()) {
        console.log(Object.values(messages._value))
        this.props.setUserMessage(Object.values(messages._value))
        // this.setState({ message: Object.values(messages._value) })
      }
    })
  }

  getMessage2 = () => {
    count = count + 10
    this.adminContact.limitToLast(count).on('value', messages => {
      if (messages.val()) {
        console.log(Object.values(messages._value))
        this.props.setUserMessage(Object.values(messages._value))
        // this.setState({ message: Object.values(messages._value) })
      }
    })
  }

  componentDidMount() {
    count = 10
    this.getMessage()
  }

  componentWillUnmount() {
    count = 10
  }

  _reload = () => {
    if (this.props.data_getMessageFromUser && this.props.data_getMessageFromUser.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
      count++
      this.props.getMessageTheirAmulet(count)
    }
  }

  _onScrollEndList = () => {
    console.log('END LIST AGAIN')
    if (this.props.data_getMessageFromUser && this.props.data_getMessageFromUser.length >= 2 && (this.props.request3 == false || this.props.request3 == null)) {
      count = 1
      this.props.getMessageTheirAmulet(count)
    }
  }



  render() {
    I18n.locale = this.props.language
    // console.log(this.props.data_amulet)

    console.log('--------------------- Contact Admin22 -------------------------')
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
          user={{
            _id: this.props.user_id,
            name: this.props.profile && this.props.profile.firstname ? (this.props.profile.firstname + (this.props.profile.lastname ? this.props.profile.lastname : "")) : "-",
            avatar: this.props.profile && this.props.profile.image ? "https://s3-ap-southeast-1.amazonaws.com/core-profile/images/" + this.props.profile.image : (this.props.profile && this.props.profile.fb_id ? 'https://graph.facebook.com/' + this.props.profile.fb_id + "/picture?width=500&height=500" : "-"),
            email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
            fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
          }}
          messages={this.props.data_adminmessage}
          onSend={message => {
            this.handleChange
            this.handleSend(message)
          }}
          showUserAvatar={false}
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
    data_sendMessageToUser: state.chat.data_sendMessage,  // request send message of their amulet

    request3: state.chat.request2,  // request for get message of this room
    data_getMessageFromUser: state.chat.data_message, // request for get message of this room

    data: state.chat.data_gChatAdmin,  // data pass to this screen

    tmp_user: state.realtime.tmp_user, // store tmp user
    data_adminmessage: state.realtime.data_adminmessage,  // store admin = user messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessageTheirAmulet: (message) => dispatch(ChatActions.sendMessageAdmin(message)),  // send message **
    getMessageTheirAmulet: (page) => dispatch(ChatActions.getMessageAdmin(page)), // get message
    // clearTheirAmuletMessage: () => dispatch(ChatActions.clearTheirAmuletMessage()),
    editTheirAmuletMessage: (data) => dispatch(ChatActions.editDataMessage(data)), // edit array
    clearCacheGetData: () => dispatch(ChatActions.clearCacheGetData()),
    editRedDotAtoU: (data) => dispatch(ChatActions.editRedDotAtoU(data)),

    setUserMessage: (data) => dispatch(RealtimeActions.setUserMessage(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactUser2)

//
