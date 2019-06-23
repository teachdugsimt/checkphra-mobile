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

import {
  AccessToken, LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { Images, Metrics } from '../Themes'
import AuthActions from '../Redux/AuthRedux'
import Spinner from 'react-native-loading-spinner-overlay';
// import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/SigninScreenStyle";
import { Colors } from "../Themes";
import RoundedButton from "../Components/RoundedButton";
import I18n from '../I18n/i18n';

I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";
let tmp = null
let { width, height } = Dimensions.get('window')

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPass: "",
      profile: null,
      spinner: false,
      forget_email: "",
      data_credential: null,
      // language: I18n.currentLocale()
    };
  }

  componentDidMount() {
    // this.setState({ spinner: false })
    // console.log(this.props.profile)

    if (this.props.profile && this.props.profile != null) {
      this.hideSignin()
    }

    if (this.props.profile && this.props.profile != null) {
      if (this.props.profile.role == 'expert') {
        this.props.navigation.navigate('ExpertApp')
      } else if (this.props.profile.role == 'admin') {
        this.props.navigation.navigate('AdminApp')
      }
      else if (this.props.profile.role == 'user') {
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

  hideSignin = async () => {
    // this.setState({ spinner: true })
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.log('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

    const currentUserJson = currentUser.user.toJSON()
    // this.props.setCredential(currentUserJson)
    // console.log(data)
    console.log(currentUserJson)
    console.log('=========== DATA TEST HIDE SIGNIN ===========')
    if (currentUserJson != null && this.props.profile != null && this.props.profile && this.props.profile.type == 'fb') {
      // this.setState({ data_credential: currentUserJson ? currentUserJson : 'FUCK YOU' }) // can't => data come here
      this.props.signinWithCredential(currentUserJson ? currentUserJson : null)
    }
    // this.setState({ spinner: false })

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps)
    // console.log(prevState)
    // console.log('แอบมองเธออยู่นะจ๊ะ ')
    // console.log('+++++++++++++++++++++++++++ SIGNIN PAGE ++++++++++++++++++++++++++++')
    // Reactotron.display({
    //   name: "newProps",
    //   preview: "Signin Screen",
    //   value: nextProps
    // })
    // Reactotron.display({
    //   name: "prevState",
    //   preview: "Signin Screen",
    //   value: prevState
    // })
    // console.log(prevState.spinner)
    // let spinner = false
    if (!prevState.profile && nextProps.error && !nextProps.requestData) {
      nextProps.clearError()
    }

    if (!prevState.profile && prevState.profile != nextProps.profile) {
      // SigninScreen.hideSignin()
      // spinner = false
      // console.log(nextProps.profile)
      if (nextProps.profile.role == 'expert') {
        nextProps.navigation.navigate('ExpertApp')
      }
      else if (nextProps.profile.role == 'admin') {
        nextProps.navigation.navigate('AdminApp')
      }
      else if (nextProps.profile.role == 'user') {
        // console.log('GO TO APP FORM GETDERIVE...............')
        nextProps.navigation.navigate('App')
      }
    }

    return {
      profile: nextProps.profile,
      spinner: nextProps.fetch ? nextProps.fetch : false
    }
  }

  graphRequestSuccess(error, result) {
    console.log(result)
    console.log(error)
  }
  async FBGraphRequest(fields, callback) {
    const accessData = await AccessToken.getCurrentAccessToken();
    // Create a graph request asking for user information
    const infoRequest = new GraphRequest('/me', {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields
        }
      }
    }, callback.bind(this));
    // Execute the graph request created above
    let result = new GraphRequestManager().addRequest(infoRequest).start();
    console.log(result)
  }

  fbLogin = () => {
    try {

      LoginManager.logInWithPermissions(["public_profile", 'email']).then(
        (result) => {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            console.log(
              "Login success with permissions: " +
              result.grantedPermissions.toString()
            );

            this.setState({ spinner: true })

            // get the access token
            AccessToken.getCurrentAccessToken().then(data => {
              if (!data) {
                throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
              }

              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              console.log(credential)
              // login with credential
              firebase.auth().signInWithCredential(credential).then(currentUser => {
                console.log(currentUser)

                this.setState({ spinner: false })
                const currentUserJson = currentUser.user.toJSON()

                this.props.setUserId(currentUserJson.uid)
                this.props.signinWithCredential(currentUserJson)
              });



            });
            // console.log(data)


            // create a new firebase credential with the token
            // this.FBGraphRequest('id, email, link', this.graphRequestSuccess)


          }
        },
        (error) => {
          this.setState({ spinner: false })
          console.log("Login fail with error: " + error);
        }
      );

      /*

      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      console.log(result)

      // console.log(result)
      console.log('--------------- RESULT LOGIN ----------------')
      if (result.isCancelled) {
        alert('User canceled request')
        return
        // throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      this.setState({ spinner: true })
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
      // console.log(data)
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      // this.FBGraphRequest('id, email, link', this.graphRequestSuccess)
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      this.setState({ spinner: false })
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
      console.log(currentUserJson)
      console.log('-------------------------  CURRENT USER JSON ------------------------------')
      this.props.setUserId(currentUserJson.uid)
      this.props.signinWithCredential(currentUserJson) */

    } catch (e) {
      this.setState({ spinner: false })
      // console.error(e);
      console.log(e)
      console.log('----------------------- HERE "E" ------------------------')
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
    else if (this.state.inputPass.length > 18 || this.state.inputPass.length < 6) {
      Alert.alert(
        'Check Phra',
        I18n.t('checkPassword'),
        [
          { text: I18n.t('ok') }
        ],
        { cancelable: false }
      )
    } else if (this.state.chkMail == true && this.state.inputPass.length > 5 && this.state.inputPass.length < 19) {
      console.log("success")
      this.login()
      // this.props.signup(this.state.email, this.state.pass) // signin
    } else {
      Alert.alert(
        'Check Phra',
        I18n.t('checkData'),
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
    this.setState({ spinner: true })
    this.props.signin(this.state.inputEmail, this.state.inputPass)
  }

  // login = () => {
  //   if (!this.state.inputEmail || !this.state.inputPass) {
  //     alert("กรุณากรอกข้อมูลให้ครบถ้วน")
  //     this.setState({ spinner: false })
  //   } else {
  //     this.setState({ spinner: true })
  //     this.props.signin(this.state.inputEmail, this.state.inputPass)
  //   }
  // }


  render() {
    I18n.locale = this.props.language ? this.props.language : 'en'
    // console.log(this.props.language)
    // console.log(this.state.spinner)
    // I18n.locale = this.props.language
    // console.log(this.state.inputEmail)
    // console.log(this.state.inputPass)
    return (
      <LinearGradient
        colors={["#FF8C00", "#FFA500", "#FFCC33"]}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
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
            <Text style={{ textAlign: 'center', color: 'red' }}>{this.props.error}</Text>
            <View style={styles.inputBg}>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                onChangeText={(inputEmail) => this.validate(inputEmail)}
                value={this.state.inputEmail}
                placeholder={I18n.t('email')}
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
                placeholder={I18n.t('password')}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholderTextColor="white"
                secureTextEntry={true}
              />
            </View>

            <View style={{ marginTop: Metrics.doubleBaseMargin }}>
              {/* <RoundedButton title={I18n.t('login')} onPress={() => this.login()} /> */}
              <RoundedButton title={I18n.t('login')} onPress={() => this.getReg()} />
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
                  {I18n.t('loginWithFacebook')}
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
                  {I18n.t('register')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Forget')} style={{ marginTop: 5 }}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontFamily: "Prompt-Regular",
                    fontSize: 18
                  }}
                >
                  {I18n.t('forgetPassword')}
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
    profile: state.auth.profile,
    requestData: state.auth.data,
    fetch: state.auth.fetching,
    language: state.auth.language,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserId: (user_id) => dispatch(AuthActions.setUserId(user_id)),
    signinWithCredential: (data) => dispatch(AuthActions.signinWithCredential(data)),
    signin: (email, password) => dispatch(AuthActions.signinRequest(email, password)),
    clearError: () => dispatch(AuthActions.clearError()),
    setCredential: (data) => dispatch(AuthActions.setCredentialData(data)),
    // setLanguage: (language) => dispatch(AuthActions.setLanguage(language))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen);
