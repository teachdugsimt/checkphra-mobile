import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, Image, View, Modal, Dimensions } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LinearGradient from "react-native-linear-gradient";
// Styles
import styles from './Styles/AnswerScreenStyle'
import { Colors, Images } from '../Themes';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width, height } = Dimensions.get('window')

class AnswerScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.answer,
      index: 0,
      modalVisible: false,
      img2: null,
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
        console.log(img2)
        console.log('IMG2 HERE')
        return {
          img2
        }
      }
    }

    return {

    }
  }

  componentWillUnmount() {
    this.props.navigation.goBack()
  }

  render() {
    let data = this.props.answer
    // let img2 = []
    // if (data != null && data[0].images != null) {
    //   data[0].images.map(e => {
    //     img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
    //   })
    // }

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
