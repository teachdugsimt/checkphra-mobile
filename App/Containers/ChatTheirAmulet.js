// ==================================
// ***************** ห้องแชทรวม ในหมวด "พระของคนอื่น" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal, Linking, Alert
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
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
class ChatTheirAmulet extends Component {
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
        }

        // let privateKeyUid = '';
        // console.log(this.props.data_their.user_id + " " + this.props.user_id)
        // if (this.props.data_their.user_id < this.props.user_id) {
        //     privateKeyUid = this.props.data_their.user_id + this.props.user_id;
        // } else {
        //     privateKeyUid = this.props.user_id + this.props.data_their.user_id;
        // }
        // console.log(privateKeyUid)
        // this.messageRef = firebase.database().ref('messages').child(privateKeyUid);
        // this.myContactList = firebase.database().ref('contacts/' + this.props.user_id)
        // // this.listenMessages();

        // console.log(this.messageRef)
        // console.log(this.myContactList)
        // console.log('----------- THIS MESSAGES REF ---------------')
    }

    // _sendMessage = () => {
    //     if (this.state.text) {
    //         this.props.sendMessageTheirAmulet(this.props.data_their.id, this.state.text)
    //         // this.setState({ text: null })
    //         var newItem = {
    //             userName: this.props.profile.firstname ? this.props.profile.firstname : "Check Phra User",
    //             message: this.state.text,
    //             timestamp: new Date(),
    //             uid: this.props.user_id
    //         }
    //         this.messageRef.push(newItem);
    //         this.myContactList.child(this.props.data_their.user_id).set({
    //             uid: this.props.data_their.user_id,
    //         });
    //         this.setState({ text: null });
    //     }
    // }

    static rename = (e) => {
        let name = ''
        if (e == 'เบญจภาคี') {
            name = I18n.t('benjapakee')
        }
        else if (e == 'พระสมเด็จ') {
            name = I18n.t('phraSomdej')
        }
        else if (e == 'นางพญา') {
            name = I18n.t('phraNangPaya')
        }
        else if (e == 'พระคง') {
            name = I18n.t('phraKhong')
        }
        else if (e == 'พระรอด') {
            name = I18n.t('phraRod')
        }
        else if (e == 'พระผงสุพรรณ') {
            name = I18n.t('phraPhongSuphan')
        }
        else if (e == 'พระซุ้มกอ') {
            name = I18n.t('phraSoomkor')
        }
        else if (e == 'พระกำแพงเม็ดขนุน') {
            name = I18n.t('phraKampaengMedKanun')
        }
        else if (e == 'หลวงปู่ทวด') {
            name = I18n.t('luangPuTuad')
        }
        else if (e == 'หลวงปู่หมุน') {
            name = I18n.t('luangPuMoon')
        }
        else if (e == 'พระกรุ') {
            name = I18n.t('phraKru')
        }
        else if (e == 'เหรียญปั้ม') {
            name = I18n.t('pumpCoin')
        }
        else if (e == 'เหรียญหล่อ') {
            name = I18n.t('castingCoin')
        }
        else if (e == 'พระผง') {
            name = I18n.t('phraPhong')
        }
        else if (e == 'พระกริ่ง') {
            name = I18n.t('phraKring')
        }
        else if (e == 'พระปิดตา') {
            name = I18n.t('phraPidta')
        }
        else if (e == 'เครื่องราง') {
            name = I18n.t('amulet')
        }
        else if (e == 'พระบูชา') {
            name = I18n.t('phraBucha')
        }
        else if (e == 'พระวัดประสาทบุญญาวาส') {
            name = I18n.t('phraWadPhrasatBunyawat')
        }
        else if (e == 'พระวัดระฆัง') {
            name = I18n.t('phraWadRakung')
        }
        else if (e == '100 ปี พ.ศ.2515') {
            name = I18n.t('year100era2515')
        }
        else if (e == '108 ปี พ.ศ.2523') {
            name = I18n.t('year108era2523')
        }
        else if (e == '118 ปี พ.ศ.2533') {
            name = I18n.t('year118era2533')
        }
        else if (e == '122 ปี พ.ศ.2537') {
            name = I18n.t('year122era2537')
        }
        else if (e == 'เสาร์ 5 พ.ศ.2536') {
            name = I18n.t('sat5era2536')
        }
        else if (e == 'เสาร์ 5 พ.ศ.2539') {
            name = I18n.t('sat5era2539')
        }
        else if (e == '214 ปีชาตกาล พ.ศ.2545') {
            name = I18n.t('year214era2545')
        }
        else if (e == 'หลวงพ่อหลิว') {
            name = I18n.t('LuangPhorLhew')
        }
        else if (e == 'หลวงพ่อกวย') {
            name = I18n.t('LuangPhorKauy')
        }
        else if (e == 'บางขุนพรหม') {
            name = I18n.t('BangKhunProm')
        }
        else if (e == 'บางขุนพรหม ปี พ.ศ.2509') {
            name = I18n.t('BangKhunProm2509')
        }
        else if (e == 'บางขุนพรหม ปี พ.ศ.2517') {
            name = I18n.t('BangKhunProm2517')
        }
        else if (e == 'อื่นๆ หรือ ไม่ทราบ') {
            name = I18n.t('otherOrUnknown')
        }

        return name
    }

    // _sendMessage = () => {
    //     if (this.state.text) {
    //         console.log('send message complete')
    //         console.log(this.state.text)
    //         this.props.sendMessageTheirAmulet(this.props.data_their.id, this.state.text)
    //         this.setState({ text: null })
    //     }
    // }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        // 1. ถ้ามีการส่งข้อความ ให้เก็บอาเรย์ response จากตั้ม ไว้ที่ เสตท message_list แล้วก้ เอาข้อความอันล่าสุด จาก response มาเก็บไว้ที่อาเรย์
        // tmp ใน เสตท

        if (newProps.data_sendMessageTheirAmulet && newProps.data_sendMessageTheirAmulet != null && prevState.mlist != newProps.data_sendMessageTheirAmulet) {
            // console.log(newProps.data_sendMessageTheirAmulet)
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
                // newProps.editVoteData(newProps.data_vote)
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
        // for SEARCH FUNCTION

        // data_amuletstore

        return {
            // mlist: message_list,
            // mlist: newProps.data_sendMessageTheirAmulet && newProps.data_sendMessageTheirAmulet
            // tlist: tmp_messages
        }
    }

    componentDidMount() {
        count = 1
        this.props.getMessageTheirAmulet(count)
        this.props.updateRead(this.props.data_their.type, this.props.data_their.id)
        this.props.editUpdateRead(this.props.data_their.type, this.props.data_their.id)
        let img = []
        // this.props.data_their.images.map(e => {
        //     img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        // })

        this.props.data_their.images.map(e => {
            img.push({ url: e })
        })
        this.setState({ img })
    }

    componentWillUnmount() {
        this.setState({ text: null, tmp_vote: null })
        count = 1
        // ปัญหาเดียวคือ รายการพระ ไม่โหลดข้อมูลใหม่ ทำให้ข้อมูลที่เซ็ทมาหน้านี้ไม่เป็นข้อมูลล่าสุด
        // this.props.clearDataTheir()  // add clear data their
        // this.props.clearDataVote()  // add   clear vote data
        // this.props.clearDataAreaAmulet()  // add clear List Item before this screen
        // this.props.getListAreaAmulet(1) // add   get list Item before this screen

        this.props.clearTheirAmuletMessage() // clear message and send message
    }
    // ********************* OLD SCHOOL *************************** //
    // _reload = () => {
    //     // count = 1
    //     // this.props.getMessageTheirAmulet(count)
    //     if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 2 && (this.props.request3 == false || this.props.request3 == null)) {
    //         count++
    //         this.props.getMessageTheirAmulet(count)
    //     }
    // }

    // _onScrollEndList = () => {
    //     console.log('END LIST AGAIN')
    //     if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 2 && (this.props.request3 == false || this.props.request3 == null)) {
    //         count++
    //         this.props.getMessageTheirAmulet(count)
    //     }
    // }
    // ********************* OLD SCHOOL *************************** //

    // ************************ NEW SCHOOL ************************** //
    _reload = () => {
        // count = 1
        // this.props.getMessageTheirAmulet(count)
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count++
            this.props.getMessageTheirAmulet(count)
        }
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 1 && (this.props.request3 == false || this.props.request3 == null)) {
            count = 1
            this.props.getMessageTheirAmulet(count)
        }
    }
    // ************************ NEW SCHOOL ************************** //


    _chatOwnerAmulet = () => {
        this.props.navigation.navigate("chatTheirAmuletOwner")
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
        console.log(this.props.data_their)
        console.log('--------------------- ChatTheirAmulet DATA -------------------------')
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
                <View>

                    <PopupDialog
                        dialogTitle={<View></View>}
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        dialogAnimation={slideAnimation}
                        width={0}
                        height={0}
                        // height={150}
                        onDismissed={() => { this.setState({ modalVisible: false, index: 0 }) }}
                    >
                        <View style={{ width: '100%', height: '80%', backgroundColor: 'transparent' }}>
                            <Modal
                                visible={this.state.modalVisible}
                                transparent={true}
                                onRequestClose={() => this.setState({ modalVisible: false })}>
                                <ImageViewer
                                    saveToLocalByLongPress={false}
                                    imageUrls={this.state.img}
                                    backgroundColor={'lightgrey'}
                                    // onClick={(e) => {
                                    //     console.log('Show modal')
                                    //     this.setState({ modalVisible: true })
                                    // }}

                                    index={this.state.index} // index in array picture
                                    onSwipeDown={() => {
                                        console.log('onSwipeDown');
                                        this.setState({ modalVisible: false })
                                        this.popupDialog.dismiss()
                                    }}
                                    enableSwipeDown={true}
                                    failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
                                />
                            </Modal>

                        </View>
                    </PopupDialog>

                    {this.state.hide == false && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', height: 150, width: '100%' }} onPress={() => this.setState({ hide: true })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, marginHorizontal: 8, flex: 1 }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: 85, width: 85, borderRadius: 15 }} onPress={this._showPicture}>
                                    <Image style={{ height: 85, width: 85, borderRadius: 15 }} source={{ uri: this.props.data_their.images[0] }} />
                                </TouchableOpacity>
                            </View>
                            {this.props.profile && this.props.profile.role == "admin" && this.props.data_their.is_fake == false && <TouchableOpacity style={{ position: 'absolute', top: 5, left: 2.5 }} onPress={() => {
                                Alert.alert(
                                    'Check Phra',
                                    I18n.t('sureBan'),
                                    [
                                        { text: I18n.t('ok'), onPress: this._dislikeAmulet },
                                        { text: I18n.t('cancel'), }
                                    ]
                                )
                            }}><Text style={{ fontSize: 16, color: "white", backgroundColor: 'red', borderRadius: 10, paddingVertical: 2.5, paddingHorizontal: 7.5, }}>Ban</Text></TouchableOpacity>}
                            {this.props.data_their.is_fake == true && <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 30, position: 'absolute', top: 30, left: 20, transform: [{ rotate: '-38deg' }] }}>{I18n.t('fakePhra')}</Text>}
                            <View style={{ marginHorizontal: 15, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>{I18n.t('amuletName') + ": "}<Text style={{ fontSize: 14 }}>{this.props.data_their.amulet_detail.amuletName ? this.props.data_their.amulet_detail.amuletName : I18n.t('noneSpecify')}</Text></Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>{I18n.t('templeName') + ": "}<Text style={{ fontSize: 14 }}>{this.props.data_their.amulet_detail.temple ? this.props.data_their.amulet_detail.temple : I18n.t("noneSpecify")}</Text></Text>
                                {this.props.data_their.amulet_detail.price && <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>{I18n.t('costAmulet') + ": "}<Text style={{ fontSize: 14 }}>{this.props.data_their.amulet_detail.price}</Text></Text>}
                                {this.props.data_their.amulet_detail.owner && <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>{I18n.t('ownerName') + ": "}<Text style={{ fontSize: 14 }}>{this.props.data_their.amulet_detail.owner}</Text></Text>}
                                {this.props.data_their.amulet_detail.contact && <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>{I18n.t('contact') + ": "}<Text style={{ fontSize: 14 }}>{this.props.data_their.amulet_detail.contact}</Text></Text>}

                            </View>
                            {this.props.user_id != this.props.data_their.user_id && this.props.profile && this.props.profile.role != "admin" && <TouchableOpacity onPress={this._chatOwnerAmulet} style={{ position: 'absolute', top: 0.2, right: 5 }}>
                                <Icon2 name={'wechat'} color={Colors.bloodOrange} size={26} /></TouchableOpacity>}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            <TouchableOpacity style={{ zIndex: 1, flexDirection: 'row', marginTop: -10, marginLeft: 10 }} onPress={this._likeAmulet}>
                                <Icon2 name={'thumbs-up'} size={26} />
                                <Text style={{ fontFamily: 'Prompt-SemiBold', marginLeft: 7.5, marginTop: 3.75 }}>{this.props.data_their.real + " " + I18n.t('real')}</Text>
                            </TouchableOpacity>

                            <Icon2 size={22} name={'chevron-up'} style={{ alignSelf: 'center', marginVertical: 2.5 }} />

                            <TouchableOpacity style={{ zIndex: 1, flexDirection: 'row', marginTop: -10, marginRight: 10 }} onPress={this._dislikeAmulet}>
                                <Text style={{ fontFamily: 'Prompt-SemiBold', marginRight: 7.5, marginTop: 4 }}>{this.props.data_their.fake + " " + I18n.t('fake')}</Text>
                                <Icon2 name={'thumbs-down'} size={26} />
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>}

                    {this.state.hide && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', width: '100%' }} onPress={() => this.setState({ hide: false })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {this.props.data_their.amulet_detail.amuletName && <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: 10, marginBottom: 1, alignSelf: 'center', marginHorizontal: 7.5 }}>{this.props.data_their.amulet_detail.amuletName + " ( " + this.props.data_their.type_name + " )"}</Text>}
                        </View>
                        <Icon2 size={22} name={'chevron-down'} style={{ alignSelf: 'center', marginBottom: 2.5 }} />
                    </TouchableOpacity>}

                </View>

                {/* ++++++++++++++++++++++++++++++++++++ MESSENGER ZONE ++++++++++++++++++++++++++++++++++++ */}

                <View style={{ marginTop: 5 }}></View>
                <FlatList
                    data={this.props.data_messageTheirAmulet}
                    renderItem={this._renderItem}
                    ref={(list) => this.myFaltList = list}
                    onContentSizeChange={() => {
                        if (this.myFaltList.props.data && this.props.data_sendMessageTheirAmulet)
                            this.myFaltList.scrollToEnd()
                    }}
                    // inverted={true}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request3 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>} />

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

                {/* <Spinner
                    visible={this.props.request2}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }} /> */}
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        profile: state.question.profile,

        data_their: state.showroom.data_their,  // data set to this page (ChatTheirAmulet)

        request2: state.showroom.request2,  //  request send message of their amulet
        data_sendMessageTheirAmulet: state.showroom.data_sendMessageTheirAmulet,  // request send message of their amulet

        request3: state.showroom.request3,  // request for get message of this room
        data_messageTheirAmulet: state.showroom.data_messageTheirAmulet, // request for get message of this room

        request8: state.market.request8,  // for vote amulet
        data_vote: state.market.data_vote,  // store vote amulet

        data_areaAmulet: state.market.data_areaAmulet,  // store area & type amulet zone

        data_contactOwner: state.showroom.data_listOwner,  // data for store my message from other person ( Chat Solo )

        data_amuletstore: state.market.data_amuletstore,  // for store data list amulet in each store

        data_answer: state.market.data_search,  // for store search data  13/02/2019 update comment
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessageTheirAmulet: (qid, message) => dispatch(ShowRoomActions.sendMessageTheirAmulet(qid, message)),  // send message
        getMessageTheirAmulet: (page) => dispatch(ShowRoomActions.getMessageTheirAmulet(page)), // get message
        clearTheirAmuletMessage: () => dispatch(ShowRoomActions.clearTheirAmuletMessage()), // clear get&send data
        editTheirAmuletMessage: (data) => dispatch(ShowRoomActions.editTheirAmuletMessage(data)),

        editVoteData: (data) => dispatch(MarketActions.editVoteData(data)),
        voteAmulet: (id, status) => dispatch(MarketActions.voteAmulet(id, status)),
        clearDataTheir: () => dispatch(ShowRoomActions.clearDataTheir()),
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        clearDataVote: () => dispatch(MarketActions.clearDataVote()),
        clearDataAreaAmulet: () => dispatch(MarketActions.clearDataAreaAmulet()),
        getListAreaAmulet: (page) => dispatch(MarketActions.getListAreaAmulet(page)),

        syncVoteData: (data) => dispatch(ShowRoomActions.syncVoteData(data)),
        syncVoteData2: (data) => dispatch(MarketActions.syncVoteData2(data)),
        editVoteSearch: (data) => dispatch(MarketActions.editVoteSearch(data)),
        editUpdateRead: (type_id, market_id) => dispatch(MarketActions.editUpdateRead(type_id, market_id)),

        updateRead: (type_id, market_id) => dispatch(MarketActions.updateRead(type_id, market_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTheirAmulet)

//