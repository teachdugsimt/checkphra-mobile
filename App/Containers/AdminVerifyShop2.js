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
import RoundedButton2 from "../Components/RoundedButton2";
import { Colors, Images, Metrics } from '../Themes';
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import ExpertActions from '../Redux/ExpertRedux'
import ImageViewer from 'react-native-image-zoom-viewer';
import I18n from '../I18n/i18n';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import RoundedButton from '../Components/RoundedButton';
I18n.fallbacks = true;
// I18n.currentLocale();
// Styles
// import styles from './Styles/CheckListScreenStyle'
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
const { width, height } = Dimensions.get('window')
let count = 1
let check = true

class AdminVerifyShop2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            img: null,
            modalVisible: false,
            index: 0,

            tmpactive: null,
            hideButton: false,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        if (newProps.data_shop && newProps.data_shop != null) {
            if (prevState.tmpactive != newProps.data_shop && newProps.data_shop.id == newProps.data_storetmp.id) {
                newProps.editVerifyStore(newProps.data_shop)
                return {
                    hideButton: true,
                    tmpactive: newProps.data_shop
                }

            }
        }

        return {

        }
    }

    componentWillUnmount() {
        // clear tmp avtive store
        count = 1
        this.props.clearVerifyStore()
        this.props.getVerify(count)
        // get list active store
    }

    componentDidMount() {
        let img = []
        this.props.data_storetmp.evidence.images.map(e => {
            img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/auth/' + e })
        })
        this.setState({ img })
    }

    _showImage1 = () => {
        this.setState({ index: 0, modalVisible: true })
        this.popupDialog.show()
    }

    _showImage2 = () => {
        this.setState({ index: 1, modalVisible: true })
        this.popupDialog.show()
    }

    _onPressButton = () => {
        Alert.alert(
            'Check Phra',
            I18n.t('submitTransaction'),
            [
                { text: I18n.t('ok'), onPress: () => this.props.verifyStore(this.props.data_storetmp.id, 5) },
                { text: I18n.t('cancel') }
            ]
        )

    }

    _onPressCancel = () => {
        Alert.alert(
            'Check Phra',
            I18n.t('submitTransaction'),
            [
                { text: I18n.t('ok'), onPress: () => this.props.verifyStore(this.props.data_storetmp.id, 0) },
                { text: I18n.t('cancel') }
            ]
        )
    }

    render() {
        console.log(this.props.data_storetmp)
        console.log('---------------- VERIFY STORE ------------------')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />

                <View style={{ flex: 1 }}>

                    <PopupDialog
                        dialogTitle={<View></View>}
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        dialogAnimation={slideAnimation}
                        width={0}
                        height={0}
                        // height={150}
                        onDismissed={() => { this.setState({ modalVisible: false }) }}
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

                                    index={this.state.index} // index in array picture
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

                    <Text style={{ alignSelf: 'center', marginTop: 15, fontFamily: 'Prompt-SemiBold', fontSize: 20, color: Colors.brownText }}>{I18n.t('submitShop')}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 10 }}>
                        <TouchableOpacity onPress={this._showImage1}>
                            <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/auth/' + this.props.data_storetmp.evidence.images[0] }} style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#9932CC' }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._showImage2}>
                            <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/auth/' + this.props.data_storetmp.evidence.images[1] }} style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#9932CC' }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 5, marginHorizontal: 15 }}>
                        <Text style={{
                            fontFamily: 'Prompt-Regular',
                            fontSize: 16,
                        }}>{I18n.t('storeName')} : <Text style={{
                            fontFamily: 'Prompt-SemiBold',
                            fontSize: 18,
                            color: Colors.brownTextTran
                        }}>{this.props.data_storetmp.store_name}</Text></Text>
                    </View>

                    <View style={{ backgroundColor: '#fff5', padding: 10, borderRadius: 10, marginTop: 10, marginHorizontal: 15 }}>
                        <Text style={{
                            fontFamily: 'Prompt-Regular',
                            fontSize: 16,
                        }}>{I18n.t('contact')} : <Text style={{
                            fontFamily: 'Prompt-SemiBold',
                            fontSize: 18,
                            color: Colors.brownTextTran
                        }}>{this.props.data_storetmp.contact}</Text></Text>
                    </View>

                    {this.state.hideButton == false && <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ width: '40%', height: 40, marginRight: 5 }}>
                            <RoundedButton
                                style={{  }}
                                title={I18n.t('approve')}
                                onPress={this._onPressButton}
                            />
                        </View>
                        <View style={{ width: '40%', height: 40, marginLeft: 5 }}>
                            <RoundedButton
                                style={{  }}
                                title={I18n.t('cancelHire')}
                                onPress={this._onPressCancel}
                            />
                        </View>
                    </View>}

                </View>
            </LinearGradient>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // history: state.question.history,
        // profile: state.question.profile,
        // data: state.expert.data_phra,
        // questionType: state.question.questionType,
        // fetching: state.expert.fetch,
        // data: state.expert.data_listStore, // main **
        // request: state.expert.fetch10,  // main **
        data_storetmp: state.expert.data_storetmp,  // main **
        data_shop: state.expert.data_shop,  // data  active store 

        data_accept: state.expert.data_accept,
        request2: state.expert.fetch3,
        data_fully: state.expert.full_data,
        language: state.auth.language,
        data_cancel: state.expert.data_cancel,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setAnswer: (pack, q_id) => dispatch(ExpertActions.expertRequest(pack, q_id))
        getVerify: (page) => dispatch(ExpertActions.getListStore(page)),
        setDataPoint: (data, index) => dispatch(ExpertActions.setDataPoint(data, index)),
        setFullData: (data) => dispatch(ExpertActions.setFullData(data)),
        // editFullData: (id, status) => dispatch(ExpertActions.editFullData(id, status)),
        cancelCoin: (id, argument) => dispatch(ExpertActions.cancelCoin(id, argument)),
        verifyStore: (shop_id, status) => dispatch(ExpertActions.verifyStore(shop_id, status)),

        editVerifyStore: (data) => dispatch(ExpertActions.editVerifyStore(data)),
        clearVerifyStore: () => dispatch(ExpertActions.clearVerifyStore()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminVerifyShop2)