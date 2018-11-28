import React, { Component } from 'react'
import {
    Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl,
    Modal, ScrollView, TextInput, Linking, Alert
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import RoundedButton from "../Components/RoundedButton";
import 'moment/locale/th'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors, Images, Metrics } from '../Themes';
import ExpertActions from '../Redux/ExpertRedux'
import TradingActions from '../Redux/TradingRedux'
import CheckBox from 'react-native-check-box'
// Styles
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './Styles/CheckListScreenStyle'
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
I18n.fallbacks = true;
// I18n.currentLocale();

const { width } = Dimensions.get('window')
let check = true
let count = 1

class UserBit2 extends Component {

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

            price: null,
            bidData: null,
            hide: false,
            updateData: null,
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
        console.log(newProps)
        console.log(prevState)
        let bidData = newProps.data_bid
        // if(newProps.data_bid){
        //     console.log(newProps.data_bid)
        //     console.log('*------------------------------------*')
        // }
        if (newProps.data_bid && newProps.data_bid.qid) {
            if (newProps.data.qid == newProps.data_bid.qid) {
                if (prevState.bidData != newProps.data_bid) {
                    newProps.setData(newProps.data_bid)
                    return {
                        bidData: newProps.data_bid
                    }
                }
            }
        }

        if (newProps.data_status && newProps.data_status != null && newProps.data_status != undefined) {
            if (newProps.data_status.qid == newProps.data.qid) {
                return {
                    hide: true,
                    updateData: newProps.data_status
                }
            }
        }

