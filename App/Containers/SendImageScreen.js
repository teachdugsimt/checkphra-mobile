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

import I18n from '../I18n/i18n';
I18n.fallbacks = true;
I18n.currentLocale();
// I18n.locale = "th";

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

let { width } = Dimensions.get('window')

class SendImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
      questionType: [1],
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
    if (nextProps.request) {
      if (nextProps.images.length != 0) {
        checkFecth = true
      }
    }

    return {
      questionType: qtype,
      fetch: checkFecth
    }
  }

  componentDidMount() {
    this.props.getProfile()
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

        const d = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          tmp_name: response.path,
          size: response.size
        }

        console.log(d)

        this.props.setImages(this.props.id, d)
      }
    });
  }

  submit = () => {
    //set message and send
    let chk = []
    let cnt = 0
    let chkImage = this.props.images.filter(e => e != undefined)



    this.state.questionType.map((e, i) => {
      if(e.name == "พระแท้/ไม่แท้"){
        chk.push(1)
      }
      if (e.isChecked == true) {
        chk.push(1)
        cnt = cnt + e.point
      } else if (e.isChecked == false) {
        chk.push(0)
      }
    })

    let chk2 = chk.indexOf(1)

    if (chkImage.length < 2) {
      Alert.alert(
        'Check Phra',
        I18n.t('atLeast2Image'),
        [
          { text: I18n.t('ok'), }
        ],
        { cancelable: false }
      )
    } else if (chk2 == -1 ) {
      Alert.alert(
        'Check Phra',
        I18n.t('atLeast1Question'),
        [
          { text: I18n.t('ok'), }
        ],
        { cancelable: false }
      )
    } else if (chk2 != -1 ) {
      if (this.props.profile.point < cnt) {
        Alert.alert(
          'Check Phra',
          I18n.t('notEnoughPoint'),
          [
            { text: I18n.t('addCoin'), onPress: () => { this.props.navigation.navigate('pro') } }
          ],
          { cancelable: false }
        )
      } else {
        this.props.addQuestion()
        // this.props.navigation.goBack()
        // this.props.navigation.navigate('his')
      }
    }


  }

  render() {
    const point = [5, 5, 3, 3, 15]

    // if (this.state.fetch == true) {
    //   this.props.navigation.goBack()
    //   this.props.navigation.navigate('his')
    // }

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
              }}
            >
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

                    this.props.setQuestions(qtype)
                    this.setState({ questionType: qtype })
                  }}
                  isChecked={i > 0 ? this.state.questionType[i].isChecked : true}
                  rightText={element.name + " ( ฿ " + point[i] + " )"}
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
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionType: state.question.questionType,
    images: state.question.images,
    profile: state.question.profile,
    p: state.auth.profile,
    auth: state.auth,
    // fetching: state.question.fetching,
    request: state.question.request,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendImageScreen)
