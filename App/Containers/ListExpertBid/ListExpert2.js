import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions, AsyncStorage,
    TextInput, Linking, ImageBackground, Image, Platform, Alert, FlatList, RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import I18n from '../../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import styles from '../Styles/HomeScreenStyle'
import QuestionActions from '../../Redux/QuestionRedux'
import AuthActions from '../../Redux/AuthRedux'
import ExpertActions from '../../Redux/ExpertRedux'
import moment from 'moment'
import 'moment/locale/th'
I18n.fallbacks = true;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class ListExpert2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
          answerData: null,
          full_data: null,
          tmp: null,
        }
      }
    
    //   static navigationOptions = ({ navigation }) => {
    //     // console.log(navigation)
    //     // console.log(I18n.locale)
    
    //     return {
    //       title: I18n.t('bitPrice2'),
    //     }
    //   }
    
      static getDerivedStateFromProps(newProps, prevState) {
        // let plist = newProps.data_getListDetailExpertBid
        console.log(newProps)
        console.log(prevState)
        // newProps.getAnswer(1)
        // let tmp = null
        // if (newProps.data_updateAnswer && prevState.tmp == null) {
        //     if (check == true) {
        //         newProps.getAnswer(1)
        //         tmp = newProps.data_updateAnswer
        //         check = false
        //         return {
        //             tmp
        //         }
        //     }
        // }
    
        // if (newProps.data_updateAnswer && prevState.tmp == null) {
        //     newProps.getAnswer(1)
        //     tmp = newProps.data_updateAnswer
        //     check = false
        //     return {
        //         tmp
        //     }
        // } else if (prevState.tmp != null) {
        //     if (newProps.request3 == true || newProps.request3 == false) {
        //         if (prevState.tmp != newProps.data_updateAnswer) {  // คำตอบที่แก้ไขไปแล้ว != คำตอบที่แก้ไขใหม่
        //             newProps.getAnswer(1)
        //             return {
        //                 tmp: newProps.data_updateAnswer
        //             }
        //         }
        //     }
        // }
    
        // if (prevState.tmp != null) {
    
        //     if (prevState.tmp != newProps.data_updateAnswer) {  // คำตอบที่แก้ไขไปแล้ว != คำตอบที่แก้ไขใหม่
        //         newProps.getAnswer(1)
        //         return {
        //             tmp: newProps.data_updateAnswer
        //         }
        //     }
        // }
    
    
        return {
          // answerData: plist
        }
      }
    
      // _PressList = (item, index) => {
      //     this.props.setDataPoint(item, index)
      //     this.props.navigation.navigate('check2')
      // }
    
      componentDidMount() {
        count = 1
        this.props.getListDetailExpertBid(count)
      }
    
      componentWillUnmount() {
        count = 1
      }
    
      onRefresh = () => {
        count = 1
        this.props.getListDetailExpertBid(count)
      }
    
      _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_getListDetailExpertBid && this.props.data_getListDetailExpertBid.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
          count++
          this.props.getListDetailExpertBid(count)
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
                  refreshing={this.props.request_getListDetailExpertBid == true}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              data={this.props.data_getListDetailExpertBid && this.props.data_getListDetailExpertBid.length > 0 && JSON.parse(JSON.stringify(this.props.data_getListDetailExpertBid))}
              // data={data}
              renderItem={({ item }) => {
                let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
                // let status = 'รอตรวจ'
                let dice = null
                let color = ''
                let message = ''
                if (item.status == 'approve') {
                  dice = '100%'
                  color = 'green'
                  message = I18n.t('approve')
                } else if (item.status == 'bargain') {
                  dice = '94%'
                  color = 'orange'
                  message = I18n.t('bargain')
                } else if (item.status == 'cancel') {
                  dice = '100%'
                  color = 'red'
                  message = I18n.t('cancelHire')
                } else if (item.status == 'interested') {
                  dice = '94%'
                  color = '#579AEE'
                  message = I18n.t('interest')
                }
    
                // approve - ยอมรับข้อเสนอ - green
                // cancel - ปฏิเสธข้อเสนอ - red
                // bargain - กำลังต่อรอง - orange
                let name = ''
                if (item.answer.type == '100 ปี พ.ศ.2515') {
                  name = I18n.t('year100era2515')
                }
                else if (item.answer.type == '108 ปี พ.ศ.2523') {
                  name = I18n.t('year108era2523')
                }
                else if (item.answer.type == '118 ปี พ.ศ.2533') {
                  name = I18n.t('year118era2533')
                }
                else if (item.answer.type == '122 ปี พ.ศ.2537') {
                  name = I18n.t('year122era2537')
                }
                else if (item.answer.type == 'เสาร์ 5 พ.ศ.2536') {
                  name = I18n.t('sat5era2536')
                }
                else if (item.answer.type == 'เสาร์ 5 พ.ศ.2539') {
                  name = I18n.t('sat5era2539')
                }
                else if (item.answer.type == '214 ปีชาตกาล พ.ศ.2545') {
                  name = I18n.t('year214era2545')
                }
                else if (item.answer.type == 'บางขุนพรหม ปี พ.ศ.2509') {
                  name = I18n.t('BangKhunProm2509')
                }
                else if (item.answer.type == 'บางขุนพรหม ปี พ.ศ.2517') {
                  name = I18n.t('BangKhunProm2517')
                }
                else if (item.answer.type == 'หลวงพ่อหลิว') {
                  name = I18n.t('LuangPhorLhew')
                }
                else if (item.answer.type == "หลวงปู่หมุน, หลวงปู่โต๊ะ, เจ้าคุณนร") {
                  name = item.answer.type
                }
                else if (item.answer.type == "ภาคตะวันตก สมุทรสงคราม, กาญจนบุรี, ราชบุรี, เพชรบุรี") {
                  name = item.answer.type
                }
                else {
                  name = (item.answer.type == 'อื่นๆ หรือ ไม่ทราบ'||item.answer.type == 'ไม่ระบุประเภท') ? I18n.t('otherOrUnknown') : I18n.t(item.answer.type)
                }
    
                return (
                  <TouchableOpacity onPress={() => {
                    this.props.setData(item)
                    this.props.navigation.navigate('listExpert3')
                  }
                  }>
                    <View style={{ height: 80, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.answer.images[0] }} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }} />
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
                          }}> ( {item.qid} )</Text>
                        </View>
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: 'center', height: 80, width: width / 3.3 }}>
                        <Text style={{
                          fontFamily: 'Prompt-SemiBold',
                          fontSize: 14,
                          color: 'white',
                          margin: 15,
                          paddingHorizontal: 15,
                          paddingTop: 2.5,
                          borderRadius: 15,
                          height: 30,
                          backgroundColor: color
                        }}>{message}</Text>
                        {item.recent_bid == 'user' && item.status == 'bargain' && <View style={{
                          backgroundColor: 'red', height: 10, width: 10, borderRadius: 5, position: 'absolute', bottom: 48, right: (this.props.language == 'en-US' || this.props.language == 'en' || this.props.language == 'en-Us') ? 30 : 30
                        }}>
                        </View>}
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
        profile: state.question.profile,
        request_profile: state.question.request_profile,
        data_versatile: state.versatile.data_versatile,
        request_getListDetailExpertBid: state.expert.request_getListDetailExpertBid,  // request get list of expert bid  what amulet
        data_getListDetailExpertBid: state.expert.data_getListDetailExpertBid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getListDetailExpertBid: (page) => dispatch(ExpertActions.getListDetailExpertBid(page)),
        setData: (data) => dispatch(ExpertActions.setDataExpertBid(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpert2)
