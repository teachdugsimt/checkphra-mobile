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

class AnswerOfAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answerData: null,
            full_data: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.data_answer


        return {
            answerData: plist
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
                            refreshing={this.props.request2 == true}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    data={this.props.data_answer}
                    renderItem={({ item }) => {
                        let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
                        let status = 'รอตรวจ'
                        let color = 'orange'
                        if (item.status == 'success') {
                            status = 'ตรวจแล้ว'
                            color = 'green'
                        }
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
                        else if (item.type == 'อื่นๆ หรือ ไม่ทราบ') {
                            name = I18n.t('otherOrUnknown')
                        }

                        return (
                            <TouchableOpacity onPress={() => {
                                this.props.setAnswerDetail(item)
                                this.props.navigation.navigate('detail')
                            }
                            }>
                                <View style={{ height: 80, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.images[0] }} style={{ width: 60, height: 60, margin: 10, borderRadius: 10 }} />
                                    <View style={{ flex: 1, padding: 10 }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{
                                                fontFamily: 'Prompt-SemiBold',
                                                fontSize: 18,
                                                color: Colors.brownText,
                                                // margin: 20
                                            }}>{name}</Text>
                                            <Text style={{
                                                fontFamily: 'Prompt-SemiBold',
                                                fontSize: 18,
                                                color: Colors.brownText,
                                                // margin: 20
                                            }}> ( {item.id} )</Text>
                                        </View>

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
                                    }}>{I18n.t('edit')}</Text>

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
        request2: state.expert.fetch4,
        data_answer: state.expert.data_answer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //   getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
        //   getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
        //   deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
        //   setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
        getAnswer: (page) => dispatch(ExpertActions.answerList(page)),
        setAnswerDetail: (data) => dispatch(ExpertActions.setAnswerDetail(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOfAdmin)