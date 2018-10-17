import React, { Component } from "react";
import { Image, Dimensions, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux"
import LinearGradient from "react-native-linear-gradient";
import AuthActions from '../Redux/AuthRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import { firebaseConnect } from 'react-redux-firebase'

// Styles
import styles from "./Styles/RegisterScreenStyle";
import { Colors, Images } from "../Themes";

let { width } = Dimensions.get('window')

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      pass: "",
      pass2: "",
      chkMail: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataRegister != this.props.dataRegister) {
      // console.log(nextProps.dataRegister)
      // console.log(this.state.email)
      // console.log(nextProps.dataRegister.access_token)
      // this.signinWithFirebase(this.state.email, nextProps.dataRegister.access_token)
      Alert.alert(
        'Check Phra',
        'สมัครสมาชิกเรียบร้อย',
        [
          { text: 'ตกลง', onPress: () => { this.props.navigation.navigate('Auth') } }
        ],
        { cancelable: false }
      )
    }
  }

  // signinWithFirebase(email, password) {
  //   console.log('login to firebase ' + email + ' ' + password)
  //   this.props.firebase.login({
  //     email: email,
  //     password: password
  //   }).then((data) => {
  //     // console.log(data)
  //     // this.setState({error: data})
  //   }).catch((error) => {
  //     this.setState({ error: error, signining: false })
  //   })
  // }

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
    else if (this.state.pass.length > 18 || this.state.pass.length < 6 || this.state.pass2.length > 18 || this.state.pass2.length < 6) {

      Alert.alert(
        'Check Phra',
        'กรุณาใส่พาสเวิร์ดความยาว 6-18 ตัว (A-z,0-9)',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    } else if (this.state.pass != this.state.pass2) {
      Alert.alert(
        'Check Phra',
        'กรุณาใส่พาสเวิร์ดและยืนยันพาสเวิร์ดให้ถูกต้อง',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    } else if (this.state.chkMail == true && this.state.pass.length > 5 && this.state.pass2.length > 5 && this.state.pass.length < 19 && this.state.pass.length < 19 && this.state.pass == this.state.pass2) {
      console.log("success")
      this.props.signup(this.state.email, this.state.pass)
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
      this.setState({ email: text, chkMail: false })
      return false;
    }
    else {
      this.setState({ email: text, chkMail: true })
      // console.log("Email is Correct");
    }
  }

  render() {
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
          สมัครสมาชิก
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
            placeholder="ยืนยัน Password"
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
              สมัครสมาชิก
          </Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.auth.request,
  dataRegister: state.auth.dataRegister,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (id, password) => dispatch(AuthActions.signup(id, password)),
});

export default compose(
  // firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterScreen);
