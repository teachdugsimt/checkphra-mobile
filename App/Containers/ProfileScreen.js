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
import Icon4 from "react-native-vector-icons/MaterialIcons"
import { Colors, Images } from "../Themes";
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import I18n from '../I18n/i18n';
import { getLanguages } from 'react-native-i18n';
I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";

let { width, height } = Dimensions.get('window')
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

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class ProfileScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
      // checkData: this.props.id,
      // Imagine: null
      point: null,
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

  static getDerivedStateFromProps(newProps, prevState) {
    console.log(newProps)
    console.log(prevState)
    // console.log('HAHAHA SUCCCCC')
    if (newProps.profile && newProps.profile.point) {
      if (newProps.profile.point != prevState.point) {
        newProps.getProfile()
        newProps.setCoin(newProps.profile.point)
        // console.log('POINT CHANGE BY PROFILE')
        return {
          point: newProps.profile.point
        }
      }
      // console.log('POINT CHANGE BY PROFILE 88888888888')
      return {
        point: newProps.profile.point
      }
    }

    return {

    }
  }

  componentDidMount() {
    this.props.getProfile()
  }

  _onSignout = () => {
    Alert.alert(
      'Check Phra',
      I18n.t('wantLogout'),
      [
        {
          text: I18n.t('ok'), onPress: () => {
            this.props.signout()
            this.props.signout2()
            this.props.clearAll()
            this.props.navigation.navigate('Auth')
          }
        },
        {
          text: I18n.t('cancel'), onPress: () => { }
        }
      ]
    )

  }

  componentWillUnmount() {
    this.popupDialog.dismiss()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.profile == null) {
      this.props.navigation.navigate("Auth")
    }
  }

  _changeLanguage = () => {
    this.popupDialog.show()
  }

  _thai = () => {
    this.props.setLanguage('th')
    this.popupDialog.dismiss()
  }

  _english = () => {
    this.props.setLanguage('en')
    this.popupDialog.dismiss()
  }
  render() {
    // let data = []
    // console.log(this.props.profile)
    I18n.locale = this.props.language
    console.log(this.props.coin)  // can use instead this.props.profile.point
    console.log('-----------------------------------------------------')
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{
          flex: this.props.profile && this.props.profile.role == 'user' ? 0.5 : 0.36
          , height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center',
        }}>

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
                <Text>{(this.props.profile.firstname != null ? this.props.profile.firstname : 'User') + " " + (this.props.profile.lastname != null ? this.props.profile.lastname : 'CheckPhra')} </Text>
              }
            </View>
            {/* <Text style={{ marginTop: 5, color: 'orange' }}>Check Phra Account</Text> */}

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

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              {this.props.profile && this.props.profile.role != 'user' &&
                <Icon
                  name="round-brush"
                  size={18}
                  color={Colors.brownText}
                  style={{ marginRight: 10 }}
                />
              }
              {this.props.profile && this.props.profile.role != 'user' &&
                <Text style={{ marginLeft: 3 }}>{this.props.profile.display_name ? this.props.profile.display_name : 'MR. Blue'}</Text>}
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              {this.props.profile && this.props.profile.role != 'user' &&
                <Icon2
                  name="ios-contact"
                  size={20}
                  color={Colors.brownText}
                  style={{ marginRight: 10 }}
                />
              }
              {this.props.profile && this.props.profile.role != 'user' &&
                <Text style={{ marginLeft: 5, color: 'orange' }}>{this.props.profile.role}</Text>}
            </View>

          </View>

        </View>

        {this.props.profile && this.props.profile.role != 'expert' && this.props.profile.role != 'admin' &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginTop: 20, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 10 }}>
              <Image source={Images.coin0} style={{ width: 19, height: 19, marginRight: 5 }} />
              <Text style={{ fontSize: 16 }}>
                {I18n.t('coin')}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold', color: 'orange' }}>{this.props.profile ? this.props.profile.point : '-'}</Text>
            </View>
          </View>
        }

        {this.props.profile && this.props.profile.role != 'expert' && this.props.profile.role != 'admin' &&
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => this.props.navigation.navigate("pro")}>
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
                {I18n.t('addCoin')}
              </Text>
            </View>
          </TouchableOpacity>
        }

        {this.props.profile && this.props.profile.role != 'expert' && this.props.profile.role != 'admin' &&
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => { this.props.navigation.navigate("historyAddPoint") }}>
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
                {I18n.t('purchaseHistory')}
              </Text>
            </View>
          </TouchableOpacity>
        }


        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', borderBottomColor: 'lightgrey', marginTop: 20, borderBottomWidth: 1 }} onPress={() => this._changeLanguage()}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 7, marginVertical: 10 }}> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 10 }}>
            <Icon4
              name="language"
              size={18}
              color={Colors.brownText}
              style={{ marginRight: 7 }}
              onPress={() => { }}
            />
            <Text style={{ fontFamily: "Prompt-Regular", fontSize: 16, }}>
              {I18n.t('changeLanguage')}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <Text
              style={{
                fontFamily: "Prompt-Regular",
                fontSize: 16,
                fontWeight: 'bold',
                color: Colors.brownText, marginHorizontal: 10
              }}
            >
              {this.props.language && this.props.language.includes('th') ? 'ไทย' : 'English'}
            </Text>
          </View>

          {/* </View> */}
        </TouchableOpacity>

        {this.props.profile && this.props.profile.type == 'gen' && <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => {
          this.props.navigation.navigate("change")
        }}>
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
              {I18n.t('changePassword')}
            </Text>
          </View>
        </TouchableOpacity>}



        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }} onPress={() => {
          this._onSignout()
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
              {I18n.t('logout')}
            </Text>
          </View>
        </TouchableOpacity>


        <PopupDialog
          dialogTitle={<DialogTitle title={I18n.t('selectLanguage')} titleTextStyle={{ fontSize: 18 }} />}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={0.7}
          height={height / 4.2}
          onDismissed={() => { this.setState({}) }}
        >
          <View style={{}}>
            <TouchableOpacity onPress={this._thai} style={{
              height: 42, flexDirection: 'row',
              borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center', borderTopColor: 'lightgrey', borderTopWidth: 1
            }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('thai')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._english} style={{
              height: 42, flexDirection: 'row',
              borderBottomColor: 'lightgrey', borderBottomWidth: 1, alignItems: 'center'
            }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>{I18n.t('english')}</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>


      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.question.profile,
    language: state.auth.language,
    coin: state.auth.coin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(QuestionActions.getProfile()),
    signout: () => dispatch(AuthActions.signout()),
    signout2: () => dispatch(QuestionActions.clearProfile()),
    clearAll: () => dispatch(QuestionActions.clearAll()),
    setLanguage: (language) => dispatch(AuthActions.setLanguage(language)),
    setCoin: (coin) => dispatch(AuthActions.setCoin(coin)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
