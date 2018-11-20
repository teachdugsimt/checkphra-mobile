import React, { Component } from 'react'
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl, Modal, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import RoundedButton from "../Components/RoundedButton";
import 'moment/locale/th'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import CheckBox from 'react-native-check-box'
// Styles
import styles from './Styles/CheckListScreenStyle'
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
I18n.fallbacks = true;
// I18n.currentLocale();

const { width } = Dimensions.get('window')
let check = true
let count = 1

class AnswerOfAdmin2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answer_other: null,
            answer1: null,
            answer2: null,
            answer3: null,
            answer4: null,
            answer5: null,
            question: this.props.data.answer,
            index: 0,
            modalVisible: false,
            checkTrue1: false,
            checkTrue2: false,
            checkTrue3: false,
            checkFalse: false,
            spinner: false,
            editing: true,
            checkans1: false,
            checkans2: true,
            checkans3: true,
        }
    }

    static navigationOptions = ({ navigation }) => {
        // console.log(navigation)
        // console.log(I18n.locale)

        return {
            title: I18n.t('detailAnswer'),
        }
    }

    _onPressButton = () => {
        let tmp = []
        let pack = []

        if (this.state.checkTrue1 == true && this.state.checkTrue2 == false && this.state.checkFalse == false) {
            tmp.push('พระแท้')
        } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == true && this.state.checkFalse == false) {
            tmp.push('พระแท้ย้อนยุค')
        } else if (this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkFalse == true) {
            tmp.push('พระไม่แท้')
        } else if (this.state.checkTrue3 == true && this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkFalse == false) {
            tmp.push('พระแท้ไม่รู้ที่')
        } else if (this.state.checkTrue3 == false && this.state.checkTrue1 == false && this.state.checkTrue2 == false && this.state.checkFalse == false){
            tmp.push(null)
        }

        if (this.state.answer2) {
            tmp.push(this.state.answer2)
        }
        if (this.state.answer3) {
            tmp.push(this.state.answer3)
        }
        if (this.state.answer_other) {
            tmp.push(this.state.answer_other)
        }

       
        if (tmp.length == 0) {
            alert('Please answer one question')
        } else {

            this.state.question.map((e, i) => {
                pack.push({
                    id: e.id,
                    result: tmp[i] ? tmp[i] : ''
                })
            })

            this.props.updateAnswer(pack, this.props.data.q_id, this.state.answer4)
            this.setState({
                answer_other: null,
                answer1: null,
                answer2: null,
                answer3: null,
                answer4: null,
                answer5: null,
                index: 0,
                modalVisible: false,
            })
            // this.props.getAnswer(1)
            this.props.navigation.goBack()
        }
        // console.log(pack)
    }

    componentWillMount() {
        this.setState({ spinner: false })
    }

    componentDidMount() {
        this.props.data.answer.map((e, i) => {
            if (this.props.data.argument) {
                this.setState({ answer4: this.props.data.argument })
            }
            if (e.question == 'พระแท้ / ไม่แท้' || e.question == 'พระแท้/ไม่แท้') {
                if (e.result == 'ไม่ออกผล'|| e.result == ''|| e.result == "" || !e.result ) {
                    this.setState({ checkans1: true })
                } else {
                    if (e.result == 'พระแท้ย้อนยุค') {
                        this.setState({ checkTrue1: false, checkTrue2: true, checkTrue3: false, checkFalse: false })
                    } else if (e.result == 'พระแท้') {
                        this.setState({ checkTrue1: true, checkTrue2: false, checkTrue3: false, checkFalse: false })
                    } else if (e.result == 'พระไม่แท้') {
                        this.setState({ checkTrue1: false, checkTrue2: false, checkTrue3: false, checkFalse: true })
                    } else if (e.result == 'พระแท้ไม่รู้ที่') {
                        this.setState({ checkTrue1: false, checkTrue2: false, checkTrue3: true, checkFalse: false })
                    }
                }
            } else if (e.question == 'ราคาประเมินเช่าพระเครื่อง' || e.question == 'ประเมินราคาพระ') {
                if (e.result == 'ไม่ออกผล') {
                    this.setState({ checkans2: false, answer2: 'ไม่ออกผล' })
                } else {
                    this.setState({ answer2: e.result })
                }
            } else if (e.question == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question == 'ชื่อหลวงพ่อ/ชื่อวัด/ปี พ.ศ. ที่สร้าง') {
                if (e.result == 'ไม่ออกผล') {
                    this.setState({ checkans3: false, answer3: 'ไม่ออกผล' })
                } else {
                    this.setState({ answer3: e.result })
                }
            }
        })

    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data)
        // console.log('HERE DATA EDITTTTTTTTTTT')
        let img2 = []
        this.props.data.images.map(e => {
            img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        })
        // let tmp1 = null
        // let tmp2 = null

        // if (this.props.data.answer[1]) {
        //     tmp1 = this.props.data.answer[1].result
        // }
        // if (this.props.data.answer[2]) {
        //     tmp2 = this.props.data.answer[2].result
        // }
        let tmp1 = this.props.data.answer[1] ? this.props.data.answer[1].result : null
        let tmp2 = this.props.data.answer[2] ? this.props.data.answer[2].result : null
        console.log(tmp1)
        console.log(tmp2)
        console.log('*******************************************')
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
                <View style={{ flex: 0.37, borderBottomColor: Colors.brownText, borderBottomWidth: 1 }}>
                    <ImageViewer
                        saveToLocalByLongPress={false}
                        imageUrls={img2}
                        backgroundColor={'lightgrey'}
                        onClick={(e) => {
                            console.log('Show modal')
                            this.setState({ modalVisible: true })
                        }}
                        index={this.state.index}
                    // onSwipeDown={() => {
                    //     console.log('onSwipeDown');
                    //     this.setState({ modalVisible: false })
                    // }}
                    // enableSwipeDown={true}
                    />
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ modalVisible: false })}>
                        <ImageViewer
                            saveToLocalByLongPress={false}
                            imageUrls={img2}
                            backgroundColor={'lightgrey'}
                            // onClick={(e) => {
                            //     console.log('Show modal')
                            //     this.setState({ modalVisible: true })
                            // }}
                            index={this.state.index}
                            onSwipeDown={() => {
                                console.log('onSwipeDown');
                                this.setState({ modalVisible: false })
                            }}
                            enableSwipeDown={true}
                        />
                    </Modal>

                </View>

                <View style={{ flex: 0.63 }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('question')} </Text>
                        </View>
                        {this.props.data.answer.map((e, i) => {
                            if (e.question == 'พระแท้ / ไม่แท้' || e.question == 'พระแท้/ไม่แท้') {
                                return (

                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{}}>{I18n.t('trueFalse')}</Text>
                                        <CheckBox
                                            style={{ flex: 1, marginLeft: 15, marginTop: 5 }}
                                            onClick={() => {
                                                this.setState({
                                                    checkTrue1: !this.state.checkTrue1,
                                                    checkTrue2: false,
                                                    checkTrue3: false,
                                                    checkFalse: false,
                                                    editing: true,
                                                    answer2: tmp1,
                                                    answer3: tmp2
                                                })
                                            }}
                                            disabled={this.state.checkans1}
                                            isChecked={this.state.checkTrue1}
                                            rightText={I18n.t('realPhra')}
                                            rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                                            checkBoxColor={Colors.brownText}
                                        />
                                        <CheckBox
                                            style={{ flex: 1, marginLeft: 15 }}
                                            onClick={() => {
                                                this.setState({
                                                    checkTrue2: !this.state.checkTrue2,
                                                    checkTrue1: false,
                                                    checkTrue3: false,
                                                    checkFalse: false,
                                                    editing: true,
                                                    answer2: tmp1,
                                                    answer3: tmp2
                                                })
                                            }}
                                            disabled={this.state.checkans1}
                                            isChecked={this.state.checkTrue2}
                                            rightText={I18n.t('realPhraOld')}
                                            rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                                            checkBoxColor={Colors.brownText}
                                        />
                                        <CheckBox
                                            style={{ flex: 1, marginLeft: 15 }}
                                            onClick={() => {
                                                this.setState({
                                                    checkTrue3: !this.state.checkTrue3,
                                                    checkTrue1: false,
                                                    checkTrue2: false,
                                                    checkFalse: false,
                                                    editing: true,
                                                    answer2: tmp1,
                                                    answer3: tmp2
                                                })
                                            }}
                                            disabled={this.state.checkans1}
                                            isChecked={this.state.checkTrue3}
                                            rightText={I18n.t('realPhranowhere')}
                                            rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                                            checkBoxColor={Colors.brownText}
                                        />
                                        <CheckBox
                                            style={{ flex: 1, marginLeft: 15, marginBottom: 5 }}
                                            onClick={() => {
                                                this.setState({
                                                    checkFalse: !this.state.checkFalse,
                                                    checkTrue1: false,
                                                    checkTrue2: false,
                                                    checkTrue3: false,
                                                    editing: false,
                                                    answer2: "ไม่ออกผล",
                                                    answer3: "ไม่ออกผล",
                                                })
                                            }}
                                            disabled={this.state.checkans1}
                                            isChecked={this.state.checkFalse}
                                            rightText={I18n.t('fakePhra')}
                                            rightTextStyle={{ color: Colors.brownText, fontFamily: 'Prompt-SemiBold', fontSize: 16 }}
                                            checkBoxColor={Colors.brownText}
                                        />
                                        <Text style={{ marginLeft: 15 }}>{I18n.t('reason')}</Text>
                                        <TextInput key={i} value={this.state.answer4} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer4: text })} />
                                    </View>
                                )
                            } else if (e.question == 'ราคาประเมินเช่าพระเครื่อง' || e.question == 'ประเมินราคาพระ') {
                                // this.setState({ answer2: e.result })
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{I18n.t('pricePhra')}</Text>
                                        <TextInput key={i} value={this.state.answer2} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer2: text })} editable={this.state.checkans2} />
                                    </View>
                                )
                            } else if (e.question == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question == 'ชื่อหลวงพ่อ/ชื่อวัด/ปี พ.ศ. ที่สร้าง') {
                                // this.setState({ answer3: e.result })
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{I18n.t('detailPhra')}</Text>
                                        <TextInput key={i} value={this.state.answer3} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer3: text })} editable={this.state.checkans3} />
                                    </View>
                                )
                            }
                            else {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer_other} placeholder={I18n.t('answerText')} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer_other: text })} />
                                    </View>
                                )
                            }

                        })}

                        <View style={{ width: '65%', alignSelf: 'center', marginTop: 10 }}>
                            <RoundedButton
                                style={{ marginHorizontal: 10 }}
                                title={I18n.t('edit')}
                                onPress={this._onPressButton}
                            />
                        </View>

                        <View style={{ height: 40 }}>
                        </View>


                        <Spinner
                            visible={this.props.request || this.state.spinner}
                            textContent={'Loading...'}
                            textStyle={{ color: '#fff' }}
                        />

                    </ScrollView>
                </View>



            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.expert.answer_detail,
        language: state.auth.language,
        request: state.expert.fetch5,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //   getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
        //   getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
        //   deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
        //   setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
        updateAnswer: (pack, q_id, argument) => dispatch(ExpertActions.updateAnswer(pack, q_id, argument)),
        getAnswer: (page) => dispatch(ExpertActions.answerList(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOfAdmin2)