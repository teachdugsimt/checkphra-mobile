import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

import AuthActions from '../Redux/AuthRedux'

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
      inputPass: "",
      profile: null
    };
  }

  // componentWillReceiveProps(newProps) {

  // }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (!prevState.profile && prevState.profile != nextProps.profile) {
      nextProps.navigation.navigate('App')
    }

    return {
      profile: nextProps.profile
    }
  }

  fbLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        return
        // throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      const currentUserJson = currentUser.user.toJSON()

      this.props.setUserId(currentUserJson.uid)
      this.props.signinWithCredential(currentUserJson)

    } catch (e) {
      console.error(e);
    }
  }

  getReg = () => {
    if (this.state.chkMail == false) {
      Alert.alert(
        'Check Phra',
        'กรุณากรอก E-mail ให้ถูกต้อง',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    }
    else if (this.state.inputPass.length > 18 || this.state.inputPass.length < 6) {
      Alert.alert(
        'Check Phra',
        'กรุณาใส่พาสเวิร์ดความยาว 6-18 ตัว (A-z,0-9)',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    } else if (this.state.chkMail == true && this.state.inputPass.length > 5 && this.state.inputPass.length < 19) {
      console.log("success")
      // this.props.signup(this.state.email, this.state.pass) // signin 
    } else {
      Alert.alert(
        'Check Phra',
        'กรุณาใส่ข้อมูลให้ถูกต้อง',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    }
  }

  validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      this.setState({ inputEmail: text, chkMail: false })
      return false;
    }
    else {
      this.setState({ inputEmail: text, chkMail: true })
      // console.log("Email is Correct");
    }
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
            height: 80,
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
              fontFamily: "Prompt-Regular",
              // lineHeight: 50
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
                marginLeft: 10,
                lineHeight: 60
              }}
              numberOfLines={1}
              onChangeText={(inputEmail) => this.validate(inputEmail)}
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
                marginLeft: 10,
                lineHeight: 60
              }}
              numberOfLines={1}
              onChangeText={inputPass => this.setState({ inputPass })}
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
            {/* // change function to signin */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate("App")}>  
            {/* <TouchableOpacity onPress={this.getReg}> */}
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Reg")}>
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
          <TouchableOpacity onPress={() => this.fbLogin()}>
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
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserId: (user_id) => dispatch(AuthActions.setUserId(user_id)),
    signinWithCredential: (data) => dispatch(AuthActions.signinWithCredential(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen);
