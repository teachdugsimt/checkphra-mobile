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
import { MessageDialog } from 'react-native-fbsdk'
const { width } = Dimensions.get('window')
let count = 1
class LeasingAdmin extends Component {

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        return {

        }
    }

    componentDidMount() {
        this.props.getLeasing(1)
        this.props.getLeasing2()
    }

    componentWillUnmount() {
        count = 1
    }

    onRefresh = () => {
        count = 1
        this.props.getLeasing(count)
        this.props.getLeasing2()
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        count++
        this.props.getLeasing(count)
        this.props.getLeasing2()
    }
    render() {
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
                <View>
                    <Text>{I18n.t('adminSum')+" "+this.props.data_price+' ฿'}</Text>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={(this.props.request6|| this.props.request7)}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    data={this.props.data_admin && this.props.data_admin.length > 0 && JSON.parse(JSON.stringify(this.props.data_admin))}
                    // data={data}
                    renderItem={({ item }) => {
                        let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
                        // let status = 'รอตรวจ'
                        let color = 'green'
                        let message = I18n.t('approve')
                        // if (item.status == 'approve') {
                        //     color = 'green'
                        //     message = I18n.t('approve')
                        // } else if (item.status == 'bargain') {
                        //     color = 'orange'
                        //     message = I18n.t('bargain')
                        // } else if (item.status == 'cancel') {
                        //     color = 'red'
                        //     message = I18n.t('cancelHire')
                        // } else if (item.status == 'interested') {
                        //     color = '#579AEE'
                        //     message = I18n.t('interest')
                        // }
                        let name = item.answer.type == 'อื่นๆ หรือ ไม่ทราบ' ? I18n.t('otherOrUnknown') : I18n.t(item.answer.type)

                        return (
                            <TouchableOpacity onPress={() => {
                                // this.props.setAnswerDetail(item)
                                // this.props.setData(item)
                                // this.props.navigation.navigate('userBit2')
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
                                    <View style={{ width: width / 2.7, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{
                                            fontFamily: 'Prompt-SemiBold',
                                            fontSize: 15,
                                            color: 'white',
                                            margin: 20,
                                            paddingHorizontal: 20,
                                            paddingTop: 2.5,
                                            borderRadius: 15,
                                            height: 30,
                                            backgroundColor: color
                                        }}>{message}</Text>
                                        {item.recent_bid == 'admin' && item.status == 'bargain' && <View style={{
                                            backgroundColor: 'red', height: 10, width: 10, borderRadius: 5, position: 'absolute', bottom: 45, right: (this.props.language == 'en-US' || this.props.language == 'en' || this.props.language == 'en-Us') ? 30 : 33
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

        request6: state.trading.request6,  // for get admin leasing amulet
        data_admin: state.trading.data_admin, // data when request6 true

        request7: state.trading.request7,    // for get Price leasing all this day for admin
        data_price: state.trading.data_price,  // data when request7
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
        sendMessage: (text) => dispatch(TradingActions.sendMessage(text)),
        getLeasing: (page) => dispatch(TradingActions.getLeasingAdmin(page)),
        getLeasing2: () => dispatch(TradingActions.getPriceLeasing()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeasingAdmin)