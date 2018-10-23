import React, { Component } from 'react'
import {
    Image, Text, View, FlatList, TouchableOpacity,
    Dimensions, RefreshControl, ScrollView, StyleSheet, TextInput, Alert, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import moment from 'moment'
import 'moment/locale/th'
import RoundedButton from "../Components/RoundedButton";
import RoundedButton2 from "../Components/RoundedButton2";
import { Colors, Images, Metrics } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import ImageViewer from 'react-native-image-zoom-viewer';
// Styles
// import styles from './Styles/CheckListScreenStyle'
const deviceWidth = Dimensions.get('window').width
// const { height } = Dimensions.get('window')


class CheckPhraScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: this.props.data.question_list,
            answer_other: null,
            answer1: null,
            answer2: null,
            answer3: null,
            answer4: null,
            answer5: null,
            index: 0,
            modalVisible: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        // const params = navigation.state.params || {};

        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            fontSize: 18,
                            fontFamily: "Prompt-SemiBold",
                            color: Colors.brownText
                        }}
                    >
                        {"< กลับ "}
                    </Text>
                    <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold" }}>รายละเอียดส่งตรวจพระ</Text>
                </TouchableOpacity>
            )
        };
    };
    _onPressButton = () => {


        let tmp = []
        let pack = []
        if (this.state.answer1) {
            tmp.push(this.state.answer1)
        }
        if (this.state.answer2) {
            tmp.push(this.state.answer2)
        }
        if (this.state.answer3) {
            tmp.push(this.state.answer3)
        }
        if (this.state.answer4) {
            tmp.push(this.state.answer4)
        }
        if (this.state.answer5) {
            tmp.push(this.state.answer5)
        }
        if (this.state.answer_other) {
            tmp.push(this.state.answer_other)
        }

        if (tmp.length == 0) {
            Alert.alert(
                'Check Phra',
                'กรุณาตอบคำถามอย่างน้อย1ข้อ',
                [
                    { text: 'ตกลง' }
                ]
            )
        } else {

            this.state.question.map((e, i) => {
                pack.push({
                    id: e.id,
                    result: tmp[i] ? tmp[i] : ''
                })
            })
            this.props.setAnswer(pack, this.props.data.id)
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
            this.props.navigation.goBack()
        }
        // console.log(pack)
    }

    _onPressImage = (obj) => {
        console.log(obj)
    }

    _onPressNotanswer = () => {
        let pack = []
        Alert.alert(
            'Check Phra',
            'คุณไม่สามารถตอบคำถามได้ ?',
            [
                {
                    text: 'ตกลง', onPress: () => {
                        this.props.setAnswer(pack, this.props.data.id)
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
                        this.props.navigation.goBack()
                    }
                },
                { text: 'ยกเลิก' }
            ],
            { cancelable: false }
        )
    }

    _onPressAdmin = () => {
        let pack = []
        Alert.alert(
            'Check Phra',
            'คุณต้องการส่งคำถามให้ admin ตรวจ ?',
            [
                {
                    text: 'ตกลง', onPress: () => {
                        this.props.setAnswer(pack, this.props.data.id)
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
                        this.props.navigation.goBack()
                    }
                },
                { text: 'ยกเลิก' }
            ],
            { cancelable: false }
        )
    }

    render() {
        let img = []
        this.props.data.images.map(e => {
            img.push(e)
        })
        // console.log(img)
        let img2 = []
        this.props.data.images.map(e => {
            img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + e })
        })

        // console.log(this.props.data)
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.4, borderBottomColor: Colors.brownText, borderBottomWidth: 1 }}>
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

                <View style={{ flex: 0.6 }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>คำถาม </Text>
                            <Text style={{ marginTop: 14, fontSize: 16 }}>( {this.props.data.email} )</Text>
                        </View>
                        {this.props.data.question_list.map((e, i) => {
                            if (e.question_detail == 'พระแท้/ไม่แท้') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer1} placeholder={'โปรดระบุคำตอบ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer1: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ประเมินราคาพระ') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer2} placeholder={'โปรดระบุคำตอบ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer2: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ชื่อหลวงพ่อ') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer3} placeholder={'โปรดระบุคำตอบ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer3: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ชื่อวัด') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer4} placeholder={'โปรดระบุคำตอบ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer4: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ปี พ.ศ. ที่สร้าง') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer5} placeholder={'โปรดระบุคำตอบ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer5: text })} />
                                    </View>
                                )
                            } else {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer_other} placeholder={'อื่นๆ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer_other: text })} />
                                    </View>
                                )
                            }

                        })}

                        <View style={{ width: '65%', alignSelf: 'center', marginTop: 10 }}>
                            <RoundedButton2
                                style={{ marginHorizontal: 10 }}
                                text={'ตกลง'}
                                onPress={this._onPressButton}
                                fetching={this.props.fetching}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <RoundedButton2
                                style={{ marginHorizontal: 10, width: 140 }}
                                text={'ตอบไม่ได้'}
                                onPress={this._onPressNotanswer}
                                fetching={this.props.fetching}
                            />
                            <RoundedButton2
                                style={{ marginHorizontal: 10, width: 140 }}
                                text={'ส่งให้ admin ตรวจ'}
                                onPress={this._onPressAdmin}
                                fetching={this.props.fetching}
                            />
                        </View>

                    </ScrollView>
                </View>

            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // history: state.question.history,
        profile: state.question.profile,
        data: state.expert.data_phra,
        questionType: state.question.questionType,
        fetching: state.expert.fetch,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (pack, q_id) => dispatch(ExpertActions.expertRequest(pack, q_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPhraScreen)
