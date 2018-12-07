import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, Image, View, Modal, Dimensions, TouchableHighlight, Alert, Linking } from 'react-native'
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
import I18n from '../I18n/i18n';
import QuestionActions from '../Redux/QuestionRedux'
import Icon from "react-native-vector-icons/FontAwesome";

// import { MessengerClient } from 'messaging-api-messenger/lib';
// import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

I18n.fallbacks = true;
const { width, height } = Dimensions.get('window')

let shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://www.checkphra.com/',
  contentDescription: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra',
}

let isShared = false

class AnswerScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.answer,
      index: 0,
      modalVisible: false,
      img2: null,
      shared: false,
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

    if (newProps.answer) {
      if (newProps.answer != null && newProps.answer[0].images != null) {
        let img2 = []
        newProps.answer[0].images.map(e => {
          img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        })
        // shareLinkContent.contentUrl = img2[0].url
        shareLinkContent = {
          contentType: 'link',
          contentUrl: 'https://www.checkphra.com/',
          contentDescription: 'ฉันได้ทำการตรวจพระโดยแอพ CheckPhra',
        }

        return {
          img2,
        }
      }
    }


    return {

    }
  }

  componentWillUnmount() {
    this.props.navigation.goBack()
    if (isShared == true) {
      this.props.sharedAnswer(this.props.answer[0].q_id)
      this.props.getProfile()
    }
    isShared = false
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
          alert('Share operation was cancelled');
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

        {this.state.img2 != null && <View style={{ width: '100%', height: 230, borderBottomColor: Colors.brownText, borderBottomWidth: 1 }}>
          <ImageViewer
            saveToLocalByLongPress={false}
            imageUrls={this.state.img2}
            // imageUrls={img2}
            backgroundColor={'lightgrey'}
            onClick={(e) => {
              console.log('Show modal')
              this.setState({ modalVisible: true })
            }}
            index={this.state.index}
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

        {/* <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          {
            data != null && data[0].answer != null &&
            data[0].answer.map(e => {
              return (
                <Text style={{
                  fontFamily: 'Prompt-Regular',
                  fontSize: 16,
                }}>{e.question} : <Text style={{
                  fontFamily: 'Prompt-SemiBold',
                  fontSize: 18,
                }}>{e.result}</Text></Text>
              )
            })
          }
        </View> */}
        <ScrollView style={{ flex: 1 }}>

          {/* {this.props.answer && this.props.answer[0] && this.props.answer[0].personal && <Text style={{
            alignSelf: 'center',
            fontFamily: 'Prompt-Regular',
            fontSize: 16,
          }}>{I18n.t('checkBy')} : <Text style={{
            fontFamily: 'Prompt-SemiBold',
            fontSize: 16,
          }}>{this.props.answer[0].personal.email}</Text></Text>} */}
          <Text style={{
            alignSelf: 'center',
            fontFamily: 'Prompt-Regular',
            fontSize: 16,
          }}>{I18n.t('checkBy')} : <Text style={{
            fontFamily: 'Prompt-SemiBold',
            fontSize: 16,
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
                    <View>
                      <Text style={{
                        fontFamily: 'Prompt-Regular',
                        fontSize: 16,
                      }}>{I18n.t('trueFalse')} : <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                      }}>{e.result != 'ไม่ออกผล' ? e.result : I18n.t('noneAnswer')}</Text></Text>

                      <Text style={{
                        fontFamily: 'Prompt-Regular',
                        fontSize: 16,
                      }}>{I18n.t('reason')} : <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                      }}>{data[0].argument ? data[0].argument : I18n.t('noneSpecify')}</Text></Text>

                    </View>
                  )
                } else if (e.question == 'ราคาประเมินเช่าพระเครื่อง' || e.question == 'ประเมินราคาพระ') {
                  if (e.result != 'ไม่ออกผล') {
                    coins += 10
                  }
                  return (
                    <Text style={{
                      fontFamily: 'Prompt-Regular',
                      fontSize: 16,
                    }}>{I18n.t('pricePhra')} : <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 18,
                    }}>{e.result != 'ไม่ออกผล' ? e.result : I18n.t('noneAnswer')}</Text></Text>
                  )
                } else if (e.question == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question == 'ชื่อหลวงพ่อ/ชื่อวัด/ปี พ.ศ. ที่สร้าง') {
                  if (e.result != 'ไม่ออกผล') {
                    coins += 10
                  }
                  return (
                    <Text style={{
                      fontFamily: 'Prompt-Regular',
                      fontSize: 16,
                    }}>{I18n.t('detailPhra')} : <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 18,
                    }}>{e.result != 'ไม่ออกผล' ? e.result : I18n.t('noneAnswer')}</Text></Text>
                  )
                }
              })
            }
          </View>
          <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 18, alignSelf: 'center', marginTop: 10 }}>{I18n.t('useCoins') + " " + coins + " coins"}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            {/* {this.props.answer && this.props.answer[0] && this.props.answer[0].share_status == "enabled" && <View style={{ alignItems: 'center' }} >
              <TouchableOpacity onPress={this.shareLinkWithShareDialog} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#3F54C4', borderRadius: 5, marginTop: 20 }}>
                <Image source={Images.fb} style={{ width: 25, height: 25, marginLeft: 5, marginTop: 10 }} />
                <Text style={{ fontSize: 18, margin: 10, color: 'white', fontWeight: 'bold' }}>Share</Text>
              </TouchableOpacity>
            </View>} */}

            {this.props.answer && this.props.answer[0] && this.props.answer[0].share_status == "enabled" && <View
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
                  size={28}
                  color="white"
                />
                <Text
                  style={{
                    fontFamily: "Prompt-Regular",
                    fontSize: 18,
                    color: "white",
                    marginLeft: Metrics.baseMargin
                  }} > Share </Text>
              </TouchableOpacity></View>}

            {/* <View style={{ alignItems: 'center', marginLeft: 15 }} >
              <TouchableOpacity onPress={this._goToURL} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#3F54C4', borderRadius: 5, marginTop: 20 }}>
                <Image source={Images.fb} style={{ width: 25, height: 25, marginLeft: 5, marginTop: 10 }} />
                <Text style={{ fontSize: 18, margin: 10, color: 'white', fontWeight: 'bold' }}>Messenger</Text>
              </TouchableOpacity>
            </View> */}

            <View
              style={{
                backgroundColor: "red",
                height: 45,
                width: '48%',
                borderRadius: 24,
                backgroundColor: "#104E8Bdd",
                marginTop: Metrics.doubleBaseMargin,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ><TouchableOpacity onPress={this._goToURL} style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
                  }} >{I18n.t('contactAdmin')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    answer: state.question.answer,
    language: state.auth.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sharedAnswer: (qid) => dispatch(PromotionActions.sharedAnswer(qid)),
    getProfile: () => dispatch(QuestionActions.getProfile()),
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