import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl, Alert, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'

import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import AuthActions from '../Redux/AuthRedux'

// Styles
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './Styles/CheckListScreenStyle'
import firebase from 'react-native-firebase';

import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();

const { width } = Dimensions.get('window')
let check = true
let count = 1
class CheckListScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      fetch: null,
      data_tmp: null
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('pendingList'),
    }
  }

  componentDidMount() {
    moment.locale('th')
    this.props.getHistory(1)
    // this.props.getProfile()
    this.getDeviceToken()
  }


  async getDeviceToken() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  //1
  async checkPermission() {
    console.log("check permission")
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    console.log("get token")
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken)
        // user has a device token
        this.props.saveDeviceToken(fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);

      }
    } else {
      console.log(fcmToken)
      this.props.saveDeviceToken(fcmToken)
    }
  }

  //2
  async requestPermission() {
    console.log("request permission")
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  // componentWillMount() {
  //   count = 1
  // }

  componentWillUnmount() {
    count = 1
  }

  _gotoCheckphra = (item) => {
    // console.log(item)
    this.props.setDataPhra(item)
    this.props.navigation.navigate('check2')
  }

  goToAnswer = (qid) => {
    // console.log(qid)
    this.props.getAnswer(qid)
    this.props.navigation.navigate('answer')
  }

  onRefresh = () => {
    count = 1
    this.props.getHistory(count)
  }

  static getDerivedStateFromProps(newProps, PrevState) {
    let plist = newProps.history
    console.log(newProps)
    console.log(PrevState)

    if (newProps.data_answer != null) {
      if (newProps.request1 == false || newProps.request1 == true) {
        let tmp = newProps.history.find(e => e.id == newProps.data_answer.q_id)
        if (tmp && tmp != undefined && newProps.data_answer.q_id == tmp.id) {
          newProps.getHistory(1)
          return {
            data_tmp: newProps.history
          }
        }
      }
    }



    return {
      // fetch: checkRequest,
      data_tmp: plist
    }
  }

  _onScrollEndList = () => {
    console.log('END OF LIST AGAIN')
    if (this.props.history && this.props.history.length > 7) {
      count++
      this.props.getHistory(count)
    }
  }

  render() {
    I18n.locale = this.props.language
    // console.log(JSON.parse(JSON.stringify(this.props.history)))
    // let data = this.props.history ? JSON.parse(JSON.stringify(this.props.history)) : null
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
              refreshing={this.props.request2 == true || this.props.request1 == true}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          data={this.props.history && this.props.history.length > 0 && JSON.parse(JSON.stringify(this.props.history))}
          // data={data}
          renderItem={({ item }) => {
            let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
            let status = 'รอตรวจ'
            let color = 'orange'
            let name = ''
            if (item.status == 'success') {
              status = 'ตรวจแล้ว'
              color = 'green'
            }
            
            if (item.type == '100 ปี พ.ศ.2515') {
              name = I18n.t('year100era2515')
            } 
            else if(item.type == '108 ปี พ.ศ.2523'){
              name = I18n.t('year108era2523')
            }
            else if(item.type == '118 ปี พ.ศ.2533'){
              name = I18n.t('year118era2533')
            }
            else if(item.type == '122 ปี พ.ศ.2537'){
              name = I18n.t('year122era2537')
            }
            else if(item.type == 'เสาร์ 5 พ.ศ.2536'){
              name = I18n.t('sat5era2536')
            }
            else if(item.type == 'เสาร์ 5 พ.ศ.2539'){
              name = I18n.t('sat5era2539')
            }
            else if(item.type == '214 ปีชาตกาล พ.ศ.2545'){
              name = I18n.t('year214era2545')
            }
            else if(item.type == 'บางขุนพรหม ปี พ.ศ.2509'){
              name = I18n.t('BangKhunProm2509')
            }
            else if(item.type == 'บางขุนพรหม ปี พ.ศ.2517'){
              name = I18n.t('BangKhunProm2517')
            }
            else {
              name = item.type == 'อื่นๆ หรือ ไม่ทราบ' ? I18n.t('otherOrUnknown') : I18n.t(item.type)
            }

            return (
              <TouchableOpacity onPress={() => {
                if (item.status == 'success') {
                  this.goToAnswer(item.id)
                  // this._gotoCheckphra(item)
                } else {
                  this._gotoCheckphra(item)
                  // alert('ยังไม่มีผลการตรวจ')
                }
              }
              }>
                <View style={{ height: 90, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.images[0] }} style={{ width: 65, height: 65, margin: 10, borderRadius: 10 }} />
                  <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownText,
                        // margin: 20
                      }}>{name}</Text>
                      <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownText,
                        // margin: 20
                      }}> ( {item.id} )</Text>
                    </View>
                    <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 13,
                      color: Colors.brownText,
                      // margin: 20
                    }}>{item.name ? item.name : item.email}</Text>
                    <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 12,
                      color: Colors.brownText,
                      // margin: 20
                    }}>{date}</Text>
                  </View>

                </View>
              </TouchableOpacity>
            )
          }}
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
          onEndReached={this._onScrollEndList}
          onEndReachedThreshold={0.05}
        />
        {/* <Spinner
          visible={this.props.request2}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        /> */}
      </LinearGradient>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.question.history,
    answer: state.question.answer,
    request2: state.question.request2,  // get history
    images: state.question.images,
    amulet: state.question.amuletType,
    // access_id: state.auth.user_id,
    request1: state.expert.fetch,   // send answer
    data_answer: state.expert.data_answer,
    language: state.auth.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
    getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
    deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
    setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
    getProfile: () => dispatch(QuestionActions.getProfile()),
    saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListScreen)
