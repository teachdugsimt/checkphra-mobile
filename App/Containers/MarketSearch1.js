// ==================================
// ***************** ห้องดูรายการพระแท้หมวด... ในหมวด "พระของคนอื่น" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal
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
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import MarketActions from '../Redux/MarketRedux'
import styles from './Styles/HomeScreenStyle'
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment'
import 'moment/locale/th'
import ImageList from './ImageList/ImageList3'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class MarketSearch1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            index: 0,
            img: null
        }
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

    _goToChatTheirAmulet = (item) => {
        this.props.setTheirAmuletData(item)
        this.props.navigation.navigate('chatTheirAmulet')
    }


    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")
        date = date.slice(0, 12)

        return (
            <TouchableOpacity style={{ height: 90, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._goToChatTheirAmulet(item)}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }} onPress={() => {
                        this._showImage(item.images)
                    }}>
                        <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: item.images[0] }} />
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ marginLeft: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.amulet_detail.amuletName}</Text>
                            <Text style={{ color: Colors.brownTextTran, fontSize: 14, fontFamily: 'Prompt-SemiBold', marginTop: 3 }}> ( {item.id} )</Text>
                        </View>

                        <View style={{ flexDirection: 'row', width: width - 80, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                {item.images_thumbs != null && item.images_thumbs.map((e, i) => {
                                    if (i != 0) {
                                        return (
                                            <TouchableOpacity style={{ marginRight: 1.5, marginLeft: i == 1 ? 10 : 0 }} onPress={() => this._pressSubList(item.images, i)}>
                                                <Image source={{ uri: e }} style={{ width: 26, height: 26, borderRadius: 8 }} />
                                            </TouchableOpacity>
                                        )
                                    }
                                })}
                            </View>

                            <Text style={{ marginTop: 10, color: Colors.brownTextTran, fontSize: 14 }}>{date}</Text>

                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    _showImage = (item) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, modalVisible: true })
        // this.popupDialog.show()
    }

    _pressSubList = (item, index) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, index, modalVisible: true })
        // this.popupDialog.show()
    }

    componentDidMount() {
        count = 1
        // this.props.getListAmuletReal(count)
    }

    componentWillUnmount() {
        count = 1
        // this.props.clearDataListTheirAmulet()
        this.props.clearListSearch()
    }

    _reload = () => {
        count = 1
        // this.props.getListAmuletReal(count)
    }

    _onScrollEndList = () => {
        // console.log('END LIST AGAIN')
        // if (this.props.data_answer && this.props.data_answer.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
        //     count++
        //     this.props.getListAmuletReal(count)
        // }
    }

    render() {
        I18n.locale = this.props.language
        console.log(this.props.data_amulet)
        console.log(this.props.data_answer)
        console.log('******************* data_amulet && data_list_real_amulet ********************')
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

                        index={this.state.index} // add + 
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
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.props.request2 == true}
                    //         onRefresh={this._reload}
                    //     />
                    // }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('noneSearching')}</Text>}
                    data={this.props.data_answer}
                    renderItem={this._renderItem}
                // onEndReached={this._onScrollEndList}
                // onEndReachedThreshold={0.025}
                // onEndReachedThreshold={1.2} 
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

        data_answer: state.market.data_search,  // for store search data  13/02/2019 update comment
        request2: state.market.request13,       // // for search data     13/02/2019 update comment
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearListSearch: () => dispatch(MarketActions.clearListSearch()),

        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        setRequestType: () => dispatch(QuestionActions.setRequestType()),
        setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        getListAmuletReal: (page) => dispatch(ShowRoomActions.getListAmulet(page)),
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        clearDataListTheirAmulet: () => dispatch(ShowRoomActions.clearDataListTheirAmulet()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketSearch1)