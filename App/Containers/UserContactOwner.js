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
import ShowRoomActions from '../Redux/ShowRoomRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import ImageList2 from './ImageList/ImageList4'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class UserContactOwner extends Component {
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
    // _renderItem = ({ item, index }) => {

    //     let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
    //     if (item.uid_owner != this.props.user_id) {
    //         return (
    //             <TouchableOpacity style={{ height: 100, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    //                 onPress={() => this._goToChat(item)}>
    //                 <View style={{ flex: 1 }}>
    //                     <Text style={{ padding: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{I18n.t('messages') + " " + (index + 1) + " ( " + item.type_id + " )"}</Text>
    //                     <View style={{ flexDirection: 'row' }}>
    //                         <Text style={{ padding: 10, color: Colors.brownTextTran, fontSize: 14 }}>{date}</Text>
    //                         {item.type == 1 && <Icon2 name={'lock'} size={20} style={{ marginLeft: 5, marginTop: 10 }} />}
    //                     </View>
    //                 </View>

    //                 <View style={{ flex: 1 }}>

    //                     <Text style={{ color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18, marginTop: 8.5 }}>{item.amulet && item.amulet.type}</Text>
    //                     <TouchableOpacity style={{ flex: 1, width: 110 }} onPress={() => this._showPicture(item.amulet && item.amulet.images)}>
    //                         <ImageList2 data={item.amulet && item.amulet.images} />
    //                     </TouchableOpacity>
    //                 </View>
    //             </TouchableOpacity>
    //         )
    //     }
    // }

    _renderItem = ({ item, index }) => {

        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        if (item.uid_owner != this.props.user_id) {
            return (
                <TouchableOpacity style={{ height: 110, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                    onPress={() => this._goToChat(item)}>
                    <View style={{ flexDirection: 'row' }}>
                        {item.profile && item.profile.facebook_id && <Image source={{ uri: 'https://graph.facebook.com/' + item.profile.facebook_id + '/picture?width=500&height=500' }} style={{ width: 80, height: 80, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                        {item.profile && item.profile.facebook_id == null && item.profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.profile.image }} style={{ width: 80, height: 80, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                        {item.profile && item.profile.facebook_id == null && !item.profile.image && <Image source={Images.user} style={{ width: 80, height: 80, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}
                        {!item.profile && <Image source={Images.user} style={{ width: 80, height: 80, borderRadius: 10, margin: 10, alignSelf: 'center' }} />}

                        <View style={{ justifyContent: 'center' }}>
                            {item.profile && item.amulet && <Text style={{ color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.profile.fullname}{" ( " + item.amulet.amulet_detail.amuletName + " )"}</Text>}
                            {!item.profile && item.amulet && <Text style={{ color: Colors.bloodOrange, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>Chat All {"( " + item.amulet.amulet_detail.amuletName + " )"}</Text>}
                            {item.amulet && <Text style={{ color: Colors.brownTextTran, fontSize: 14 }}>{date}{" ( id: " + item.amulet.id + " )"}</Text>}

                            {item.amulet && <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this._showPicture(item.amulet.images)}>
                                <ImageList2 data={item.amulet.images} />
                            </TouchableOpacity>}

                        </View>
                    </View>


                    <Icon2 name={'chevron-right'} size={30} style={{ alignSelf: 'center', marginRight: 15 }} />

                </TouchableOpacity>
            )
        }
    }

    _showPicture = (item) => {
        this.setState({ modalVisible: true })
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img })
        this.popupDialog.show()
    }

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
        else if (e == 'อื่นๆ หรือ ไม่ทราบ' || e == 'ไม่ระบุประเภท') {
            name = I18n.t('otherOrUnknown')
        }

        return name
    }

    _goToChat = (item) => {
        if (item.type == 1) {
            this.props.setDetailPhra(item.amulet)
            this.props.navigation.navigate("chatTheirAmuletOwner")
        } else if (item.type == 2) {
            this.props.setDetailPhra(item.amulet)
            this.props.navigation.navigate("chatTheirAmulet")
        }
    }

    componentDidMount() {
        count = 1
        this.props.getMyMessageFromOther(count)
    }

    componentWillUnmount() {
        count = 1
        this.props.clearDataListContactOwner()
    }

    _reload = () => {
        count = 1
        this.props.getMyMessageFromOther(count)
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
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request7 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.props.data_myMessageFromOther}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={1.0} />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        // profile: state.question.profile,
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        // data_amulet: state.showroom.data_amulet,

        request7: state.showroom.request8,  // request for get data my real amulet message from other person ( Chat Solo )
        data_myMessageFromOther: state.showroom.data_listOwner,  // data for store my message from other person ( Chat Solo )
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContactOwner)