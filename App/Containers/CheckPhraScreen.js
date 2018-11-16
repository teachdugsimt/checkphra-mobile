import React, { Component } from 'react'
import {
  Image, Text, View, FlatList, TouchableOpacity,
  Dimensions, RefreshControl, ScrollView, StyleSheet, TextInput, Alert, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import moment from 'moment'
import 'moment/locale/th'
import RoundedButton from "../Components/RoundedButton";
import RoundedButton2 from "../Components/RoundedButton2";
import { Colors, Images, Metrics } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import ImageViewer from 'react-native-image-zoom-viewer';
// Styles
// import styles from './Styles/CheckListScreenStyle'
import CheckBox from 'react-native-check-box'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

const deviceWidth = Dimensions.get('window').width
// const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

class CheckPhraScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: this.props.data.question_list,
      answer_other: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      answer5: null,
      index: 0,
      modalVisible: false,
      checkTrue1: false,
      checkTrue2: false,
      checkFalse: false,
      editing: true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('pending'),
    }
  }

  // static navigationOptions = ({ navigation }) => {
  //   // const params = navigation.state.params || {};

  //   return {
  //     headerLeft: (
  //       <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
  //         <Text
  //           style={{
  //             marginLeft: 20,
  //             fontSize: 18,
  //             fontFamily: "Prompt-SemiBold",
  //             color: Colors.brownText
  //           }}
  //         >
  //           {"< กลับ "}
  //         </Text>
  //         <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold" }}>รายละเอียดส่งตรวจพระ</Text>
  //       </TouchableOpacity>
  //     )
  //   };
  // };
  _onPressButton = () => {
    let tmp = []
    let pack = []

    if (this.state.checkTrue1 == true && this.state.checkTrue2 == false && this.state.checkFalse == false) {
      tmp.push('พระแท้')
    } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == true && this.state.checkFalse == false) {
      tmp.push('พระแท้ย้อนยุค')
    } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkFalse == true) {
      tmp.push('พระไม่แท้')
    }

    if (this.state.answer2) {
      tmp.push(this.state.answer2)
    }
    if (this.state.answer3) {
      tmp.push(this.state.answer3)
    }
    if (this.state.answer_other) {
      tmp.push(this.state.answer_other)
    }

    if (this.state.checkTrue1 == true && this.state.checkTrue2 == true && this.state.checkFalse == true) {
      alert('Please choose one answer in check box')
    } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == true && this.state.checkFalse == true) {
      alert('Please choose one answer in check box')
    } else if (this.state.checkTrue1 == true && this.state.checkTrue2 == true && this.state.checkFalse == false) {
      alert('Please choose one answer in check box')
    } else if (this.state.checkTrue1 == true && this.state.checkTrue2 == false && this.state.checkFalse == true) {
      alert('Please choose one answer in check box')
    } else if (tmp.length == 0) {
      alert('Please answer one question')
    } else {

      this.state.question.map((e, i) => {
        pack.push({
          id: e.id,
          result: tmp[i] ? tmp[i] : ''
        })
      })
      this.props.setAnswer(pack, this.props.data.id)
      this.setState({
        answer_other: null,
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
        answer5: null,
        index: 0,
        modalVisible: false,
      })
      this.props.navigation.goBack()
    }
    // console.log(pack)
  }

  _onPressImage = (obj) => {
    console.log(obj)
  }

  _onPressNotanswer = () => {
    let pack = []
    Alert.alert(
      'Check Phra',
      I18n.t('cannotAnswer'),
      [
        {
          text: I18n.t('ok'), onPress: () => {
            this.props.setAnswer(pack, this.props.data.id)
            this.setState({
              answer_other: null,
              answer1: null,
              answer2: null,
              answer3: null,
              answer4: null,
              answer5: null,
              index: 0,
              modalVisible: false,
            })
            this.props.navigation.goBack()
          }
        },
        { text: I18n.t('cancel') }
      ],
      { cancelable: false }
    )
  }

  _onPressAdmin = () => {
    let pack = []
    Alert.alert(
      'Check Phra',
      I18n.t('sendAdmin'),
      [
        {
          text: I18n.t('ok'), onPress: () => {
            this.props.setAnswer(pack, this.props.data.id)
            this.setState({
              answer_other: null,
              answer1: null,
              answer2: null,
              answer3: null,
              answer4: null,
              answer5: null,
              index: 0,
              modalVisible: false,
            })
            this.props.navigation.goBack()
          }
        },
        { text: I18n.t('cancel') }
      ],
      { cancelable: false }
    )
  }

  render() {
    I18n.locale = this.props.language
    let img = []
    this.props.data.images.map(e => {
      img.push(e)
    })
    // console.log(img)
    let img2 = []
    this.props.data.images.map(e => {
      img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
    })


    // console.log(this.props.data)
    // console.log("*****************************************")
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
        <View style={{ flex: 1 }}>

          <View style={{ flex: 0.4, borderBottomColor: Colors.brownText, borderBottomWidth: 1 }}>
            <ImageViewer
              saveToLocalByLongPress={false}
              imageUrls={img2}
              backgroundColor={'lightgrey'}
              onClick={(e) => {
                console.log('Show modal')
                this.setState({ modalVisible: true })
              }}
              index={this.state.index}
              failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
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
                imageUrls={img2}
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

          </View>

          <View style={{ flex: 0.6 }}>
            <ScrollView>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('question')} </Text>
                <Text style={{ fontSize: 16 }}> {this.props.data.email} </Text>
              </View>
              {this.props.data.question_list.map((e, i) => {
                if (e.question_detail == 'พระแท้ / ไม่แท้' || e.question_detail == 'พระแท้/ไม่แท้' || e.question_detail == 'Real amulet / Fake amulet') {
                  return (
                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                      <Text style={{}}>{I18n.t('trueFalse')}</Text>
                      <CheckBox
                        style={{ flex: 1, marginLeft: 15, marginTop: 5 }}
                        onClick={() => {
                          this.setState({
                            checkTrue1: !this.state.checkTrue1,
                            checkTrue2: false,
                            checkFalse: false,
                            editing: true,
                          })
                        }}
                        isChecked={this.state.checkTrue1}
                        rightText={I18n.t('realPhra')}
                        rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                        checkBoxColor={Colors.brownText}
                      />
                      <CheckBox
                        style={{ flex: 1, marginLeft: 15 }}
                        onClick={() => {
                          this.setState({
                            checkTrue2: !this.state.checkTrue2,
                            checkTrue1: false,
                            checkFalse: false,
                            editing: true,
                          })
                        }}
                        isChecked={this.state.checkTrue2}
                        rightText={I18n.t('realPhraOld')}
                        rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                        checkBoxColor={Colors.brownText}
                      />
                      <CheckBox
                        style={{ flex: 1, marginLeft: 15, marginBottom: 5 }}
                        onClick={() => {
                          this.setState({
                            checkFalse: !this.state.checkFalse,
                            checkTrue1: false,
                            checkTrue2: false,
                            editing: false,
                            answer2: null,
                            answer3: null,
                          })
                        }}
                        isChecked={this.state.checkFalse}
                        rightText={I18n.t('fakePhra')}
                        rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                        checkBoxColor={Colors.brownText}
                      />
                    </View>
                  )
                } else if (e.question_detail == 'ราคาประเมินเช่าพระเครื่อง' || e.question_detail == 'ประเมินราคาพระ' || e.question_detail == 'Price amulet') {
                  return (
                    <View>
                      <Text style={{ marginLeft: 15 }}>{I18n.t('pricePhra')}</Text>
                      <TextInput key={i} value={this.state.answer2} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                        onChangeText={(text) => this.setState({ answer2: text })} editable={this.state.editing} />
                    </View>
                  )
                } else if (e.question_detail == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question_detail == 'ชื่อหลวงพ่อ/ชื่อวัด/ปี พ.ศ. ที่สร้าง' || e.question_detail == 'Priest name / Temple name / Year Buddhist era of creation') {
                  return (
                    <View>
                      <Text style={{ marginLeft: 15 }}>{I18n.t('detailPhra')}</Text>
                      <TextInput key={i} value={this.state.answer3} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                        onChangeText={(text) => this.setState({ answer3: text })} editable={this.state.editing} />
                    </View>
                  )
                }
                else {
                  return (
                    <View>
                      <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                      <TextInput key={i} value={this.state.answer_other} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                        onChangeText={(text) => this.setState({ answer_other: text })} />
                    </View>
                  )
                }

              })}

              <View style={{ width: '65%', alignSelf: 'center', marginTop: 10 }}>
                <RoundedButton
                  style={{ marginHorizontal: 10 }}
                  title={I18n.t('ok')}
                  onPress={this._onPressButton}
                  fetching={this.props.fetching}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: width, paddingTop: 15 }}>
                <View style={{ width: width / 2.5 }}>
                  <RoundedButton
                    style={{ marginHorizontal: 10 }}
                    title={I18n.t('noneAnswer')}
                    onPress={this._onPressNotanswer}
                    fetching={this.props.fetching}
                  />
                </View>

                {this.props.profile.role != "admin" && <View style={{ width: width / 2.5 }}>
                  <RoundedButton
                    style={{ marginHorizontal: 10 }}
                    title={I18n.t('sendToAdmin')}
                    onPress={this._onPressAdmin}
                    fetching={this.props.fetching}
                  />
                </View>}

              </View>

              <View style={{ height: 40 }}>
              </View>

            </ScrollView>
          </View>

        </View>
      </LinearGradient>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    // history: state.question.history,
    profile: state.question.profile,
    data: state.expert.data_phra,
    questionType: state.question.questionType,
    fetching: state.expert.fetch,
    language: state.auth.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (pack, q_id) => dispatch(ExpertActions.expertRequest(pack, q_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPhraScreen)
