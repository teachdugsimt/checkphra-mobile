import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../Themes";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CheckBox from 'react-native-check-box'
// Styles
import styles from "./Styles/ChangePasswordScreenStyle";

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      oldPass: "",
      newPass: "",
      confrimPass: "",
      checkTrue1: false,
      checkTrue2: false,
      checkFalse: false,
    };
  }

  confrimPassword = () => {
    if (
      this.state.oldPass != "" &&
      this.state.newPass != "" &&
      this.state.confrimPass != "" && this.state.email != ""
    ) {
      if (this.state.newPass == this.state.confrimPass) {
        console.log(this.state.newPass)
        console.log(this.state.confrimPass)
        Alert.alert(
          "Check Phra",
          "ยืนยันการเปลี่ยนรหัสผ่าน ...",
          [
            { text: "ตกลง", onPress: () => this.props.navigation.goBack() },
            { text: "ยกเลิก" }
          ],
          { cancelable: false }
        );
      }
      else {
        Alert.alert(
          "Check Phra",
          "รหัสผ่านไม่ถูกต้อง ...",
          [
            { text: "ตกลง" },

          ],
          { cancelable: false }
        );
      }
    }
    else {
      Alert.alert(
        "Check Phra",
        "กรุณากรอกข้อมูลให้ครบถ้วน...",
        [
          { text: "ตกลง" },

        ],
        { cancelable: false }
      );
    }
  };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 18,
              fontFamily: "Prompt-SemiBold",
              color: Colors.brownText
            }}
          >
            {"< กลับ"}
          </Text>
        </TouchableOpacity>
      )
    };
  };

  render() {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>

        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'space-between', marginTop: 20 }}>
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              height: 50,
              width: 320,
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholder="อีเมล"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
              secureTextEntry={false}
            />
          </View>

          <View
            style={{
              // position: "absolute",
              borderColor: "white",
              height: 50,
              borderWidth: 1,
              width: 320,
              borderRadius: 10,
              alignSelf: "center",
              // top: 50
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={oldPass => this.setState({ oldPass })}
              value={this.state.oldPass}
              placeholder="รหัสผ่านเก่า"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
              secureTextEntry={true}
            />
          </View>

          <View
            style={{
              // position: "absolute",
              borderColor: "white",
              height: 50,
              borderWidth: 1,
              width: 320,
              borderRadius: 10,
              alignSelf: "center",
              // top: 120
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={newPass => this.setState({ newPass })}
              value={this.state.newPass}
              placeholder="รหัสผ่านใหม่"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
              secureTextEntry={true}
            />
          </View>

          <View
            style={{
              // position: "absolute",
              borderColor: "white",
              height: 50,
              borderWidth: 1,
              width: 320,
              borderRadius: 10,
              alignSelf: "center",
              // top: 190
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={confrimPass => this.setState({ confrimPass })}
              value={this.state.confrimPass}
              placeholder="ยืนยันรหัสผ่านใหม่"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
              secureTextEntry={true}
            />
          </View>

          <View
            style={{
              borderColor: Colors.button,
              height: 40,
              borderWidth: 1,
              backgroundColor: Colors.button,
              // position: "absolute",
              // top: 280,
              width: 150,
              borderRadius: 20,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={this.confrimPassword}>
              <Text
                style={{
                  fontFamily: "Prompt-Light",
                  fontSize: 18,
                  alignSelf: "center",
                  marginTop: 5,
                  color: "white"
                }}
              >
                ตกลง
            </Text>
            </TouchableOpacity>



          </View>
          
        </View>

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
)(ChangePasswordScreen);
