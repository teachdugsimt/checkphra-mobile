import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { Images, Metrics } from '../Themes'
import AuthActions from '../Redux/AuthRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/SigninScreenStyle";
import { Colors } from "../Themes";
import RoundedButton from "../Components/RoundedButton";


let { width } = Dimensions.get('window')

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPass: "",
      profile: null
    };
  }

  componentDidMount() {
    if (this.props.profile) {
      if (this.props.profile.role == 'expert') {
        this.props.navigation.navigate('ExpertApp')
      } else {
        this.props.navigation.navigate('App')
      }
    }

    // this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((nn) => {
    //   // Process your notification as required
    //   // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //   console.log("display listener")
    //   console.log(nn)
    // });
    // this.notificationListener = firebase.notifications().onNotification((nn) => {
    //   // Process your notification as required
    //   console.log("listener")
    //   console.log(nn)
    // });
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (!prevState.profile && prevState.profile != nextProps.profile) {
      if (nextProps.profile.role == 'expert') {
        nextProps.navigation.navigate('ExpertApp')
      } else if(nextProps.profile.role == 'admin'){
        nextProps.navigation.navigate('AdminApp')
      } 
      else {
        nextProps.navigation.navigate('App')
      }
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

      // const fcmToken = await firebase.messaging().getToken();
      // if (fcmToken) {
      //   console.log(fcmToken)
      // } else {
      //   console.log('no token')
      // }

      // const enabled = await firebase.messaging().hasPermission();
      // if (enabled) {
      //   console.log('have permission')
      // } else {
      //   console.log('dont have permission')
      // }

      console.log(currentUserJson.uid)
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

  login = () => {
    this.props.signin(this.state.inputEmail, this.state.inputPass)
  }

  render() {
    // console.log(this.state.inputEmail)
    // console.log(this.state.inputPass)
    return (
      <LinearGradient
        colors={["#FF8C00", "#FFA500", "#FFCC33"]}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />

        <View style={{ flex: 1, width: '80%', justifyContent: 'space-around' }}>

          <Text style={{
            fontSize: 50,
            color: "white",
            fontFamily: "Prompt-Regular",
            // lineHeight: 50
            alignSelf: "center",
          }}>
            Check Phra
          </Text>



          <View>
            <View style={styles.inputBg}>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                onChangeText={(inputEmail) => this.validate(inputEmail)}
                value={this.state.inputEmail}
                placeholder="E-mail"
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.inputBg}>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                onChangeText={inputPass => this.setState({ inputPass })}
                value={this.state.inputPass}
                placeholder="Password"
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholderTextColor="white"
                secureTextEntry={true}
              />
            </View>

            <View style={{ marginTop: Metrics.doubleBaseMargin }}>
              <RoundedButton title='เข้าสู่ระบบ' onPress={() => this.login()} />
            </View>


            <View
              style={{
                backgroundColor: "red",
                height: 48,
                width: '100%',
                borderRadius: 24,
                backgroundColor: "#104E8Bdd",
                marginTop: Metrics.doubleBaseMargin,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity onPress={() => this.fbLogin()} style={{ flexDirection: 'row' }}>
                <Icon
                  name="facebook-square"
                  size={28}
                  color="white"
                />
                <Text
                  style={{
                    fontFamily: "Prompt-Regular",
                    fontSize: 18,
                    color: "white",
                    marginLeft: Metrics.baseMargin
                  }}
                >
                  เข้าสู่ระบบโดยใช้ Facebook
          </Text>
              </TouchableOpacity>
            </View>

            <View style={{
              alignItems: "center"
            }} >
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
          </View>
        </View>

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
    signinWithCredential: (data) => dispatch(AuthActions.signinWithCredential(data)),
    signin: (email, password) => dispatch(AuthActions.signinRequest(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen);
