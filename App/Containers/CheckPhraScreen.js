import React, { Component } from 'react'
import {
    Image, Text, View, FlatList, TouchableOpacity,
    Dimensions, RefreshControl, ScrollView, StyleSheet, TextInput, Slider, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'
import RoundedButton from "../Components/RoundedButton";
import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import CheckBox from 'react-native-check-box'
import ExpertActions from '../Redux/ExpertRedux'
import ImageViewer from 'react-native-image-zoom-viewer';
// Styles
// import styles from './Styles/CheckListScreenStyle'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


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

        this.state.question.map((e, i) => {
            pack.push({
                id: e.id,
                result: tmp[i] ? tmp[i] : ''
            })
        })
        this.props.setAnswer(pack, this.props.data.id)

        // console.log(pack)
    }

    _onPressImage = (obj) => {
        console.log(obj)
    }

    render() {
        let img = []
        this.props.data.images.map(e => {
            img.push(e)
        })

        let img2 = []
        this.props.data.images.map(e => {
            img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + e })
        })

        console.log(this.props.data)

        let imageArray = []
        img.forEach((image, i) => {

            const thisImage = (

                <Image
                    key={`image${i}`}
                    // source={{ uri: image }}
                    source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + image }}
                    style={{ width: deviceWidth / 2.3, margin: 5 }}
                />

            )
            imageArray.push(thisImage)
        })
        return (
            <View >
                <ScrollView contentContainerStyle={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }}>

                    <View style={{ flex: 0.45 }}>
                        <ImageViewer
                            saveToLocalByLongPress={false}
                            imageUrls={img2}
                            backgroundColor={'lightgrey'}
                            onClick={(e) => {
                                console.log('Show modal')
                                this.setState({ modalVisible: true })
                            }}
                            index={this.state.index}
                            onSwipeDown={() => {
                                console.log('onSwipeDown');
                                this.setState({ modalVisible: false })
                            }}
                            enableSwipeDown={true}
                        />
                        <Modal
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.setState({ modalVisible: false })}>
                            <ImageViewer
                                saveToLocalByLongPress={false}
                                imageUrls={img2}
                                backgroundColor={'lightgrey'}
                                onClick={(e) => {
                                    console.log('Show modal')
                                    this.setState({ modalVisible: true })
                                }}
                                index={this.state.index}
                                onSwipeDown={() => {
                                    console.log('onSwipeDown');
                                    this.setState({ modalVisible: false })
                                }}
                                enableSwipeDown={true}
                            />
                        </Modal>

                    </View>

                    <View style={{ flex: 0.55 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>คำถาม </Text>

                        {this.props.data.question_list.map((e, i) => {
                            if (e.question_detail == 'พระแท้/ไม่แท้') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer1} placeholder={'อื่นๆ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer1: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ประเมินราคาพระ') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer2} placeholder={'อื่นๆ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer2: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ชื่อหลวงพ่อ') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer3} placeholder={'อื่นๆ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer3: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ชื่อวัด') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer4} placeholder={'อื่นๆ'} style={{ marginHorizontal: 15 }}
                                            onChangeText={(text) => this.setState({ answer4: text })} />
                                    </View>
                                )
                            } else if (e.question_detail == 'ปี พ.ศ. ที่สร้าง') {
                                return (
                                    <View>
                                        <Text style={{ marginLeft: 15 }}>{e.question_detail}</Text>
                                        <TextInput key={i} value={this.state.answer5} placeholder={'อื่นๆ'} style={{ marginHorizontal: 15 }}
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
                            <RoundedButton
                                style={{ marginHorizontal: 10 }}
                                title={`ตกลง`}
                                onPress={this._onPressButton}  // can use
                            // onPress={() => this._pressButton}  // can use
                            />
                        </View>

                    </View>

                </ScrollView>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (pack, q_id) => dispatch(ExpertActions.expertRequest(pack, q_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPhraScreen)
