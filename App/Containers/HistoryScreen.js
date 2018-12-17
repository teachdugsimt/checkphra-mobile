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
// import I18n, { getLanguages } from 'react-native-i18n';

import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";
let count = 1
let { width } = Dimensions.get('window')
let check = false
class HistoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      fetch: null,
      data_history: null
    }
  }

  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // console.log(I18n.locale)

    return {
      title: I18n.t('history'),
    }
  }

  componentDidMount() {
    // getLanguages().then(languages => {
    // console.log(languages); // ['en-US', 'en']
    moment.locale('th')
    // });
    count = 1
    this.props.getHistory()
    this.props.clearDataQuestion()
  }
  componentWillMount() {
    count = 1
  }

  componentWillUnmount() {
    count = 1
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

    let hlist = newProps.history
    console.log(newProps)
    console.log(PrevState)
    newProps.getProfile()
    // **************  newProps.data_slip.id != data_history.id  ***********//  not sure
    // if (newProps.data_question != null){
    //   let tmp = newProps.history.find(e=> e.id == newProps.data_question.id)
    //   console.log(tmp)
    //   console.log('HERE TMP DATA HISTORY SCREEN')
    //   if(tmp && tmp != undefined && newProps.data_question.id == tmp.id){
    //     newProps.getHistory()
    //     return {
    //       data_history: newProps.history
    //     }
    //   }
    // }
    // *********************************************************************//

    // data_question
    //beta algorithm test version
    // if (newProps.request_question == false && newProps.data_question != null) {
    //   newProps.getHistory(1)
    //   newProps.getProfile()
    //   return {
    //     data_history: newProps.history
    //   }
    // }
    if (newProps.data_question && newProps.history && newProps.data_question.id && newProps.history[0]) {
      if (newProps.data_question.id != newProps.history[0].id) {
        newProps.getHistory(1)
        newProps.getProfile()
        return {
          data_history: newProps.history
        }
      }
    }

    return {
      data_history: hlist
    }
  }
  _onScrollEndList = () => {
    count++
    this.props.getHistory(count)
  }

  render() {
    I18n.locale = this.props.language
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
          onEndReached={this._onScrollEndList}
          onEndReachedThreshold={0.05}
          data={this.props.history}
          renderItem={({ item }) => {
            // console.log(item)
            let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
            let status = I18n.t('pending')
            let color = 'orange'
            if (item.status == 'success') {
              status = I18n.t('success')
              color = 'green'
            }
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
              name = item.type == 'อื่นๆ หรือ ไม่ทราบ' ? I18n.t('otherOrUnknown') : I18n.t(item.type)
            }

            if (item.status != "delete") {
              return (
                <TouchableOpacity onPress={() => {
                  if (item.status == 'success') {
                    this.goToAnswer(item.id)
                  } else {
                    alert(I18n.t('cantSeeResult'))
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
                      }}>{name}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 12,
                          color: Colors.brownText,
                          // margin: 20
                        }}>{date}</Text>
                        {/* <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 12,
                          color: Colors.brownText,
                          // margin: 20
                        }}> ( {item.id} )</Text> */}
                      </View>
                    </View>
                    <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 15,
                      color: 'white',
                      marginVertical: 20,
                      marginLeft: 20,
                      marginRight: 10,
                      paddingHorizontal: 20,
                      paddingTop: 2.5,
                      borderRadius: 15,
                      height: 30,
                      backgroundColor: color
                    }}>{status}</Text>


                    {/* {item.status == "pending" && <Icon2
                      name="remove"
                      size={26}
                      color={'red'}
                      style={{ marginRight: 10, }}
                      onPress={() => {
                        Alert.alert(
                          'Check Phra',
                          I18n.t('doYouWantToCancelQuestion'),
                          [
                            {
                              text: I18n.t('ok'), onPress: () => {
                                this.props.deleteQuestion(item.id)
                                this.props.getHistory(1)
                                this.props.getProfile()
                              }
                            },
                            { text: I18n.t('cancel'), onPress: () => { } }
                          ]
                        )

                      }}

                    />} */}
                  </View>
                </TouchableOpacity>
              )
            }
          }}
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
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
    request_question: state.question.request,   // request add question
    data_question: state.question.data_question,  // data when add question complete
    language: state.auth.language,
    // access_id: state.auth.user_id,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
    getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
    deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
    clearDataQuestion: () => dispatch(QuestionActions.clearDataQuestion()),
    getProfile: () => dispatch(QuestionActions.getProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
