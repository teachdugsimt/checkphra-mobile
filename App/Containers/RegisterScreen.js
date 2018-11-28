import React, { Component } from "react";
import { Image, Dimensions, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux"
import LinearGradient from "react-native-linear-gradient";
import AuthActions from '../Redux/AuthRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'react-native-firebase';
// Styles
import styles from "./Styles/RegisterScreenStyle";
import { Colors, Images } from "../Themes";
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../I18n/i18n';

I18n.fallbacks = true;

let { width } = Dimensions.get('window')
let checkRequest = true
let check1 = false

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      pass: "",
      pass2: "",
      chkMail: false,
      uid: null,
      data_fire: null,
      errorMessage: null,
      spinner: false
    }
  }
  static navigationOptions = ({ navigation }) => {

    return {
      title: I18n.t('register'),
    }
  }

  static getDerivedStateFromProps(newProps, prevState) {
    console.log(newProps)
    console.log(prevState)
    let spinner = null
    // let errorMessage = null
    let errorMessage = newProps.error_signup
    if (newProps.dataRegister && newProps.dataRegister.length != 0) {
      return {
        uid: newProps.dataRegister.access_token,
        // data_fire: currentUserJson
      }
    }

    //*** เมื่อ error email used ค่าการรีเควสจะได้ตามนี้ [request = true, false, null]  ***/
    //*** ซึ่งไม่ยุ่งกับ request2 เลย ทำให้ request2 = null ตลอดเวลา ดังนั้น เราต้องเช็คก่อนว่ามันเข้า request2 ไหม  ***/
    // checkRequest = 0 ค่าเริ่มต้น
    // checkRequest = 1 เข้ารีเควส 2 เป็นรูปแบบปกติ
    // checkRequest = 2 ไม่เข้ารีเควส 2 error action
    // if (newProps.request2 == true) {
    //   checkRequest = true
    // }

    return {
      spinner: spinner,
      errorMessage
    }
  }

  // firebase.auth().fetchProvidersForEmail(email)   // check email has been use ?
  // .then(providers => {
  //   if (providers.length === 0) {     // if email not ever used => signupAtFirebase() - normally
  //     // this email hasn't signed up yet
  //   } else {    // if email has been used => get token from that email - specially
  //     // has signed up
  //   }
  // });

  signupAtFirebase = (email, uid) => {
    if (uid && uid != null) {
      firebase.auth().createUserWithEmailAndPassword(email, uid)   // create token by firebase (email, uid)
        .then((response) => {

          console.log(response.user._user.email)
          console.log(response.user._user.uid)
          this.props.createUser(response.user._user.email, response.user._user.uid)
          this.props.navigation.navigate('Auth')
          check1 = false
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    } else {
      console.log('NONE UID')
      check1 = false
      this.setState({ spinner: false })
      // alert('Failure, please register again')
    }

  }

  getReg = () => {
    if (this.state.chkMail == false) {
      Alert.alert(
        'Check Phra',
        I18n.t('checkEmail'),
        [
          { text: I18n.t('ok') }
        ],
        { cancelable: false }
      )
    }
    else if (this.state.pass.length > 18 || this.state.pass.length < 6 || this.state.pass2.length > 18 || this.state.pass2.length < 6) {

      Alert.alert(
        'Check Phra',
        I18n.t('checkPassword'),
        [
          { text: I18n.t('ok') }
        ],
        { cancelable: false }
      )
    } else if (this.state.pass != this.state.pass2) {
      Alert.alert(
        'Check Phra',
        I18n.t('validatePassword'),
        [
          { text: I18n.t('ok') }
        ],
        { cancelable: false }
      )
    } else if (this.state.chkMail == true && this.state.pass.length > 5 && this.state.pass2.length > 5 && this.state.pass.length < 19 && this.state.pass.length < 19 && this.state.pass == this.state.pass2) {
      console.log("success")
      check1 = true
      // this.setState({ spinner: true })
      this.props.signup(this.state.email, this.state.pass)
      setTimeout(() => {
        check1 = true
        this.signupAtFirebase(this.state.email, this.state.uid ? this.state.uid : '')
      }, 3000);

    }

  }

  validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      this.setState({ email: text, chkMail: false })
      return false;
    }
    else {
      this.setState({ email: text, chkMail: true })
      // console.log("Email is Correct");
    }
  }

  goBack = () => {
    this.props.navigation.navigate("Auth")
  }

  componentWillUnmount() {
    checkRequest = true
  }

  componentDidMount() {
    this.props.clearError()
    this.setState({ spinner: false })
    checkRequest = true
  }

  render() {
    I18n.locale = this.props.language

    if (this.props.error_signup && this.props.request == null && this.props.request2 == null) {
      check1 = false
    }

    // console.log(this.props.request)
    // console.log(this.props.request2)
    // console.log('REQUEST AND REQUEST2')

    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <Text
          style={{
            alignSelf: "center",
            marginTop: 30,
            marginBottom: 30,
            fontSize: 30,
            fontFamily: "Prompt-Regular",
            color: Colors.brownText
          }}
        >
          {I18n.t('register')}
        </Text>
        <View
          style={{
            height: 50,
            width: 320,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 30
          }}
        >
          <TextInput
            style={{
              fontFamily: "Prompt-Regular",
              fontSize: 16,
              color: "white",
              marginLeft: 10
            }}
            // onChangeText={email => this.setState({ email })}
            onChangeText={(text) => this.validate(text)}
            value={this.state.email}
            placeholder="E-mail"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="white"

          />
        </View>
        <View
          style={{
            height: 50,
            width: 320,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 30
          }}
        >
          <TextInput
            style={{
              fontFamily: "Prompt-Regular",
              fontSize: 16,
              color: "white",
              marginLeft: 10
            }}
            onChangeText={pass => this.setState({ pass })}
            value={this.state.pass}
            placeholder="Password"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="white"
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            height: 50,
            width: 320,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: "center",
            marginBottom: 50
          }}
        >
          <TextInput
            style={{
              fontFamily: "Prompt-Regular",
              fontSize: 16,
              color: "white",
              marginLeft: 10
            }}
            onChangeText={pass2 => this.setState({ pass2 })}
            value={this.state.pass2}
            placeholder="Confirm Password"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="white"
            secureTextEntry={true}
          />
        </View>

        <View
          style={{
            height: 45,
            width: 160,
            backgroundColor: Colors.button,
            alignSelf: "center",
            borderRadius: 15
          }}
        >
          <TouchableOpacity onPress={this.getReg}>
            <Text
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 20,
                alignSelf: "center",
                color: "white",
                marginTop: 8
              }}
            >
              {I18n.t('register')}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 45,
            width: 160,
            backgroundColor: Colors.button,
            alignSelf: "center",
            borderRadius: 15,
            marginTop: 20
          }}
        >
          <TouchableOpacity onPress={this.goBack}>
            <Text
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 20,
                alignSelf: "center",
                color: "white",
                marginTop: 8
              }}
            >
              Back to signin
          </Text>
          </TouchableOpacity>
          <Spinner
            visible={check1}  // can use
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
          />

        </View>

      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.auth.request,  // send email, pass to TUM and get access Token
  dataRegister: state.auth.dataRegister,
  request2: state.auth.request2,  // createUser checkphra 
  language: state.auth.language,
  request3: state.auth.fetching,  // signin screen
  error_signup: state.auth.error_signup,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (id, password) => dispatch(AuthActions.signup(id, password)),
  createUser: (email, uid) => dispatch(AuthActions.createUser(email, uid)),
  clearError: () => dispatch(AuthActions.clearError()),
});

export default compose(
  // firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterScreen);
