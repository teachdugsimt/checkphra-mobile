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
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";
let count = 1
let { width, height } = Dimensions.get('window')
let check = false
class HistoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      fetch: null,
      data_history: null,
      data_question: null
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
    if (this.props.data_versatile && this.props.data_versatile.ban == true) {
      this.popupDialogBan.show()
    }
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
    console.log('_______________________ HISTORY SCREEN _________________________________')
    // newProps.getProfile()

    // if (newProps.data_question && newProps.history && newProps.data_question.id && newProps.history[0]) {
    //   if (newProps.data_question.id != newProps.history[0].id) {
    //     newProps.getHistory(1)
    //     newProps.getProfile()
    //     return {
    //       data_history: newProps.history
    //     }
    //   }
    // }

    if (newProps.data_question && newProps.data_question != null) {
      if (newProps.data_question != PrevState.data_question) {
        console.log('--------------------- NEW AMULET UPLOAD ---------------------------------------------------------------------------0--00000000000000000000')
        newProps.getHistory(1)
        return {
          data_question: newProps.data_question
        }
      }
    }

    return {
      data_history: hlist
    }
  }
  _onScrollEndList = () => {
    console.log('END PAGE HHISTORY SCREEN')
    if (this.props.history && this.props.history.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
      count++
      this.props.getHistory(count)
    }
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
          // onEndReachedThreshold={0.025}
          onEndReachedThreshold={1.2}
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
            if (item.type == '100 ?????? ???.???.2515') {
              name = I18n.t('year100era2515')
            }
            if (item.type == '????????????????????????') {
              name = I18n.t('benjapakee')
            }
            else if (item.type == '???????????????????????????') {
              name = I18n.t('phraSomdej')
            }
            else if (item.type == '??????????????????') {
              name = I18n.t('phraNangPaya')
            }
            else if (item.type == '???????????????') {
              name = I18n.t('phraKhong')
            }
            else if (item.type == '??????????????????') {
              name = I18n.t('phraRod')
            }
            else if (item.type == '?????????????????????????????????') {
              name = I18n.t('phraPhongSuphan')
            }
            else if (item.type == '???????????????????????????') {
              name = I18n.t('phraSoomkor')
            }
            else if (item.type == '????????????????????????????????????????????????') {
              name = I18n.t('phraKampaengMedKanun')
            }
            else if (item.type == '??????????????????????????????') {
              name = I18n.t('luangPuTuad')
            }
            else if (item.type == '?????????????????????????????????') {
              name = I18n.t('luangPuMoon')
            }
            else if (item.type == '??????????????????') {
              name = I18n.t('phraKru')
            }
            else if (item.type == '??????????????????????????????') {
              name = I18n.t('pumpCoin')
            }
            else if (item.type == '??????????????????????????????') {
              name = I18n.t('castingCoin')
            }
            else if (item.type == '???????????????') {
              name = I18n.t('phraPhong')
            }
            else if (item.type == '????????????????????????') {
              name = I18n.t('phraKring')
            }
            else if (item.type == '????????????????????????') {
              name = I18n.t('phraPidta')
            }
            else if (item.type == '??????????????????????????????') {
              name = I18n.t('amulet')
            }
            else if (item.type == '?????????????????????') {
              name = I18n.t('phraBucha')
            }
            else if (item.type == '????????????????????????????????????????????????????????????') {
              name = I18n.t('phraWadPhrasatBunyawat')
            }
            else if (item.type == '?????????????????????????????????') {
              name = I18n.t('phraWadRakung')
            }
            else if (item.type == '108 ?????? ???.???.2523') {
              name = I18n.t('year108era2523')
            }
            else if (item.type == '118 ?????? ???.???.2533') {
              name = I18n.t('year118era2533')
            }
            else if (item.type == '122 ?????? ???.???.2537') {
              name = I18n.t('year122era2537')
            }
            else if (item.type == '??????????????? 5 ???.???.2536') {
              name = I18n.t('sat5era2536')
            }
            else if (item.type == '??????????????? 5 ???.???.2539') {
              name = I18n.t('sat5era2539')
            }
            else if (item.type == '214 ???????????????????????? ???.???.2545') {
              name = I18n.t('year214era2545')
            }
            else if (item.type == '?????????????????????????????? ?????? ???.???.2509') {
              name = I18n.t('BangKhunProm2509')
            }
            else if (item.type == '?????????????????????????????? ?????? ???.???.2517') {
              name = I18n.t('BangKhunProm2517')
            }
            else if (item.type == '?????????????????????????????????') {
              name = I18n.t('LuangPhorLhew')
            }
            else if (item.type == "?????????????????????????????????, ?????????????????????????????????, ???????????????????????????") {
              name = I18n.t("newGroup1")
            }
            else if (item.type == "?????????????????????????????? ?????????????????????????????????, ???????????????????????????, ?????????????????????, ????????????????????????") {
              name = item.type
            }
            else if (item.type == "?????????????????????????????????????????????????????????????????????") {
              name = item.type
            }
            else if (item.type == "?????????????????????????????? ????????????????????? ?????????????????????") {
              name = item.type
            }
            else if (item.type == '??????????????? ???????????? ?????????????????????' || item == '???????????????????????????????????????') {
              name = I18n.t('otherOrUnknown')
            }
            else {
              name = item.type
            }

            if (item.status != "delete") {
              return (
                <TouchableOpacity onPress={() => {
                  if (item.status == 'success') {
                    this.goToAnswer(item.id)
                    this.props.updateReadHistory(item)
                  } else {
                    alert(I18n.t('cantSeeResult'))
                  }
                }
                }>
                  <View style={{ height: 80, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {((item.permit == 1 || item.permit == 5) || item.permit == 10) && <Image source={Images.crown} style={{ position: 'absolute', top: -5, left: 50, width: 40, height: 40, zIndex: 1, transform: [{ rotate: '45deg' }] }} />}
                    <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.images[0] }} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }} />
                    <View style={{ flex: 1, padding: 10 }}>
                      <Text style={{
                        fontFamily: 'Prompt-SemiBold',
                        fontSize: 14,
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
                        <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 12,
                          color: Colors.brownText,
                          // margin: 20
                        }}> ( {item.id} )</Text>
                      </View>
                    </View>
                    <Text style={{
                      fontFamily: 'Prompt-SemiBold',
                      fontSize: 14,
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
                  {item.read == 0 && <View
                    style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>}
                </TouchableOpacity>
              )
            }
          }}
          ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
        />
        <PopupDialog
          ref={(popupDialog) => { this.popupDialogBan = popupDialog; }}
          dialogAnimation={slideAnimation}
          width={width}
          height={height - 30}
          onDismissed={() => { }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontFamily: 'Prompt-SemiBold', color: 'red' }}>{I18n.t("accountBan")}</Text>
          </View>

        </PopupDialog>
      </LinearGradient>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.question.history,  // main data
    answer: state.question.answer,
    request2: state.question.request2,  // get history
    images: state.question.images,
    amulet: state.question.amuletType,
    request_question: state.question.request,   // request add question
    data_question: state.question.data_question,  // data when add question complete
    language: state.auth.language,
    data_versatile: state.versatile.data_versatile,  // store versatile data
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
    updateReadHistory: (data) => dispatch(QuestionActions.updateReadHistory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
