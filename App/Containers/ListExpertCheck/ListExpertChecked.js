import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions, AsyncStorage,
    TextInput, Linking, ImageBackground, Image, Platform, Alert, FlatList, RefreshControl
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
import QuestionActions from '../../Redux/QuestionRedux'
import AuthActions from '../../Redux/AuthRedux'
import VersatileActions from '../../Redux/VersatileRedux'
import ExpertActions from '../../Redux/ExpertRedux'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
I18n.fallbacks = true;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
class ListExpertChecked extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")
        }
    }


    componentDidMount() {
        this.props.getListExpertChecked(moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD"))
    }

    _reload = () => {
        this.props.getListExpertChecked(this.state.date)
    }

    _pressList = (item) => {
        // this.props.setDataProposer(item)
        // this.props.navigation.navigate('listExpert2')
    }

    _renderItem = ({ item, index }) => {
        return (<TouchableOpacity style={{ flexDirection: 'row', height: 70, width: "100%", alignItems: 'center', backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1.5 }} onPress={() => this._pressList(item)}>
            <View style={{ width: 50, height: 50, margin: 10 }}>
                {item.profile && item.profile.img_full_link && <Image source={{ uri: item.profile.img_full_link }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                {item.profile && !item.profile.img_full_link && <Image source={Images.user} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                {!item.profile && <Image source={Images.user} style={{ width: 50, height: 50, borderRadius: 25 }} />}
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 10, marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 16 }}>{item.profile && item.profile.name ? item.profile.name : 'Expert Account'}</Text>
                <Text>{I18n.t("countExpertChecked") + (item.count ? item.count : "0")}</Text>
            </View>
        </TouchableOpacity>)

    }

    render() {
        console.log(this.state.date)
        console.log('--------------------- EXPERT CHECKED -----------------------------')
        // let date = moment(new Date()).format().slice(0, 10)
        let date = moment(new Date()).format("YYYY-MM-DD") // can!!
        // let date = moment(new Date()).format("YYYY MM DD") // can!!
        let yesterday = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")
        console.log(yesterday)
        console.log(date)
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <DatePicker
                        style={{ width: 250, borderColor: "black" }}
                        date={this.state.date}
                        mode="date"
                        placeholder={yesterday}
                        format="YYYY-MM-DD"
                        minDate="2019-01-01"
                        maxDate={yesterday}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            },
                            placeholderText: {
                                color: 'black',
                                borderColor: 'black'
                            },
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                            this.setState({ date: date })
                            this.props.getListExpertChecked(this.state.date)
                        }}
                    />
                    {/* <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 20, height: 40, justifyContent: 'center', marginLeft: -10, borderWidth: 1.5, borderColor: 'white' }}>
                        <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 16, padding: 5 }}>OK</Text>
                    </TouchableOpacity> */}
                </View>
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={this.props.request_getListExpertBid == true}
                        onRefresh={this._reload.bind(this)}
                    />}
                    data={this.props.data_getListExpertBid}
                    renderItem={this._renderItem}
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                />
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
        data_getListExpertBid: state.expert.data_getListExpertChecked,
        request_getListExpertBid: state.expert.request_getListExpertChecked,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getListExpertChecked: (date) => dispatch(ExpertActions.getListExpertChecked(date)),
        // getListExpertBid: () => dispatch(ExpertActions.getListExpertBid()),
        // setDataProposer: (data) => dispatch(ExpertActions.setDataProposer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpertChecked)
