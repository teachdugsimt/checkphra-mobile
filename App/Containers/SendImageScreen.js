import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import RoundedButton from '../Components/RoundedButton'
// Styles
import styles from './Styles/SendImageScreenStyle'

import ImagePicker from 'react-native-image-picker'
import { Colors, Images } from '../Themes';
import Icon from "react-native-vector-icons/Entypo";
import Picker from '../Components/Picker';

import CheckBox from 'react-native-check-box'
import * as Progress from 'react-native-progress';

import Icon2 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import I18n from '../I18n/i18n';
import { setTime } from '../Redux/AuthRedux';
I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";
let chk = true
let chk2 = true
let { width } = Dimensions.get('window')

class SendImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
      questionType: [1],
      message: '',
      fetch: null,
      dataType: null,
      questionData: null,
      language: '',
      spin: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('selectImagesAndQuestions'),
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {

    // console.log(prevState)
    // if (nextProps.questionType && nextProps.questionType.length > 0 && prevState.check == true) {
    //   nextProps.questionType.forEach(e => {
    //     qtype.push({
    //       id: e.id,
    //       name: e.name,
    //       point: e.point,
    //       isChecked: false,
    //       checkType: true,
    //     })
    //   })
    //   return {
    //     questionType: qtype,
    //     check: false
    //   }
    // }

    // I18n.locale = nextProps.language
    // if (I18n.locale != nextProps.language) {

    // nextProps.navigation.setParams({ title: I18n.t('selectImagesAndQuestions') })
    // }


    // if (nextProps.language != prevState.language) {
    //   console.log('change langgggg')
    //   nextProps.navigation.setParams({ title: I18n.t('selectImagesAndQuestions') })
    // }


    if (nextProps.questionType && nextProps.questionType.length != 0) {
      if (chk == true) {
        let qtype = []
        nextProps.questionType.forEach(e => {
          let name = ''
          if (e.name == 'พระแท้ / ไม่แท้' || e.name == 'พระแท้/ไม่แท้') {
            name = I18n.t('trueFalse')
          } else if (e.name == 'ราคาประเมินเช่าพระเครื่อง' || e.name == 'ประเมินราคาพระ') {
            name = I18n.t('pricePhra')
          } else if (e.name == 'ชื่อหลวงพ่อ / ชื่อวัด' || e.name == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง') {
            name = I18n.t('detailPhra')
          }
          qtype.push({
            id: e.id,
            name: name,
            point: e.point,
            isChecked: false,
            checkType: true,
          })
        })
        // console.log(chk)
        chk = false
        return {
          questionType: qtype,
          dataType: nextProps.questionType,
          language: nextProps.language,
          spin: nextProps.request ? nextProps.request : false
        }
      }
    }

    // if (prevState.questionData == null && nextProps.questionData) {
    //   return {
    //     questionData: nextProps.questionData
    //   }
    // }

    let qdata = nextProps.questionData
    if (nextProps.questionData != prevState.questionData && (nextProps.request == false || nextProps.request == true)) {
      // if (chk2 == true) {
      nextProps.getProfile()
      setTimeout(() => {
        Alert.alert(
          'Check Phra',
          I18n.t('sendQuestionSuccess'),
          [
            {
              text: I18n.t('ok'), onPress: () => {
                nextProps.navigation.goBack()
                nextProps.navigation.navigate('his')
              }
            }
          ],
          { cancelable: false }
        )
      }, 1000)

    }

    return {
      questionData: qdata,
      spin: nextProps.request ? nextProps.request : false
    }
  }

  componentDidMount() {
    
    this.props.getProfile()
    this.props.getQuestionType()
    chk = true
    chk2 = true
  }

  componentWillUnmount() {
    this.props.clearImage()
    chk = true
    chk2 = true
    // this.setState({ fetch: null })
  }

  submit = () => {

    //set message and send
    let chk = []
    let cnt = 0
    let chkImage = this.props.images.filter(e => e != undefined)
    // console.log('CHECK IMG')
    // console.log(chkImage)
    this.props.setStart(0, 1)

    this.state.questionType.map((e, i) => {
      // console.log(e)
      if (e.name == I18n.t('trueFalse')) {
        chk.push(1)
      } else {
        if (e.isChecked == true) {
          chk.push(1)
          cnt = cnt + e.point
        } else if (e.isChecked == false) {
          chk.push(0)
        }
      }
    })

    let chk2 = chk.indexOf(1)

    if (this.props.profile.point == 0) {
      Alert.alert(
        'Check Phra',
        I18n.t('notEnoughPoint'),
        [
          { text: I18n.t('addCoin'), onPress: () => { this.props.navigation.navigate('pro') } }
        ],
        { cancelable: false }
      )
    } else {
      if (chkImage.length <= 1) {
        Alert.alert(
          'Check Phra',
          I18n.t('atLeast2Image'),
          [
            { text: I18n.t('ok'), }
          ],
          { cancelable: false }
        )
      } else if (chk2 == -1) {
        Alert.alert(
          'Check Phra',
          I18n.t('atLeast1Question'),
          [
            { text: I18n.t('ok'), }
          ],
          { cancelable: false }
        )
      } else if (chk2 != -1) {
        if (this.props.profile.point < cnt) {
          Alert.alert(
            'Check Phra',
            I18n.t('notEnoughPoint'),
            [
              { text: I18n.t('addCoin'), onPress: () => { this.props.navigation.navigate('pro') } }
            ],
            { cancelable: false }
          )
        }
        else {
          this.props.addQuestion()
          // this.props.navigation.goBack()
          // this.props.navigation.navigate('his')
        }
      }
    }

  }

  render() {

    I18n.locale = this.props.language

    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>

        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 60, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Prompt-Regular",
                alignSelf: "center",
                color: Colors.brownText
              }}>
              {I18n.t('pickImage')}
            </Text>
          </View>
          <View style={styles.uploadRow}>
            <Picker title={I18n.t('frontSide')} id={0} />
            <Picker title={I18n.t('backSide')} id={1} />
            <Picker title={I18n.t('leftSide')} id={2} />
          </View>
          <View style={styles.uploadRow}>
            <Picker title={I18n.t('rightSide')} id={3} />
            <Picker title={I18n.t('bottomSide')} id={4} />
            <Picker title={I18n.t('otherSide')} id={5} />
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
            {I18n.t('selectQuestion')}
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
                      isChecked: i > 0 ? !element.isChecked : true
                    })
                    // console.log(qtype)
                    this.props.setQuestions(qtype)
                    this.setState({ questionType: qtype })
                  }}
                  isChecked={i > 0 ? this.state.questionType[i].isChecked : true}
                  rightText={element.name + " ( " + element.point + " " + I18n.t('coin') + " )"}
                  rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 20 }}
                  checkBoxColor={Colors.brownText}
                />
              })
            }

          </View>

          <View style={{ width: '80%', marginVertical: 20, alignSelf: 'center' }}>
            <RoundedButton title={I18n.t('submit')} onPress={this.submit}
              fetching={this.props.request}
            />
          </View>

        </ScrollView>

        <Spinner
          visible={this.state.spin}
          textContent={'Uploading...'}
          textStyle={{ color: '#fff' }}
        />

      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionType: state.question.questionType,
    questionData: state.question.data_question,
    images: state.question.images,
    profile: state.question.profile,
    p: state.auth.profile,
    auth: state.auth,
    // fetching: state.question.fetching,
    request: state.question.request,   // for add quesiton only
    language: state.auth.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestionType: () => dispatch(QuestionActions.getQuestionType()),
    getProfile: () => dispatch(QuestionActions.getProfile()),
    setQuestions: (questions) => dispatch(QuestionActions.setQuestions(questions)),
    addQuestion: () => dispatch(QuestionActions.addQuestion()),

    // deleteImage: (index) => dispatch(QuestionActions.deleteImage(index)),
    // setImages: (index, source) => dispatch(QuestionActions.setImages(index, source)),
    clearImage: () => dispatch(QuestionActions.clearImage()),
    setStart: (index, num) => dispatch(QuestionActions.setStartQuestion(index, num)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendImageScreen)
