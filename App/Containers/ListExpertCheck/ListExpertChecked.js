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
            date: moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD"),
            loading: false,
        }
        this.status = firebase.database().ref('status_manager/')
    }

    getStatusManager = () => {
        this.setState({ loading: true })
        this.status.on('value', data => {
            if (data.val()) {
                console.log(Object.values(data._value)) //  normal data
                console.log('*************** FROM FIREBASE ****************************************')
                this.props.setStatusManager(Object.values(data._value))
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    componentDidMount() {
        this.getStatusManager()
        this.props.getListExpertChecked(moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD"))
    }

    _reload = () => {
        this.getStatusManager()
        this.props.getListExpertChecked(this.state.date)
    }

    _pressList = (item) => {
        // this.props.setDataProposer(item)
        // this.props.navigation.navigate('listExpert2')
    }

    _renderItem = ({ item, index }) => {
        let color = "lightgrey"
        let tmp
        if (this.props.status_manager && this.props.status_manager != undefined && this.props.status_manager != null) {
            tmp = this.props.status_manager.find(e => e.uid == item.user_id)

            if (tmp && tmp != null && tmp != undefined && tmp.status == 'active') {
                color = "#58D68D"
            }
            else if (tmp && tmp != null && tmp != undefined && tmp.status == 'exit') {
                color = "lightgrey"
            }
            else if (tmp && tmp != null && tmp != undefined && tmp.status == 'background') {
                color = "lightgrey"
            }
            else {
                color = 'lightgrey'
            }
        }
        return (<TouchableOpacity style={{ flexDirection: 'row', height: 70, width: "100%", alignItems: 'center', backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1.5 }} onPress={() => this._pressList(item)}>
            <View style={{ width: 50, height: 50, margin: 10 }}>
                {item.profile && item.profile.img_full_link && <Image source={{ uri: item.profile.img_full_link }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                {item.profile && !item.profile.img_full_link && <Image source={Images.user} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                {!item.profile && <Image source={Images.user} style={{ width: 50, height: 50, borderRadius: 25 }} />}
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 10, marginLeft: 10, justifyContent: 'center', width: width / 2 }}>
                <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 16 }}>{item.profile && item.profile.name ? item.profile.name : 'Expert Account'}</Text>
                <Text>{I18n.t("countExpertChecked") + (item.count ? item.count : "0")}</Text>
            </View>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10 }} onPress={() => this._showPopup(item)}>
                <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 14, color: 'white', paddingHorizontal: 20, paddingTop: 2.5, borderRadius: 15, height: 30, backgroundColor: color, textAlignVertical: 'center' }}>Group</Text>
            </TouchableOpacity>
        </TouchableOpacity>)

    }

    _showPopup = (item) => {
        // console.log(item.group, "********************** ITEM *************************************")
        this.setState({ tmp_item: item })
        this.popupDialog2.show()
    }

    render() {
        console.log(this.state.date)
        console.log(this.props.status_manager)
        console.log('--------------------- LIST EXPERT CHECKED -----------------------------')
        // let date = moment(new Date()).format().slice(0, 10)
        let date = moment(new Date()).format("YYYY-MM-DD") // can!!
        // let date = moment(new Date()).format("YYYY MM DD") // can!!
        let yesterday = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")
        console.log(yesterday)
        console.log(date)
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('detail')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_item && this.state.tmp_item.group && this.state.tmp_item.group == "Check Phra Admin" ?
                            <View style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 10, flex: 1, height: (height / 2) - 40 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.bloodOrange }}>Check Phra Admin</Text>
                            </View> : this.state.tmp_item && this.state.tmp_item.group && this.state.tmp_item.group != "Check Phra Admin" && this.state.tmp_item.group.map((e, i) => {
                                return (
                                    // <View key={"main" + i} style={{ flex: 1 }}>
                                    <View key={"sub" + i} style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: i == this.state.tmp_item.group.length - 1 ? 10 : 0, marginHorizontal: 10, flex: 1, height: this.state.tmp_item.group.length <= 3 ? ((height / 2) / this.state.tmp_item.group.length) - ((this.state.tmp_item.group.length + 1) * 10) : 60 }} >
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{e.name}</Text>
                                    </View>
                                    // </View>
                                )
                            })}
                    </ScrollView>
                </PopupDialog>

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
        status_manager: state.expert.status_manager,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getListExpertChecked: (date) => dispatch(ExpertActions.getListExpertChecked(date)),
        setStatusManager: (data) => dispatch(ExpertActions.setStatusManager(data)),
        // getListExpertBid: () => dispatch(ExpertActions.getListExpertBid()),
        // setDataProposer: (data) => dispatch(ExpertActions.setDataProposer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpertChecked)
