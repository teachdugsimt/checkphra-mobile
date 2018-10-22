import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'
// Styles
import styles from './Styles/HistoryScreenStyle'
import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";

let { width } = Dimensions.get('window')

class HistoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      fetch: null,
    }
  }

  componentDidMount() {
    moment.locale('th')
    this.props.getHistory()
  }

  goToAnswer = (qid) => {
    // console.log(qid)
    this.props.getAnswer(qid)
    this.props.navigation.navigate('answer')
  }

  onRefresh = () => {
    this.props.getHistory()
  }

  static getDerivedStateFromProps(newProps, PrevState) {
    // let checkRequest = null
    console.log(newProps)
    if (newProps.request2 == false && newProps.amulet != 0) {
      checkRequest = true
    } else if (newProps.amulet == 0) {
      checkRequest = false
    }

    if (newProps.request2 == null) {
      checkRequest = false
    }

    return {
      fetch: checkRequest,
    }
  }

  render() {
    // if (this.state.fetch == true) {
    // this.props.getHistory()
    // }
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
              refreshing={this.props.request_question == true || this.props.request2 == true}
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
                } else {
                  alert('ยังไม่มีผลการตรวจ55555')
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
                  <Text style={{
                    fontFamily: 'Prompt-SemiBold',
                    fontSize: 15,
                    color: 'white',
                    margin: 20,
                    paddingHorizontal: 20,
                    paddingTop: 5,
                    borderRadius: 15,
                    height: 30,
                    backgroundColor: color
                  }}>{status}</Text>
                  <Icon2
                    name="remove"
                    size={26}
                    color={'red'}
                    style={{ marginRight: 10, }}
                    onPress={() => {
                      Alert.alert(
                        'Check Phra',
                        'คุณต้องการยกเลิกคำถามนี้ ?',
                        [
                          {
                            text: 'ตกลง', onPress: () => {
                              this.props.deleteQuestion(item.id)
                              this.props.getHistory()
                            }
                          },
                          { text: 'ยกเลิก', onPress: () => { } }
                        ]
                      )

                    }}

                  />
                </View>
              </TouchableOpacity>
            )
          }}
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
    request_question: state.question.request,
    // access_id: state.auth.user_id,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: () => dispatch(QuestionActions.getHistory()),
    getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
    deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
