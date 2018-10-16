import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
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
import * as Progress from 'react-native-progress';
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
      questionType: [],
      message: '',
      fetch: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let qtype = []
    let checkFecth = null
    // console.log("HERE DATA")
    // console.log(nextProps)
    nextProps.questionType.forEach(e => {
      qtype.push({
        id: e.id,
        name: e.name,
        point: e.point,
        isChecked: false
      })
    })
    //  images , request => change
    if(nextProps.request){
      if(nextProps.images.length != 0){
        checkFecth = true
      }
    } 

    return {
      questionType: qtype,
      fetch: checkFecth
    }
  }

  componentDidMount() {
    this.props.getQuestionType()
  }

  componentWillUnmount() {
    this.props.clearImage()
    // this.setState({ fetch: null })
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
        console.log(response)
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source
        });

        this.props.setImages(this.props.id, {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        })
      }
    });
  }

  submit = () => {
    //set message and send
    let chk = []
    let cnt = 0
    let chkImage = this.props.images.filter(e => e != undefined)



    this.state.questionType.map((e, i) => {
      if (e.isChecked == true) {
        chk.push(1)
        cnt = cnt + e.point
      } else if (e.isChecked == false) {
        chk.push(0)
      }
    })

    let chk2 = chk.indexOf(1)

    if (chkImage.length == 0) {
      Alert.alert(
        'Check Phra',
        'กรุณาทำการเลือกรูป',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    } else if (chk2 == -1 && this.state.message == '' && !this.state.message) {
      Alert.alert(
        'Check Phra',
        'โปรดเลือกคำถามอย่างน้อย 1 ข้อ',
        [
          { text: 'ตกลง' }
        ],
        { cancelable: false }
      )
    } else if (chk2 != -1 || this.state.message != '') {
      if (this.props.profile.point < cnt) {
        Alert.alert(
          'Check Phra',
          'point ของท่านไม่พอ กรุณาเติม point',
          [
            { text: 'ตกลง', onPress: () => { this.props.navigation.navigate('pro') } }
          ],
          { cancelable: false }
        )
      } else {
        this.props.addQuestion()
        
      }
    }


  }

  render() {
    const point = [5, 5, 3, 3, 15]

    if(this.state.fetch == true){
      this.props.navigation.goBack()
      this.props.navigation.navigate('his')
    }

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
                  rightText={element.name + " ( " + point[i] + " point )"}
                  rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 20 }}
                  checkBoxColor={Colors.brownText}
                />
              })
            }
            <TextInput
              value={this.state.message}
              onChangeText={(text) => { this.setState({ message: text }) }}
              placeholder={'อื่นๆ โปรดระบุคำถาม ( x point )'}
              placeholderTextColor={Colors.brownText}
            />
          </View>

          <RoundedButton text={"ส่งข้อมูล"} onPress={this.submit}
            fetching={this.props.request}
          />

        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionType: state.question.questionType,
    images: state.question.images,
    profile: state.question.profile,
    // fetching: state.question.fetching,
    request: state.question.request,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestionType: () => dispatch(QuestionActions.getQuestionType()),
    setQuestions: (questions) => dispatch(QuestionActions.setQuestions(questions)),
    addQuestion: () => dispatch(QuestionActions.addQuestion()),

    // deleteImage: (index) => dispatch(QuestionActions.deleteImage(index)),
    // setImages: (index, source) => dispatch(QuestionActions.setImages(index, source)),
    clearImage: () => dispatch(QuestionActions.clearImage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendImageScreen)
