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
I18n.fallbacks = true;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
// let count = 1
class ListExpert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tmp_item: null,
            loading: false,
        }
        this.status = firebase.database().ref('status_manager/')
    }

    // getListContact2 = () => {
    //     this.setState({ loading: true })
    //     count2 = count2 + 10
    //     this.myContactList.limitToLast(count2).on('value', data => {
    //         // console.log(data) // raw data
    //         if (data.val()) {
    //             // console.log(Object.values(data))  // confuse data, spread data
    //             console.log(Object.values(data._value)) //  normal data
    //             // console.log(Object.values(data.val())) // normal data same!!
    //             this.props.setListMyContact(Object.values(data._value))
    //             this.setState({ loading: false })
    //         } else {
    //             this.setState({ loading: false })
    //         }
    //         console.log('----------------- HERE DATA LIST MESSAGE --------------------')
    //     })
    // }

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
        this.props.getListExpertBid()
    }

    _reload = () => {
        this.getStatusManager()
        this.props.getListExpertBid()
    }

    _pressList = (item) => {
        if (item.proposer == this.props.user_id) {
            this.props.setDataProposer(item)
            if (this.props.profile && this.props.profile.role == "admin")
                this.props.navigation.navigate('bit')
            else if (this.props.profile && this.props.profile.role == "expert")
                this.props.navigation.navigate("bitexpert")

        } else {
            this.props.setDataProposer(item)
            this.props.navigation.navigate('listExpert2')
        }
    }

    _renderItem = ({ item, index }) => {
        let color = "lightgrey"
        let tmp
        if (this.props.status_manager && this.props.status_manager != undefined && this.props.status_manager != null) {
            tmp = this.props.status_manager.find(e => e.uid == item.proposer)

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
            <View style={{ marginTop: 10, marginBottom: 7.5, justifyContent: 'center', width: width / 1.75 }}>
                <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 16 }}>{item.profile && item.profile.name ? item.profile.name : 'Expert Account'}</Text>
                <Text>{I18n.t("countExpertBid") + item.count}</Text>
            </View>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10 }} onPress={() => this._showPopup(item)}>
                <Text style={{ fontFamily: 'Prompt-SemiBold', fontSize: 14, color: 'white', paddingHorizontal: 20, paddingTop: 2.5, borderRadius: 15, height: 30, backgroundColor: color, textAlignVertical: 'center' }}>Group</Text>
            </TouchableOpacity>

        </TouchableOpacity >)
    }

    _showPopup = (item) => {
        // console.log(item.group, "********************** ITEM *************************************")
        this.setState({ tmp_item: item })
        this.popupDialog2.show()
    }

    render() {
        // console.log(this.state.tmp_item)
        console.log(this.props.status_manager)
        console.log('------------------------------ LIST EXPERT SCREEn -------------------------------------------')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={this.props.request_getListExpertBid == true}
                        onRefresh={this._reload.bind(this)}
                    />}
                    data={this.props.data_getListExpertBid}
                    renderItem={this._renderItem}
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                />

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

            </LinearGradient >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        profile: state.question.profile,
        request_profile: state.question.request_profile,
        data_versatile: state.versatile.data_versatile,
        data_getListExpertBid: state.expert.data_getListExpertBid,
        request_getListExpertBid: state.expert.request_getListExpertBid,
        status_manager: state.expert.status_manager,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getListExpertBid: () => dispatch(ExpertActions.getListExpertBid()),
        setDataProposer: (data) => dispatch(ExpertActions.setDataProposer(data)),
        setStatusManager: (data) => dispatch(ExpertActions.setStatusManager(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpert)



