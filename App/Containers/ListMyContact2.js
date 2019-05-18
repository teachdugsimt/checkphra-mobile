// ==================================
// ***************** ห้องแชทเดี่ยว ติดต่อเจ้าของพระ *****************
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
import MarketActions from '../Redux/MarketRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import styles from './Styles/HomeScreenStyle'
import RealtimeActions from '../Redux/RealtimeRedux'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase, { messaging } from 'react-native-firebase';
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let check = true

class ListMyContact2 extends Component {
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

            tmp_vote: null,
            owner_profile: null,
            data_message: null,
        }
        let privateKeyUid = '';
        if (this.props.tmp_listMyContact.uid < this.props.user_id) {
            privateKeyUid = this.props.tmp_listMyContact.uid + this.props.user_id;
        } else {
            privateKeyUid = this.props.user_id + this.props.tmp_listMyContact.uid;
        }

        this.messageRef0 = firebase.database().ref('messages/privatechat/' + privateKeyUid);  //send
        this.messageRef = firebase.database().ref('messages/privatechat/').child(privateKeyUid);  // get 

        this.myContactList = firebase.database().ref('contacts/' + this.props.user_id)
        this.ownerContactList = firebase.database().ref('contacts/' + this.props.tmp_listMyContact.uid)

        this.profile = firebase.database().ref('profile/' + this.props.tmp_listMyContact.uid)
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            // title: params.getName,  // change title => String
            headerTitle: (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: "white" }} numberOfLines={1}>
                        {I18n.t("privateChat")}
                    </Text>
                </View>
            )
        };
    };

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('------------- SEND MESSAGE OWNER --------------')
        if (newProps.data_sendMessageTheirAmulet && newProps.data_sendMessageTheirAmulet != null && prevState.mlist != newProps.data_sendMessageTheirAmulet) {
            // กรณี ผู้ใช้คุยกับเจ้าของพระ ต้องปรับ discuss_id ด้วยเสมอ
            if (newProps.data_contactOwner && newProps.data_contactOwner != null) {
                if (newProps.discuss != newProps.data_sendMessageTheirAmulet.id) {
                    // newProps.updateUserContactOwnerList(newProps.discuss, newProps.data_sendMessageTheirAmulet.id)
                    // newProps.setDisscuss(newProps.data_sendMessageTheirAmulet.id)
                }
            }

            newProps.editTheirAmuletMessage(newProps.data_sendMessageTheirAmulet)
            return {
                mlist: newProps.data_sendMessageTheirAmulet
            }
        }

        if (newProps.data_vote && newProps.data_vote != null) {
            if (prevState.tmp_vote != newProps.data_vote && newProps.data_their.id == newProps.data_vote.id && newProps.data_areaAmulet && newProps.data_areaAmulet != null) {
                console.log('FUCK COME HERE')
                newProps.setTheirAmuletData(newProps.data_vote)
                newProps.editVoteData(newProps.data_vote)
                newProps.clearDataVote()
                return {
                    tmp_vote: newProps.data_vote
                }
            }
        }

        if (newProps.data_vote && newProps.data_vote != null) {
            if (prevState.tmp_vote != newProps.data_vote && newProps.data_their.id == newProps.data_vote.id && newProps.data_contactOwner && newProps.data_contactOwner != null) {
                console.log('--------------Come From List User contact to Owner-----------')
                newProps.setTheirAmuletData(newProps.data_vote)
                newProps.syncVoteData(newProps.data_vote)
                newProps.clearDataVote()
                return {
                    tmp_vote: newProps.data_vote
                }
            }
        }

        if (newProps.data_vote && newProps.data_vote != null) {
            if (prevState.tmp_vote != newProps.data_vote && newProps.data_their.id == newProps.data_vote.id && newProps.data_amuletstore && newProps.data_amuletstore != null) {
                console.log('-------------- Come From List Shop OTHER PERSON 55555 -----------')
                newProps.setTheirAmuletData(newProps.data_vote)
                newProps.syncVoteData2(newProps.data_vote)
                newProps.clearDataVote()
                return {
                    tmp_vote: newProps.data_vote
                }
            }
        }

        // for SEARCH FUNCTION
        if (newProps.data_vote && newProps.data_vote != null) {
            if (prevState.tmp_vote != newProps.data_vote && newProps.data_their.id == newProps.data_vote.id && newProps.data_answer && newProps.data_answer != null) {
                console.log('-------------- Come From List Shop OTHER PERSON 55555 -----------')
                newProps.setTheirAmuletData(newProps.data_vote)
                newProps.editVoteSearch(newProps.data_vote)
                newProps.clearDataVote()
                return {
                    tmp_vote: newProps.data_vote
                }
            }
        }

        // data_contactOwner // main data user contact owner
        // setDisscuss

        // for SEARCH FUNCTION

        return {
            // mlist: message_list,
            // mlist: newProps.data_sendMessageTheirAmulet && newProps.data_sendMessageTheirAmulet
            // tlist: tmp_messages
        }
    }

    handleChange = (event) => {
        this.setState({
            message: event.target.value,
            timestamp: new Date().getTime()
        });
    }

    handleSend = (message) => {
        console.log('-------------------- SEND MESSAGE ZONE ------------------------')
        if (message) {
            this.setState(previousState => ({
                message: GiftedChat.append(previousState.message, message[0])
            }));
            console.log(message[0])
            console.log('_______________________ NEW ITEM BEFORE _______________________')
            let newItem = {
                _id: message[0]._id,
                text: message[0].text,
                createdAt: message[0].createdAt,
                user: {
                    _id: message[0].user._id,
                    name: message[0].user.name,
                    avatar: message[0].user.avatar,
                    email: message[0].user.email,
                    fb_id: message[0].user.fb_id,
                },
                mid: this.props.tmp_listMyContact.lastes_amulet.mid,
                type: 3,
                uid_owner: this.props.tmp_listMyContact.uid
            }
            console.log(newItem)
            console.log('______________________ NEW ITEM AFTER %% _____________________________')
            // this.messageRef.push(newItem);
            this.messageRef0.push(newItem)
            this.myContactList.child(this.props.tmp_listMyContact.uid).set({  // user => owner amulet 
                uid: this.props.tmp_listMyContact.uid,
                owner_profile: {
                    email: this.state.owner_profile.email,
                    fb_id: this.state.owner_profile.fb_id,
                    image: this.state.owner_profile.image,
                    name: this.state.owner_profile.name
                },
                lastes_amulet: {
                    mid: this.props.tmp_listMyContact.lastes_amulet.mid,
                    amuletName: this.props.tmp_listMyContact.lastes_amulet.amuletName,
                    contact: this.props.tmp_listMyContact.lastes_amulet.contact,
                    owner: this.props.tmp_listMyContact.lastes_amulet.owner,
                    price: this.props.tmp_listMyContact.lastes_amulet.price,
                    temple: this.props.tmp_listMyContact.lastes_amulet.temple,
                    images: this.props.tmp_listMyContact.lastes_amulet.images,
                    images_thumbs: this.props.tmp_listMyContact.lastes_amulet.images_thumbs,
                },
                updated_at: new Date(),
                last_message: message[0].text,
            });
            this.ownerContactList.child(this.props.user_id).set({  // set user at CALL!! owner amulet 
                uid: this.props.user_id,
                owner_profile: {
                    email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
                    fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
                    image: this.props.profile && this.props.profile.image ? this.props.profile.image : "-",
                    name: this.props.profile && this.props.profile.firstname ? this.props.profile.firstname + (this.props.profile && this.props.profile.lastname ? this.props.profile.lastname : "-") : "-"
                },
                lastes_amulet: {
                    mid: this.props.tmp_listMyContact.lastes_amulet.mid,
                    amuletName: this.props.tmp_listMyContact.lastes_amulet.amuletName,
                    contact: this.props.tmp_listMyContact.lastes_amulet.contact,
                    owner: this.props.tmp_listMyContact.lastes_amulet.owner,
                    price: this.props.tmp_listMyContact.lastes_amulet.price,
                    temple: this.props.tmp_listMyContact.lastes_amulet.temple,
                    images: this.props.tmp_listMyContact.lastes_amulet.images,
                    images_thumbs: this.props.tmp_listMyContact.lastes_amulet.images_thumbs,
                },
                updated_at: new Date(),
                last_message: message[0].text,
            })
        }
    }

    listenMessages = async () => {
        console.log('---------------- GET LISTEN MESSAGE 5555 ----------------')
        this.profile.on('value', profile => {
            console.log(profile._value)
            // let data = Object.values(profile.val()) // confuse data
            this.setState({
                owner_profile: profile._value
            })
        })
        this.messageRef.limitToLast(10).on('value', message => {
            if (message.val()) {
                // console.log(message.val())
                if (this._isMounted === true) {
                    this.setState({
                        list: Object.values(message.val()),
                        message: Object.values(message.val())
                    });
                }
                // this.props.setDataMessage2(Object.values(message.val()))
                // console.log(message.val())  // already sort
                this.props.setListMyContact2(Object.values(message.val()))
                console.log(Object.values(message.val()))  // not sort
                console.log('----------------------- FRUCK HERE ------------------------')
            }
        })
        // get Facebook id from this.myContactList..... && get FB id and send it when send message
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
        this.listenMessages()
        count = 1
        // if (this.props.data_contactOwner && this.props.data_contactOwner != null && this.props.data_their) {
        //     // มีคนทักมาสนทนา 1-1 กับพระของเราเอง ต้องโหลดข้อมูล จาก API ใหม่ด้วยนะครับ
        //     // console.log(this.props.data_their)
        //     console.log('--------- 111111111111 ----------')
        //     this.props.getMessageOtherContactMyAmulet(count)
        //     // ต้องอัพเดทการอ่าน และแก้ is_new ที่นี่ ด้วย

        //     this.props.updateIsNewUserContactOwner(this.props.discuss)
        // } else {
        //     console.log('--------- 22222222222 ----------')
        //     this.props.getMessageTheirAmulet(count)
        // }
        // let img = []
        // this.props.data_their.images.map(e => {
        //     img.push({ url: e })
        // })
        // this.setState({ img })

    }

    componentWillUnmount() {
        // this.props.clearDataMessage2()
        this.setState({ text: null, tmp_vote: null })
        count = 1
        this.props.clearTheirAmuletMessage()
        this.props.clearDataGroupChat()
        // if (this.props.data_contactOwner && this.props.data_contactOwner != null) {
        //     this.props.getMyMessageFromOther(1)
        // }
    }

    // ************************ NEW SCHOOL ************************** //
    _reload = () => {
        // count = 1
        // this.props.getMessageTheirAmulet(count)
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count++
            if (this.props.data_contactOwner && this.props.data_contactOwner != null) {
                this.props.getMessageOtherContactMyAmulet(count)
            } else {
                this.props.getMessageTheirAmulet(count)
            }
        }
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count = 1
            if (this.props.data_contactOwner && this.props.data_contactOwner != null) {
                this.props.getMessageOtherContactMyAmulet(count)
            } else {
                this.props.getMessageTheirAmulet(count)
            }
        }
    }
    // ************************ NEW SCHOOL ************************** //



    _chatOwnerAmulet = () => {
        // this.props.navigation.navigate("")
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
                        <View style={{ flexDirection: 'row', justifyContent: e.uid == this.props.user_id ? 'flex-end' : 'flex-start' }}>
                            {e.uid != this.props.user_id && !e.fb_id && <TouchableOpacity style={{ height: 32, width: 32, borderRadius: 16 }} onPress={() => { }}><Image style={{ height: 32, width: 32, borderRadius: 16, alignSelf: 'flex-start' }}
                                source={Images.user} /></TouchableOpacity>}

                            {e.uid != this.props.user_id && e.fb_id && <TouchableOpacity style={{ marginTop: 2.5 }} onPress={() => this._goToURL(e.fb_id)}><Image style={{ height: 32, width: 32, borderRadius: 16, alignSelf: 'flex-start' }}
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

    _dislikeAmulet = () => {
        this.props.voteAmulet(this.props.data_their.id, 'fake')
    }

    _likeAmulet = () => {
        this.props.voteAmulet(this.props.data_their.id, 'real')
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        // console.log(this.props.data_their)
        // console.log(this.state.owner_profile)
        console.log('--------------------- ChatTheirAmuletOwner DATA -------------------------')
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

                <GiftedChat
                    user={{
                        _id: this.props.user_id,
                        name: this.props.profile && this.props.profile.firstname ? (this.props.profile.firstname + (this.props.profile.lastname ? this.props.profile.lastname : "")) : "-",
                        avatar: this.props.profile && this.props.profile.image ? "https://s3-ap-southeast-1.amazonaws.com/core-profile/images/" + this.props.profile.image : (this.props.profile && this.props.profile.fb_id ? 'https://graph.facebook.com/' + this.props.profile.fb_id + "/picture?width=500&height=500" : "-"),
                        email: this.props.profile && this.props.profile.email ? this.props.profile.email : "-",
                        fb_id: this.props.profile && this.props.profile.fb_id ? this.props.profile.fb_id : "-",
                    }}
                    messages={this.props.data_listMyContact2}
                    onSend={message => {
                        this.handleChange
                        this.handleSend(message)
                    }}
                    showUserAvatar={false}
                />

            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        // profile: state.auth.profile,  // have "user id" and none "store"
        profile: state.question.profile,  // have "store" and "user id" in store, ,

        data_their: state.showroom.data_their,  // data set to this page (ChatTheirAmulet)

        request2: state.showroom.request4,  //  request send message of their amulet 
        data_sendMessageTheirAmulet: state.showroom.data_sendMessageOwner,  // request send message of their amulet

        request3: state.showroom.request5,  // request for get message of this room
        data_messageTheirAmulet: state.showroom.data_messageOwner, // request for get message of this room

        request8: state.market.request8,  // for vote amulet
        data_vote: state.market.data_vote,  // store vote amulet

        data_areaAmulet: state.market.data_areaAmulet,

        data_contactOwner: state.showroom.data_listOwner,  // data for store my message from other person ( Chat Solo )

        data_amuletstore: state.market.data_amuletstore,  // for store data list amulet in each store

        data_answer: state.market.data_search,  // for store search data  13/02/2019 update comment

        discuss: state.showroom.discuss_id,  // discuss id
        // data_myMessageFromOther: state.showroom.data_listOwner,  // data for store my message from other person ( Chat Solo )

        data_message: state.realtime.data_message2,  // store data realtime private chat

        data_listMyContact2: state.realtime.data_listMyContact2, // store data private chat me & owner
        tmp_listMyContact: state.realtime.tmp_listMyContact, // store tmp list my contact profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessageTheirAmulet: (message) => dispatch(ShowRoomActions.sendMessageOwner(message)),  // send message
        getMessageTheirAmulet: (page) => dispatch(ShowRoomActions.getMessageOwner(page)), // get message  main REQUEST
        clearTheirAmuletMessage: () => dispatch(ShowRoomActions.clearOwnerAmuletMessage()), // clear get&send data
        editTheirAmuletMessage: (data) => dispatch(ShowRoomActions.editOwnerAmuletMessage(data)),

        editVoteData: (data) => dispatch(MarketActions.editVoteData(data)),
        clearDataVote: () => dispatch(MarketActions.clearDataVote()),
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        voteAmulet: (id, status) => dispatch(MarketActions.voteAmulet(id, status)),

        syncVoteData: (data) => dispatch(ShowRoomActions.syncVoteData(data)),
        syncVoteData2: (data) => dispatch(MarketActions.syncVoteData2(data)),
        editVoteSearch: (data) => dispatch(MarketActions.editVoteSearch(data)),
        updateIsNewUserContactOwner: (id) => dispatch(ShowRoomActions.updateIsNewUserContactOwner(id)),

        // สำหรับ มีคนอื่น ทักมาคุย 1-1 กับพระของเรา เท่านั้น !!!!
        getMessageOtherContactMyAmulet: (page) => dispatch(ShowRoomActions.getMessageOtherContactMyAmulet(page)),
        setDisscuss: (id) => dispatch(ShowRoomActions.setDisscuss(id)),
        getMyMessageFromOther: (page) => dispatch(ShowRoomActions.getListOwnerContact(page)),

        updateUserContactOwnerList: (old_id, new_id) => dispatch(ShowRoomActions.updateUserContactOwnerList(old_id, new_id)),
        clearDataGroupChat: () => dispatch(ShowRoomActions.clearDataGroupChat()),

        setDataMessage2: (data) => dispatch(RealtimeActions.setDataMessage2(data)),
        clearDataMessage2: () => dispatch(RealtimeActions.clearDataMessage2()),

        setListMyContact2: (data) => dispatch(RealtimeActions.setListMyContact2(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMyContact2)

//