import React, { Component } from "react";
import { Image, Dimensions, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux"
import LinearGradient from "react-native-linear-gradient";
import PromotionActions from '../Redux/PromotionRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'react-native-firebase';
// Styles
import styles from "./Styles/RegisterScreenStyle";
import { Colors, Images } from "../Themes";
import Spinner from 'react-native-loading-spinner-overlay';
import { LoginButton, ShareDialog, ShareButton } from 'react-native-fbsdk';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
let { width, height } = Dimensions.get('window')

let shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://check-phra.firebaseapp.com/#/dashboard',
  contentDescription: 'ข่าวสารโดยแอพ CheckPhra',
}
class Publish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  static getDerivedStateFromProps(newProps, prevState) {
    console.log(newProps)
    console.log(prevState)

    let pdata = newProps.data_publish ? newProps.data_publish : 'none'

    return {
      data: pdata
    }
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(shareLinkContent).then(
      function (canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function (result) {
        console.log(result)
        console.log('HERE RESULT')
        if (result.isCancelled) {
          alert('Share operation was cancelled');
        } else {
          alert('Share was successful with postId: '
            + result.postId);
        }
      },
      function (error) {
        alert('Share failed with error: ' + error.message);
      }
    );
  }

  componentDidMount() {
    this.props.getPublish()
  }

  render() {
    I18n.locale = this.props.language
    // console.log(this.props.data)
    // let tmp  = this.props.data? this.props.data : `Don't Have Publish`
    // console.log(tmp)
    return (
      <LinearGradient
        colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
      >
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <ScrollView style={{ flex: 1 }}>

          {this.state.data == 'none' ? <View><Text style={{
            alignSelf: 'center',
            marginTop: 20, fontSize: 20, color: Colors.brownTextTran
          }}>Don't have publish</Text>
          </View> : <View>
              <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>{this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].topic ? this.props.data_publish[0].topic : '-'}</Text>

              {this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].image && <Image source={'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.props.data_publish[0].image}
                style={{ marginTop: 15, width: width / 1.2, height: height / 3, marginHorizontal: 10 }} />}

              <Text style={{ fontSize: 17, marginTop: 15, marginLeft: 15, alignSelf: 'center' }}>{this.props.data_publish && this.props.data_publish.length > 0 && this.props.data_publish[0].content}</Text>

              <TouchableOpacity onPress={this.shareLinkWithShareDialog} style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#3F54C4', borderRadius: 5, marginTop: 20, width: width / 3.3 }}>
                <Image source={Images.fb} style={{ width: 25, height: 25, marginLeft: 5, marginTop: 10 }} />
                <Text style={{ fontSize: 20, margin: 10, color: 'white', fontWeight: 'bold' }}>Share</Text>
              </TouchableOpacity>
            </View>}

        </ScrollView>

      </LinearGradient>
    )
  }

}

const mapStateToProps = (state) => ({
  // request: state.auth.request,
  // dataRegister: state.auth.dataRegister,
  // request2: state.auth.request2,
  language: state.auth.language,
  data_publish: state.promotion.data_publish,
});

const mapDispatchToProps = (dispatch) => ({
  // signup: (id, password) => dispatch(AuthActions.signup(id, password)),
  // createUser: (email, uid) => dispatch(AuthActions.createUser(email, uid))
  getPublish: () => dispatch(PromotionActions.publishRequest()),
});

export default compose(
  // firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps, mapDispatchToProps)
)(Publish);