        return {
            bidData
        }
    }

    _onPressButton = () => {
        if (this.state.price) {
            this.props.trading(this.props.data.qid, this.state.price)
        } else {
            alert(I18n.t('checkData'))
        }
        // this.props.getAnswer(1)
    }

    componentWillMount() {
        this.setState({ spinner: false })
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.props.getAnswer(1)
    }

    _goToURL() {
        // const url = 'm.me/316834699141900'
        const url = 'https://www.messenger.com/t/316834699141900'    // pc , mobile
        // const url = 'https://m.me/316834699141900' // pc , mobile can't use
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }

    _onPressSell = () => {
        Alert.alert(
            'Check Phra',
            I18n.t('wantGetOffer'),
            [
                {
                    text: I18n.t('ok'), onPress: () => {
                        this.props.update(this.props.data.qid, 'approve')
                    }
                },
                { text: I18n.t('cancel') }
            ]
        )

    }

    _onPressCancel = () => {
        Alert.alert(
            'Check Phra',
            I18n.t('dontwantOffer'),
            [
                {
                    text: I18n.t('ok'), onPress: () => {
                        this.props.update(this.props.data.qid, 'cancel')
                    }
                },
                { text: I18n.t('cancel') }
            ]
        )
    }

    render() {
        I18n.locale = this.props.language
        let img2 = []
        if (this.props.data && this.props.data.answer && this.props.data.answer.images) {
            this.props.data.answer.images.map(e => {
                img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
            })
        }
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
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('detailAnswer')} </Text>
                        </View> */}
                        {/* {this.props.data && this.props.data.answer && this.props.data.answer.answer.map((e, i) => {
                            let name = ''

                            if (e.question == 'พระแท้ / ไม่แท้' || e.question == 'พระแท้/ไม่แท้') {
                                name = I18n.t('trueFalse')
                                return (
                                    <View style={{ marginTop: 10, marginLeft: 10, }}>
                                        <Text style={{ fontSize: 16, color: Colors.brownText }}>1) {name} : <Text style={{
                                            fontFamily: 'Prompt-SemiBold',
                                            fontSize: 18,
                                        }}>{e.result}</Text> </Text>
                                        <Text style={{ fontSize: 16, color: Colors.brownText }}>{I18n.t('reason')} : <Text style={{
                                            fontFamily: 'Prompt-SemiBold',
                                            fontSize: 18,
                                        }}>{this.props.data && this.props.data.answer.argument ? this.props.data.answer.argument : I18n.t('noneAnswer')}</Text></Text>
                                    </View>
                                )
                            } else if (e.question == 'ราคาประเมินเช่าพระเครื่อง' || e.question == 'ประเมินราคาพระ') {
                                name = I18n.t('pricePhra')
                                return (
                                    <View style={{ marginTop: 10, marginLeft: 10, }}>
                                        <Text style={{ fontSize: 16, color: Colors.brownText }}>2) {name} : <Text style={{
                                            fontFamily: 'Prompt-SemiBold',
                                            fontSize: 18,
                                        }}>{e.result}</Text></Text>
                                    </View>
                                )
                            } else if (e.question == 'ชื่อหลวงพ่อ / ชื่อวัด / ปี พ.ศ. ที่สร้าง' || e.question == 'ชื่อหลวงพ่อ/ชื่อวัด/ปี พ.ศ. ที่สร้าง') {
                                name = I18n.t('detailPhra')
                                return (
                                    <View style={{ marginTop: 10, marginLeft: 10, }}>
                                        <Text style={{ fontSize: 16, color: Colors.brownText }}>3) {name} : <Text style={{
                                            fontFamily: 'Prompt-SemiBold',
                                            fontSize: 18,
                                        }}>{e.result}</Text></Text>
                                    </View>
                                )
                            }

                        })} */}

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('bidDetail')} {this.props.data.qid ? ' ( ' + this.props.data.qid + ' )' : ''}</Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('detailBidPrice')}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginTop: 5 }}>{I18n.t('detailBidPrice2')}</Text>
                        </View>

                        {this.state.bidData && this.state.bidData.length > 0 ? this.state.bidData && this.state.bidData.messages && this.state.bidData.messages.map((e, i) => {
                            let date = moment.unix(e.date_time).format("HH:mm")
                            // console.log(e)
                            // console.log('********************************')
                            if (i % 2 != 0 && i != 0) {
                                return (
                                    <View key={i} style={{ width: width, flex: 1, marginTop: 8, alignItems: 'flex-start' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10, backgroundColor: '#E59866', borderRadius: 20, height: 40 }}>
                                            <Text style={{ fontSize: 16, color: Colors.brownText, marginHorizontal: 15 }}>admin : <Text style={{
                                                fontFamily: 'Prompt-SemiBold',
                                                fontSize: 18,
                                            }}>{e.admin_bid} <Text style={{ fontSize: 14, color: Colors.brownText }}> ( {date} )</Text></Text></Text>
                                        </View>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={i} style={{ width: width, flex: 1, marginTop: 8, alignItems: 'flex-end' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 10, backgroundColor: 'lightgrey', borderRadius: 20, height: 40 }}>
                                            <Text style={{ fontSize: 16, color: Colors.brownText, marginHorizontal: 15 }}>user : <Text style={{
                                                fontFamily: 'Prompt-SemiBold',
                                                fontSize: 18,
                                            }}>{e.user_bid} <Text style={{ fontSize: 14, color: Colors.brownText }}> ( {date} )</Text></Text></Text>
                                        </View>
                                    </View>
                                )
                            }
                        }) : this.props.data && this.props.data.messages && this.props.data.messages.map((e, i) => {
                            let date = moment.unix(e.date_time).format("HH:mm")
                            // console.log(e)
                            // console.log('********************************')
                            if (i % 2 != 0 && i != 0) {
                                return (
                                    <View key={i} style={{ width: width, flex: 1, marginTop: 8, alignItems: 'flex-start' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 10, backgroundColor: '#E59866', borderRadius: 15 }}>
                                            <View style={{ marginVertical: 7 }}>
                                                <Text style={{ fontSize: 16, color: Colors.brownText, marginHorizontal: 15 }}>admin : <Text style={{
                                                    fontFamily: 'Prompt-SemiBold',
                                                    fontSize: 18,
                                                }}>{e.admin_bid} <Text style={{ fontSize: 14, color: Colors.brownText }}> ( {date} )</Text></Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={i} style={{ width: width, flex: 1, marginTop: 8, alignItems: 'flex-end' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginHorizontal: 10, backgroundColor: 'lightgrey', borderRadius: 15 }}>
                                            <View style={{ marginVertical: 7 }}>
                                                <Text style={{ fontSize: 16, color: Colors.brownText, marginHorizontal: 15 }}>user : <Text style={{
                                                    fontFamily: 'Prompt-SemiBold',
                                                    fontSize: 18,
                                                }}>{e.user_bid} <Text style={{ fontSize: 14, color: Colors.brownText }}> ( {date} )</Text></Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        })}


                        {/* && this.props.data.messages && (this.props.data.messages.length % 2 != 0) && this.props.data.messages.length < 4 */}
                        {this.props.data.messages ? this.state.hide == false && (this.props.data.messages.length % 2 == 0) && this.props.data.messages.length < 4 && this.props.data && (this.props.data.status == 'bargain' || this.props.data.status == 'interested') && <View><TextInput style={{ width: '75%', alignSelf: 'center' }}
                            value={this.state.price}
                            textAlign={'center'}
                            onChangeText={(text) => this.setState({ price: text })}
                            placeholder={I18n.t('inputBit')} />

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ width: '40%', height: 45 }}>
                                    <RoundedButton
                                        style={{ marginHorizontal: 10 }}
                                        title={I18n.t('bid2')}
                                        onPress={this._onPressButton}
                                    />
                                </View>
                                {this.props.data.status == 'interested' && <View style={{ width: '40%', height: 45 }}>
                                    <RoundedButton
                                        style={{ marginHorizontal: 10 }}
                                        title={I18n.t('cancelHire')}
                                        onPress={this._onPressCancel}
                                    />
                                </View>}
                            </View>

                        </View>
                            : this.state.hide == false && this.props.data && (this.props.data.status == 'bargain' || this.props.data.status == 'interested') && <View><TextInput style={{ width: '75%', alignSelf: 'center' }}
                                value={this.state.price}
                                textAlign={'center'}
                                onChangeText={(text) => this.setState({ price: text })}
                                placeholder={I18n.t('inputBit')} />

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ width: '40%', height: 45 }}>
                                        <RoundedButton
                                            style={{ marginHorizontal: 10 }}
                                            title={I18n.t('bid2')}
                                            onPress={this._onPressButton}
                                        />
                                    </View>
                                    {this.props.data.status == 'interested' && <View style={{ width: '40%', height: 45 }}>
                                        <RoundedButton
                                            style={{ marginHorizontal: 10 }}
                                            title={I18n.t('cancelHire')}
                                            onPress={this._onPressCancel}
                                        />
                                    </View>}
                                </View>

                            </View>}


                        {this.props.data.recent_bid == 'admin' && this.state.hide == false && this.props.data && this.props.data.status == 'bargain' && <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                            <View style={{ width: '40%', height: 45 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('sellNow')}
                                    onPress={this._onPressSell}
                                />
                            </View>
                            <View style={{ width: '40%', height: 45 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('dontSell')}
                                    onPress={this._onPressCancel}
                                />
                            </View>
                        </View>}

                        {this.state.updateData && this.state.updateData.status == 'approve' ? <Text style={{ fontSize: 18, color: Colors.brownText, fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{I18n.t('callAdmin')}</Text> : this.props.data && this.props.data.status == 'approve' && <Text style={{ fontSize: 18, color: Colors.brownText, fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{I18n.t('callAdmin')}</Text>}
                        {this.state.updateData && this.state.updateData.status == 'cancel' ? <Text style={{ fontSize: 18, color: Colors.brownText, fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{I18n.t('dontSell')}</Text> : this.props.data && this.props.data.status == 'cancel' && <Text style={{ fontSize: 18, color: Colors.brownText, fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{I18n.t('dontSell')}</Text>}



                        <View style={{
                            position: 'absolute',
                            right: 5, top: -15,
                            backgroundColor: "red",
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            backgroundColor: "#104E8Bdd",
                            marginTop: Metrics.doubleBaseMargin,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} >
                            <TouchableOpacity onPress={this._goToURL} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon
                                    name="facebook-square"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity></View>


                        <View style={{ height: 50 }}>
                        </View>


                        <Spinner
                            visible={(this.props.request1 || this.props.request2)}
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
        // data: state.expert.answer_detail,
        language: state.auth.language,
        request: state.expert.fetch5,
        data: state.trading.data_answer,  // pass set data to Bit 2
        data_bid: state.trading.data,  // data trading/add or data _bid
        data_detail: state.trading.data_detail,  // data when get detail by use bid id
        request1: state.trading.fetching,  // trading/add
        request2: state.trading.request,   // trading/detail
        data_status: state.trading.data_status,  // after sell or cancel phra we get this data 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //   getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
        //   getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
        //   deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
        //   setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
        getAnswer: (page) => dispatch(TradingActions.listTrading(page)),
        setData: (data) => dispatch(TradingActions.setData(data)),
        trading: (qid, message) => dispatch(TradingActions.tradingRequest(qid, message)),
        update: (qid, status) => dispatch(TradingActions.updateStatus(qid, status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBit2)