import React, { Component } from "react";
import { ScrollView, Text, View,TextInput,TouchableOpacity, Alert} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/RegisterScreenStyle";
import { Colors } from "../Themes";

class RegisterScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email:"",
      pass:"",
      pass2:""
    }
  }

  getReg = () => {
    if(this.state.email != "" && this.state.pass != "" && this.state.pass2 != ""){
        let p1 = this.state.pass.split(" ")
        let p2 = this.state.pass2.split(" ")
        // console.log(p1)
        // console.log(p2)
        p1.forEach(e=> {
          if(e == p2)
          {
            Alert.alert(
              'Check Phra',
              'สมัครสมาชิกเรียบร้อยแล้ว ...',
              [
                {text:'เข้าสู่ระบบ',onPress:()=>this.props.navigation.navigate("Auth")},
              ],
              { cancelable: false }
            )
          }
          else {
            Alert.alert(
              'Check Phra',
              'รหัสผ่านไม่ถูกต้อง ...',
              [
                {text:'ตกลง'},
              ],
              { cancelable: false }
            )
          }
        })
   
    }
    else {
      Alert.alert(
        'Check Phra',
        'กรุณากรอกข้อมูลให้ครบถ้วน...',
        [
          {text:'ตกลง'},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
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
              onChangeText={email => this.setState({ email})}
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
              onChangeText={pass => this.setState({pass})}
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
              onChangeText={pass2 => this.setState({pass2})}
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
              marginTop:8
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
