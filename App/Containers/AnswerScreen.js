import React, { Component } from 'react'
import {
  ScrollView, Text, TouchableOpacity, Image, View, Modal, Dimensions,
  TouchableHighlight, Alert, Linking, TextInput
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LinearGradient from "react-native-linear-gradient";
// Styles
import styles from './Styles/AnswerScreenStyle'
import { Colors, Images, Metrics } from '../Themes';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LoginButton, ShareDialog, ShareButton, ShareApi } from 'react-native-fbsdk';
import PromotionActions from '../Redux/PromotionRedux'
import TradingActions from '../Redux/TradingRedux'
import I18n from '../I18n/i18n';
import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import RoundedButton from "../Components/RoundedButton";
// import { MessengerClient } from 'messaging-api-messenger/lib';
// import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from "react-native-vector-icons/Entypo";
I18n.fallbacks = true;
const { width, height } = Dimensions.get('window')
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
let shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://play.google.com/store/apps/details?id=com.infiltech.checkphra',
  // contentDescription: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra',
  quote: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra ดูข้อมูลได้ที่ https://www.checkphra.com'
}
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

let isShared = false
let check = true
class AnswerScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.answer,
      index: 0,
      modalVisible: false,
      // modalVisible2: false,
      // imageModal: null,
      img2: null,
      shared: false,
      avatarSource: null,

      reference: null,
      pictureSelect: null,
      hideAddDetail: false,

      amuletName: null,  // ชื่อพระ
      templeName: null,  // ชื่อวัด
      ownerName: null,  // ชื่อเจ้าของ
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('answer'),
    }
  }


  static getDerivedStateFromProps(newProps, prevState) {
    console.log(newProps)
    console.log(prevState)

    if (newProps.data_certificate && newProps.data_certificate != null) {
      if (newProps.data_certificate.qid == newProps.answer[0].q_id) {
        // newProps.getAnswer(this.props.answer[0].q_id)
        return {
          hideAddDetail: true
        }
      }
    }

    if (newProps.answer) {
      if (newProps.answer != null && newProps.answer[0].images != null) {
        let img2 = []
        let reference = []
        newProps.answer[0].images.map(e => {
          img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
          reference.push(0)
        })
        // shareLinkContent.contentUrl = img2[0].url
        shareLinkContent = {
          contentType: 'link',
          contentUrl: 'https://play.google.com/store/apps/details?id=com.infiltech.checkphra',
          // contentDescription: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra',
          quote: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra ดูข้อมูลได้ที่ https://www.checkphra.com'
        }

        return {
          img2,
          reference
        }
      }
    }

    return {

    }
  }

  // pick = () => {
  //   ImagePicker.showImagePicker(options, (response) => {
  //     // console.log('Response = ', response);

  //     if (response.didCancel) {
  //       // console.log('User cancelled image picker');
  //     }
  //     else if (response.error) {
  //       // console.log('ImagePicker Error: ', response.error);
  //     }
  //     else if (response.customButton) {
  //       // console.log('User tapped custom button: ', response.customButton);
  //     }
  //     else {
  //       let source = { uri: response.uri };
  //       // console.log(response)

  //       this.setState({
  //         avatarSource: source
  //       });

  //       this.props.setImage({
  //         uri: response.uri,
  //         type: response.type,
  //         name: response.fileName
  //       })
  //     }
  //   });
  // }

  componentWillUnmount() {
    this.setState({ index: 0 })
    this.props.navigation.goBack()
    // if (isShared == true) {
    //   this.props.sharedAnswer(this.props.answer[0].q_id)
    //   this.props.getProfile()
    // }
    isShared = false
    this.props.clearDataCer()
    // console.log(isShared)
    // console.log('AND IS SHARED')
  }

  async shareLinkWithShareDialog() {
    var tmp = this;
    await ShareDialog.canShow(shareLinkContent).then(
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
          // alert('Share operation was cancelled');
        } else {
          // alert('Share was successful with postId: '
          //   + result.postId);
          // alert('Share was successful');
          if (isShared == false) {
            alert(I18n.t('sharedSuccess'))
            isShared = true
          } else if (isShared == true) {
            alert(I18n.t('sharedSuccess2'))
          }
          // Alert.alert(
          //   'Check Phra',
          //   I18n.t('sharedSuccess'),
          //   [
          //     { text: I18n.t('ok'), onPress: () => {
          //       // this.setState({ shared: true })
          //      } }
          //   ]
          //   ,{cancelable: false}
          // )

        }
      },
      function (error) {
        alert('Share failed with error: ' + error.message);
      }
    );
  }

  _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' + result.toString());
    }
  }

  _goToURL() {
    // const url = 'm.me/316834699141900'
    const url = 'https://www.messenger.com/t/316834699141900'    // pc , mobile
    // const url = 'https://m.me/316834699141900' // pc , mobile can't use
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });

    //Create response callback.


    // Create a graph request asking for user information with a callback to handle the response.
    // const infoRequest = new GraphRequest(
    //   '/me/messages',
    //   {
    //     /**
    //      * The httpMethod to use for the request, for example "GET" or "POST".
    //      */
    //     httpMethod: 'POST',
    //     /**
    //      * The Graph API version to use (e.g., "v2.0")
    //      */
    //     version: 'v2.0',
    //     /**
    //      * The request parameters.
    //      */
    //     parameters: GraphRequestParameters,
    //     /**
    //      * The access token used by the request.
    //      */
    //     accessToken: "",
    //   },
    //   this._responseInfoCallback,
    // );
    // // Start the graph request.
    // new GraphRequestManager().addRequest(infoRequest).start();

  }

  _certificate = () => {
    this.popupDialog2.show()
  }

  _submitDetail = () => {
    if ((!this.state.amuletName || !this.state.templeName) || !this.state.pictureSelect) {
      alert(I18n.t('checkData'))
    } else {
      this.props.addDetailCertificate(this.props.answer[0].q_id, this.state.amuletName, this.state.templeName
        , this.state.pictureSelect, this.state.ownerName)  // EDIT THIS.PROPS.IMAGE => picture name (small than)
      this.popupDialog2.dismiss()
    }
  }

  _selectPic = (e, i) => {
    let tmp = this.state.reference
    // tmp[i] = 1  // can but one argument
    tmp = tmp.map((a, b) => {
      if (b == i) {
        // a = 1 // can't
        return 1
      } else {
        // a = 0 // can't
        return 0
      }
    })

    this.setState({ reference: tmp, pictureSelect: e })
  }

  render() {
    let data = this.props.answer
    I18n.locale = this.props.language
    let coins = 0

    // console.log(isShared)
    // console.log('AND IS SHARED')
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

        {this.state.img2 != null && <View style={{ width: '100%', height: 230, paddingTop: 10 }}>
          <ImageViewer
            saveToLocalByLongPress={false}
            imageUrls={this.state.img2}
            backgroundColor={'transparent'}
            onChange={index => this.setState({ index })}
            onClick={(e) => {
              console.log('Show modal')
              this.setState({ modalVisible: true })
            }}
            index={this.state.index}
            // renderHeader={(number) => {
            //   <View style={{ justifyContent: 'center', flexDirection: 'row' }}><Text>{number}</Text></View>
            // }}
            // renderIndicator={(number, size) => {
            //   // if (this.state.index != number - 1) {
            //   //   let a = number - 1
            //   //   this.setState({ index: a })
            //   // }
            //   return (
            //     <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={{ fontSize: 30, alignSelf: 'center' }}>{number + " / " + size}</Text></View>
            //   )
            // }}
            // onSwipeDown={() => {
            //     console.log('onSwipeDown');
            //     this.setState({ modalVisible: false })
            // }}
            // enableSwipeDown={true}
            failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
          />
          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}>
            <ImageViewer
              saveToLocalByLongPress={false}
              imageUrls={this.state.img2}
              // imageUrls={img2}
              backgroundColor={'lightgrey'}
              // onClick={(e) => {
              //     console.log('Show modal')
              //     this.setState({ modalVisible: true })
              // }}
              index={this.state.index}
              onSwipeDown={() => {
                console.log('onSwipeDown');
                this.setState({ modalVisible: false })
              }}
              enableSwipeDown={true}
              failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
            />
          </Modal>

        </View>}

        <PopupDialog
          dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
            fontSize: 18, fontWeight: 'bold'
          }}>{I18n.t('editDetailPhra')}</Text></View>}
          ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.05}
          height={height / 1.5}
          // height={150}
          onDismissed={() => {
            this.setState({ amuletName: null, templeName: null, ownerName: null, pictureSelect: null })
            this.props.deleteImage()
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={{ height: 20 }}></View>

            <ScrollView style={{ flex: 1 }} horizontal={true}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.answer && this.props.answer[0] && this.props.answer[0].images.map((e, i) => {
                  return (
                    <TouchableOpacity style={{ backgroundColor: this.state.reference[i] == 1 ? 'orange' : 'transparent', marginRight: 10, flex: 1 }} onPress={() => this._selectPic(e, i)}>
                      <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e }} style={{ width: 100, height: 100, margin: 15 }} />
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
              <Text style={{ textAlignVertical: 'center' }}>{I18n.t('amuletName')} : </Text>
              <TextInput value={this.state.amuletName} onChangeText={(text) => this.setState({ amuletName: text })} placeholder={I18n.t('answerText')} style={{ width: width / 1.8, marginRight: 10, alignSelf: 'center' }} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
              <Text style={{ textAlignVertical: 'center' }}>{I18n.t('templeName')} : </Text>
              <TextInput value={this.state.templeName} onChangeText={(text) => this.setState({ templeName: text })} placeholder={I18n.t('answerText')} style={{ width: width / 1.8, marginRight: 10, alignSelf: 'center' }} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
              <Text style={{ textAlignVertical: 'center' }}>{I18n.t('ownerName')} : </Text>
              <TextInput value={this.state.ownerName} onChangeText={(text) => this.setState({ ownerName: text })} placeholder={I18n.t('anywhere')} style={{ width: width / 1.8, marginRight: 10, alignSelf: 'center' }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <View style={{ width: '45%', height: 40 }}>
                <RoundedButton title={I18n.t('ok')} onPress={this._submitDetail} />
              </View>
              <View style={{ width: '45%', height: 40 }}>
                <RoundedButton title={I18n.t('cancel')} onPress={() => this.popupDialog2.dismiss()} />
              </View>
            </View>

            <View style={{ height: 40 }}></View>

          </ScrollView>
        </PopupDialog>

        <ScrollView style={{ flex: 1 }}>

          <Text style={{
            alignSelf: 'center',
            fontFamily: 'Prompt-Regular',
            fontSize: 16,
          }}>{I18n.t('checkBy')} : <Text style={{
            fontFamily: 'Prompt-SemiBold',
            fontSize: 16,
            color: Colors.brownTextTran
          }}>Mr. Blue</Text></Text>

          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {
              data != null && data[0].answer != null &&
              data[0].answer.map(e => {
                if (e.question == 'พระแท้ / ไม่แท้' || e.question == 'พระแท้/ไม่แท้') {
                  if (e.result != 'ไม่ออกผล') {
                    coins += 50
                  }
                  return (
                    <View style={{ backgroundColor: '#fff5', padding: 10, borderRadius: 10 }}>
                      <Text style={{
                        fontFamily: 'Prompt-Regular',
                        fontSize: 16,
                      }}>{I18n.t('trueFalse')} : <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownTextTran
                      }}>{e.result != 'ไม่ออกผล' ? e.result : I18n.t('noneAnswer')}</Text></Text>

                      <Text style={{
                        fontFamily: 'Prompt-Regular',
                        fontSize: 16,
                      }}>{I18n.t('reason')} : <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownTextTran
                      }}>{data[0].argument ? data[0].argument : I18n.t('noneSpecify')}</Text></Text>

                    </View>
                  )
                } else if (e.question == 'ราคาประเมินเช่าพระเครื่อง' || e.question == 'ประเมินราคาพระ') {
                  if (e.result != 'ไม่ออกผล') {
                    coins += 10
                  }
                  return (
                    <View style={{ backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 10 }}>
                      <Text style={{
                        fontFamily: 'Prompt-Regular',
                        fontSize: 16,
                      }}>{I18n.t('pricePhra')} : <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownTextTran
                      }}>{e.result != 'ไม่ออกผล' ? e.result : I18n.t('noneAnswer')}</Text></Text>
                    </View>
                  )
                } else if (e.question == 'ชื่อหลวงพ่อ / ชื่อวัด' || e.question == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง') {
                  if (e.result != 'ไม่ออกผล') {
                    coins += 10
                  }
                  return (
                    <View style={{ backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 10 }}>
                      <Text style={{
                        fontFamily: 'Prompt-Regular',
                        fontSize: 16,
                      }}>{I18n.t('detailPhra')} : <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownTextTran
                      }}>{e.result != 'ไม่ออกผล' ? e.result : I18n.t('noneAnswer')}</Text></Text>
                    </View>
                  )
                }
              })
            }
          </View>

          {this.props.answer && this.props.answer[0] && this.props.answer[0].permit == 1 && this.state.hideAddDetail == false && <TouchableOpacity onPress={this._certificate} style={{ marginTop: 10, backgroundColor: '#fff5', borderRadius: 10, borderWidth: 1, borderColor: 'transparent', padding: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 18, alignSelf: 'center', color: '#DC143C' }}>{I18n.t('certificate')}</Text>
            <Icon2 name={'hand-o-up'} size={25} color={'#DC143C'} style={{ marginLeft: 8 }} />
          </TouchableOpacity>}

          <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 18, alignSelf: 'center', marginTop: 10, color: Colors.brownTextTran }}>{I18n.t('useCoins') + " " + coins + " coins"}</Text>


          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

            {/* {this.props.answer && this.props.answer[0] && this.props.answer[0].share_status == "enabled" && <View
              style={{
                backgroundColor: "red",
                height: 45,
                width: '40%',
                borderRadius: 24,
                backgroundColor: "#104E8Bdd",
                marginTop: Metrics.doubleBaseMargin,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ><TouchableOpacity onPress={this.shareLinkWithShareDialog} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Icon
                  name="facebook-square"
                  size={22}
                  color="white"
                />
                <Text
                  style={{
                    fontFamily: "Prompt-Regular",
                    fontSize: 15,
                    color: "white",
                    marginLeft: Metrics.baseMargin
                  }} > Share </Text>
              </TouchableOpacity></View>} */}

            <View
              style={{
                backgroundColor: "red",
                height: 45,
                width: '48%',
                borderRadius: 24,
                backgroundColor: "#104E8Bdd",
                marginTop: Metrics.doubleBaseMargin,
                marginBottom: Metrics.doubleBaseMargin,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ><TouchableOpacity onPress={this._goToURL} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Icon
                  name="facebook-square"
                  size={22}
                  color="white"
                />
                <Text
                  style={{
                    fontFamily: "Prompt-Regular",
                    fontSize: 15,
                    color: "white",
                    marginLeft: Metrics.baseMargin
                  }} >{I18n.t('contactAdmin')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    answer: state.question.answer,
    language: state.auth.language,
    image: state.trading.image,

    data_certificate: state.trading.data_certificate, // data for add detail certificate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sharedAnswer: (qid) => dispatch(PromotionActions.sharedAnswer(qid)),
    getProfile: () => dispatch(QuestionActions.getProfile()),
    getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
    setImage: (data) => dispatch(TradingActions.setImage(data)),
    deleteImage: () => dispatch(TradingActions.deleteImage()),
    addDetailCertificate: (qid, amuletName, temple, image, ownerName) => dispatch(TradingActions.addDetailCertificate(qid, amuletName, temple, image, ownerName)),
    clearDataCer: () => dispatch(TradingActions.clearDataCer()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerScreen)


    // await ShareApi.canShare(shareLinkContent).then(
//   function (canShare) {
//     if (canShare) {
//       return ShareApi.share(shareLinkContent, '/Check Phra', 'Some message.');
//     }
//   }
// ).then(
//   function (result) {
//     console.log(result)
//     console.log('HERE RESULT')
//     if (result.isCancelled) {

//       alert('Share operation was cancelled');

//     } else {

//       if (isShared == false) {
//         alert(I18n.t('sharedSuccess'))
//         isShared = true
//       } else if (isShared == true) {
//         alert(I18n.t('sharedSuccess2'))
//       }

//     }
//   },
//   function (error) {
//     alert('Share failed with error: ' + error.message);
//   }
// );
