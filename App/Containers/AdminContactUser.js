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
import RealtimeActions from '../Redux/RealtimeRedux'
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import ChatActions from '../Redux/ChatRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import firebase from "react-native-firebase"
// import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let count2 = 10
class AdminContactUser extends Component {

  constructor(props) {
    super(props)
    this.state = {

      list: null,
      timestamp: null,
      message: null,
      loading: null,
      // _isMounted: null,
    }
    // this.adminContact = firebase.database().ref('messages/adminchat/' + this.props.user_id);
    this.tmpMessages = firebase.database().ref('tmp_admin_messages/')
  }

  getListUser = () => {
    this.setState({ loading: true })
    this.tmpMessages.limitToLast(10).on('value', list => {
      if (list.val()) {
        this.props.setListUser(Object.values(list._value))
        this.setState({ loading: false })
        console.log(Object.values(list._value))
        console.log('**************** HERE LIST USER ********************************')
      } else {
        this.setState({ loading: false })
      }
    })
  }

  getListUser2 = () => {
    this.setState({ loading: true })
    count2 = count2 + 10
    this.tmpMessages.limitToLast(count2).on('value', list => {
      if (list.val()) {
        this.props.setListUser(Object.values(list._value))
        this.setState({ loading: false })
        console.log(Object.values(list._value))
        console.log('**************** HERE LIST USER 22222 ********************************')
      } else {
        this.setState({ loading: false })
      }
    })
  }

  _goToChat = (item) => {
    this.props.setTmpAdminData(item)
    this.props.navigation.navigate('chat3')
  }

  componentDidMount() {
    count2 = 10
    this.getListUser()
  }

  componentWillUnmount() {
    count2 = 10
  }

  _renderItem = ({ item, index }) => {
    let date = moment(item.createdAt).format("DD MMM YYYY (HH:mm)")

    return (
      <TouchableOpacity style={{ height: 85, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
        onPress={() => this._goToChat(item)}>
        <View style={{ flexDirection: 'row' }}>
          {item.avatar && item.avatar != "-" && <Image source={{ uri: item.avatar }} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
          {/* {item.owner_profile.fb_id == null && item.owner_profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.owner_profile.image }} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
          {item.owner_profile && item.owner_profile.fb_id == null && !item.owner_profile.image && <Image source={Images.user} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />} */}
          {item.avatar == "-" && <Image source={Images.user} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}

          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
              {item.name && <Text style={{ color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 14, width: width / 2.2 }} numberOfLines={1}>{item.name ? item.name : (item.email ? item.email : "Check Phra User")}</Text>}
              <Text style={{ color: Colors.brownTextTran, fontSize: 12 }}>{date}</Text>
            </View>
            <Text style={{ marginHorizontal: 5, width: width - 95 }} numberOfLines={1}>{item.last_message}</Text>


          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // _reload = () => {
  //   count = 1
  //   this.props.getMyMessageFromOther(count)
  // }

  _reload = () => {
    count2 = 10
    this.getListUser()
    // this.getListUser2()
  }

  // _onScrollEndList = () => {
  //   console.log('END LIST AGAIN')
  //   if (this.props.data_myMessageFromOther && this.props.data_myMessageFromOther.length >= 10 && (this.props.request7 == false || this.props.request7 == null)) {
  //     count++
  //     this.props.getMyMessageFromOther(count)
  //   }
  // }

  _onScrollEndList = () => {
    this.getListUser2()
  }

  render() {
    I18n.locale = this.props.language

    console.log('****************** Admin Contact User1 *********************')
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
              refreshing={this.state.loading}
              onRefresh={this._reload}
            />
          }
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
          data={this.props.data_listuser}
          renderItem={this._renderItem}
          onEndReached={this._onScrollEndList}
          onEndReachedThreshold={0.25}
        />
      </LinearGradient>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
    profile: state.question.profile,
    // request_profile: state.question.request_profile,
    // data_amulet: state.question.amuletType,   // data request type amulet
    // request_type: state.question.request_type,  // request type
    // data_amulet: state.showroom.data_amulet,

    request7: state.chat.request3,  // request for get data my real amulet message from other person ( Chat Solo )
    data_myMessageFromOther: state.chat.data_listUser,  // data for store my message from other person ( Chat Solo )
    data_listuser: state.realtime.data_listuser, /// store data list user contacct to admin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
    // setDetailPhra: (data) => dispatch(ShowRoomActions.setDetailPhra(data)),
    getMyMessageFromOther: (page) => dispatch(ChatActions.getListUserContact(page)),
    setDataGroupChat: (data) => dispatch(ChatActions.setGroupChatAdmin(data)),
    clearDataListUser: () => dispatch(ChatActions.clearDataListUser()),

    setListUser: (data) => dispatch(RealtimeActions.setListUser(data)),
    setTmpAdminData: (data) => dispatch(RealtimeActions.setTmpAdminData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactUser)
