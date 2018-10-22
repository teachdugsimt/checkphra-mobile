import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Dimensions, RefreshControl, Alert } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import AuthActions from '../Redux/AuthRedux'
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import { Colors, Images } from "../Themes";

let { width } = Dimensions.get('window')
var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


class ProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
      // checkData: this.props.id,
      // Imagine: null
    }
  }

  pick = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.log(response)
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });

      }
    });
  }

  componentDidMount() {
    this.props.getProfile()
  }

  _onSignout = () => {
    Alert.alert(
      'Check Phra',
      'คุณตองการออกจากระบบ ?',
      [
        {
          text: 'ตกลง', onPress: () => {
            this.props.signout()
            this.props.navigation.navigate('Auth')
          }
        },
        {
          text: 'ยกเลิก', onPress: () => { }
        }
      ]
    )

  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.profile == null) {
      this.props.navigation.navigate("Auth")
    }
  }

  render() {
    // let data = []
    // console.log(this.props.profile)
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{ flex: 0.4, height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', }}>

          <TouchableOpacity style={{ flex: 1 }} onPress={this.pick}>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'center',
              borderWidth: 3, borderColor: Colors.brownTextTran, borderRadius: 10, margin: 5, overflow: 'hidden'
            }}>
              {!this.state.avatarSource && <Icon
                name="camera"
                size={40}
                color={Colors.brownTextTran}
              />}
              <Image source={this.state.avatarSource} style={{ width: '100%', height: '100%' }} />
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 2 }}>
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

        {this.props.profile && this.props.profile.role != 'expert' &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.13, marginTop: 20, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
              <Icon2
                name="ios-ribbon"
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              <Text style={{ fontSize: 16 }}>แต้มสะสม</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{this.props.profile ? this.props.profile.point : '-'}</Text>
              <Text style={{ color: 'orange' }}> point</Text>
            </View>
          </View>
        }

        {this.props.profile && this.props.profile.role != 'expert' &&
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20, borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("pro")}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
              <Icon2
                name="ios-add-circle-outline"
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              <Text
                style={{
                  color: "orange",
                  fontFamily: "Prompt-Regular",
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                เติม point
          </Text>
            </View>
          </TouchableOpacity>
        }

        {this.props.profile && this.props.profile.role != 'expert' &&
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("historyAddPoint")}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
              <Icon3
                name="history"
                //ios-hourglass, ios-timer, ios-time
                size={18}
                color={Colors.brownText}
                style={{ marginRight: 10 }}
                onPress={() => { }}
              />
              <Text
                style={{
                  fontFamily: "Prompt-Regular",
                  fontSize: 16,
                }}
              >
                ประวัติการเติมเงิน
          </Text>
            </View>
          </TouchableOpacity>
        }

        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', marginTop: 20, borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("change")}>
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
                fontFamily: "Prompt-Regular",
                fontSize: 16,
              }}
            >
              เปลี่ยนรหัสผ่าน
          </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => {
          this.props.signout()
          this.props.signout2()
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginVertical: 10 }}>
            <Icon2
              name="md-arrow-round-back"
              size={18}
              color={Colors.brownText}
              style={{ marginRight: 10 }}
              onPress={() => { }}
            />
            <Text
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
              }}
            >
              ออกจากระบบ
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
    getProfile: () => dispatch(QuestionActions.getProfile()),
    signout: () => dispatch(AuthActions.signout()),
    signout2: () => dispatch(QuestionActions.clearProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
