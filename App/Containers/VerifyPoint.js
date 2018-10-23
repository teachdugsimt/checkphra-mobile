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

// Styles
// import styles from './Styles/CheckListScreenStyle'
const deviceWidth = Dimensions.get('window').width

class VerifyPoint extends Component {

    constructor(props) {
        super(props)
        this.state = {
            verifyData: null
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        let plist = newProps.data
        console.log(newProps)
        return {
            verifyData: plist
        }
    }

    _reload = () => {
        this.props.getVerify()
    }

    _PressList = (item) => {
        this.props.setDataPoint(item)
        this.props.navigation.navigate('check2')
    }

    _renderItem = ({ item, index }) => {
        let status = item.status == 10 ? 'อนุมัติแล้ว' : 'รออนุมัติ'
        let color = item.status == 10 ? 'green' : 'orange'
        return (
            <TouchableOpacity style={{ height: 60 }} onPress={() => this._PressList(item)}>
                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomColor: 'lightgrey', borderBottomWidth: 1, height: 65 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon2
                            name="ios-ribbon"
                            size={26}
                            color={Colors.brownText}
                            style={{ marginLeft: 15 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, width: '85%' }}>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 16, color: color }}>{status}</Text>
                            <Text style={{ fontSize: 16 }}>{item.date.slice(0, 10)}</Text>
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
        this.props.getVerify()
    }

    render() {
        console.log(this.state.verifyData)
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>ยังไม่มีรายการเติมเงิน</Text>}
                    data={this.state.verifyData}
                    renderItem={this._renderItem}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setAnswer: (pack, q_id) => dispatch(ExpertActions.expertRequest(pack, q_id))
        getVerify: () => dispatch(ExpertActions.getProfileRequest()),
        setDataPoint: (data) => dispatch(ExpertActions.setDataPoint(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPoint)