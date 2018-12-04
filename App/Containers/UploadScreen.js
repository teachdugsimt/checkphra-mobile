import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Dimensions, Alert, Modal, ScrollView } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import GridView from "react-native-super-grid";
import AuthActions from '../Redux/AuthRedux'
import QuestionActions from '../Redux/QuestionRedux'
import PromotionActions from '../Redux/PromotionRedux'
// Styles
import Icon from "react-native-vector-icons/FontAwesome";
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import styles from "./Styles/UploadScreenStyle";
import { Colors, Images } from "../Themes";
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
import moment from 'moment'
// I18n.currentLocale();
// I18n.locale = "th";
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let check_publish = true
let check_login = true
let checkButton = false

class UploadScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)
    return {
      title: I18n.t('selectAmuletType'),
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      amuletType: null,
      item: null,
      language: '',
      kawsod: null,
      modalVisible: true,
      coin: null,
      // spinnner: false,
      disButton: false,
    }
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
      else if (e.name == 'อื่นๆ หรือ ไม่ทราบ' && e.id == 19) {
        name = I18n.t('otherOrUnknown')
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

  static getDerivedStateFromProps(nextProps, prevState) {
    let tlist = nextProps.data_amulet

    let date_tmp = new Date()
    let f1 = moment(date_tmp).format()
    let time11 = f1.slice(0, 10)
    I18n.locale = nextProps.language

    // console.log('-------------')
    console.log(nextProps)
    console.log(prevState)


    if (nextProps.day != time11) {
      nextProps.setTime(time11)
      return {
        modalVisible: true,
      }
    }


    //***************************** check PUBLISH of the day ************************************/
    // if (nextProps.day == time11) {
    //   return {
    //     modalVisible: false
    //   }
    // } else if (nextProps.day != time11) {
    //   nextProps.setTime(time11)
    //   return {
    //     modalVisible: true,
    //   }
    // }
    //***************************** check PUBLISH of the day ************************************/


    //************************ check alert login complete 7 days ******************************/
    if (nextProps.data_login != null) {
      if (nextProps.data_login.end_date == time11) {   // ถ้าวันที่ 7 คือ วันนี้ ให้เช็คการแสดงการแจ้งเตือนว่าถ้าเป็นจริง ให้แจ้งเตือนนะ
        if (nextProps.modal != undefined && nextProps.modal == true) {
          nextProps.setModal(false)  // แล้วก้เซทเป็น เท็จเลยเพราะในวันที่ 7 เราต้องการให้มันแจ้งเตือนแค่ครั้งเดียวก็พอ
          Alert.alert(
            'Check Phra',
            I18n.t('loginSuccess1') + nextProps.data_login.period_of_time + " " + I18n.t('day') + I18n.t('loginSuccess2') + nextProps.data_login.point + " " + I18n.t('coin'),
            [
              { text: I18n.t('ok'), onPress: () => { nextProps.setModal(false) } }
            ],
            { cancelable: false }
          )
        } else if (nextProps.modal == undefined) { // กรณีที่ modal ใน redux เป็น undeifined ให้เซทเปน true ก่อน
          nextProps.setModal(true)
        }
      } else {  // ถ้าไม่ใช่วันนี้ เซทการแจ้งเตือนเป็นจริงไว้ก่อนรอถึงวันที่ 7
        nextProps.setModal(true)
      }
    }
    //************************ check alert login complete 7 days ******************************/

    let item = prevState.item
    if (nextProps.language != prevState.language && prevState.amuletType) {
      nextProps.navigation.setParams({ title: I18n.t('selectAmuletType') })
      amuletTypes = prevState.amuletType.filter(e => !e.parent_id)
      item = UploadScreen.rename(amuletTypes)
    }

    if (nextProps.data_amulet != null && nextProps.data_amulet != prevState.amuletType) {
      amuletTypes = nextProps.data_amulet.filter(e => !e.parent_id)
      item = UploadScreen.rename(amuletTypes)
    }

    return {
      item: item,
      amuletType: nextProps.data_amulet,
      language: nextProps.language,
      kawsod: nextProps.data_publish,
      coin: nextProps.profile ? nextProps.profile.point : null
    }
  }

  // componentWillMount() {
  // check_publish = true
  // check_login = true
  // }

  componentWillUnmount() {
    // check_publish = true
    // check_login = true
  }

  getTypePhra = (item) => {
    checkButton = true

    if (item.name == "เบญจภาคี" || item.name == "Benja pakee") {
      this.props.navigation.navigate("detail")
      checkButton = false
    }
    else {
      this.props.setAmuletType(item.id)
      this.props.navigation.navigate("send")
      checkButton = false
    }

  }

  componentDidMount() {
    check_publish = true
    // check_login = true
    this.props.getAmuletType()
    this.props.getProfile()
    // this.props.setLanguage(I18n.locale)
    this.props.clearDataQuestion()
    this.props.getPublish()
    this.props.getLoginPro()
    // this.props.setModal(true)
    // if (this.props.profile) {
    //   if (this.props.profile.count == 7 || (this.props.profile.count % 7) == 0) {
    //     Alert.alert(
    //       'Check Phra',
    //       I18n.t('loginSuccess'),
    //       [
    //         { text: I18n.t('ok') }
    //       ],
    //     )
    //   }
    // }
  }

  commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
  }

  render() {
    // I18n.locale = this.props.language
    // if (this.state.kawsod && check_publish == true && this.popupDialog != undefined) {
    //   check_publish = false
    //   this.popupDialog.show()
    // }

    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{ height: 35, justifyContent: "center", flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Prompt-Regular",
              color: Colors.brownText
            }}
          >
            {I18n.t('haveCoin') + " "}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Prompt-Regular",
              color: Colors.brownText,
              fontWeight: 'bold'
            }}
          >
            {this.state.coin ? this.commaSeparateNumber(this.state.coin) : 'Loading...'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Prompt-Regular",
              color: Colors.brownText
            }}
          >
            {" " + I18n.t('coin')}
          </Text>
        </View>

        <GridView
          itemDimension={100}
          items={this.state.item ? this.state.item : []}
          renderItem={item => {
            return (
              <TouchableOpacity onPress={() => this.getTypePhra(item)} disabled={checkButton}>
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    backgroundColor: Colors.milk,
                    justifyContent: "center",
                    borderRadius: 8,
                    padding: 10
                  }}
                >
                  <Text
                    style={{
                      color: Colors.brownText,
                      fontFamily: "Prompt-Regular",
                      fontSize: 16,
                      alignSelf: "center",
                      textAlign: 'center'
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />


        {this.state.kawsod != null && this.state.kawsod && this.state.kawsod.length > 0 && <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onDismiss={() => { this.setState({ modalVisible: false }) }}
        >
          <View style={{ backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 5, borderColor: '#B7950B', top: height / 5, marginHorizontal: 15, height: height / 1.8 }}>

            <ScrollView style={{ flex: 1, width: '100%' }}>
              <Icon
                name="close"
                size={25}
                color={Colors.brownText}
                style={{ marginTop: 10, marginRight: 15, color: 'red', alignSelf: 'flex-end' }}
                onPress={() => { this.setState({ modalVisible: false }) }} />

              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>{this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].topic ? this.props.data_publish[0].topic : '-'}</Text>

              {this.state.kawsod && this.state.kawsod.length > 0 && this.state.kawsod[0] && this.state.kawsod[0].image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.state.kawsod[0].image }}
                style={{ width: height / 3, height: height / 3, marginTop: 10, marginHorizontal: 5, alignSelf: 'center', borderRadius: 10 }} />}
              <Text style={{ fontSize: 17, marginVertical: 15, alignSelf: 'center', marginHorizontal: 10, }}>{this.state.kawsod && this.state.kawsod[0] && this.state.kawsod.length > 0 && this.state.kawsod[0].content}</Text>
            </ScrollView>
          </View>
        </Modal>}

        <Spinner
          visible={(this.props.request_publish || this.props.request_amulet || this.props.request_promotionlogin)}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
      </LinearGradient >
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    data_amulet: state.question.amuletType,
    language: state.auth.language,
    profile: state.question.profile,
    data_publish: state.promotion.data_publish,
    request_publish: state.promotion.request,
    request_amulet: state.question.request_type,
    day: state.auth.day,
    data_login: state.promotion.data_login,
    request_promotionlogin: state.promotion.request3,
    modal: state.auth.modal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAmuletType: (type) => {
      return dispatch(QuestionActions.setAmuletType(type))
    },
    getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
    getProfile: () => dispatch(QuestionActions.getProfile()),
    // setLanguage: (language) => dispatch(AuthActions.setLanguage(language)),
    clearDataQuestion: () => dispatch(QuestionActions.clearDataQuestion()),
    getPublish: () => dispatch(PromotionActions.publishRequest()),
    setTime: (day) => dispatch(AuthActions.setTime(day)),
    getLoginPro: () => dispatch(PromotionActions.getLoginPro()),
    setModal: (check) => dispatch(AuthActions.setModal(check)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadScreen);
