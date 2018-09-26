import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import GridView from "react-native-super-grid";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/UploadScreenStyle";
import { Colors } from "../Themes";

class UploadScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      tabBarLabel: "ตรวจสอบพระ"
    };
  };

  // getTypePhra = (name) => {
  //   this.props.navigation.navigate("detail")
  // }

  render() {
    const items = [
      { name: "เบญจภาคี" },
      { name: "หลวงปู่ทวด" },
      { name: "หลวงปู่หมุน" },
      { name: "พระกรุ" },
      { name: "เหรียญปั้ม" },
      { name: "เหรียญหล่อ" },
      { name: "พระผง" },
      { name: "พระกริ่ง" },
      { name: "พระปิดตา" },
      { name: "เครื่องราง" },
      { name: "พระบูชา" },
      { name: "อื่นๆ หรือ ไม่ทราบ" }
    ];
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
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
          renderItem={items => {
            return (
              <TouchableOpacity onPress ={()=>this.props.navigation.navigate("detail")}>
              <View
                style={{
                  height: 90,
                  width: 120,
                  backgroundColor: Colors.button,
                  justifyContent: "center",
                  marginVertical: 5,
                  borderRadius: 15
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadScreen);
