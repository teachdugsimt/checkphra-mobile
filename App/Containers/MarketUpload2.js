import React, { Component } from 'react'
import {
    Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl, Alert, ScrollView, Modal,
    TextInput, Picker
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import MarketActions from '../Redux/MarketRedux'
import moment from 'moment'
import 'moment/locale/th'
// Styles
import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
// import I18n, { getLanguages } from 'react-native-i18n';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();
// I18n.locale = "th";
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class MarketUpload2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            fetch: null,
            data_history: null,
            img: null,
            item: null,

            name: null,
            temple: null,
            price: null,
            owner: null,
            contact: null,
            zone: null,
            type: null,
        }
        // this.popupDialog2 = this.popupDialog2.bind(this)
    }


    static navigationOptions = ({ navigation }) => {
        // console.log(navigation)
        // console.log(I18n.locale)

        return {
            title: I18n.t('history'),
        }
    }

    componentDidMount() {
        moment.locale('th')
        count = 1
        this.props.getHistory()
        this.props.getListTypeAmulet()
        // this.props.clearDataQuestion()
    }
    componentWillMount() {
        count = 1
    }

    componentWillUnmount() {
        count = 1
    }

    // goToAnswer = (qid) => {
    //     // console.log(qid)
    //     this.props.getAnswer(qid)
    //     this.props.navigation.navigate('answer')
    // }

    onRefresh = () => {
        count = 1
        this.props.getHistory(count)
    }


    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        let tlist = newProps.data_typeAmulet

        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            tlist = newProps.data_typeAmulet
        }

        return {
            tmp_type: tlist
        }
    }

    _onScrollEndList = () => {
        console.log('END PAGE HHISTORY SCREEN')
        if (this.props.history && this.props.history.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
            count++
            this.props.getHistory(count)
        }
    }

    _onPressButton = () => {
        // onsubmit
    }

    _onPressCancel = () => {
        this.popupDialog2.dismiss()
    }

    _checkPopup = (item) => {
        if (item.real == 0 || item.real == null) {
            alert(I18n.t('fakeAmulet'))
        } else {
            this.props.setTmpDataUpload(item)
            this.props.navigation.navigate('marketUpload2n1')
        }
    }

    render() {
        I18n.locale = this.props.language
        console.log(this.props.history)
        console.log('------------------- MARKET UPLOAD 2 ---------------------')
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
                            name = (item.type == 'อื่นๆ หรือ ไม่ทราบ' || item.type == 'ไม่ระบุประเภท') ? I18n.t('otherOrUnknown') : I18n.t(item.type)
                        }

                        if (item.status != "delete") {
                            return (
                                <TouchableOpacity onPress={() => this._checkPopup(item)} >
                                    <View style={{ height: 80, backgroundColor: '#ffffffdd', marginTop: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {((item.permit == 1 || item.permit == 5) || item.permit == 10) && <Image source={Images.crown} style={{ position: 'absolute', top: -5, left: 50, width: 40, height: 40, zIndex: 1, transform: [{ rotate: '45deg' }] }} />}
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
        history: state.question.history,  // main data
        answer: state.question.answer,
        request2: state.question.request2,  // get history 
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
        getListTypeAmulet: () => dispatch(MarketActions.getListTypeAmulet()),
        setTmpDataUpload: (data) => dispatch(MarketActions.setTmpDataUpload(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketUpload2)
