import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, Image, View, Modal, Dimensions, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LinearGradient from "react-native-linear-gradient";
// Styles
import styles from './Styles/AnswerScreenStyle'
import { Colors, Images } from '../Themes';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LoginButton, ShareDialog, ShareButton } from 'react-native-fbsdk';

const { width, height } = Dimensions.get('window')
let shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/cd65aea2a6-image-6c93cf2a-527e-4f60-82b4-b133f098510f.jpg',
  contentDescription: 'Facebook sharing is easy!'
}
class AnswerScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.answer,
      index: 0,
      modalVisible: false,
      img2: null,
      shareLinkContent: shareLinkContent,
    }
    const shareLinkContent = {
      contentType: 'link',
      // contentUrl: "https://facebook.com",
      contentUrl: "https://s3-ap-southeast-1.amazonaws.com/checkphra/images/cd65aea2a6-image-6c93cf2a-527e-4f60-82b4-b133f098510f.jpg",
      contentDescription: 'Facebook sharing is easy!',
    };
    // this.state = {shareLinkContent: shareLinkContent,};
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
        // let shareLinkContent = {
        //   contentType: 'link',
        //   contentUrl: img2[0].url,
        //   contentDescription: 'Facebook sharing is easy!',
        // }
        // console.log(shareLinkContent)
        // console.log('HERE SHARING ')
        return {
          img2,
          // shareLinkContent
        }
      }
    }

    return {

    }
  }

  componentWillUnmount() {
    this.props.navigation.goBack()
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

  render() {
    let data = this.props.answer
    // let img2 = []
    // if (data != null && data[0].images != null) {
    //   data[0].images.map(e => {
    //     img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
    //   })
    // }
    // const shareLinkContent = {
    //   contentType: 'link',
    //   contentUrl: "https://facebook.com",
    //   contentDescription: 'Facebook sharing is easy!',
    // };
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
            />
          </Modal>

        </View>}

        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
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
        </View>

        <View style={{ alignItems: 'center' }} >
          {/* <ShareButton /> */}
          {/* <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + error.message);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                  alert("Login was successful with permissions: " + result.grantedPermissions)
                }
              }
            }
            onLogoutFinished={() => alert("User logged out")} /> */}

          <TouchableOpacity onPress={this.shareLinkWithShareDialog} style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={Images.fb} style={{ width: 30, height: 30, marginTop: 8 }} />
            <Text style={{ fontSize: 20, margin: 10, }}>Share link with ShareDialog</Text>
          </TouchableOpacity>

        </View>

      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    answer: state.question.answer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerScreen)
