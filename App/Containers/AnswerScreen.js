import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, Image, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LinearGradient from "react-native-linear-gradient";
// Styles
import styles from './Styles/AnswerScreenStyle'
import { Colors } from '../Themes';

class AnswerScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

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

  render() {
    // console.log(this.props.answer.answer, 'answer')   // can't
    // let data = this.props.answer
    // console.log(data, 'data')   //can
    // data.forEach(e => console.log(e, 'element'))  // can't
    // console.log(data[0], 'data')  // can't
    // console.log(data.id)  // can't

    let answer1 = this.props.answer.answer
    let img = this.props.answer.images
    // console.log(answer1, 'answer') //can't
    // console.log(img, 'img')  // can't

    return (
      <LinearGradient
        colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
      >
        <Text style={{
          fontFamily: 'Prompt-Regular',
          fontSize: 25,
          color: Colors.brownText,
          textAlign: 'center',
          margin: 20,

        }}>ผลการตรวจพระ</Text>

        {
          this.props.answer && this.props.answer.images &&
          this.props.answer.images.map(element => {
            return <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + element }}
              style={{ width: 100, height: 100, margin: 20, borderRadius: 10 }} />
          })
        }
        <View style={{ marginHorizontal: 20 }}>
          {/* {
            this.props.answer && this.props.answer.answer &&
            this.props.answer.answer.map(element => {
              return (
                <Text style={{
                  fontFamily: 'Prompt-Regular',
                  fontSize: 13,
                }}>{element.question} : <Text style={{
                  fontFamily: 'Prompt-SemiBold',
                  fontSize: 18,
                }}>{element.result}</Text></Text>
              )
            })
          } */}
          {
            this.props.answer && this.props.answer.answer &&
            this.props.answer.answer.map(element => {
              return (
                <Text style={{
                  fontFamily: 'Prompt-Regular',
                  fontSize: 13,
                }}>{element.question} : <Text style={{
                  fontFamily: 'Prompt-SemiBold',
                  fontSize: 18,
                }}>{element.result}</Text></Text>
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
