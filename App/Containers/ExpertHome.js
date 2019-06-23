import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions, AsyncStorage,
    TextInput, Linking, ImageBackground, Image, Platform, Alert, AppState
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import QuestionActions from '../Redux/QuestionRedux'
import AuthActions from '../Redux/AuthRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import VersatileActions from '../Redux/VersatileRedux'
import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let check_status = true
class ExpertHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list_user: null,
            dataProifle: null,
            language: '',
            appState: AppState.currentState,
        }
        this.profile = firebase.database().ref('profile/' + this.props.user_id)
        this.status = firebase.database().ref('status_manager/' + this.props.user_id)
    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: I18n.t('home'),
        }
    }
    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        console.log('============  HOME PAGE =============')

        // const list_user = [{ name: I18n.t('checkAmuletScreen'), id: 1, logo: (<View><Text>5555555555555555555555888</Text></View>) },
        // { name: I18n.t('showAmuletReal'), id: 2 },
        // { name: I18n.t('chat'), id: 3 }]
        const list_user = [{ name: I18n.t('pendingList'), id: 1, logo: 'th-list' },
        { name: I18n.t('editAnswer'), id: 2, logo: 'pencil-square-o' },
        { name: I18n.t('commu'), id: 3, logo: 'wechat' },
        { name: I18n.t('market'), id: 4, logo: 'cart-plus' },
        { name: I18n.t('listExpert'), id: 5, logo: 'file-text-o' }]

        if (newProps.language != prevState.language) {
            newProps.getProfile()
        }

        let profile = newProps.profile
        if (newProps.profile && newProps.profile != null && prevState.dataProifle != newProps.profile) {
            let a = JSON.parse(JSON.stringify(newProps.profile))
            a['user_id'] = newProps.user_id
            newProps.setProfileBeforeSignout(a)
            profile = newProps.profile
        }

        return {
            // listPromotion: plist
            dataProifle: profile,
            list_user,
            language: newProps.language
        }
    }

    _pressList = (item) => {
        if (item.id == 1) {
            this.props.navigation.navigate('check')
        } else if (item.id == 2) {
            this.props.navigation.navigate('answerExpert1')
        } else if (item.id == 3) {
            this.popupDialog.show()
        } else if (item.id == 4) {
            this.props.navigation.navigate('marketHome')
        } else if (item.id == 5) {
            // this.props.navigation.navigate('listExpert')
            this.popupDialog2.show()
        }
    }

    _renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={{ height: 140, backgroundColor: 'transparent', backgroundColor: Colors.milk, borderRadius: 20, marginTop: 4, marginHorizontal: 7 }} onPress={() => this._pressList(item)}>
                <View style={{ flex: 1, borderLeftColor: '#FF530D', borderLeftWidth: 5, borderTopColor: '#FF530D', borderTopWidth: 5, marginVertical: 8, marginHorizontal: 8, borderRadius: 12 }}>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: 30, borderLeftWidth: 5, borderLeftColor: '#FF530D', borderBottomWidth: 5, borderBottomColor: '#FF530D', width: 20, marginRight: 12, borderRadius: 8 }}>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: Colors.brownTextTran }}>{item.name}</Text>
                        {item.logo}
                    </View>

                    <View style={{ height: 30, borderRightWidth: 5, borderRightColor: '#FF530D', borderTopWidth: 5, borderTopColor: '#FF530D', width: 20, marginLeft: 12, borderRadius: 8 }}>
                    </View>
                </View>

                <View style={{ flex: 1, borderBottomColor: '#FF530D', borderBottomWidth: 5, borderRightColor: '#FF530D', borderRightWidth: 5, marginVertical: 8, marginHorizontal: 8, borderRadius: 12 }}>
                </View>
            </TouchableOpacity>
        )
    }

    _reload = () => {
        this.props.getProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps, prevState)
        console.log(this.state.appState)
        if (prevState.appState != this.state.appState) {
            this.status.set({
                uid: this.props.user_id ? this.props.user_id : "-",
                name: this.props.profile && this.props.profile.firstname ? (this.props.profile.firstname + " " + (this.props.profile.lastname ? this.props.profile.lastname : "")) : "-",
                email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
                fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
                image: this.props.profile && this.props.profile.image ? this.props.profile.image : "-",
                status: this.state.appState,
            })
            console.log("******************* STATUS CHANGE ******************************")
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            console.log('*********************App has come to the foreground!***************************');
        }
        this.setState({ appState: nextAppState });
    };

    componentWillUnmount() {
        // console.log(this.state.dataProifle)  // lost from signout
        console.log(this.props.tmp_profile)  // this is real !!
        console.log('----------------------- PROFILE BEFORE CLOSE -------------------------')
        // console.log(this.props.profile)  // lost from signout
        this.status.set({
            uid: this.props.tmp_profile ? this.props.tmp_profile.user_id : "-",
            name: this.props.tmp_profile && this.props.tmp_profile.firstname ? (this.props.tmp_profile.firstname + " " + (this.props.tmp_profile.lastname ? this.props.tmp_profile.lastname : "")) : "-",
            email: this.props.tmp_profile && this.props.tmp_profile.email ? this.props.tmp_profile.email : "-",
            fb_id: this.props.tmp_profile && this.props.tmp_profile.fb_id ? this.props.tmp_profile.fb_id : "-",
            image: this.props.tmp_profile && this.props.tmp_profile.image ? this.props.tmp_profile.image : "-",
            status: 'exit',
        })
        console.log('************************ EXIST APP *******************************')
        this.props.clearTmpProfile()
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.props.getNormalData()
        this.props.getProfile()
        this.getDeviceToken()
    }
    //0
    async getDeviceToken() {
        this.checkPermission();
        this.createNotificationListeners(); //add this line
    }

    //1
    async checkPermission() {
        console.log("check permission")
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //2
    async getToken() {
        console.log("get token")
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken)
                // user has a device token
                this.props.saveDeviceToken(fcmToken)
                await AsyncStorage.setItem('fcmToken', fcmToken);

            }
        } else {
            console.log(fcmToken)
            this.props.saveDeviceToken(fcmToken)
        }
    }

    //3
    async requestPermission() {
        console.log("request permission")
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }
    //4
    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            console.log("------------ NOTIFICATION 1 ---------------")  // 1. ตอนที่เราเปิดหน้าแอพอยู่
            this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log("------------ NOTIFICATION 2 ---------------") // 2. ตอนที่เราเข้าแอพอื่น แต่ไม่ได้ปิดแอพเช็คพระ
            this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            console.log("------------ NOTIFICATION 3 ---------------")  // 3. ตอนที่เราปิดแอะเช็คพระ
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
                { text: "SKIP", onPress: () => console.log("SKIP PRESSED") }
            ],
            { cancelable: false },
        );
    }

    _webBoard = () => {
        this.props.navigation.navigate('web1')
        this.popupDialog.dismiss()
    }

    _editAnswer = () => {

    }

    _userContact = () => {
        this.props.navigation.navigate('chat2')
        this.popupDialog.dismiss()
    }

    render() {
        I18n.locale = this.props.language


        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
                {/* <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request_profile == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={styles.textEmptyData}>{I18n.t('nonePromotion')}</Text>}
                    data={this.state.list_user ? this.state.list_user : []}
                    renderItem={this._renderItem}
                /> */}

                <GridView
                    itemDimension={width / 2.5}
                    items={this.state.list_user ? this.state.list_user : []}
                    renderItem={item => {
                        if (this.props.profile) {
                            this.status.set({
                                uid: this.props.user_id ? this.props.user_id : "-",
                                name: this.props.profile && this.props.profile.firstname ? (this.props.profile.firstname + " " + (this.props.profile.lastname ? this.props.profile.lastname : "")) : "-",
                                email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
                                fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
                                image: this.props.profile && this.props.profile.image ? this.props.profile.image : "-",
                                status: this.state.appState,
                            })

                            this.profile.set({
                                uid: this.props.user_id ? this.props.user_id : "-",
                                name: this.props.profile && this.props.profile.firstname ? (this.props.profile.firstname + " " + (this.props.profile.lastname ? this.props.profile.lastname : "")) : "-",
                                email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
                                fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
                                image: this.props.profile && this.props.profile.image ? this.props.profile.image : "-"
                            })
                        }
                        return (

                            <TouchableOpacity onPress={() => this._pressList(item)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 130, width: '100%', backgroundColor: Colors.milk, justifyContent: "center", alignItems: 'center', borderRadius: 8, padding: 10 }}>
                                    <Icon2 name={item.logo} size={62} />
                                    <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 18, paddingTop: 5, marginHorizontal: 7.5 }} >
                                        {item.name}</Text>
                                </View>
                                {item.id == 1 && this.props.data_versatile && this.props.data_versatile.new_question && <View style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'red', borderRadius: 16, borderColor: 'white', borderWidth: 1, height: 32, justifyContent: 'center' }}><Text style={{ color: 'white', fontFamily: 'Prompt-Semibold', fontSize: 14, padding: 7.5, paddingHorizontal: 16, textAlign: 'center', textAlignVertical: 'center' }}>{this.props.data_versatile.new_question}</Text></View>}
                            </TouchableOpacity>
                        );
                    }}
                />

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editType')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 3}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >

                    <View style={{ flex: 1 }}>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 10, flex: 1, height: '100%' }} onPress={this._webBoard}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('webBoard')}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 70, marginHorizontal: 10 }} onPress={this._editAnswer}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('chat')}</Text>
                                </TouchableOpacity> */}

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 10, flex: 1, height: '100%' }} onPress={this._userContact}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('userContact')}</Text>
                        </TouchableOpacity>

                    </View>

                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editType')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 3}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >

                    <View style={{ flex: 1 }}>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 10, flex: 1, height: '100%' }} onPress={() => {
                            this.props.navigation.navigate("listExpert")
                            this.popupDialog2.dismiss()
                        }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('countExpertBid').slice(0, I18n.t("countExpertBid").length - 3)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginHorizontal: 10, flex: 1, height: '100%' }} onPress={() => {
                            this.props.navigation.navigate("listExpertChecked")
                            this.popupDialog2.dismiss()
                        }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('countExpertChecked').slice(0, I18n.t('countExpertChecked').length - 3)}</Text>
                        </TouchableOpacity>

                    </View>
                </PopupDialog>

            </LinearGradient>
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
        tmp_profile: state.versatile.tmp_profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        setProfileBeforeSignout: (data) => dispatch(VersatileActions.setProfileBeforeSignout(data)),
        clearTmpProfile: () => dispatch(VersatileActions.clearTmpProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertHome)
