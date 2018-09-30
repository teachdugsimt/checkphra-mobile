import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/SigninScreenStyle";
import { Colors } from "../Themes";

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPass: ""
    };
  }



  render() {
    // console.log(this.state.inputEmail)
    // console.log(this.state.inputPass)
    return (
      <LinearGradient
        colors={["#FF8C00", "#FFA500", "#FFCC33"]}
        style={{ flex: 1 }}
      >
        {/* <View style={{ flex: 1}}> */}
        <View
          style={{
            height: 50,
            // backgroundColor: "red",
            marginTop: 50,
            alignSelf: "center",
            position: "absolute"
          }}
        >
          <Text
            style={{
              fontSize: 50,
              color: "white",
              fontFamily: "Prompt-Regular"
            }}
          >
            Check Phra
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            top: 150,
            height: 300,
            // backgroundColor: "pink",
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <View
            style={{
              position: "absolute",
              borderColor: "white",
              height: 50,
              borderWidth: 1,
              width: 320,
              borderRadius: 10,
              alignSelf: "center",
              top: 50
            }}
          >
            <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={inputEmail => this.setState({ inputEmail})}
              value={this.state.inputEmail}
              placeholder="E-mail"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
            />
          </View>
          <View
            style={{
              position: "absolute",
              borderColor: "white",
              height: 50,
              borderWidth: 1,
              width: 320,
              borderRadius: 10,
              alignSelf: "center",
              top: 130
            }}
          >
            <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={inputPass => this.setState({ inputPass})}
              value={this.state.inputPass}
              placeholder="Password"
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
              position: "absolute",
              top: 250,
              width: 150,
              borderRadius: 20,
              alignSelf: "center"
            }}
          >
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("App")}>
            <Text
              style={{
                fontFamily: "Prompt-Light",
                fontSize: 18,
                alignSelf: "center",
                marginTop: 5,
                color: "white"
              }}
            >
              เข้าสู่ระบบ
            </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: 30,
            position: "absolute",
            top: 460,
            left: 0,
            right: 0,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Reg")}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                fontFamily: "Prompt-Regular",
                fontSize: 18
              }}
            >
              สมัครสมาชิก
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "red",
            height: 45,
            position: "absolute",
            top: 510,
            width: 300,
            borderRadius: 10,
            backgroundColor: "#104E8B",
            alignSelf: "center"
          }}
        >
          <Icon
            name="facebook-square"
            size={28}
            color="white"
            style={{
              position: "absolute",
              marginHorizontal: 20,
              marginVertical: 8
            }}
          />
          <Text
            style={{
              fontFamily: "Prompt-Regular",
              fontSize: 18,
              color: "white",
              alignSelf: "center",
              marginTop: 8,
              marginLeft: 25
            }}
          >
            เข้าสู่ระบบโดยใช้ Facebook
          </Text>
        </View>
        {/* </View> */}
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
)(SigninScreen);
