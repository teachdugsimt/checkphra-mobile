import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Colors } from "../Themes";
// Styles
import styles from "./Styles/ProfileScreenStyle";

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

        <View style={{ flex: 0.4, height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', }}>

          <View style={{
            height: 40, width: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
            , backgroundColor: 'lightgrey', borderRadius: 20, marginRight: 10
          }}>
            <Icon
              name="camera"
              size={30}
              color={Colors.brownText}
              style={{}}
              onPress={() => { }}
            />
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {this.props.profile &&
                <Text>{this.props.profile.firstname + " " + this.props.profile.lastname} </Text>
              }
            </View>
            <Text style={{ marginTop: 5, color: 'orange' }}>Check Phra Account</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Icon
                name="mail"
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              {this.props.profile &&
                <Text> {this.props.profile.email}</Text>
              }
            </View>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.2, marginTop: 20, backgroundColor: 'white' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', marginHorizontal: 10 }}>
            <Icon2
              name="ios-ribbon"
              size={18}
              color={Colors.brownText}
              style={{ marginRight: 10 }}
              onPress={() => { }}
            />
            <Text>แต้มสะสม</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', marginHorizontal: 10 }}>
            {this.props.profile &&
              <Text>{this.props.profile.point}</Text>
            }
            <Text style={{ color: 'orange' }}> point</Text>
          </View>
        </View>

        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20 }} onPress={() => this.props.navigation.navigate("change")}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
            <Icon2
              name="ios-lock"
              size={18}
              color={Colors.brownText}
              style={{ marginRight: 10 }}
              onPress={() => { }}
            />
            <Text
              style={{
                color: "#FF0000",
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                textDecorationLine: "underline"
              }}
            >
              เปลี่ยนรหัสผ่าน
          </Text>
          </View>
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
