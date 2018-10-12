import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'

// Styles
import styles from "./Styles/ProfileScreenStyle";
import { Colors } from "../Themes";

class ProfileScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    this.props.getProfile()
  }

  // onRefresh(){
  //   this.props.getProfile()
  // }

  render() {
    console.log(this.props.profile)
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
        <View style={{ height: 100, flexDirection: 'column'}}>
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
                {this.props.profile && this.props.profile.email}
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
          <Text style = {{fontFamily:"Prompt-Regular",fontSize:25,color:Colors.brownText,alignSelf:'center'}}>{this.props.profile && this.props.profile.point}</Text>
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
  return {
    profile: state.question.profile,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(QuestionActions.getProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
