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
class AdminVerifyShop extends Component {
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

        }
    }

    _renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={{ height: 120, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._pressList(item)}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 2.3, marginLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 18, alignSelf: 'flex-start' }}>{item.store_name}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7.5 }}>
                            <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/auth/' + item.evidence.images[0] }} style={{ width: 65, height: 65, borderWidth: 1, borderColor: '#9932CC' }} />
                            <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/auth/' + item.evidence.images[1] }} style={{ width: 65, height: 65, borderWidth: 1, borderColor: '#9932CC', marginLeft: 10 }} />
                        </View>
                    </View>

                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        {item.status == 1 && <Icon3 name={'chevron-right'} size={27} />}
                        {item.status == 5 && <Icon3 name={'check-circle-o'} size={30} color={'green'} />}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _pressList = (item) => {
        this.props.setStoreTmp(item)
        this.props.navigation.navigate("shop2")
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
        if (this.props.data && this.props.data.length >= 10 && (this.props.request == false || this.props.request == null)) {
            count++
            this.props.getVerify(count)
        }
    }



    render() {
        I18n.locale = this.props.language
        // console.log(this.state.verifyData)
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
                    data={this.props.data}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.0}
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
        data: state.expert.data_listStore, // main **
        request: state.expert.fetch10,  // main **

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
        setStoreTmp: (data) => dispatch(ExpertActions.setStoreTmp(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminVerifyShop)