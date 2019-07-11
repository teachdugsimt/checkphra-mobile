// ==================================
// ***************** ห้องดูรายการข้อความของพระ... และไปห้องแชทรวมพระ... ในหมวด "พระของฉัน" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import moment from 'moment'
import 'moment/locale/th'
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import RealtimeActions from '../Redux/RealtimeRedux'
import styles from './Styles/HomeScreenStyle'
import firebase from 'react-native-firebase'
import { GiftedChat } from 'react-native-gifted-chat';
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let count2 = 10
let count_render = 0
class ListMyContact extends Component {
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

            loading: false,

            tmp_dataMyMessageFromOther: null,
        }
        this.myContactList = firebase.database().ref('contacts/' + this.props.user_id)
    }

    getListContact = () => {
        this.setState({ loading: true })
        this.myContactList.limitToLast(10).on('value', data => {
            // console.log(data) // raw data
            if (data.val()) {
                // console.log(Object.values(data))  // confuse data, spread data
                console.log(Object.values(data._value)) //  normal data
                // console.log(Object.values(data.val())) // normal data same!!
                this.props.setListMyContact(Object.values(data._value))
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false })
            }
            console.log('----------------- HERE DATA LIST MESSAGE --------------------')
        })
    }

    getListContact2 = () => {
        this.setState({ loading: true })
        count2 = count2 + 10
        this.myContactList.limitToLast(count2).on('value', data => {
            // console.log(data) // raw data
            if (data.val()) {
                // console.log(Object.values(data))  // confuse data, spread data
                console.log(Object.values(data._value)) //  normal data
                // console.log(Object.values(data.val())) // normal data same!!
                this.props.setListMyContact(Object.values(data._value))
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false })
            }
            console.log('----------------- HERE DATA LIST MESSAGE --------------------')
        })
    }

    componentDidMount() {
        count = 1
        count2 = 10
        this.getListContact()
        // this.props.getMyMessageFromOther(count)
    }

    componentWillUnmount() {
        count = 1
        count2 = 10
        this.props.clearDataListContactOwner()
        this.props.clearDataGroupChat()
    }

    // _reload = () => {
    //     count = 1
    //     this.props.getMyMessageFromOther(count)
    // }

    _reload = () => {
        count2 = 10
        this.getListContact()
    }

    // _onScrollEndList = () => {
    //     console.log('END LIST AGAIN')
    //     if (this.props.data_myMessageFromOther && this.props.data_myMessageFromOther.length >= 10 && (this.props.request7 == false || this.props.request7 == null)) {
    //         count++
    //         this.props.getMyMessageFromOther(count)
    //     }
    // }

    _onScrollEndList = () => {
        if (this.props.data_listMyContact && this.props.data_listMyContact.length >= 10 && this.state.loading == false) {
            this.getListContact2()
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('-------------- USER CONTACT OWNER ----------------')
        if (newProps.data_myMessageFromOther && newProps.data_myMessageFromOther != null) {
            if (prevState.tmp_dataMyMessageFromOther != newProps.data_myMessageFromOther) {
                return {
                    tmp_dataMyMessageFromOther: newProps.data_myMessageFromOther
                }
            }
        }

        return {

        }
    }

    _renderItem = ({ item, index }) => {
        let date = moment(item.updated_at).format("DD MMM YYYY (HH:mm)")
        console.log('https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.owner_profile.image)
        return (
            <TouchableOpacity style={{ height: 85, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={() => this._goToChat(item)}>
                <View style={{ flexDirection: 'row' }}>
                    {item.owner_profile && item.owner_profile.fb_id != "-" && <Image source={{ uri: 'https://graph.facebook.com/' + item.owner_profile.fb_id + '/picture?width=500&height=500' }} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                    {item.owner_profile && item.owner_profile.fb_id == "-" && item.owner_profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.owner_profile.image }} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                    {item.owner_profile && item.owner_profile.fb_id == "-" && !item.owner_profile.image && <Image source={Images.user} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                    {!item.owner_profile && <Image source={Images.user} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}

                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
                            {item.owner_profile && <Text style={{ color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 14, width: width / 2.2 }} numberOfLines={1}>{item.owner_profile.name ? item.owner_profile.name : (item.owner_profile.email ? item.owner_profile.email : "Check Phra User")}</Text>}
                            {/* {!item.owner_profile && item.owner_profile && <Text style={{ color: Colors.bloodOrange, fontFamily: 'Prompt-SemiBold', fontSize: 14 }}>{"Chat All " + "( " + item.amulet.amulet_detail.amuletName + " )"}</Text>} */}
                            <Text style={{ color: Colors.brownTextTran, fontSize: 12 }}>{date}</Text>
                        </View>
                        <Text style={{ marginHorizontal: 5, width: width - 95 }} numberOfLines={1}>{item.last_message}</Text>
                        {/* <View style={{ flexDirection: 'row', marginTop: 2.5 }}>
                            {item.amulet != null && item.amulet.images_thumbs.map((e, i) => {
                                return (
                                    <TouchableOpacity style={{ marginRight: 1.5 }} onPress={() => this._showPicture(item.amulet.images, i)}>
                                        <Image source={{ uri: e }} style={{ width: 35, height: 35, borderRadius: 8 }} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View> */}

                    </View>
                </View>

                {/* <Icon2 name={'chevron-right'} size={30} style={{ alignSelf: 'center', position: 'absolute', right: 10 }} /> */}
                {/* {item.is_new == true && <View
                    style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 0, right: -0.2 }}></View>} */}

            </TouchableOpacity>

        )
    }

    _showPicture = (item, index) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, modalVisible: true, index })
    }

    _goToChat = (item) => {
        this.props.setTmpListMyContact(item)
        this.props.navigation.navigate("listMyContact2")
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        console.log(this.state.tmp_dataMyMessageFromOther)
        console.log('***************************************')
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
                            // this.popupDialog.dismiss()
                        }}
                        enableSwipeDown={true}
                        failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
                    />
                </Modal>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('noMessages')}</Text>}
                    data={this.props.data_listMyContact}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={0.25}
                />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        profile1: state.auth.profile,  // add now!!  // have "user id" and none "store"
        profile: state.question.profile,  // have "store" and "user id" in store, 
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        // data_amulet: state.showroom.data_amulet,

        request7: state.showroom.request8,  // request for get data my real amulet message from other person ( Chat Solo )
        data_myMessageFromOther: state.showroom.data_listOwner,  // data for store my message from other person ( Chat Solo )

        data_listMyContact: state.realtime.data_listMyContact,  // store list my contact
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        // setRequestType: () => dispatch(QuestionActions.setRequestType()),
        // setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        setDetailPhra: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        getMyMessageFromOther: (page) => dispatch(ShowRoomActions.getListOwnerContact(page)),
        setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
        clearDataListContactOwner: () => dispatch(ShowRoomActions.clearDataListContactOwner()),
        setDisscuss: (id) => dispatch(ShowRoomActions.setDisscuss(id)),
        clearDataGroupChat: () => dispatch(ShowRoomActions.clearDataGroupChat()),

        setListMyContact: (data) => dispatch(RealtimeActions.setListMyContact(data)),
        setTmpListMyContact: (data) => dispatch(RealtimeActions.setTmpListMyContact(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMyContact)