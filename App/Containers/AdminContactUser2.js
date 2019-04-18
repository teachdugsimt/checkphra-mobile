// ==================================
// ***************** ห้องแชทรวม ในหมวด "พระของคนอื่น" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal, Linking
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import ChatActions from '../Redux/ChatRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import { messaging } from 'react-native-firebase';
import AdminContactUser from './AdminContactUser';
import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let check = true
class AdminContactUser2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hide: false,
            text: null,
            modalVisible: false,
            index: 0,
            img: null,
            mlist: null,
            tlist: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        Reactotron.warn(newProps)
        Reactotron.warn(prevState)
        console.log('----------------- Admin Chat With user ------------------')
        // 1. ถ้ามีการส่งข้อความ ให้เก็บอาเรย์ response จากตั้ม ไว้ที่ เสตท message_list แล้วก้ เอาข้อความอันล่าสุด จาก response มาเก็บไว้ที่อาเรย์
        // tmp ใน เสตท

        if (newProps.data_sendMessageToUser && newProps.data_sendMessageToUser != null && prevState.mlist != newProps.data_sendMessageToUser) {
            console.log(newProps.data_sendMessageToUser)
            newProps.editTheirAmuletMessage(newProps.data_sendMessageToUser)
            return {
                mlist: newProps.data_sendMessageToUser
            }
        }

        return {
            // mlist: message_list,
            // mlist: newProps.data_sendMessageToUser && newProps.data_sendMessageToUser
            // tlist: tmp_messages
        }
    }

    _sendMessage = () => {
        if (this.state.text) {
            console.log('send message complete')
            console.log(this.state.text)
            this.props.sendMessageTheirAmulet(this.state.text)
            this.setState({ text: null })
        }
    }

    componentDidMount() {
        count = 1
        // if (this.props.data_sendMessageToUser && this.props.data_sendMessageToUser != null) {
        this.props.getMessageTheirAmulet(count)
        // }
        // let img = []
        // this.props.data_their.images.map(e => {
        //     img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        // })
        // this.setState({ img })
    }

    componentWillUnmount() {
        count = 1
        this.props.clearCacheGetData()
    }

    _reload = () => {
        if (this.props.data_getMessageFromUser && this.props.data_getMessageFromUser.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count++
            this.props.getMessageTheirAmulet(count)
        }
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_getMessageFromUser && this.props.data_getMessageFromUser.length >= 2 && (this.props.request3 == false || this.props.request3 == null)) {
            count = 1
            this.props.getMessageTheirAmulet(count)
        }
    }

    _chatOwnerAmulet = () => {
        // this.props.navigation.navigate("chatTheirAmuletOwner")
    }

    _showPicture = () => {
        this.setState({ modalVisible: true })
        this.popupDialog.show()
    }

    _goToURL = (item) => {
        // const url = 'm.me/316834699141900'
        // const url = 'https://www.messenger.com/t/' + item    // pc , mobile
        const url = 'https://m.me?app_scoped_user_id=' + item
        // const url = 'https://m.me/316834699141900' // pc , mobile can't use
        console.log(url)
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });

    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                {item.messages.map((e, i) => {  //myArray.slice(0).reverse().map(
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: e.uid == 'admin@check-phra' ? 'flex-end' : 'flex-start' }}>
                            {e.uid != 'admin@check-phra' && !e.fb_id && <TouchableOpacity style={{ height: 32, width: 32, borderRadius: 16 }} onPress={() => { }}><Image style={{ height: 32, width: 32, borderRadius: 16, alignSelf: 'flex-start' }}
                                source={Images.user} /></TouchableOpacity>}

                            {e.uid != 'admin@check-phra' && e.fb_id && <TouchableOpacity style={{ marginTop: 2.5 }} onPress={() => this._goToURL(e.fb_id)}><Image style={{ height: 32, width: 32, borderRadius: 16, alignSelf: 'flex-start' }}
                                source={{ uri: 'https://graph.facebook.com/' + e.fb_id + '/picture' }} /></TouchableOpacity>}

                            <View style={{
                                backgroundColor: '#FCF3CF', marginVertical: 2.5, marginHorizontal: 2.5,
                                borderRadius: 10, flexDirection: 'row',
                            }}>
                                <Text style={{ marginVertical: 5, marginHorizontal: 8, fontSize: 15 }}>{e.message}</Text>
                            </View>

                        </View>
                    )
                })}
            </View>
        )
    }



    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        // console.log(this.props.data_their)
        console.log('--------------------- Contact Admin -------------------------')
        return (
            <LinearGradient
                colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
            >
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />

                {/* ++++++++++++++++++++++++++++++++++++ MESSENGER ZONE ++++++++++++++++++++++++++++++++++++ */}

                <View style={{ marginTop: 5 }}></View>
                <FlatList
                    data={this.props.data_getMessageFromUser}
                    renderItem={this._renderItem}
                    ref={(list) => this.myFaltList = list}
                    onContentSizeChange={() => {
                        if (this.myFaltList.props.data && this.props.data_sendMessageToUser)
                            this.myFaltList.scrollToEnd()
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request3 == true}
                            onRefresh={this._reload}
                        />
                    }
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={0.1}
                />
                <View style={{ marginBottom: 10 }}>
                </View>
                {/*++++++++++++++++++++++++++++++++++++ MESSENGER ZONE ++++++++++++++++++++++++++++++++++++*/}

                <View style={{ height: 35, width: '100%' }}>
                    <TextInput style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: '#fff5', height: 40 }}
                        value={this.state.text} onChangeText={(text) => this.setState({ text })} />
                </View>


                <TouchableOpacity style={{ position: 'absolute', right: 5, bottom: 10 }} onPress={this._sendMessage}>
                    <Icon2 name={'arrow-right'} size={22} style={{}} />
                </TouchableOpacity>

                <Spinner
                    visible={this.props.request2}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }} />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,

        // data_their: state.showroom.data_their,  // data set to this page (ChatTheirAmulet)

        request2: state.chat.request,  //  request send message of their amulet 
        data_sendMessageToUser: state.chat.data_sendMessage,  // request send message of their amulet

        request3: state.chat.request2,  // request for get message of this room
        data_getMessageFromUser: state.chat.data_message, // request for get message of this room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessageTheirAmulet: (message) => dispatch(ChatActions.sendMessageAdmin(message)),  // send message **
        getMessageTheirAmulet: (page) => dispatch(ChatActions.getMessageAdmin(page)), // get message
        // clearTheirAmuletMessage: () => dispatch(ChatActions.clearTheirAmuletMessage()), 
        editTheirAmuletMessage: (data) => dispatch(ChatActions.editDataMessage(data)), // edit array
        clearCacheGetData: () => dispatch(ChatActions.clearCacheGetData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContactUser2)

//