// ==================================
// ***************** ห้องดูรายการข้อความของพระ... และไปห้องแชทรวมพระ... ในหมวด "พระของฉัน" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
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
import RealtimeActions from '../Redux/RealtimeRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import firebase from 'react-native-firebase'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class ChatMyAmulet extends Component {

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


            tmp_dataMyMessageFromOther: null,
        }
        this.myContactList = firebase.database().ref('contacts/' + this.props.user_id)
    }

    getListContact = () => {
        this.myContactList.limitToLast(10).on('value', data => {
            // console.log(data) // raw data
            if (data.val()) {
                // console.log(Object.values(data))  // confuse data, spread data
                console.log(Object.values(data._value)) //  normal data
                // console.log(Object.values(data.val())) // normal data same!!
                this.props.setListMyContact(Object.values(data._value))
            }
            console.log('----------------- HERE DATA LIST MESSAGE --------------------')
        })
    }


    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('---------------  LIST CHAT MY AMULET ----------------')
        return {

        }
    }
    _goToChat = (item) => {
        this.props.setTmpListMyContact(item)
        this.props.navigation.navigate("chatRoomMyAmulet")
    }

    componentDidMount() {
        count = 1
        this.getListContact()
        // this.props.getMyMessageFromOther(count)
    }

    componentWillUnmount() {
        count = 1
        this.props.clearDataListMyMessageFromOtherPerson()
        this.props.clearDataGroupChat()
    }

    _renderItem = ({ item, index }) => {
        let date = moment(item.updated_at).format("DD MMM YYYY (HH:mm)")

        return (
            <TouchableOpacity style={{ height: 85, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={() => this._goToChat(item)}>
                <View style={{ flexDirection: 'row' }}>
                    {item.owner_profile && item.owner_profile.fb_id && <Image source={{ uri: 'https://graph.facebook.com/' + item.owner_profile.fb_id + '/picture?width=500&height=500' }} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                    {item.owner_profile && item.owner_profile.fb_id == null && item.owner_profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.owner_profile.image }} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                    {item.owner_profile && item.owner_profile.fb_id == null && !item.owner_profile.image && <Image source={Images.user} style={{ width: 65, height: 65, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
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


    _reload = () => {
        count = 1
        this.props.getMyMessageFromOther(count)
        // this.getListContact()
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_myMessageFromOther && this.props.data_myMessageFromOther.length >= 10 && (this.props.request7 == false || this.props.request7 == null)) {
            count++
            this.props.getMyMessageFromOther(count)
        }
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        console.log(this.state.tmp_dataMyMessageFromOther)
        console.log('------------ SEE LIST OTHER PERSON MESSAGE TO ME ----------------')
        // console.log('***************************************')
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

                <View style={{ height: 40, backgroundColor: Colors.milk, }}>
                    <TouchableOpacity style={{ borderColor: 'orange', borderWidth: 5, alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => this.props.navigation.navigate("chatRoomMyAmulet")}>
                        <Text style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, fontSize: 18 }}>{I18n.t('chat')}</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.props.request7 == true}
                    //         onRefresh={this._reload}
                    //     />
                    // }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('noMessages')}</Text>}
                    data={this.props.data_listMyContact}
                    // data={this.state.tmp_dataMyMessageFromOther ? this.state.tmp_dataMyMessageFromOther : []}
                    renderItem={this._renderItem}
                // onEndReached={this._onScrollEndList}
                // onEndReachedThreshold={1.0} 
                />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        // profile: state.question.profile,
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        data_amulet: state.showroom.data_amulet,

        request7: state.showroom.request7,  // request for get data my real amulet message from other person ( Chat Solo )
        data_myMessageFromOther: state.showroom.data_myMessageFromOther,  // data for store my message from other person ( Chat Solo )
        data_listMyContact: state.realtime.data_listMyContact,  // store list my contact
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        setRequestType: () => dispatch(QuestionActions.setRequestType()),
        setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        setDetailPhra: (data) => dispatch(ShowRoomActions.setDetailPhra(data)),
        getMyMessageFromOther: (page) => dispatch(ShowRoomActions.getMyMessageFromOther(page)),
        setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
        clearDataGroupChat: () => dispatch(ShowRoomActions.clearDataGroupChat()),
        clearDataListMyMessageFromOtherPerson: () => dispatch(ShowRoomActions.clearDataListMyMessageFromOtherPerson()),
        // setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data))

        setListMyContact: (data) => dispatch(RealtimeActions.setListMyContact(data)),
        setTmpListMyContact: (data) => dispatch(RealtimeActions.setTmpListMyContact(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMyAmulet)