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
// I18n.currentLocale();
// I18n.locale = "th";
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let check_publish = true
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
      // spinnner: false,
    }
  }
  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};

  //   return {
  //     tabBarLabel: "ตรวจสอบพระ"
  //   };
  // };

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

    I18n.locale = nextProps.language


    // console.log('-------------')
    console.log(nextProps)
    console.log(prevState)

    // if (nextProps.data_publish && check_publish == true) {
    //   check_publish = false
    //   Alert.alert(
    //     I18n.t('publish'),
    //     nextProps.data_publish[0].topic + "\n"+ <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + nextProps.data_publish[0].image }}/>
    //      + nextProps.data_publish[0].content,
    //     [
    //       { text: I18n.t('ok') }
    //     ],
    //     { cancelable: false }
    //   )
    // }

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
    }
  }

  componentWillMount() {
    check_publish = true
  }

  componentWillUnmount() {
    check_publish = true
  }

  getTypePhra = (item) => {
    if (item.name == "เบญจภาคี" || item.name == "Benja pakee") {
      this.props.navigation.navigate("detail")
    }
    else {
      this.props.setAmuletType(item.id)
      this.props.navigation.navigate("send")
    }
  }

  componentDidMount() {
    check_publish = true
    this.props.getAmuletType()

    // this.props.setLanguage(I18n.locale)
    this.props.clearDataQuestion()
    this.props.getPublish()

    if (this.props.profile) {
      if (this.props.profile.count == 7 || (this.props.profile.count % 7) == 0) {
        Alert.alert(
          'Check Phra',
          I18n.t('loginSuccess'),
          [
            { text: I18n.t('ok') }
          ],
        )
      }
    }
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
        {/* <View style={{ height: 60, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 23,
              fontFamily: "Prompt-Regular",
              alignSelf: "center",
              color: Colors.brownText
            }}
          >
            {I18n.t('selectAmuletType')}
          </Text>
        </View> */}
        <GridView
          itemDimension={100}
          items={this.state.item ? this.state.item : []}
          renderItem={item => {
            return (
              <TouchableOpacity onPress={() => this.getTypePhra(item)}>
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
          onRequestClose={() => this.setState({ modalVisible: false })} >
          <View style={{ backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 5, borderColor: '#B7950B', top: height / 5, marginHorizontal: 15, height: height / 1.8 }}>

            <ScrollView style={{ flex: 1 }}>
              <Icon
                name="close"
                size={25}
                color={Colors.brownText}
                style={{ marginTop: 10, marginLeft: 20, color: 'red', alignSelf: 'flex-end' }}
                onPress={() => { this.setState({ modalVisible: false }) }}
              />

              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>{this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].topic ? this.props.data_publish[0].topic : '-'}</Text>

              {this.state.kawsod && this.state.kawsod.length > 0 && this.state.kawsod[0] && this.state.kawsod[0].image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.state.kawsod[0].image }}
                style={{ width: height / 3, height: height / 3, marginTop: 10, marginHorizontal: 5, alignSelf: 'center', borderRadius: 10 }} />}
              <Text style={{ fontSize: 17, marginVertical: 15, alignSelf: 'center', marginHorizontal: 10, }}>{this.state.kawsod && this.state.kawsod[0] && this.state.kawsod.length > 0 && this.state.kawsod[0].content}</Text>
            </ScrollView>
          </View>
        </Modal>}




        {/* <PopupDialog
          // dialogTitle={<DialogTitle title={I18n.t('publish')} titleTextStyle={{ fontSize: 20, fontWeight: 'bold', color: Colors.brownText }} />}
          dialogTitle={<View style={{ backgroundColor: '#F5B041', marginTop: 15, marginBottom: 15, justifyContent: 'center', borderRadius: 10, borderBottomColor: Colors.tabBar, borderBottomWidth: 2, }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.brownText, alignSelf: 'center' }}>{I18n.t('publish')}</Text></View>}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={0.9}
          height={height / 1.5}
          // height={150}
          dialogStyle={{ backgroundColor: '#F5B041' }}
          containerStyle={{ backgroundColor: Colors.tabBar }}
          backgroundColor={Colors.tabBar}
          onDismissed={() => { this.setState({}) }}
        >
          {this.state.kawsod == 'none' ? <View style={{ flex: 1 }}><Text style={{
            alignSelf: 'center',
            marginTop: 20, fontSize: 20, color: Colors.brownTextTran
          }}>Don't have publish</Text>
          </View> : <View style={{ flex: 1 }}>
              <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>{this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].topic ? this.props.data_publish[0].topic : '-'}</Text>

              {this.props.data_publish && this.props.data_publish[0].image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.props.data_publish[0].image }}
                style={{ width: height / 3, height: height / 3, marginTop: 10, marginHorizontal: 5, alignSelf: 'center', borderRadius: 10 }} />}

              <Text style={{ fontSize: 17, marginTop: 15, alignSelf: 'center' }}>{this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].content}</Text>
            </View>}
        </PopupDialog> */}

        <Spinner
          visible={this.props.request_publish || this.props.request_amulet}
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

  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAmuletType: (type) => {
      return dispatch(QuestionActions.setAmuletType(type))
    },
    getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
    // setLanguage: (language) => dispatch(AuthActions.setLanguage(language)),
    clearDataQuestion: () => dispatch(QuestionActions.clearDataQuestion()),
    getPublish: () => dispatch(PromotionActions.publishRequest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadScreen);
