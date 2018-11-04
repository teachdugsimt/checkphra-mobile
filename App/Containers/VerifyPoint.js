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
import ExpertActions from '../Redux/ExpertRedux'
import ImageViewer from 'react-native-image-zoom-viewer';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale();
// Styles
// import styles from './Styles/CheckListScreenStyle'
const { width, height } = Dimensions.get('window')
let count = 1
let check = true
class VerifyPoint extends Component {

    constructor(props) {
        super(props)
        this.state = {
            verifyData: null,
            full_data: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.data
        console.log(newProps)
        console.log(prevState)
        // if (prevState.verifyData == null || !prevState.verifyData || prevState.verifyData.length == 0) {
        //     newProps.getVerify()
        //     return {
        //         verifyData: newProps.data
        //     }
        // }

        if (newProps.data.length != 0 && newProps.data != prevState.verifyData) {
            check == false
            let full_data = []
            newProps.data.map(e => {
                full_data.push({
                    id: e.id,
                    status: e.status,
                })
            })
            newProps.setFullData(full_data)
            return {
                full_data,
                verifyData: newProps.data
            }
        }

        // if (newProps.data_accept != null && newProps.request2 != null) {
        //     let tmp = newProps.data.find(e => e.id == newProps.data_accept.id)
        //     if (tmp && tmp != undefined && newProps.data_accept.status != tmp.status) {
        //         newProps.getVerify()
        //         return {
        //             verifyData: newProps.data
        //         }
        //     }
        // }

        return {
            verifyData: plist
        }
    }

    _PressList = (item, index) => {
        this.props.setDataPoint(item, index)
        this.props.navigation.navigate('check2')
    }

    _renderItem = ({ item, index }) => {
        let tmp = null
        let status = null
        let color = null
        if (this.props.data_fully != null) {
            tmp = this.props.data_fully.find(e => e.id == item.id)
            if (tmp) {
                status = tmp.status == 10 ? I18n.t('successVerify') : I18n.t('waitVerify')
                color = tmp.status == 10 ? 'green' : 'orange'
            }
        } else {
            status = 'Loading...'
            color = 'lightgrey'
        }

        // let status = item.status == 10 ? 'อนุมัติแล้ว' : 'รออนุมัติ'
        // let color = item.status == 10 ? 'green' : 'orange'
        return (
            <TouchableOpacity style={{ height: 60 }} onPress={() => this._PressList(item, index)}>
                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1, height: 65 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={Images.coin0} style={{ width: 25, height: 25, marginLeft: 10 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, width: '85%' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16 }}>( {item.id} ) </Text>
                                <Text style={{ fontSize: 16, color: color }}>{status && status != undefined ? status : 'Loading...'}</Text>
                            </View>
                            <Text style={{ fontSize: 16 }}>{item.date && item.date != undefined ? item.date.slice(0, 10) : 'Loading...'}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, color: 'orange', fontWeight: 'bold' }}>{item.price} ฿</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        count = 1
        this.props.getVerify(count)
    }

    componentWillUnmount() {
        count = 1
    }

    _reload = () => {
        count = 1
        this.props.getVerify(count)
    }

    _onScrollEndList = () => {
        count++
        this.props.getVerify(count)
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.state.verifyData)
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request == true}
                            onRefresh={this._reload.bind(this)}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.state.verifyData}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={0.05}
                />
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
        data: state.expert.data_verify,
        request: state.expert.fetch2,
        data_accept: state.expert.data_accept,
        request2: state.expert.fetch3,
        data_fully: state.expert.full_data,
        language: state.auth.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setAnswer: (pack, q_id) => dispatch(ExpertActions.expertRequest(pack, q_id))
        getVerify: (page) => dispatch(ExpertActions.getProfileRequest(page)),
        setDataPoint: (data, index) => dispatch(ExpertActions.setDataPoint(data, index)),
        setFullData: (data) => dispatch(ExpertActions.setFullData(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPoint)