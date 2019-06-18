import React, { Component } from 'react'
import {
  Image, Text, View, FlatList, TouchableOpacity,
  Dimensions, RefreshControl, ScrollView, StyleSheet, TextInput, Alert, Modal, Linking
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
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
// Styles
// import styles from './Styles/CheckListScreenStyle'
import CheckBox from 'react-native-check-box'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

// const { height } = Dimensions.get('window')
const { width, height } = Dimensions.get('window')
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

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
      checkTrue3: false,
      checkFalse: false,
      editing: true,

      editans1: false,
      editans2: true,
      editans3: true,
      checkNone1: false,
      checkNone2: false,
      checkNone3: false,

      interested: false,
      permit: false,
      autoText: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('pending'),
    }
  }

  componentDidMount() {
    this.props.getText()
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

  static getDerivedStateFromProps(newProps, prevState) {
    console.log(newProps)
    console.log(prevState)

    if (newProps.data_text) {
      return {
        autoText: newProps.data_text
      }
    }

    return {
      autoText: newProps.data_text
    }
  }

  _onPressButton = () => {
    let tmp = []
    let pack = []

    if (this.state.checkNone1 == true && this.state.checkNone2 == true && this.state.checkNone3 == true) {
      this._onPressNotanswer()
    } else {
      Alert.alert(
        'Check Phra',
        I18n.t('submitTransaction'),
        [
          {
            text: I18n.t('ok'), onPress: () => {

              // console.log(this.props.data.question_list)
              let qlist = this.props.data && this.props.data.question_list ? this.props.data.question_list.map(e => e.question) : []
              console.log(qlist)

              // ตรวจสอบ กล่องเช็ค ว่าถ้าไม่ตอบแล้วต้องติ้ก กล่องเช็ค ไม่งั้นจะเด้งแจ้งเตือนนะ
              if (
                this.state.checkTrue1 == false && this.state.checkTrue2 == false &&
                this.state.checkTrue3 == false && this.state.checkFalse == false &&
                this.state.checkNone1 == false && qlist.includes(1)) {
                console.log('error 1')
                alert(I18n.t('pleaseAnswerQuestion'))
              } else if (this.state.checkNone2 == false && !this.state.answer2 && qlist.includes(2)) {
                console.log('error 2')
                alert(I18n.t('pleaseAnswerQuestion'))
              } else if (this.state.checkNone3 == false && !this.state.answer3 && qlist.includes(3)) {
                console.log('error 3')
                alert(I18n.t('pleaseAnswerQuestion'))
              } else {

                if (this.state.checkTrue1 == true && this.state.checkTrue2 == false && this.state.checkFalse == false && this.state.checkTrue3 == false) {
                  tmp.push('พระแท้')
                } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == true && this.state.checkFalse == false && this.state.checkTrue3 == false) {
                  tmp.push('พระแท้ย้อนยุค')
                } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkFalse == true && this.state.checkTrue3 == false) {
                  tmp.push('พระไม่แท้')
                } else if (this.state.checkTrue3 == true && this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkFalse == false) {
                  tmp.push('พระแท้ไม่รู้ที่')
                } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkTrue3 == false && this.state.checkFalse == false) {
                  tmp.push('ไม่ออกผล')
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

                if (tmp.length == 0) {
                  alert(I18n.t('atLeast'))
                } else {

                  this.state.question.map((e, i) => {
                    pack.push({
                      id: e.id,
                      result: tmp[i] ? tmp[i] : ''
                    })
                  })
                  this.props.setAnswer(pack, this.props.data.id, this.state.answer4, this.state.interested, this.state.permit)
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

              }


            }
          },
          { text: I18n.t('cancel') }
        ]
      )

    }
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
            this.props.setAnswer(pack, this.props.data.id, this.state.answer4, this.state.interested)
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

  pressAutoButton = () => {
    this.popupDialog.show()
  }
  pressText = (item) => {
    this.setState({ answer4: item })
    this.popupDialog.dismiss()
  }

  _goToURL = (item) => {
    // const url = 'm.me/316834699141900'
    // const url = 'https://www.messenger.com/t/' + item    // pc , mobile
    const url = 'https://m.me?app_scoped_user_id=' + item
    // const url = 'https://m.me/316834699141900' // pc , mobile can't use
    console.log(url)
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });

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
    // console.log(this.props.data.fb_id)
    console.log(this.props.data)
    console.log("*****************************************")
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
          <PopupDialog
            dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
              fontSize: 18, fontWeight: 'bold'
            }}>{I18n.t('autoText')}</Text></View>}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation={slideAnimation}
            width={width / 1.15}
            // height={height / (this.state.autoText ? (this.state.autoText.length + (1.5)) : 3.5)}
            height={height / 2.5}
            // height={150}
            onDismissed={() => { this.setState({}) }}
          >
            <ScrollView style={{ flex: 1 }}>
              {this.state.autoText && this.state.autoText.map((e, i) => {
                return <TouchableOpacity key={'auto' + i} onPress={() => this.pressText(e.text)} style={{
                  borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, padding: 10
                }}><Text style={{ fontSize: 16, color: Colors.brownText, alignSelf: 'center', textAlignVertical: 'center', }}>{e.text}</Text></TouchableOpacity>
              })}
            </ScrollView>
          </PopupDialog>

          <View style={{ flex: 0.37, paddingTop: 10 }}>
            <ImageViewer
              saveToLocalByLongPress={false}
              imageUrls={img2}
              backgroundColor={'transparent'}
              onChange={index => this.setState({ index })}
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

          <View style={{ flex: 0.63 }}>
            <ScrollView>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('question') + " ( " + this.props.data.id + " )"} </Text>
                {this.props.data && !this.props.data.fb_id && <Text style={{ fontSize: 16, color: Colors.brownTextTran, marginHorizontal: 18, marginVertical: 4 }}> {this.props.data.name ? this.props.data.name : this.props.data.email} </Text>}
                {this.props.data && this.props.data.fb_id && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', borderRadius: 15 }} onPress={() => this._goToURL(this.props.data.fb_id)}>
                  <Text style={{ fontSize: 16, color: Colors.brownTextTran, marginHorizontal: 18, marginVertical: 4 }}> {this.props.data.name} </Text>
                </TouchableOpacity>}
              </View>
              {this.props.data.question_list.map((e, i) => {
                if (
                  // e.question_detail == 'พระแท้ / ไม่แท้' || e.question_detail == 'พระแท้/ไม่แท้' || e.question_detail == 'Real amulet / Fake amulet'
                  e.question == 1
                ) {
                  return (

                    <View key={i} style={{ marginHorizontal: 15, backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                        <Text style={{ flex: 2 }}>1) {I18n.t('trueFalse')}</Text>
                        {/* disable question 1 */}
                        <CheckBox
                          style={{ flex: 1, marginLeft: 8, marginBottom: 10 }}
                          onClick={() => {
                            this.setState({
                              checkNone1: !this.state.checkNone1,
                              checkTrue1: false,
                              checkTrue2: false,
                              checkTrue3: false,
                              checkFalse: false,
                              editans1: !this.state.editans1,
                              interested: false,
                              permit: false,
                              // editing: !this.state.editing,
                            })
                          }}
                          isChecked={this.state.checkNone1}
                          rightText={I18n.t('noneAnswer')}
                          rightTextStyle={{ color: Colors.brownText, fontWeight: 'bold', fontSize: 14 }}
                          checkBoxColor={Colors.brownText}
                        />
                        {/* disable question 1 */}
                      </View>

                      <CheckBox
                        style={{ flex: 1, marginLeft: 15, marginTop: -5 }}
                        onClick={() => {
                          this.setState({
                            checkTrue1: !this.state.checkTrue1,
                            checkTrue2: false,
                            checkTrue3: false,
                            checkFalse: false,
                            editing: true,
                          })
                        }}
                        disabled={this.state.editans1}
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
                            checkTrue3: false,
                            checkFalse: false,
                            editing: true,
                          })
                        }}
                        disabled={this.state.editans1}
                        isChecked={this.state.checkTrue2}
                        rightText={I18n.t('realPhraOld')}
                        rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                        checkBoxColor={Colors.brownText}
                      />
                      <CheckBox
                        style={{ flex: 1, marginLeft: 15 }}
                        onClick={() => {
                          this.setState({
                            checkTrue3: !this.state.checkTrue3,
                            checkTrue1: false,
                            checkTrue2: false,
                            checkFalse: false,
                            editing: true,
                          })
                        }}
                        disabled={this.state.editans1}
                        isChecked={this.state.checkTrue3}
                        rightText={I18n.t('realPhranowhere')}
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
                            checkTrue3: false,
                            editing: !this.state.editing,  // ควบคุม checkBox2 - checkBox3
                            answer2: null,
                            answer3: null,
                            checkNone2: true,  // check none 2
                            checkNone3: true,  // check none 3
                            editans2: false,  // ควบคุม textInput 2
                            editans3: false,  // ควบคุม textInput 3
                            interested: false,
                            permit: false,
                          })
                        }}
                        disabled={this.state.editans1}
                        isChecked={this.state.checkFalse}
                        rightText={I18n.t('fakePhra')}
                        rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                        checkBoxColor={Colors.brownText}
                      />

                      <Text style={{ marginLeft: 15 }}>{I18n.t('reason')}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput key={i} value={this.state.answer4} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15, flex: 1 }}
                          onChangeText={(text) => this.setState({ answer4: text })} />
                        <View style={{ alignItems: 'flex-end', width: 35, height: 30, marginTop: 10, marginRight: 10 }}>
                          {this.state.autoText && <TouchableOpacity style={{ backgroundColor: 'transparent', width: 35, height: 30, borderRadius: 5, position: 'absolute' }} onPress={this.pressAutoButton}>
                            <Icon2 name={'pencil'} size={24} style={{ alignSelf: 'center' }} /></TouchableOpacity>}
                        </View>
                      </View>

                    </View>
                  )
                } else if (
                  // e.question_detail == 'ราคาประเมินเช่าพระเครื่อง' || e.question_detail == 'ประเมินราคาพระ' || e.question_detail == 'Price amulet'
                  e.question == 2
                ) {
                  return (
                    <View style={{ marginHorizontal: 15, backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={{ flex: 2, marginLeft: 15 }}>2) {I18n.t('pricePhra')}</Text>
                        {/* disable question 2 */}
                        <CheckBox
                          style={{ flex: 1, marginLeft: 8, marginBottom: 10 }}
                          onClick={() => {
                            this.setState({
                              checkNone2: !this.state.checkNone2,
                              editans2: !this.state.editans2,
                              answer2: 'ไม่ออกผล',
                            })
                          }}
                          disabled={!this.state.editing}
                          isChecked={this.state.checkNone2}
                          rightText={I18n.t('noneAnswer')}
                          rightTextStyle={{ color: Colors.brownText, fontWeight: 'bold', fontSize: 14 }}
                          checkBoxColor={Colors.brownText}
                        />
                        {/* disable question 2 */}
                      </View>

                      <TextInput key={i} value={this.state.answer2} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15, marginTop: -10 }}
                        // onChangeText={(text) => this.setState({ answer2: text })} editable={this.state.editing} />
                        onChangeText={(text) => this.setState({ answer2: text })} editable={this.state.editans2} />
                    </View>
                  )
                } else if (
                  // e.question_detail == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question_detail == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question_detail == 'Priest name / Temple name / Year Buddhist era of creation'
                  e.question == 4 || e.question == 3
                ) {
                  console.log("question 3")
                  return (
                    <View style={{ marginHorizontal: 15, backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 10 }}>
                      {this.props.language && (this.props.language == 'th' || this.props.language == 'th-TH') &&
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ flex: 2, marginLeft: 15 }}>3) {I18n.t('detailPhra')}</Text>
                            {/* disable question 3 */}

                            <CheckBox
                              style={{ flex: 1, marginLeft: 20 }}
                              onClick={() => {
                                this.setState({
                                  checkNone3: !this.state.checkNone3,
                                  editans3: !this.state.editans3,
                                  answer3: 'ไม่ออกผล',
                                })
                              }}
                              // disabled={!this.state.editing}
                              isChecked={this.state.checkNone3}
                              rightText={I18n.t('noneAnswer')}
                              rightTextStyle={{ color: Colors.brownText, fontWeight: 'bold', fontSize: 14 }}
                              checkBoxColor={Colors.brownText}
                            />
                            {/* disable question 3 */}
                          </View>

                          <TextInput value={this.state.answer3} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                            onChangeText={(text) => this.setState({ answer3: text })} editable={this.state.editans3} />
                        </View>
                      }

                      {this.props.language && (this.props.language == 'en' || this.props.language == 'en-US') &&
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ flex: 2, marginLeft: 15 }}>3) {I18n.t('detailPhra')}</Text>
                            {/* disable question 3 */}
                            <CheckBox
                              style={{ flex: 1, marginLeft: 8 }}
                              onClick={() => {
                                this.setState({
                                  checkNone3: !this.state.checkNone3,
                                  editans3: !this.state.editans3,
                                  answer3: 'ไม่ออกผล',
                                })
                              }}
                              disabled={!this.state.editing}
                              isChecked={this.state.checkNone3}
                              rightText={I18n.t('noneAnswer')}
                              rightTextStyle={{ color: Colors.brownText, fontWeight: 'bold', fontSize: 14 }}
                              checkBoxColor={Colors.brownText}
                            />
                          </View>
                          {/* disable question 3 */}
                          <TextInput value={this.state.answer3} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                            onChangeText={(text) => this.setState({ answer3: text })} editable={this.state.editans3} />
                        </View>
                      }

                    </View>
                  )
                }

              })}

              {/* ***************INTERESTED AMULET**************** */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                <CheckBox
                  style={{ marginLeft: 8, width: 200 }}
                  onClick={() => {
                    this.setState({
                      interested: !this.state.interested
                    })
                  }}
                  disabled={this.state.checkFalse}
                  isChecked={this.state.interested}
                  rightText={I18n.t('leasing')}
                  rightTextStyle={{ color: Colors.brownText, fontWeight: 'bold', fontSize: 14 }}
                  checkBoxColor={Colors.brownText}
                />
              </View>
              {/* ***************INTERESTED AMULET**************** */}

              {/* ***************PERMIT ZONE**************** */}
              {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>

                <CheckBox
                  style={{ marginLeft: 8, width: 200 }}
                  onClick={() => {
                    this.setState({
                      permit: !this.state.permit
                    })
                  }}
                  disabled={(this.state.checkFalse || this.state.checkNone1)}
                  isChecked={this.state.permit}
                  rightText={I18n.t('license')}
                  rightTextStyle={{ color: Colors.brownText, fontWeight: 'bold', fontSize: 14 }}
                  checkBoxColor={Colors.brownText}
                />
              </View> */}
              {/* ***************PERMIT ZONE**************** */}


              <View style={{ width: '65%', alignSelf: 'center', marginTop: 10 }}>
                <RoundedButton
                  style={{ marginHorizontal: 10 }}
                  title={I18n.t('ok')}
                  onPress={this._onPressButton}
                  fetching={this.props.fetching}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: width, paddingTop: 15 }}>
                {/* <View style={{ width: width / 2.5 }}>
                  <RoundedButton
                    style={{ marginHorizontal: 10 }}
                    title={I18n.t('noneAnswer')}
                    onPress={this._onPressNotanswer}
                    fetching={this.props.fetching}
                  />
                </View> */}

                {/* {this.props.profile && this.props.profile.role != "admin" && <View style={{ width: width / 2.5 }}>
                  <RoundedButton
                    style={{ marginHorizontal: 10 }}
                    title={I18n.t('sendToAdmin')}
                    onPress={this._onPressAdmin}
                    fetching={this.props.fetching}
                  />
                </View>} */}

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
    fetch7: state.expert.fetch7, // for request automatic text
    data_text: state.expert.data_text,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (pack, q_id, argument, interested, permit) => dispatch(ExpertActions.expertRequest(pack, q_id, argument, interested, permit)),
    getText: () => dispatch(ExpertActions.getAutoText()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPhraScreen)
