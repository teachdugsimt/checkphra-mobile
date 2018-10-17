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
    if (item.name == "เบญจภาคี") {
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
        "name": "เบญจภาคี",
        "parent_id": null,
        "image": null
      },
      {
        "id": 9,
        "name": "หลวงปู่ทวด",
        "parent_id": null,
        "image": null
      },
      {
        "id": 10,
        "name": "หลวงปู่หมุน",
        "parent_id": null,
        "image": null
      },
      {
        "id": 11,
        "name": "พระกรุ",
        "parent_id": null,
        "image": null
      },
      {
        "id": 12,
        "name": "เหรียญปั้ม",
        "parent_id": null,
        "image": null
      },
      {
        "id": 13,
        "name": "เหรียญหล่อ",
        "parent_id": null,
        "image": null
      },
      {
        "id": 14,
        "name": "พระผง",
        "parent_id": null,
        "image": null
      },
      {
        "id": 15,
        "name": "พระกริ่ง",
        "parent_id": null,
        "image": null
      },
      {
        "id": 16,
        "name": "พระปิดตา",
        "parent_id": null,
        "image": null
      },
      {
        "id": 17,
        "name": "เครื่องราง",
        "parent_id": null,
        "image": null
      },
      {
        "id": 18,
        "name": "พระบูชา",
        "parent_id": null,
        "image": null
      },
      {
        "id": 19,
        "name": "อื่นๆ หรือ ไม่ทราบ",
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
        <View style={{ height: 60, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 23,
              fontFamily: "Prompt-Regular",
              alignSelf: "center",
              color: Colors.brownText
            }}
          >
            กรุณาเลือกประเภทพระ
          </Text>
        </View>
        <GridView
          itemDimension={100}
          items={items}
          renderItem={item => {
            return (
              <TouchableOpacity onPress={() => this.getTypePhra(item)}>
                <View
                  style={{
                    height: 90,
                    width: '100%',
                    backgroundColor: Colors.button,
                    justifyContent: "center",
                    marginVertical: 5,
                    borderRadius: 15,
                    padding: 10
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Prompt-Regular",
                      fontSize: 16,
                      alignSelf: "center"
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
  return {};
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
