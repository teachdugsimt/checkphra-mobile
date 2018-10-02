import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import RoundedButton from '../Components/RoundedButton'
// Styles
import styles from './Styles/SendImageScreenStyle'

import ImagePicker from 'react-native-image-picker'
import { Colors } from '../Themes';
import Icon from "react-native-vector-icons/Entypo";
import Picker from '../Components/Picker';

import CheckBox from 'react-native-check-box'

const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class SendImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
      questionType: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    let qtype = []
    nextProps.questionType.forEach(e => {
      qtype.push({
        id: e.id,
        name: e.name,
        point: e.point,
        isChecked: false
      })
    })
    return {
      questionType: qtype
    }
  }

  componentDidMount() {
    this.props.getQuestionType()
  }


  showImagePicker = () => {
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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  submit = () => {
    this.props.addQuestion()
  }

  render() {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 60, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Prompt-Regular",
                alignSelf: "center",
                color: Colors.brownText
              }}
            >
              ข้อมูลเพื่อส่งตรวจ
          </Text>
          </View>
          <View style={styles.uploadRow}>
            <Picker title='หน้า' id={0} />
            <Picker title='หลัง' id={1} />
            <Picker title='ซ้าย' id={2} />
          </View>
          <View style={styles.uploadRow}>
            <Picker title='ขวา' id={3} />
            <Picker title='ฐาน' id={4} />
            <Picker title='อื่นๆ' id={5} />
          </View>
          <Text
              style={{
                fontSize: 20,
                fontFamily: "Prompt-Regular",
                alignSelf: "center",
                color: Colors.brownText,
                marginTop: 10
              }}
            >
              คำถามที่ต้องการ
          </Text>
          <View style={{ padding: 10 }}>
          {
            this.state.questionType.map((element, i) => {
              return <CheckBox
                key={i}
                style={{ flex: 1, padding: 5 }}
                onClick={() => {
                  let index = this.state.questionType.findIndex(e => e.id == element.id)
                  let qtype = [...this.state.questionType]
                  qtype.splice(index, 1, {
                    id: element.id,
                    name: element.name,
                    point: element.point,
                    isChecked: !element.isChecked
                  })

                  this.props.setQuestions(qtype)
                  this.setState({ questionType: qtype })
                }}
                isChecked={this.state.questionType[i].isChecked}
                rightText={element.name}
                rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 20 }}
                checkBoxColor={Colors.brownText}
              />
            })
          }
          </View>

          <RoundedButton text={"ส่งข้อมูล"} onPress={this.submit} />

        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionType: state.question.questionType,
    images: state.question.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestionType: () => dispatch(QuestionActions.getQuestionType()),
    setQuestions: (questions) => dispatch(QuestionActions.setQuestions(questions)),
    addQuestion: () => dispatch(QuestionActions.addQuestion())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendImageScreen)
