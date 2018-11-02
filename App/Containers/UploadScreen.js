import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import GridView from "react-native-super-grid";

// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'

// Styles
import styles from "./Styles/UploadScreenStyle";
import { Colors, Images } from "../Themes";

import I18n from '../I18n/i18n';
I18n.fallbacks = true;
I18n.currentLocale();
// I18n.locale = "th";

let { width } = Dimensions.get('window')

class UploadScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amuletType: null,
      item: null,
    }
  }
  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};

  //   return {
  //     tabBarLabel: "ตรวจสอบพระ"
  //   };
  // };


  static getDerivedStateFromProps(newProps, prevState) {
    let tlist = newProps.data_amulet

    console.log(newProps)
    console.log(prevState)

    if (newProps.data_amulet != null && newProps.data_amulet != prevState.amuletType) {
      let item = []
      newProps.data_amulet.map(e => {
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
      return {
        item: item,
        amuletType: newProps.data_amulet
      }
    }



    return {
      amuletType: tlist,
      // item
    }
  }

  getTypePhra = (item) => {
    if (item.name == "เบญจภาคี") {
      this.props.navigation.navigate("detail")
    }
    else {
      this.props.setAmuletType(item.id)
      this.props.navigation.navigate("send")
    }
  }

  componentDidMount() {
    this.props.getAmuletType()
  }

  render() {

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
          items={this.state.item ? this.state.item : ''}
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
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    data_amulet: state.question.amuletType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAmuletType: (type) => {
      return dispatch(QuestionActions.setAmuletType(type))
    },
    getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadScreen);
