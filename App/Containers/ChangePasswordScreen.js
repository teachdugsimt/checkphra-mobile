import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../Themes";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'

class ChangePasswordScreen extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      oldPass:'',
      newPass:'',
      confrimPass:''
    }
  }

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

  render () {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <View style = {{
          position: "absolute",
          borderColor: "white",
          height: 50,
          borderWidth: 1,
          width: 320,
          borderRadius: 10,
          alignSelf: "center",
          top: 50,
      
        }}>
        
        <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={inputEmail => this.setState({oldPass})}
              value={this.state.oldPass}
              placeholder="รหัสผ่านเก่า"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
          />

        </View>

        <View style = {{
          position: "absolute",
          borderColor: "white",
          height: 50,
          borderWidth: 1,
          width: 320,
          borderRadius: 10,
          alignSelf: "center",
          top: 120,
          
        }}>

           <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={inputEmail => this.setState({newPass})}
              value={this.state.newPass}
              placeholder="รหัสผ่านใหม่"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
          />

        </View>
        <View style = {{
          position: "absolute",
          borderColor: "white",
          height: 50,
          borderWidth: 1,
          width: 320,
          borderRadius: 10,
          alignSelf: "center",
          top: 190,
        
        }}>
             <TextInput
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                color: "white",
                marginLeft: 10
              }}
              onChangeText={inputEmail => this.setState({confrimPass})}
              value={this.state.confrimPass}
              placeholder="ยืนยันรหัสผ่านใหม่"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor="white"
          />
        </View>

             <View
            style={{
              borderColor: Colors.button,
              height: 40,
              borderWidth: 1,
              backgroundColor: Colors.button,
              position: "absolute",
              top: 280,
              width: 150,
              borderRadius: 20,
              alignSelf: "center"
            }}
          >
          <TouchableOpacity >
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
        
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
