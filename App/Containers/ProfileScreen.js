import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/ProfileScreenStyle";
import { Colors } from "../Themes";

class ProfileScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <View
          style={{
            height: 50,
            marginTop: 20,
            marginLeft: 20,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Prompt-Regular",
              color: Colors.brownText
            }}
          >
            ข้อมูลส่วนตัว
          </Text>
        </View>
        <View style={{ height: 40}}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Prompt-Regular",
                  color: Colors.brownText,
                  marginLeft: 20
                }}
              >
                ชื่อ :
              </Text>
            </View>
            <View style={{ width: 250}}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 18,
                  color: Colors.brownText
                }}
              >
                slothZa5555@gmail.com
              </Text>
            </View>

            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Prompt-Regular",
                  color: Colors.brownText,
                  marginLeft: 20
                }}
              >
                อีเมล :
              </Text>
            </View>
            <View style={{ width: 250}}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 18,
                  color: Colors.brownText
                }}
              >
                slothZa5555@gmail.com
              </Text>
            </View>
          </View>

        </View>
        <View style={{ height: 80}}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Prompt-Regular",
              color: Colors.brownText,
              marginLeft: 20
            }}
          >
            แต้มสะสม
          </Text>
          <Text style = {{fontFamily:"Prompt-Regular",fontSize:25,color:Colors.brownText,alignSelf:'center'}}>500</Text>
        </View>
        <TouchableOpacity onPress ={()=> this.props.navigation.navigate("change")}>
        <Text
            style={{
              color: "#FF0000",
              fontFamily: "Prompt-Regular",
              fontSize: 16,
              marginLeft: 20,
              marginVertical: 20,
              textDecorationLine: "underline"
            }}
          >
            เปลี่ยนรหัสผ่าน
          </Text>
          </TouchableOpacity>
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
)(ProfileScreen);
