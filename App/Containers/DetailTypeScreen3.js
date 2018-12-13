import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import GridView from "react-native-super-grid";
import { Colors, Images } from "../Themes";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'

// Styles
import styles from "./Styles/DetailTypeScreenStyle";

import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";

let { width } = Dimensions.get('window')

class DetailTypeScreen3 extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};

  //   return {
  //     headerLeft: (
  //       <TouchableOpacity onPress={() => navigation.goBack()}>
  //         <Text
  //           style={{
  //             marginLeft: 20,
  //             fontSize: 18,
  //             fontFamily: "Prompt-SemiBold",
  //             color: Colors.brownText
  //           }}
  //         >
  //           {"< กลับ"}
  //         </Text>
  //       </TouchableOpacity>
  //     )
  //   };
  // };

static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('selectAmuletType'),
    }
  }

  getTypePhra = (item) => {
    // console.log(item)
    this.props.setType(item.id)
    this.props.navigation.navigate("send")
  }

  render() {
    I18n.locale = this.props.language
    const items = [
      {
        "id": 34,
        "name": I18n.t('BangKhunProm2509'),
        "parent_id": 33,
        "image": null
      },
      {
        "id": 35,
        "name": I18n.t('BangKhunProm2517'),
        "parent_id": 33,
        "image": null
      },
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
          itemDimension={150}
          items={items}
          renderItem={items => {
            return (
              <TouchableOpacity onPress={() => this.getTypePhra(items)}>
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
                    {items.name}
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
    language: state.auth.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setType: (type) => {
      return dispatch(QuestionActions.setAmuletType(type))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTypeScreen3);
