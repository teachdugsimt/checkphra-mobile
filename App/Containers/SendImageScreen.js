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
        isChecked: e.id == 1 ? true : false
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
            <Picker title='หน้า' />
            <Picker title='หลัง' />
            <Picker title='ซ้าย' />
          </View>
          <View style={styles.uploadRow}>
            <Picker title='ขวา' />
            <Picker title='ฐาน' />
            <Picker title='อื่นๆ' />
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

          <RoundedButton text={"ส่งข้อมูล"} />

        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionType: state.question.questionType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestionType: () => dispatch(QuestionActions.getQuestionType())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendImageScreen)
