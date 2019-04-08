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
import PaymentActions from '../Redux/PaymentRedux'
import ImageViewer from 'react-native-image-zoom-viewer';
import I18n from '../I18n/i18n';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import RoundedButton from '../Components/RoundedButton';
import AppleVerifyPoint2 from './AppleVerifyPoint2';
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
class AppleVerifyPoint extends Component {
    static navigationOptions = ({ navigation }) => {
        // console.log(navigation)
        // console.log(I18n.locale)

        return {
            title: I18n.t('pendingCoin'),
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            verifyData: null,
            full_data: null,
            cancel: null,
            reason: null,
            id: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.data
        console.log(newProps)
        console.log(prevState)

        return {
            verifyData: plist,
        }
    }

    _PressList = (item, index) => {
        this.props.setDataPoint(item, index)
        this.props.navigation.navigate('apple2')
    }

    _renderItem = ({ item, index }) => {
        let status = item.status == 10 ? 'อนุมัติแล้ว' : 'รออนุมัติ'
        let color = item.status == 10 ? 'green' : 'orange'

        return (
            <TouchableOpacity style={{ height: 60 }} onPress={() => this._PressList(item, index)}>
                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1, height: 65 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={Images.apple1} style={{ width: 25, height: 30, marginLeft: 10 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, width: '85%' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16 }}>( {item.id} ) </Text>
                                <Text style={{ fontSize: 16, color: color }}>{status && status != undefined ? status : 'Loading...'}</Text>
                            </View>
                            <Text style={{ fontSize: 16 }}>{item.date && item.date != undefined ? item.date.slice(0, 10) : 'Loading...'}</Text>
                        </View>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}><Text style={{ fontSize: 16, color: 'orange', fontWeight: 'bold' }}>{item.price} ฿</Text></View>
                        {/* </View> */}

                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        count = 1
        this.props.getCardList(count)
    }

    componentWillUnmount() {
        count = 1
    }

    _reload = () => {
        count = 1
        this.props.getCardList(count)
    }

    _onScrollEndList = () => {
        if (this.props.data && this.props.data.length >= 10 && (this.props.request == false || this.props.request == null)) {
            count++
            this.props.getCardList(count)
        }
    }

    _pressCancel2 = () => {
        this.props.cancelCoin(this.state.id, this.state.reason)
        this.popupDialog.dismiss()
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.state.verifyData)
        // console.log(this.props.data)
        // console.log('===========STATE AND REDUX============')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request == true}
                            onRefresh={this._reload.bind(this)}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.state.verifyData}
                    // data={this.props.data}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.2}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        data: state.payment.data_appleHistory,  // data add coin by credit card
        request: state.payment.request6,  // request add coin by credit card
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
        getCardList: (page) => dispatch(PaymentActions.appleHistory(page)),
        setDataPoint: (data, index) => dispatch(ExpertActions.setDataPoint(data, index)),
        setFullData: (data) => dispatch(ExpertActions.setFullData(data)),
        // editFullData: (id, status) => dispatch(ExpertActions.editFullData(id, status)),
        cancelCoin: (id, argument) => dispatch(ExpertActions.cancelCoin(id, argument)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleVerifyPoint)