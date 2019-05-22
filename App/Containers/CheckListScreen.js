import React, { Component } from 'react'
import {
  Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl,
  Alert, AsyncStorage, ScrollView
} from 'react-native'
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
import TradingActions from '../Redux/TradingRedux'
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
// Styles
import VersatileActions from '../Redux/VersatileRedux'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './Styles/CheckListScreenStyle'
import firebase from 'react-native-firebase';
import GridView from "react-native-super-grid";
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();

let check = true
let count = 1
let { width, height } = Dimensions.get('window')

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
class CheckListScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      fetch: null,
      data_tmp: null,
      amuletType: null,
      item: null,
      tmp_qid: null,
      language: '',

      color1: 'green',
      color2: 'lightgrey',
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
    count = 1
    moment.locale('th')
    this.props.getHistory(1)
    this.props.getAmuletType()
    // this.props.getProfile()
    // this.getDeviceToken()
  }


  // async getDeviceToken() {
  //   this.checkPermission();
  //   this.createNotificationListeners(); //add this line
  // }

  // //1
  // async checkPermission() {
  //   console.log("check permission")
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }

  // //3
  // async getToken() {
  //   console.log("get token")
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       console.log(fcmToken)
  //       // user has a device token
  //       this.props.saveDeviceToken(fcmToken)
  //       await AsyncStorage.setItem('fcmToken', fcmToken);

  //     }
  //   } else {
  //     console.log(fcmToken)
  //     this.props.saveDeviceToken(fcmToken)
  //   }
  // }

  // //2
  // async requestPermission() {
  //   console.log("request permission")
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log('permission rejected');
  //   }
  // }

  // async createNotificationListeners() {
  //   /*
  //   * Triggered when a particular notification has been received in foreground
  //   * */
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     const { title, body } = notification;
  //     this.showAlert(title, body);
  //   });

  //   /*
  //   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //   * */
  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     const { title, body } = notificationOpen.notification;
  //     this.showAlert(title, body);
  //   });

  //   /*
  //   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //   * */
  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     this.showAlert(title, body);
  //   }
  //   /*
  //   * Triggered for data only payload in foreground
  //   * */
  //   this.messageListener = firebase.messaging().onMessage((message) => {
  //     //process data message
  //     console.log(JSON.stringify(message));
  //   });
  // }

  // showAlert(title, body) {
  //   Alert.alert(
  //     title, body,
  //     [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ],
  //     { cancelable: false },
  //   );
  // }

  // componentWillMount() {
  //   count = 1
  // }

  componentWillUnmount() {
    this.props.getNormalData()
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

  static rename = (amuletTypes) => {
    let item = []

    if (!amuletTypes) { return item }

    amuletTypes.map(e => {
      let name = ''
      if (e.name == 'เบญจภาคี' && e.id == 1) {
        name = I18n.t('benjapakee')
      }
      else if (e.name == 'พระสมเด็จ' && e.id == 2) {
        name = I18n.t('phraSomdej')
      }
      else if (e.name == 'นางพญา' && e.id == 3) {
        name = I18n.t('phraNangPaya')
      }
      else if (e.name == 'พระคง' && e.id == 4) {
        name = I18n.t('phraKhong')
      }
      else if (e.name == 'พระรอด' && e.id == 5) {
        name = I18n.t('phraRod')
      }
      else if (e.name == 'พระผงสุพรรณ' && e.id == 6) {
        name = I18n.t('phraPhongSuphan')
      }
      else if (e.name == 'พระซุ้มกอ' && e.id == 7) {
        name = I18n.t('phraSoomkor')
      }
      else if (e.name == 'พระกำแพงเม็ดขนุน' && e.id == 8) {
        name = I18n.t('phraKampaengMedKanun')
      }
      else if (e.name == 'หลวงปู่ทวด' && e.id == 9) {
        name = I18n.t('luangPuTuad')
      }
      else if (e.name == 'หลวงปู่หมุน' && e.id == 10) {
        name = I18n.t('luangPuMoon')
      }
      else if (e.name == 'พระกรุ' && e.id == 11) {
        name = I18n.t('phraKru')
      }
      else if (e.name == 'เหรียญปั้ม' && e.id == 12) {
        name = I18n.t('pumpCoin')
      }
      else if (e.name == 'เหรียญหล่อ' && e.id == 13) {
        name = I18n.t('castingCoin')
      }
      else if (e.name == 'พระผง' && e.id == 14) {
        name = I18n.t('phraPhong')
      }
      else if (e.name == 'พระกริ่ง' && e.id == 15) {
        name = I18n.t('phraKring')
      }
      else if (e.name == 'พระปิดตา' && e.id == 16) {
        name = I18n.t('phraPidta')
      }
      else if (e.name == 'เครื่องราง' && e.id == 17) {
        name = I18n.t('amulet')
      }
      else if (e.name == 'พระบูชา' && e.id == 18) {
        name = I18n.t('phraBucha')
      }
      else if (e.name == 'พระวัดประสาทบุญญาวาส') {
        name = I18n.t('phraWadPhrasatBunyawat')
      }
      else if (e.name == 'พระวัดระฆัง') {
        name = I18n.t('phraWadRakung')
      }
      else if (e.name == '100 ปี พ.ศ.2515') {
        name = I18n.t('year100era2515')
      }
      else if (e.name == '108 ปี พ.ศ.2523') {
        name = I18n.t('year108era2523')
      }
      else if (e.name == '118 ปี พ.ศ.2533') {
        name = I18n.t('year118era2533')
      }
      else if (e.name == '122 ปี พ.ศ.2537') {
        name = I18n.t('year122era2537')
      }
      else if (e.name == 'เสาร์ 5 พ.ศ.2536') {
        name = I18n.t('sat5era2536')
      }
      else if (e.name == 'เสาร์ 5 พ.ศ.2539') {
        name = I18n.t('sat5era2539')
      }
      else if (e.name == '214 ปีชาตกาล พ.ศ.2545') {
        name = I18n.t('year214era2545')
      }
      else if (e.name == 'หลวงพ่อหลิว') {
        name = I18n.t('LuangPhorLhew')
      }
      else if (e.name == 'หลวงพ่อกวย') {
        name = I18n.t('LuangPhorKauy')
      }
      else if (e.name == 'บางขุนพรหม') {
        name = I18n.t('BangKhunProm')
      }
      else if (e.name == 'บางขุนพรหม ปี พ.ศ.2509') {
        name = I18n.t('BangKhunProm2509')
      }
      else if (e.name == 'บางขุนพรหม ปี พ.ศ.2517') {
        name = I18n.t('BangKhunProm2517')
      }
      else if (e.name == "หลวงปู่หมุน, หลวงปู่โต๊ะ, เจ้าคุณนร") {
        name = e.name
      }
      else if (e.name == "ภาคตะวันตก สมุทรสงคราม, กาญจนบุรี, ราชบุรี, เพชรบุรี") {
        name = e.name
      }
      else if (e.name == 'อื่นๆ หรือ ไม่ทราบ' || e.name == "ไม่ระบุประเภท") {
        name = I18n.t('otherOrUnknown')
      } else {
        name = e.name
      }
      item.push({
        "id": e.id,
        "name": name,
        "parent_id": null,
        "image": null
      })
    })

    return item
  }
  static getDerivedStateFromProps(newProps, prevState) {
    let plist = newProps.history
    console.log(newProps)
    console.log(prevState)


    if (newProps.data_answer != null) {
      if (newProps.request1 == false || newProps.request1 == true) {
        let tmp = newProps.history.find(e => e.id == newProps.data_answer.q_id)
        if (tmp && tmp != undefined && newProps.data_answer.q_id == tmp.id) {
          newProps.getHistory(1)
          plist = newProps.history
        }
      }
    }



    let item = prevState.item
    if (newProps.data_amulet != null) {
      // amuletTypes = newProps.data_amulet.filter(e => !e.parent_id)
      amuletTypes = newProps.data_amulet
      item = CheckListScreen.rename(amuletTypes)
    } else {
      // if (newProps.data_amulet) {
      //   amuletTypes = newProps.data_amulet.filter(e => !e.parent_id)
      //   item = CheckListScreen.rename(amuletTypes)
      // }
    }

    if (newProps.language != prevState.language && prevState.amuletType) {
      newProps.getHistory(1)
      // amuletTypes = prevState.amuletType.filter(e => !e.parent_id)
      amuletTypes = prevState.amuletType
      item = CheckListScreen.rename(amuletTypes)
    } else {
      // if (newProps.data_amulet) {
      //   amuletTypes = newProps.data_amulet.filter(e => !e.parent_id)
      //   item = CheckListScreen.rename(amuletTypes)
      // }
    }

    if (newProps.data_edit && newProps.data_edit != null && newProps.data_edit != undefined) {
      newProps.getHistory(1)
      newProps.clearEditData()
    }

    return {
      // fetch: checkRequest,
      item: item,
      amuletType: newProps.data_amulet,
      data_tmp: plist,
      language: newProps.language,
    }
  }

  _onScrollEndList = () => {
    // console.log('END OF LIST AGAIN')
    // console.log(this.props.request2)  // request2 is change => true / false
    // console.log(count)

    if (this.props.history && this.props.history.length >= 10 && this.props.request2 == false) {
      count++
      console.log('LOAD')
      // console.log(this.props.checkHistory)
      // console.log('COUNT BEFORE REQUEST')
      // console.log(count)
      this.props.getHistory(count)
    }
  }

  _pressEdit = (item) => {
    if (this.props.profile && this.props.profile.role == 'admin') {
      this.popupDialog.show()
      this.setState({ tmp_qid: item })
    } else {

    }
  }

  _pressEdit2 = (id) => {
    this.props.editGroup(id, this.state.tmp_qid)
    this.popupDialog.dismiss()
  }

  _pressG1 = () => {
    if (this.state.color1 != 'green') {
      this.setState({ color1: 'green', color2: 'lightgrey' })
      count = 1
      this.props.getHistory(1)
    }
  }
  _pressG2 = () => {
    if (this.state.color2 != 'green') {
      this.setState({ color1: 'lightgrey', color2: 'green' })
      count = 1
      this.props.getListCerFromUser(1)
    }
  }

  _reload2 = () => {
    count = 1
    this.props.getListCerFromUser(count)
  }

  _goToLicense = (item, index) => {
    this.props.setDataCer(item)
    this.props.navigation.navigate('certificate')
  }

  _renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, height: 80 }} onPress={() => this._goToLicense(item, index)}>
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + item.image }} style={{ height: 60, width: 60, marginLeft: 10, borderRadius: 12 }} />
          <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: Colors.brownText }}>{item.amuletName}<Text>{" ( " + item.qid + " )"}</Text></Text>
            <Text style={{ fontWeight: 'bold', color: Colors.brownText }}>{item.temple}</Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', paddingRight: 10 }}>

          {item.status == 1 && <Icon2 name={'chevron-right'} size={25} color={'black'} />}
          {item.status == 5 && <Icon2 name={'check-circle-o'} size={30} color={'green'} />}
        </View>
      </TouchableOpacity>
    )
  }

  _onScrollEndList2 = () => {
    if (this.props.data_getListCer && this.props.data_getListCer.length >= 10 && this.props.request10 == false) {
      count++
      this.props.getListCerFromUser(count)
    }
  }

  render() {
    I18n.locale = this.props.language

    console.log(this.props.data_getListCer)
    console.log('---------------------- LIST USER CERTIFICATE --------------------------')
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

        {/* <View style={{ flexDirection: 'row', width: '100%', borderBottomColor: 'orange', borderBottomWidth: 1 }}>
          <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 7, borderTopColor: this.state.color1, height: 40, flex: 1, borderRightColor: 'orange', borderRightWidth: 1 }}
            onPress={this._pressG1}>
            <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 17, color: Colors.brownText, alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('pendingList')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 7, borderTopColor: this.state.color2, height: 40, flex: 1 }}
            onPress={this._pressG2}>
            <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 17, color: Colors.brownText, alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('certificateList')}</Text>
          </TouchableOpacity>
        </View> */}

        <PopupDialog
          dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
            fontSize: 18, fontWeight: 'bold'
          }}>{I18n.t('editType') + " ( " + this.state.tmp_qid + " )"}</Text></View>}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.05}
          height={height / 2}
          // height={150}
          onDismissed={() => { this.setState({ tmp_qid: null }) }}
        >
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ height: 10 }}>
              </View>

              <GridView
                itemDimension={150}
                items={this.state.item ? this.state.item : []}
                renderItem={item => {
                  return (
                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 5, height: 70 }} onPress={() => this._pressEdit2(item.id)}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={{ height: 15 }}>
              </View>
            </ScrollView>
          </View>
        </PopupDialog>

        {this.state.color2 == 'green' && <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.props.request10 == true}
              onRefresh={this._reload2.bind(this)}
            />
          }
          data={this.props.data_getListCer}
          renderItem={this._renderItem2}
          onEndReached={this._onScrollEndList2}
          rightChevron={true}
          // onEndReachedThreshold={0.025}
          onEndReachedThreshold={1.2}
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
        />}

        {this.state.color1 == 'green' && <FlatList
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
            else if (item.type == '108 ปี พ.ศ.2523') {
              name = I18n.t('year108era2523')
            }
            else if (item.type == '118 ปี พ.ศ.2533') {
              name = I18n.t('year118era2533')
            }
            else if (item.type == '122 ปี พ.ศ.2537') {
              name = I18n.t('year122era2537')
            }
            else if (item.type == 'เสาร์ 5 พ.ศ.2536') {
              name = I18n.t('sat5era2536')
            }
            else if (item.type == 'เสาร์ 5 พ.ศ.2539') {
              name = I18n.t('sat5era2539')
            }
            else if (item.type == '214 ปีชาตกาล พ.ศ.2545') {
              name = I18n.t('year214era2545')
            }
            else if (item.type == 'บางขุนพรหม ปี พ.ศ.2509') {
              name = I18n.t('BangKhunProm2509')
            }
            else if (item.type == 'บางขุนพรหม ปี พ.ศ.2517') {
              name = I18n.t('BangKhunProm2517')
            }
            else if (item.type == 'หลวงพ่อหลิว') {
              name = I18n.t('LuangPhorLhew')
            } else if (item.type == "หลวงปู่หมุน, หลวงปู่โต๊ะ, เจ้าคุณนร") {
              name = I18n.t("newGroup1")
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
                      <TouchableOpacity style={{ backgroundColor: 'orange', borderRadius: 15 }} onPress={() => this._pressEdit(item.id)}>
                        <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 17,
                          color: Colors.brownText,
                          marginVertical: 2.5,
                          marginHorizontal: 10,
                          // margin: 20
                        }}>{name}</Text>
                      </TouchableOpacity>
                      <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 17,
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
          // onEndReachedThreshold={1}  // 0.025 low but good
          onEndReachedThreshold={1.2}
        />}
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
    data_amulet: state.question.amuletType,
    // access_id: state.auth.user_id,
    request1: state.expert.fetch,   // send answer
    data_answer: state.expert.data_answer,
    language: state.auth.language,
    profile: state.question.profile,

    request_edit: state.expert.fetch8,  // request edit type of  question
    data_edit: state.expert.data_group,

    request10: state.trading.request10,  // get List certificate from user ( Admin Only !!)
    data_getListCer: state.trading.data_getListCer,  // store list certificate from user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
    getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
    deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
    setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
    getProfile: () => dispatch(QuestionActions.getProfile()),
    saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
    getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
    editGroup: (type_id, qid) => dispatch(ExpertActions.editGroup(type_id, qid)),
    clearEditData: () => dispatch(ExpertActions.clearEditData()),

    setDataCer: (data) => dispatch(TradingActions.setDataCer(data)),
    getListCerFromUser: (page) => dispatch(TradingActions.getListCerFromUser(page)),
    getNormalData: () => dispatch(VersatileActions.getNormalData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListScreen)
