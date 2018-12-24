import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'
import TradingActions from '../Redux/TradingRedux'
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

class Bit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answerData: null,
            full_data: null,
            tmp: null,
        }
    }

    static navigationOptions = ({ navigation }) => {
        // console.log(navigation)
        // console.log(I18n.locale)

        return {
            title: I18n.t('bitPrice2'),
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        // let plist = newProps.data_answer
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
        // if (this.props.data_answer && this.props.data_answer.length >= 10 && this.props.request2 == false) {
        count++
        this.props.getAnswer(count)
        // }
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

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request2 == true}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    data={this.props.data_answer && this.props.data_answer.length > 0 && JSON.parse(JSON.stringify(this.props.data_answer))}
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
                        else {
                            name = item.answer.type == 'อื่นๆ หรือ ไม่ทราบ' ? I18n.t('otherOrUnknown') : I18n.t(item.answer.type)
                        }

                        return (
                            <TouchableOpacity onPress={() => {
                                // this.props.setAnswerDetail(item)
                                this.props.setData(item)
                                this.props.navigation.navigate('bit2')
                            }
                            }>
                                <View style={{ height: 80, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.answer.images[0] }} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }} />
                                    <View style={{ flex: 1, padding: 10 }}>

                                        <Text style={{
                                            fontFamily: 'Prompt-SemiBold',
                                            fontSize: 17,
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
                    onEndReachedThreshold={0.05}
                />

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        // request2: state.expert.fetch4, //get history
        // request3: state.expert.fetch5, // send answer
        // data_answer: state.expert.data_answer,
        // data_updateAnswer: state.expert.data_updateAnswer,
        data_answer: state.trading.data_tradelist,
        request2: state.trading.request2,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //   getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
        //   getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
        //   deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
        //   setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
        // getAnswer: (page) => dispatch(ExpertActions.answerList(page)),
        // setAnswerDetail: (data) => dispatch(ExpertActions.setAnswerDetail(data)),

        setData: (data) => dispatch(TradingActions.setData(data)),
        getAnswer: (page) => dispatch(TradingActions.listTrading(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bit)