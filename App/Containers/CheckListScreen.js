import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'

import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
// Styles
import styles from './Styles/CheckListScreenStyle'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();

const { width } = Dimensions.get('window')
let check = true
let count = 1
class CheckListScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      fetch: null,
      data_tmp: null
    }
  }

  componentDidMount() {
    moment.locale('th')
    this.props.getHistory()
  }

  componentWillMount() {
    count = 1
  }

  componentWillUnmount() {
    count = 1
  }

  _gotoCheckphra = (item) => {
    // console.log(item)
    this.props.setDataPhra(item)
    this.props.navigation.navigate('check2')
  }

  goToAnswer = (qid) => {
    // console.log(qid)
    this.props.getAnswer(qid)
    this.props.navigation.navigate('answer')
  }

  onRefresh = () => {
    count = 1
    this.props.getHistory(count)
  }

  static getDerivedStateFromProps(newProps, PrevState) {
    let plist = newProps.history
    console.log(newProps)
    console.log(PrevState)
    // if (PrevState.data_tmp == null || !PrevState.data_tmp || PrevState.data_tmp.length == 0) {
    //   newProps.getHistory()
    //   return {
    //     data_tmp: newProps.history
    //   }
    // }

    if (newProps.data_answer != null) {
      let tmp = newProps.history.find(e => e.id == newProps.data_answer.q_id)
      if (tmp && tmp != undefined && newProps.data_answer.q_id == tmp.id) {
        newProps.getHistory(1)
        return {
          data_tmp: newProps.history
        }
      }
    }

    return {
      // fetch: checkRequest,
      data_tmp: plist
    }
  }

  _onScrollEndList = () => {
    console.log('END OF LIST AGAIN')
    count++
    this.props.getHistory(count)
  }

  render() {
    I18n.locale = this.props.language
    // console.log(this.props.history)
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
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.props.request2 == true}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          data={this.props.history}
          renderItem={({ item }) => {
            let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
            let status = 'รอตรวจ'
            let color = 'orange'
            if (item.status == 'success') {
              status = 'ตรวจแล้ว'
              color = 'green'
            }
            return (
              <TouchableOpacity onPress={() => {
                if (item.status == 'success') {
                  this.goToAnswer(item.id)
                  // this._gotoCheckphra(item)
                } else {
                  this._gotoCheckphra(item)
                  // alert('ยังไม่มีผลการตรวจ')
                }
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
                    }}>{item.type}</Text>
                    <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 12,
                      color: Colors.brownText,
                      // margin: 20
                    }}>{date}</Text>
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
    history: state.question.history,
    answer: state.question.answer,
    request2: state.question.request2,
    images: state.question.images,
    amulet: state.question.amuletType,
    // access_id: state.auth.user_id,
    request1: state.expert.fetch,
    data_answer: state.expert.data_answer,
    language: state.auth.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
    getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
    deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
    setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListScreen)
