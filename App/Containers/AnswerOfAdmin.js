import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl, TextInput, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import TradingActions from '../Redux/TradingRedux'
// Styles
import styles from './Styles/CheckListScreenStyle'
import I18n from '../I18n/i18n';
import RoundedButton from '../Components/RoundedButton';
I18n.fallbacks = true;
// I18n.currentLocale();

let { width, height } = Dimensions.get('window')
let check = true
let count = 1

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class AnswerOfAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answerData: null,
      full_data: null,
      tmp: null,
      price: null,
      phra_bit: null,

      color1: 'lightgrey',
      color2: 'orange',
      color3: 'orange',
      color4: 'orange',
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('adminAnswer'),
    }
  }

  static getDerivedStateFromProps(newProps, prevState) {
    // let plist = newProps.data_answer
    console.log(newProps)
    console.log(prevState)
    // newProps.getAnswer(1)
    let tmp = null
    let full_data = []

    if (newProps.data_answer && prevState.answerData && prevState.answerData != newProps.data_answer) {
      if (newProps.data_answer.length > 0) {
        newProps.data_answer.map(e => {
          full_data.push({
            qid: e.q_id,
            bid_status: !e.bid_status && (e.answer[0].result == 'พระแท้ไม่รู้ที่' || e.answer[0].result == 'พระแท้' || e.answer[0].result == 'พระแท้ย้อนยุค') ? 'can' : 'not',
          })
        })
        newProps.setFullData2(full_data)
      }
    }

    if (newProps.data_updateAnswer && prevState.tmp == null) {
      newProps.getAnswer(1)
      tmp = newProps.data_updateAnswer
      check = false
      return {
        tmp
      }
    } else if (prevState.tmp != null) {
      if (newProps.request3 == true || newProps.request3 == false) {
        if (prevState.tmp != newProps.data_updateAnswer) {  // คำตอบที่แก้ไขไปแล้ว != คำตอบที่แก้ไขใหม่
          newProps.getAnswer(1)
          return {
            tmp: newProps.data_updateAnswer
          }
        }
      }
    }



    return {
      answerData: newProps.data_answer,
      full_data
    }
  }

  componentDidMount() {
    count = 1
    this.props.getAnswer(count)
  }

  componentWillUnmount() {
    count = 1
    this.props.setTypeAnswer(1)
    this.setState({ color1: 'lightgrey', color2: 'orange', color3: 'orange', color4: 'orange' })
  }

  onRefresh = () => {
    count = 1
    this.props.getAnswer(count)
  }

  _onScrollEndList = () => {
    console.log('END LIST AGAIN')
    if (this.props.data_answer && this.props.data_answer.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
      count++
      this.props.getAnswer(count)
    }
  }

  _pressBit = (item) => {
    this.setState({ phra_bit: item })
    this.popupDialog.show()
  }

  _pressBit2 = () => {
    // console.log('FUCK YEAH555')
    this.props.wantBuy(this.state.phra_bit.q_id, true)
    this.props.editFullData2(this.state.phra_bit.q_id)
    // this.props.getAnswer(1)
    this.popupDialog.dismiss()
  }

  rename = (item) => {
    let name = ''
    if (item == '100 ปี พ.ศ.2515') {
      name = I18n.t('year100era2515')
    }
    else if (item == '108 ปี พ.ศ.2523') {
      name = I18n.t('year108era2523')
    }
    else if (item == '118 ปี พ.ศ.2533') {
      name = I18n.t('year118era2533')
    }
    else if (item == '122 ปี พ.ศ.2537') {
      name = I18n.t('year122era2537')
    }
    else if (item == 'เสาร์ 5 พ.ศ.2536') {
      name = I18n.t('sat5era2536')
    }
    else if (item == 'เสาร์ 5 พ.ศ.2539') {
      name = I18n.t('sat5era2539')
    }
    else if (item == '214 ปีชาตกาล พ.ศ.2545') {
      name = I18n.t('year214era2545')
    }
    else if (item == 'บางขุนพรหม ปี พ.ศ.2509') {
      name = I18n.t('BangKhunProm2509')
    }
    else if (item == 'บางขุนพรหม ปี พ.ศ.2517') {
      name = I18n.t('BangKhunProm2517')
    }
    else if (item == 'หลวงพ่อหลิว') {
      name = I18n.t('LuangPhorLhew')
    }
    else if (item == "หลวงปู่หมุน, หลวงปู่โต๊ะ, เจ้าคุณนร") {
      name = item
    }
    else if (item == "พระเครื่องภาคตะวันตก สมุทรสงคราม, กาญจนบุรี, ราชบุรี, เพชรบุรี") {
      name = item
    }
    else if (item == "อื่นๆ หรือ ไม่ทราบ" || item == 'ไม่ระบุประเภท') {
      name = I18n.t('otherOrUnknown')
    }
    else {
      name = item == 'อื่นๆ หรือ ไม่ทราบ' || item == 'ไม่ระบุประเภท' ? I18n.t('otherOrUnknown') : I18n.t(item)
    }
    return name
  }

  _pressList1 = () => {
    this.setState({ color1: 'lightgrey', color2: 'orange', color3: 'orange', color4: 'orange' })
    this.props.clearDataAnswer()
    this.props.setTypeAnswer(1)
    count = 1
    this.props.getAnswer(count)
  }
  _pressList2 = () => {
    this.setState({ color2: 'lightgrey', color1: 'orange', color3: 'orange', color4: 'orange' })
    this.props.clearDataAnswer()
    this.props.setTypeAnswer(2)
    count = 1
    this.props.getAnswer(count)
  }
  _pressList3 = () => {
    this.setState({ color3: 'lightgrey', color2: 'orange', color1: 'orange', color4: 'orange' })
    this.props.clearDataAnswer()
    this.props.setTypeAnswer(3)
    count = 1
    this.props.getAnswer(count)
  }
  _pressList4 = () => {
    this.setState({ color4: 'lightgrey', color2: 'orange', color3: 'orange', color1: 'orange' })
    this.props.clearDataAnswer()
    this.props.setTypeAnswer(0)
    count = 1
    this.props.getAnswer(count)
  }

  render() {
    I18n.locale = this.props.language
    // let data = this.props.data_answer ? JSON.parse(JSON.stringify(this.props.data_answer)) : null
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

        <PopupDialog
          dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
            fontSize: 18, fontWeight: 'bold'
          }}>{I18n.t('interest')}</Text></View>}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.5}
          height={height / 3.1}
          // height={150}
          onDismissed={() => { this.setState({ price: null }) }}
        >
          <View style={{ flex: 1, paddingTop: 8 }}>
            <Text style={{
              color: Colors.brownText,
              fontSize: 18,
              fontFamily: 'Prompt-SemiBold',
              alignSelf: 'center',
              marginHorizontal: 10,
            }}>{this.state.phra_bit ? (this.state.phra_bit.type == 'อื่นๆ หรือ ไม่ทราบ' || this.state.phra_bit.type == 'ไม่ระบุประเภท' ? I18n.t('otherOrUnknown') : this.rename(this.state.phra_bit.type)) : ''}</Text>

            <Text style={{
              color: Colors.brownText,
              fontSize: 18,
              fontFamily: 'Prompt-SemiBold',
              alignSelf: 'center',
            }}>{I18n.t('submitTransaction')}</Text>
            <View style={{ width: '45%', alignSelf: 'center', marginTop: 10 }}>
              <RoundedButton
                style={{ marginHorizontal: 10 }}
                title={I18n.t('ok')}
                onPress={this._pressBit2}
              />
            </View>
          </View>
        </PopupDialog>
        {(this.props.language == 'en' || this.props.language == 'en-US') ?
          <View style={{ flexDirection: 'row', height: 45, width: '100%' }}>
            <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color1, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList1}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('realPhra')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 10, marginTop: 7.5 }}>{I18n.t('realPhra')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color2, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList2}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('realPhraOld')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 10, marginTop: 7.5 }}>{I18n.t('realPhraOld')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color3, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList3}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('realPhranowhere')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 10, marginTop: 7.5 }}>{I18n.t('realPhranowhere')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color4, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList4}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('fakePhra')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 10, marginTop: 7.5 }}>{I18n.t('fakePhra')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View> : <View style={{ flexDirection: 'row', height: 45, width: '100%' }}>
            <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color1, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList1}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('realPhra')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 17, marginTop: 7.5 }}>{I18n.t('realPhra')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color2, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList2}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('realPhraOld')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 17, marginTop: 7.5 }}>{I18n.t('realPhraOld')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color3, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList3}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('realPhranowhere')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 17, marginTop: 7.5 }}>{I18n.t('realPhranowhere')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: Colors.milk, borderTopWidth: 5, borderTopColor: this.state.color4, borderRightWidth: 1, borderRightColor: 'orange' }} onPress={this._pressList4}>
                {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('fakePhra')}</Text> */}
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: Colors.brownTextTran, marginHorizontal: 17, marginTop: 7.5 }}>{I18n.t('fakePhra')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>}

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.props.request2 == true}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          data={this.props.data_answer && this.props.data_answer.length > 0 && JSON.parse(JSON.stringify(this.props.data_answer))}
          // data={data}
          renderItem={({ item, index }) => {
            let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
            // let status = 'รอตรวจ'
            let color = 'orange'

            let tmp = this.props.full_data2 && this.props.full_data2.length > 0 ? this.props.full_data2.find(e => e.qid == item.q_id) : null

            let name = ''
            if (item.type == '100 ปี พ.ศ.2515') {
              name = I18n.t('year100era2515')
            }
            else if (item.type == '108 ปี พ.ศ.2523') {
              name = I18n.t('year108era2523')
            }
            else if (item.type == '118 ปี พ.ศ.2533') {
              name = I18n.t('year118era2533')
            }
            else if (item.type == '122 ปี พ.ศ.2537') {
              name = I18n.t('year122era2537')
            }
            else if (item.type == 'เสาร์ 5 พ.ศ.2536') {
              name = I18n.t('sat5era2536')
            }
            else if (item.type == 'เสาร์ 5 พ.ศ.2539') {
              name = I18n.t('sat5era2539')
            }
            else if (item.type == '214 ปีชาตกาล พ.ศ.2545') {
              name = I18n.t('year214era2545')
            }
            else if (item.type == 'บางขุนพรหม ปี พ.ศ.2509') {
              name = I18n.t('BangKhunProm2509')
            }
            else if (item.type == 'บางขุนพรหม ปี พ.ศ.2517') {
              name = I18n.t('BangKhunProm2517')
            }
            else if (item.type == 'หลวงพ่อหลิว') {
              name = I18n.t('LuangPhorLhew')
            }
            else {
              name = item.type == ('อื่นๆ หรือ ไม่ทราบ' || item.type == 'ไม่ระบุประเภท') ? I18n.t('otherOrUnknown') : I18n.t(item.type)
            }

            if (this.props.full_data2 != null && this.props.full_data2.length > 0)
              return (
                <TouchableOpacity onPress={() => {
                  this.props.setAnswerDetail(item)
                  this.props.navigation.navigate('detail')
                }
                }>
                  <View style={{ height: 80, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.images[0] }} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }} />
                    <View style={{ flex: 1, padding: 10 }}>

                      <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 18,
                        color: Colors.brownText,
                        // margin: 20
                      }}>{name}</Text>

                      <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 12,
                        color: Colors.brownText,
                        // margin: 20
                      }}>{date} <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 12,
                        color: Colors.brownText,
                        // margin: 20
                      }}> ( {item.q_id} )</Text></Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.35, height: 80 }}>

                      {item && tmp && tmp.bid_status && tmp.bid_status == 'can' && !item.bid_status && (item.answer[0].result == 'พระแท้ไม่รู้ที่' || item.answer[0].result == 'พระแท้ย้อนยุค' || item.answer[0].result == 'พระแท้') && <TouchableOpacity style={{
                        backgroundColor: 'green',
                        height: 30, borderRadius: 15, width: '85%', marginVertical: 5, justifyContent: 'center'
                      }} onPress={() => this._pressBit(item)}>
                        <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 15, color: 'white', alignSelf: 'center'
                        }}>{I18n.t('bid2')}</Text>
                      </TouchableOpacity>}

                      {/* <View style={{
                        backgroundColor: 'orange',
                        height: 30, borderRadius: 15, width: '85%', marginVertical: 5, justifyContent: 'center'
                      }} onPress={() => this._pressBit(item)}>
                        <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 15, color: 'white', alignSelf: 'center'
                        }}>{I18n.t('edit')}</Text>
                      </View> */}

                    </View>

                  </View>
                </TouchableOpacity>
              )
          }}
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
          onEndReached={this._onScrollEndList}
          // onEndReachedThreshold={0.025}
          onEndReachedThreshold={1.2}
        />



      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
    request2: state.expert.fetch4, //get answer admin
    request3: state.expert.fetch5, // send answer
    data_answer: state.expert.data_answer,
    data_updateAnswer: state.expert.data_updateAnswer,

    data_bit: state.trading.data,
    // fetch_bid: state.trading.fetching,
    full_data2: state.trading.full_data2,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAnswer: (page) => dispatch(ExpertActions.answerList(page)),
    setAnswerDetail: (data) => dispatch(ExpertActions.setAnswerDetail(data)),
    trading: (qid, message) => dispatch(TradingActions.tradingRequest(qid, message)),
    setFullData2: (data) => dispatch(TradingActions.setFullData2(data)),
    editFullData2: (qid) => dispatch(TradingActions.editFullData2(qid)),
    wantBuy: (qid, interest) => dispatch(TradingActions.wantBuy(qid, interest)),
    setTypeAnswer: (data) => dispatch(ExpertActions.setTypeAnswer(data)),
    clearDataAnswer: () => dispatch(ExpertActions.clearDataAnswer()),
    // setAnswer: (pack, q_id, argument, interested) => dispatch(ExpertActions.expertRequest(pack, q_id, argument, interested))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOfAdmin)
