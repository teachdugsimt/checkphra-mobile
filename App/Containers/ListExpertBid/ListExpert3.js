import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions, AsyncStorage, Modal,
    TextInput, Linking, ImageBackground, Image, Platform, Alert
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
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment'
import 'moment/locale/th'
import QuestionActions from '../../Redux/QuestionRedux'
import AuthActions from '../../Redux/AuthRedux'
import ExpertActions from '../../Redux/ExpertRedux'
I18n.fallbacks = true;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class ListExpert3 extends Component {
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

            hide: false,
            updateData: null,
            price: null,
            price2: null,
            bidData: null,
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
        console.log(newProps)
        console.log(prevState)
        console.log('************* BIT 2 Expert Detail  ****************')
        let bidData = newProps.data_bid

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

    commaSeparateNumber(val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        return val;
    }

    _onPressButton = () => {

        Alert.alert(
            'Check Phra',
            I18n.t('checkBid') + " ( " + this.commaSeparateNumber(this.state.price2) + " ฿ )",
            [
                {
                    text: I18n.t('ok'), onPress: () => {
                        if (this.state.price2) {
                            this.props.trading(this.props.data.qid, this.state.price + " " + this.commaSeparateNumber(this.state.price2))
                        } else {
                            alert(I18n.t('checkData'))
                        }
                    }
                },
                { text: I18n.t('cancel'), onPress: () => { } }
            ]
        )
    }

    componentWillMount() {
        this.setState({ spinner: false })
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // this.props.clearDataBid()
        // this.props.getAnswer(1)
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

    _goToURL = (item) => {
        // const url = 'm.me/316834699141900'
        // const url = 'https://www.messenger.com/t/' + item    // pc , mobile
        const url = 'https://m.me?app_scoped_user_id=' + item
        // const url = 'https://m.me/316834699141900' // pc , mobile can't use
        console.log(url)
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });

    }

    render() {
        I18n.locale = this.props.language
        let img2 = []
        this.props.data.answer.images.map(e => {
            img2.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        })
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
                <View style={{ flex: 0.37, paddingTop: 10 }}>
                    <ImageViewer
                        saveToLocalByLongPress={false}
                        imageUrls={img2}
                        backgroundColor={'transparent'}
                        onChange={index => this.setState({ index })}
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>{I18n.t('bidDetail')} {this.props.data.qid ? ' ( ' + this.props.data.qid + ' )' : ''}</Text>
                        </View>

                        <View style={{ backgroundColor: '#FFEFD5', borderRadius: 15, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, color: Colors.brownTextTran, marginHorizontal: 18, marginVertical: 4 }}>{"Bid by : " + (this.props.data.proposer ? this.props.data.proposer : "")}</Text>
                        </View>

                        {this.props.data && !this.props.data.recent_bid && this.props.data.status == 'interested' && <Text style={{ fontSize: 18, color: Colors.brownText, fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{I18n.t('waitUser0') + "!!"}</Text>}

                        {this.props.data && this.props.data.messages && this.props.data.messages.map((e, i) => {
                            let date = moment.unix(e.date_time).format("HH:mm")

                            // if (i % 2 != 0 && i == 0) {
                            if (e.admin_bid && e.admin_bid != null) {
                                return (
                                    <View key={i} style={{ width: width, flex: 1, marginTop: 8, alignItems: 'flex-start' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10, backgroundColor: '#E59866', borderRadius: 20, height: 40 }}>
                                            <Text style={{ fontSize: 16, color: Colors.brownText, marginHorizontal: 15 }}>{I18n.t('expert')} : <Text style={{
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
                        })}

                        {/* {this.state.hide == false && this.props.data.status == 'bargain' && this.props.data && this.props.data.messages && (this.props.data.messages.length % 2 != 0) && this.props.data.messages.length < 4 && <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff5', margin: 10, borderRadius: 10 }} >
                    <TextInput style={{ width: '45%', height: 48, alignSelf: 'center', padding: 10 }}
                      value={this.state.price}
                      textAlign={'center'}
                      onChangeText={(text) => this.setState({ price: text })}
                      placeholder={I18n.t('inputBit')} />
    
                    <TextInput style={{ width: '45%', height: 48, alignSelf: 'center', padding: 10 }}
                      value={this.state.price2}
                      textAlign={'center'}
                      keyboardType={'numeric'}
                      onChangeText={(text) => this.setState({ price2: text })}
                      placeholder={I18n.t('inputBit2')} />
                  </View>
    
                  <View style={{ width: '45%', alignSelf: 'center', marginTop: 10 }}>
                    <RoundedButton
                      style={{ marginHorizontal: 10 }}
                      title={I18n.t('ok')}
                      onPress={this._onPressButton}
                    />
                  </View>
                </View>} */}

                        {/* {this.state.hide == false && this.props.data && this.props.data.recent_bid && this.props.data.recent_bid == 'user' && this.props.data.status == 'bargain' && <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <View style={{ width: '40%', height: 45, marginRight: 10 }}>
                    <RoundedButton
                      style={{}}
                      title={I18n.t('sellNow')}
                      onPress={this._onPressSell}
                    />
                  </View>
                  <View style={{ width: '40%', height: 45, marginLeft: 10 }}>
                    <RoundedButton
                      style={{}}
                      title={I18n.t('dontSell')}
                      onPress={this._onPressCancel}
                    />
                  </View>
                </View>} */}

                        {/* {this.state.updateData && this.state.updateData.status == 'approve' ? <Text style={{ fontSize: 18, color: 'green', fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{this.state.updateData.recent_bid == 'admin' ? I18n.t('userAccept') : I18n.t('adminAccept')}</Text> : this.props.data && this.props.data.status == 'approve' && <Text style={{ fontSize: 18, color: 'green', fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{this.props.data.recent_bid == 'admin' ? I18n.t('userAccept') : I18n.t('adminAccept')}</Text>}
                        {this.state.updateData && this.state.updateData.status == 'cancel' ? <Text style={{ fontSize: 18, color: 'red', fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{this.state.updateData.recent_bid == 'admin' ? I18n.t('userCancel') : I18n.t('adminCancel')}</Text> : this.props.data && this.props.data.status == 'cancel' && <Text style={{ fontSize: 18, color: 'red', fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{this.props.data.recent_bid == 'admin' ? I18n.t('userCancel') : I18n.t('adminCancel')}</Text>} */}
                        {this.props.data && this.props.data.status == "approve" && <Text style={{ fontSize: 18, color: 'green', fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{this.props.data.recent_bid == 'admin' ? I18n.t('userAccept') : I18n.t('adminAccept')}</Text>}
                        {this.props.data && this.props.data.status == 'cancel' && <Text style={{ fontSize: 18, color: 'red', fontFamily: 'Prompt-SemiBold', alignSelf: 'center', marginTop: 15 }}>{this.props.data.recent_bid == 'admin' ? I18n.t('userCancel') : I18n.t('adminCancel')}</Text>}

                        <View style={{ height: 40 }}>
                        </View>


                        {/* <Spinner
                  visible={(this.props.request1 || this.props.request2)}
                  textContent={'Loading...'}
                  textStyle={{ color: '#fff' }}
                /> */}

                    </ScrollView>
                </View>



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
        data: state.expert.tmp_biddetail,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getListDetailExpertBid: (page) => dispatch(ExpertActions.getListDetailExpertBid(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpert3)
