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
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};

  //   return {
  //     tabBarLabel: "ตรวจสอบพระ"
  //   };
  // };

  getTypePhra = (item) => {

    console.log(item)
    if (item.name == I18n.t('benjapakee')) {
      this.props.navigation.navigate("detail")
    }
    else {
      this.props.setAmuletType(item.id)
      this.props.navigation.navigate("send")
    }
  }

  render() {
    const items = [
      {
        "id": 1,
        "name": I18n.t('benjapakee'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 9,
        "name": I18n.t('luangPuTuad'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 10,
        "name": I18n.t('luangPuMoon'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 11,
        "name": I18n.t('phraKru'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 12,
        "name": I18n.t('pumpCoin'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 13,
        "name": I18n.t('castingCoin'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 14,
        "name": I18n.t('phraPhong'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 15,
        "name": I18n.t('phraKring'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 16,
        "name": I18n.t('phraPidta'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 17,
        "name": I18n.t('amulet'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 18,
        "name": I18n.t('phraBucha'),
        "parent_id": null,
        "image": null
      },
      {
        "id": 19,
        "name": I18n.t('otherOrUnknown'),
        "parent_id": null,
        "image": null
      }
    ];
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
          items={items}
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
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAmuletType: (type) => {
      console.log(type)
      return dispatch(QuestionActions.setAmuletType(type))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadScreen);
