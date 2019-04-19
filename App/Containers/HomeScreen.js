import React, { Component } from 'react'
import {
  ScrollView, Text, View, TouchableOpacity, Dimensions,
  TextInput, StyleSheet, RefreshControl, ImageBackground, Image, Platform, Linking, Animated,
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
// import { Card } from 'react-native-elements'
import { LoginButton, ShareDialog, ShareButton, ShareApi } from 'react-native-fbsdk';
import GridView, { SectionGrid } from "react-native-super-grid";
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import AuthActions from '../Redux/AuthRedux'
import VersionActions from '../Redux/VersionRedux'
import PromotionActions from '../Redux/PromotionRedux'
import WebboardActions from '../Redux/WebboardRedux'
import VersatileActions from '../Redux/VersatileRedux'
import styles from './Styles/HomeScreenStyle'
import moment from 'moment'
import firebase from 'react-native-firebase';
import Reactotron from 'reactotron-react-native'
// import {
//   AdMobRewarded,
// } from 'react-native-admob'

I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const FIXED_BAR_WIDTH = 200
const BAR_SPACE = 5
let check = true
let check2 = true

let shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://play.google.com/store/apps/details?id=com.infiltech.checkphra',
  // contentDescription: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra',
  quote: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra ดูข้อมูลได้ที่ https://www.checkphra.com'
}
class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list_user: null,
      dataProifle: null,
      language: '',
      kawsod: null,

      tmp_publish: null,
      itemWidth: null,
      barFull: null,

      addBonusSuccess: false,
      status: check,
      // tempIndex: 0
    }

    const list_user = [{ name: I18n.t('checkAmuletScreen'), id: 1, logo: 'search' },
    // { name: I18n.t('showAmuletReal'), id: 2 },
    { name: I18n.t('market'), id: 4, logo: 'cart-plus' },
    { name: I18n.t('commu'), id: 3, logo: 'wechat' },]
  }
  animVal = new Animated.Value(0)

  static navigationOptions = ({ navigation }) => {

    return {
      title: I18n.t('home'),
    }
  }
  static getDerivedStateFromProps(newProps, prevState) {
    console.log(newProps)
    console.log(prevState)
    Reactotron.display({
      name: 'New Props',
      preview: 'NewPropsZone',
      value: newProps
    })
    Reactotron.display({
      name: 'Prev state',
      preview: 'PrevStateZone',
      value: prevState
    })
    console.log('============  HOME PAGE =============')

    const list_user = [
      { name: I18n.t('checkAmuletScreen'), id: 1, logo: 'search' },
      // { name: I18n.t('showAmuletReal'), id: 2 },
      { name: I18n.t('market'), id: 4, logo: 'cart-plus' },
      { name: I18n.t('commu'), id: 3, logo: 'wechat' },
      { name: "Share +20 coins", id: 5, logo: 'facebook-square' }
    ]

    if (newProps.language != prevState.language) {
      newProps.getProfile()
    }

    let profile = newProps.profile
    if (newProps.profile && newProps.profile != null) {
      profile = newProps.profile
    }

    let date_tmp = new Date()
    let f1 = moment(date_tmp).format()
    let time11 = f1.slice(0, 10)
    if (newProps.day != time11) {
      newProps.setTime(time11)
      // return {
      //   modalVisible: true,
      // }
    }

    // if (JSON.stringify(newProps.time_shared) < JSON.stringify(date_tmp)) {
    //   check = true
    // }

    // if (JSON.stringify(newProps.time_shared) < JSON.stringify(date_tmp) && newProps.status == false) {
    //   newProps.setStatus(true)
    // }
    if (newProps.data_versatile && newProps.data_versatile != null) {
      shareLinkContent = {
        contentType: 'link',
        contentUrl: newProps.data_versatile.link,
        quote: newProps.data_versatile.topic
      }
    }

    //************************ check alert login complete 7 days ******************************/
    if (newProps.data_login != null) {
      if (newProps.data_login.end_date == time11) {   // ถ้าวันที่ 7 คือ วันนี้ ให้เช็คการแสดงการแจ้งเตือนว่าถ้าเป็นจริง ให้แจ้งเตือนนะ
        if (newProps.modal != undefined && newProps.modal == true) {
          newProps.setModal(false)  // แล้วก้เซทเป็น เท็จเลยเพราะในวันที่ 7 เราต้องการให้มันแจ้งเตือนแค่ครั้งเดียวก็พอ
          Alert.alert(
            'Check Phra',
            I18n.t('loginSuccess1') + newProps.data_login.period_of_time + " " + I18n.t('day') + I18n.t('loginSuccess2') + newProps.data_login.point + " " + I18n.t('coin'),
            [
              { text: I18n.t('ok'), onPress: () => { newProps.setModal(false) } }
            ],
            { cancelable: false }
          )
        } else if (newProps.modal == undefined) { // กรณีที่ modal ใน redux เป็น undeifined ให้เซทเปน true ก่อน
          newProps.setModal(true)
        }
      } else {  // ถ้าไม่ใช่วันนี้ เซทการแจ้งเตือนเป็นจริงไว้ก่อนรอถึงวันที่ 7
        newProps.setModal(true)
      }
    }
    //************************ check alert login complete 7 days ******************************/


    //****************************** SET TEMP PUBLISH ***************************//
    if (newProps.data_publish && newProps.data_publish != null) {
      if (!newProps.tmp_publish || newProps.tmp_publish == null) {  // สร้าง temp_publish ข่าวใหม่
        Reactotron.warn("GENERATE TEMP PUBLISH")
        let data = []
        newProps.data_publish.map(e => {
          data.push({
            id: e.id,
            topic: e.topic,
            status: false,
          })
        })
        newProps.setTempPublish(data)
        Reactotron.warn(data)
      } else if (newProps.tmp_publish && newProps.tmp_publish != null) {
        Reactotron.warn("CHECK & UPDATE TEMP PUBLISH")
        if (newProps.tmp_publish.length == newProps.data_publish.length) { // ไม่มีข่าวใหม่
          // ไม่ต้องทำไร
        } else if (newProps.tmp_publish.length < newProps.data_publish.length) {  // มีข่าวใหม่
          newProps.data_publish.map((e, i) => {
            if (newProps.tmp_publish.find(b => b.id == e.id) == undefined || !newProps.tmp_publish.find(b => b.id == e.id)) {
              newProps.addPublish({
                id: e.id,
                topic: e.topic,
                status: false
              })  // เพิ่มข่าวใหม่ไปใน tmp_publish
            }
          })
        } else if (newProps.tmp_publish.length > newProps.data_publish.length) {  // ลบข่าว
          newProps.tmp_publish.map((e, i) => {
            if (newProps.data_publish.find(b => b.id == e.id) == undefined) {
              newProps.deletePublish(e)
            }
          })
        }
      }
    }
    //****************************** SET TEMP PUBLISH ***************************//

    return {
      dataProifle: profile,
      list_user,
      language: newProps.language,
      kawsod: newProps.data_publish,
    }
  }

  _pressList = (item) => {
    if (item.id == 1) {
      this.props.navigation.navigate('uploadScreen')
    } else if (item.id == 2) {
      this.props.navigation.navigate('showroom')
    } else if (item.id == 3) {
      this.popupDialog.show()
    } else if (item.id == 4) {
      this.props.navigation.navigate('marketHome')
    } else if (item.id == 5) {
      this.shareLinkWithShareDialog()
      // this.seeVideo()
    }
  }

  // seeVideo() {
  //   // Display a rewarded ad
  //   AdMobRewarded.setAdUnitID('ca-app-pub-3195623586470373/3142242629');
  //   AdMobRewarded.requestAd().then((err) => {
  //     // console.log('get ads success')
  //     console.log(err)
  //     // AdMobRewarded.showAd()
  //   })
  //     .catch((err) => {
  //       console.log(err.message)
  //     });


  // }

  async shareLinkWithShareDialog() {
    var tmp = this;
    await ShareDialog.canShow(shareLinkContent).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function (result) {
        console.log(result)
        console.log('HERE RESULT')
        if (result.isCancelled) {
          alert('Share operation was cancelled');
        } else {
          // alert('Share was successful with postId: '
          //   + result.postId);
          // alert('Share was successful');
          // let time = new Date()
          // console.log(time)
          // console.log('-------- HERE TIME -----------')

          // if (isShared == false) {
          //   alert(I18n.t('sharedSuccess'))
          //   // this.props.sharedAnswer("qid") // send to tum here
          //   this.props.setTimeShared(new Date())
          //   isShared = true
          // } else if (isShared == true) {
          //   alert(I18n.t('sharedSuccess2'))
          // }

          // if (this.props.status == true) {  // can't
          //   console.log('FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
          //   this.props.setTimeShared(new Date())  // 1.เซ็ทเวลา 2.แก้เสตตัสเป็น false
          //   this.props.sharedAnswer("qid") // send to tum here
          //   alert(I18n.t('sharedSuccess'))
          // } else if (this.props.status == false) {
          //   console.log('SUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
          //   alert(I18n.t('sharedSuccess2'))
          // }

          // if (this.state.status == true) {  // can't
          //   alert(I18n.t('sharedSuccess'))
          //   console.log('FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
          //   // this.props.sharedAnswer("qid") // send to tum here
          //   this.props.setTimeShared(new Date())  // 1.เซ็ทเวลา 2.แก้เสตตัสเป็น false
          // } else if (this.state.status == false) {
          //   console.log('SUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
          //   alert(I18n.t('sharedSuccess2'))
          // }

          if (check == true) {  // can & basic method
            check = false
            // alert(I18n.t('sharedSuccess'))
            alert(I18n.t('sharedSuccess2'))
            // this.props.sharedAnswer("qid") // send to tum here
            // this.props.setTimeShared(new Date())  // 1.เซ็ทเวลา 2.แก้เสตตัสเป็น false
          } else if (check == false) {
            alert(I18n.t('sharedSuccess2'))
          }
        }
      },
      function (error) {
        alert('Share failed with error: ' + error.message);
      }
    );
  }

  _reload = () => {
    this.props.getProfile()
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    // this.notificationOpen();
  }

  // componentWillMount(){         // ใช้ชั่วคราวเท่านั้น ต้องลบภายหลัง
  //   this.props.setStatus(true)  // ใช้ชั่วคราวเท่านั้น ต้องลบภายหลัง
  // }                             // ใช้ชั่วคราวเท่านั้น ต้องลบภายหลัง

  componentDidMount() {
    this.props.checkVersion()  // check new version end method in sagas
    this.props.getVersatile()
    this.props.getProfile()   // get profile
    this.props.getPublish()   // get new publish

    this.props.getLoginPro()  // add get Login promotion 7 days

    this.getDeviceToken()  // build push notifications end in three - four function
    // this.props.clearTmp()  ///////// MUST DELETE ////////////
  }
  //0
  async getDeviceToken() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
    // this.notificationOpen();
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

    // const channel = new firebase.notifications.Android.Channel(name, Desc, firebase.notifications.Android.Importance.High)
    //   .setDescription(ChannelName)
    //   .setSound("glass.mp3")

    // firebase.notifications().android.createChannel(channel);

    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log(title, body)
      this.showAlert(title, body);
    });
    // .setSound(channel.sound);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // console.log(notificationOpen)
      const { title, body } = notificationOpen.notification;
      // console.log(title, body)
      // this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    this.notificationOpen = await firebase.notifications().getInitialNotification();
    if (this.notificationOpen) {

      const { title, body } = notificationOpen.notification;
      console.log(title, body)
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

  _webBoard = () => {
    this.props.navigation.navigate('webboard')
    this.popupDialog.dismiss()
  }

  _ownerAmulet = () => {
    this.props.navigation.navigate('userContactOwner')
    this.popupDialog.dismiss()
  }

  _contactAdmin = () => {
    this.props.navigation.navigate('contactAdmin')
    this.popupDialog.dismiss()
  }

  _pressLink(link) {
    const url = link
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  _showPublish = (item) => {
    this.props.editRedDotPublish(item)
    this.setState({ tmp_publish: item })
    this.popupDialog2.show()
  }

  onRefresh = () => {
    this.props.getPublish()
  }

  render() {
    I18n.locale = this.props.language
    console.log(this.state.kawsod)
    console.log(this.props.data_shared)
    Reactotron.display({
      name: "VERSATILE",
      preview: "log in render",
      value: this.props.data_versatile
    })
    // console.log(this.props.tmp_publish)
    // let time = "2019-04-05 22:35:16"  // can check
    // let time2 = "2019-04-05 22:35:56"
    // console.log(time < time2)
    // let time = JSON.stringify(new Date())                        //can check
    // let time2 = "Thu Apr 11 2019 21:10:39 GMT+0700 (เวลาอินโดจีน)" //can check
    // console.log(time > time2)                                    //can check
    console.log('--------------- KAWSOD HOME PAGE --------------')

    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
        <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

        <ScrollView>
          <View style={{ marginHorizontal: 10, marginTop: 10, backgroundColor: Colors.milk, borderRadius: 10, height: height / 2.8, width: width - 20, flexDirection: 'row' }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} pagingEnabled={true}
              ref={(snapScroll) => { this.snapScroll = snapScroll; }}
              decelerationRate={0}
              snapToInterval={width - 20}
              snapToAlignment={"center"}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.props.request_publish == true}
            //     onRefresh={this.onRefresh.bind(this)}
            //   />
            // }
            >

              {this.state.kawsod && this.state.kawsod != null && this.state.kawsod.length > 0 ?
                this.state.kawsod.map((e, i) => {
                  return (
                    <TouchableOpacity style={{ flexDirection: 'row', margin: 10, flex: 1 }} onPress={() => this._showPublish(e)}>
                      {this.props.tmp_publish != undefined && this.props.tmp_publish != null && this.props.tmp_publish.find(b => b.status == false) != undefined && <View
                        style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                      <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16, width: width - (40) }}>{e.topic}</Text>
                        <Image source={{ uri: e.image_link }} style={{ height: '55%', marginTop: 10, borderRadius: 5, width: width - (40) }} />
                        <Text numberOfLines={3} style={{ fontSize: 14, color: Colors.brownTextTran, marginTop: 10, width: width - (40) }}>{e.content}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }) : <TouchableOpacity style={{ flexDirection: 'row', margin: 10, flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16, width: width - (40) }}>{I18n.t('news')}</Text>
                    <Image source={Images.logoCheckphra} style={{ height: (height / 3.8), marginTop: 10, borderRadius: 5, width: width - (40) }} />
                    {/* <Text numberOfLines={2} style={{ fontSize: 14, color: Colors.brownTextTran, marginTop: 10, width: width - (40) }}>{I18n.t('nonePublish')}</Text> */}
                  </View>
                </TouchableOpacity>}
            </ScrollView>
          </View>


          <View style={{ flexDirection: 'row' }}>
            {this.state.list_user && this.state.list_user.map((item, index) => {
              if (index == 0 || index == 1)
                return (
                  <TouchableOpacity onPress={() => {
                    if (item.id == 5) {
                      this._pressList(item)
                      this.props.sharedAnswer("qid")
                    } else {
                      this._pressList(item)
                    }
                  }} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: width / 2.5, marginTop: 10, marginLeft: 10, marginRight: index == 1 ? 10 : 0 }}>
                    <View style={{ height: 130, width: '100%', backgroundColor: Colors.milk, justifyContent: "center", alignItems: 'center', borderRadius: 8, padding: 10 }}>
                      <Icon2 name={item.logo} size={40} />
                      <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 18, paddingTop: 5, marginHorizontal: 7.5 }} >
                        {item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
            })}
          </View>

          <View style={{ flexDirection: 'row' }}>
            {this.state.list_user && this.state.list_user.map((item, index) => {
              if (index == 2 || index == 3)
                return (
                  <TouchableOpacity onPress={() => {
                    if (item.id == 5) {
                      this._pressList(item)
                      this.props.sharedAnswer("qid")
                    } else {
                      this._pressList(item)
                    }
                  }} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: width / 2.5, marginTop: 10, marginLeft: 10, marginRight: index == 3 ? 10 : 0, marginBottom: 10 }}>
                    {item.id == 3 && this.props.data_versatile && this.props.data_versatile != null && this.props.data_versatile.is_new_contact_officer == true && <View
                      style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 2.5, right: 2.5, zIndex: 1 }}></View>}
                    <View style={{ height: 130, width: '100%', backgroundColor: Colors.milk, justifyContent: "center", alignItems: 'center', borderRadius: 8, padding: 10 }}>
                      <Icon2 name={item.logo} size={40} />
                      <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 18, paddingTop: 5, marginHorizontal: 7.5 }} >
                        {item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
            })}
          </View>

          <View style={{ height: 30 }}></View>
        </ScrollView>

        <PopupDialog
          dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
            fontSize: 18, fontWeight: 'bold'
          }}>{I18n.t('editType')}</Text></View>}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.2}
          height={height / 2.4}
          // height={150}
          onDismissed={() => { this.setState({}) }}
        >

          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, height: (height / 2.4) - 50 }}>
              <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, flex: 1, marginHorizontal: 10 }} onPress={this._webBoard}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('webBoard')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, flex: 1, marginHorizontal: 10 }} onPress={this._ownerAmulet}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('contactOwnerAmulet')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginVertical: 10, flex: 1, marginHorizontal: 10 }} onPress={this._contactAdmin}>
                {this.props.data_versatile && this.props.data_versatile != null && this.props.data_versatile.is_new_contact_officer == true && <View
                  style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 1.5, right: 1.5, zIndex: 1 }}></View>}
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('contactAdmin')}</Text>
              </TouchableOpacity>

            </View>

          </ScrollView>


        </PopupDialog>

        <PopupDialog
          dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
            fontSize: 18, fontWeight: 'bold'
          }}>{I18n.t('publish')}</Text>
            <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }} onPress={() => this.popupDialog2.dismiss()}>
              <Icon2 name={'close'} color={'red'} size={24} />
            </TouchableOpacity>
          </View>}
          ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.2}
          height={height / 1.75}
          // height={150}
          onDismissed={() => { this.setState({ tmp_publish: null }) }}
        >
          <View style={{ flex: 1, margin: 10, backgroundColor: 'lightgrey', borderRadius: 10 }}>
            <ScrollView style={{ flex: 1 }}>
              {/* <View style={{ flex: 1 }}> */}
              <Text style={{ marginTop: 10, marginHorizontal: 5, fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16, }}>{this.state.tmp_publish ? this.state.tmp_publish.topic : ''}</Text>
              {this.state.tmp_publish && this.state.tmp_publish.image_link && <Image source={{ uri: this.state.tmp_publish ? this.state.tmp_publish.image_link : "" }} style={{ height: 160, marginTop: 10, borderRadius: 5, marginHorizontal: 5 }} />}
              <Text style={{ fontSize: 14, color: Colors.brownTextTran, marginTop: 10, marginHorizontal: 5 }}>{this.state.tmp_publish ? this.state.tmp_publish.content : ""}</Text>
              {this.state.tmp_publish && this.state.tmp_publish.link && <TouchableOpacity onPress={() => this._pressLink(this.state.tmp_publish.link)} style={{ marginVertical: 10, }}><Text style={{ fontWeight: 'bold', color: Colors.brownText, marginHorizontal: 5 }}>{this.state.tmp_publish ? this.state.tmp_publish.link : ""}</Text></TouchableOpacity>}
              {/* </View> */}
            </ScrollView>
          </View>

        </PopupDialog>

        {/* <Spinner
          visible={((this.props.request_profile || this.props.request_promotionlogin))}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        /> */}
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
    profile: state.question.profile,
    request_profile: state.question.request_profile,

    data_publish: state.promotion.data_publish,  // data kawsod
    request_publish: state.promotion.request,  // data request kawsod

    day: state.auth.day,  // get day in redux
    data_login: state.promotion.data_login,  // data login
    request_promotionlogin: state.promotion.request3,  // request promotion login

    modal: state.auth.modal,   // modal alert login 7 days success
    addBonusSuccess: state.promotion.addBonus,  // data add bonus

    time_shared: state.promotion.time_shared, // time shared
    status: state.promotion.status, // shared status

    data_shared: state.promotion.data_shared,  // data after shared
    data_versatile: state.versatile.data_versatile,  // store versatile data

    tmp_publish: state.versatile.tmp_publish, // data temp publish
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(QuestionActions.getProfile()),

    getPublish: () => dispatch(PromotionActions.publishRequest()),  // get Kawsod

    setTime: (day) => dispatch(AuthActions.setTime(day)),
    getLoginPro: () => dispatch(PromotionActions.getLoginPro()),
    setModal: (check) => dispatch(AuthActions.setModal(check)),
    saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
    checkVersion: () => dispatch(VersionActions.getVersion()),
    addBonus: () => dispatch(PromotionActions.addBonus()),
    getVersion: () => dispatch(VersionActions.getVersion()),

    sharedAnswer: (qid) => dispatch(PromotionActions.sharedAnswer(qid)),
    setTimeShared: (time) => dispatch(PromotionActions.setTimeShared(time)),
    setStatus: (status) => dispatch(PromotionActions.setStatus(status)),
    clearTmp: () => dispatch(WebboardActions.clearTmp()),

    getVersatile: () => dispatch(VersatileActions.getNormalData()),
    setTempPublish: (data) => dispatch(VersatileActions.setTempPublish(data)),
    addPublish: (data) => dispatch(VersatileActions.addPublish(data)),
    editRedDotPublish: (data) => dispatch(VersatileActions.editRedDotPublish(data)),
    deletePublish: (data) => dispatch(VersatileActions.deletePublish(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)