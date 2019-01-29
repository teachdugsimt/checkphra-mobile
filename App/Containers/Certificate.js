import React, { Component } from 'react'
import {
    Image, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl,
    Alert, AsyncStorage, ScrollView, TextInput, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import QuestionActions from '../Redux/QuestionRedux'
import moment from 'moment'
import 'moment/locale/th'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors, Images } from '../Themes';
import Icon2 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import AuthActions from '../Redux/AuthRedux'
import TradingActions from '../Redux/TradingRedux'
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
// Styles
import Spinner from 'react-native-loading-spinner-overlay';
import RoundedButton from '../Components/RoundedButton'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();

let check = true
let count = 1
let { width, height } = Dimensions.get('window')

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

class Certificate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: null,
            img: null,
            modalVisible: false,
            // index: 0,
            tmp_activeCer: null,

            hideButton: false,

            type: null,
            phra: null,
            temple: null,
            owner: null,
            date: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        if (newProps.data_activeCer && newProps.data_activeCer != null) {
            if (prevState.tmp_activeCer != newProps.data_activeCer && newProps.data_activeCer.qid == newProps.data_setCer.qid) {
                console.log('BEFORE COME TO REDUX')
                newProps.editDataListCer(newProps.data_activeCer)
                return {
                    hideButton: true,
                    tmp_activeCer: newProps.data_activeCer
                }
            }
        }

        return {

        }
    }

    componentWillUnmount() {
        this.props.clearDataActiveCer()
        this.props.getListCerFromUser(1)
    }

    componentDidMount() {
        if (this.props.data_setCer && this.props.data_setCer != null) {
            this.setState({
                type: this.props.data_setCer.type ? this.props.data_setCer.type : null,
                phra: this.props.data_setCer.amuletName ? this.props.data_setCer.amuletName : null,
                temple: this.props.data_setCer.temple ? this.props.data_setCer.temple : null,
                owner: this.props.data_setCer.owner ? this.props.data_setCer.owner : null,
                date: I18n.t('date2')
            })
        }
    }

    _showPicture = () => {
        let img = []
        img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.props.data_setCer.image })
        this.setState({ modalVisible: true, img })
        this.popupDialog.show()
    }

    _onPressButton = () => {
        //call api
        Alert.alert(
            'Check Phra',
            I18n.t('submitTransaction'),
            [
                { text: I18n.t('cancel'), onPress: () => { } },
                {
                    text: I18n.t('ok'), onPress: () => {
                        this.props.activeCertificate(this.props.data_setCer.qid, this.state.phra, this.state.temple)
                    }
                }
            ]
        )
    }

    _onPressCancel = () => {

    }

    render() {
        console.log(this.props.data_setCer)
        console.log('-------------------  CERTIFICATE ---------------------')
        return (

            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }} >
                <View style={{ height: height / 2.95 }}>
                    <Image source={Images.cer} style={{ position: 'absolute', top: 0, left: 0, height: height / 2.95, width: width }} />

                    <TouchableOpacity style={{ height: height / 3.2, width: width / 3, position: 'absolute', left: 6.9, top: 1 }} onPress={this._showPicture}>
                        <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + this.props.data_setCer.image }} style={{ height: height / 3.05, width: width / 3 }} resizeMode='contain' />
                    </TouchableOpacity>

                    <Text style={{ fontFamily: 'Prompt-SemiBold', position: 'absolute', top: height / 7.68, left: (width / 2) + 25 }}>{this.state.type}</Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold', position: 'absolute', top: (height / 7.68) + 28, left: (width / 2) + 25 }}>{this.state.phra}</Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold', position: 'absolute', top: (height / 7.68) + 56, left: (width / 2) + 25 }}>{this.state.temple}</Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold', position: 'absolute', top: (height / 7.68) + 84, left: (width / 2) + 25 }}>{this.state.owner}</Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold', position: 'absolute', top: (height / 7.68) + 112, left: (width / 2) + 25 }}>{this.state.date}</Text>
                </View>

                <PopupDialog
                    dialogTitle={<View></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={0}
                    height={0}
                    onDismissed={() => { this.setState({ modalVisible: false, index: 0 }) }}
                >
                    <View style={{ width: '100%', height: '80%', backgroundColor: 'transparent' }}>
                        <Modal
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.setState({ modalVisible: false })}>
                            <ImageViewer
                                saveToLocalByLongPress={false}
                                imageUrls={this.state.img}
                                backgroundColor={'lightgrey'}
                                // onClick={(e) => {
                                //     console.log('Show modal')
                                //     this.setState({ modalVisible: true })
                                // }}

                                // index={this.state.index} // index in array picture
                                onSwipeDown={() => {
                                    console.log('onSwipeDown');
                                    this.setState({ modalVisible: false })
                                    this.popupDialog.dismiss()
                                }}
                                enableSwipeDown={true}
                                failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
                            />
                        </Modal>

                    </View>
                </PopupDialog>

                <ScrollView style={{ flex: 1 }}>
                    <View style={{ alignSelf: 'center' }}>

                        {/* <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center' }}>{I18n.t('type') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.type} onChangeText={(text) => this.setState({ type: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={!this.state.type ? I18n.t('answerText') : null} />
                        </View> */}

                        {this.props.data_setCer.status == 1 && this.state.hideButton == false && <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('phra') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.phra} onChangeText={(text) => this.setState({ phra: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={!this.state.phra ? I18n.t('answerText') : null} />
                        </View>}

                        {this.props.data_setCer.status == 1 && this.state.hideButton == false && <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('templeKru') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.temple} onChangeText={(text) => this.setState({ temple: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={!this.state.temple ? I18n.t('answerText') : null} />
                        </View>}

                        {/* <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('date') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.date} onChangeText={(text) => this.setState({ date: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={!this.state.date ? I18n.t('answerText') : null} />
                        </View> */}

                        {this.props.data_setCer.status == 1 && this.state.hideButton == false && <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                            <View style={{ width: '40%', height: 45 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('ok')}
                                    onPress={this._onPressButton}
                                />
                            </View>
                        </View>}

                        <View style={{ height: 30 }}></View>

                    </View>
                </ScrollView>

            </LinearGradient>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,

        request10: state.trading.request10,  // get List certificate from user ( Admin Only !!)
        data_getListCer: state.trading.data_getListCer,  // store list certificate from user
        data_setCer: state.trading.data_setCer,  // data set cer... from previous page

        request11: state.trading.request11,  // request for active certificate data
        data_activeCer: state.trading.data_activeCer,  // store data when active certificate by admin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHistory: (count) => dispatch(QuestionActions.getHistory(count)),
        getAnswer: (qid) => dispatch(QuestionActions.getAnswer(qid)),
        deleteQuestion: (qid) => dispatch(QuestionActions.deleteQuestion(qid)),
        setDataPhra: (data) => dispatch(ExpertActions.setDataPhra(data)),
        getProfile: () => dispatch(QuestionActions.getProfile()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        editGroup: (type_id, qid) => dispatch(ExpertActions.editGroup(type_id, qid)),
        clearEditData: () => dispatch(ExpertActions.clearEditData()),
        activeCertificate: (qid, amuletName, temple) => dispatch(TradingActions.activeCertificate(qid, amuletName, temple)),

        editDataListCer: (data) => dispatch(TradingActions.editDataListCer(data)),
        clearDataActiveCer: () => dispatch(TradingActions.clearDataActiveCer()),
        getListCerFromUser: (page) => dispatch(TradingActions.getListCerFromUser(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Certificate)


