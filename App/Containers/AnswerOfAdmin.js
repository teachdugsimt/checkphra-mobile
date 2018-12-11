import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl, TextInput } from 'react-native'
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
    let plist = newProps.data_answer
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
      answerData: plist,
      full_data
    }
  }

  // _PressList = (item, index) => {
  //     this.props.setDataPoint(item, index)
  //     this.props.navigation.navigate('check2')
  // }

  componentDidMount() {
    count = 1
    this.props.getAnswer(count)
  }

  componentWillUnmount() {
    count = 1
  }

  onRefresh = () => {
    count = 1
    this.props.getAnswer(count)
  }

  _onScrollEndList = () => {
    console.log('END LIST AGAIN')
    count++
    this.props.getAnswer(count)
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
          }}>{I18n.t('bid')}</Text></View>}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width / 1.5}
          height={height / 3.5}
          // height={150}
          onDismissed={() => { this.setState({ price: null }) }}
        >
          <View style={{ flex: 1, paddingTop: 8 }}>
            <Text style={{
              color: Colors.brownText,
              fontSize: 18,
              fontFamily: 'Prompt-SemiBold',
              alignSelf: 'center',
            }}>{this.state.phra_bit ? (this.state.phra_bit.type == 'อื่นๆ หรือ ไม่ทราบ' || this.state.phra_bit.type == 'ไม่ระบุประเภท' ? I18n.t('otherOrUnknown') : I18n.t(this.state.phra_bit.type)) : ''}</Text>

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
            if (item.type == 'เบญจภาคี') {
              name = I18n.t('benjapakee')
            }
            else if (item.type == 'พระสมเด็จ') {
              name = I18n.t('phraSomdej')
            }
            else if (item.type == 'นางพญา') {
              name = I18n.t('phraNangPaya')
            }
            else if (item.type == 'พระคง') {
              name = I18n.t('phraKhong')
            }
            else if (item.type == 'พระรอด') {
              name = I18n.t('phraRod')
            }
            else if (item.type == 'พระผงสุพรรณ') {
              name = I18n.t('phraPhongSuphan')
            }
            else if (item.type == 'พระซุ้มกอ') {
              name = I18n.t('phraSoomkor')
            }
            else if (item.type == 'พระกำแพงเม็ดขนุน') {
              name = I18n.t('phraKampaengMedKanun')
            }
            else if (item.type == 'หลวงปู่ทวด') {
              name = I18n.t('luangPuTuad')
            }
            else if (item.type == 'หลวงปู่หมุน') {
              name = I18n.t('luangPuMoon')
            }
            else if (item.type == 'พระกรุ') {
              name = I18n.t('phraKru')
            }
            else if (item.type == 'เหรียญปั้ม') {
              name = I18n.t('pumpCoin')
            }
            else if (item.type == 'เหรียญหล่อ') {
              name = I18n.t('castingCoin')
            }
            else if (item.type == 'พระผง') {
              name = I18n.t('phraPhong')
            }
            else if (item.type == 'พระกริ่ง') {
              name = I18n.t('phraKring')
            }
            else if (item.type == 'พระปิดตา') {
              name = I18n.t('phraPidta')
            }
            else if (item.type == 'เครื่องราง') {
              name = I18n.t('amulet')
            }
            else if (item.type == 'พระบูชา') {
              name = I18n.t('phraBucha')
            }
            else if (item.type == 'อื่นๆ หรือ ไม่ทราบ' || item.type == 'ไม่ระบุประเภท') {
              name = I18n.t('otherOrUnknown')
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
          onEndReachedThreshold={0.05}
        />



      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
    request2: state.expert.fetch4, //get history
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
    // setAnswer: (pack, q_id, argument, interested) => dispatch(ExpertActions.expertRequest(pack, q_id, argument, interested))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOfAdmin)
