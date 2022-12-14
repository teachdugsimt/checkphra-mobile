// ==================================
// ***************** ห้องดูรายการพระแท้ทั้งหมดของฉัน ในหมวดหมู่ "พระของฉัน" *****************
// ==================================
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images, ApplicationStyles } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment'
import 'moment/locale/th'
import ImageList from './ImageList/ImageList'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class MyRealAmulet extends Component {


    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            index: 0,
            img: null
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        return {

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


    _showImage = (item) => {
        this.setState({ modalVisible: true })
        let img = []
        item.map(e => {
            img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        })
        this.setState({ img })
        this.popupDialog.show()
    }

    _pressSubList = (item) => {
        this.setState({ modalVisible: true })
        let img = []
        item.map(e => {
            img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/' + e })
        })
        this.setState({ img, index: 1 })
        this.popupDialog.show()
    }

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.created_at).format("DD MMM YYYY (HH:mm)")

        return (
            <TouchableOpacity style={{ height: 90, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._goToChat(item)}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }} onPress={() => {
                        this._showImage(item.images)
                    }}>
                        <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/thumbs/tmb_100x100_' + item.images[0] }} />
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ marginLeft: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{MyRealAmulet.rename(item.type)}</Text>
                            <Text style={{ color: Colors.brownTextTran, fontSize: 14, fontFamily: 'Prompt-SemiBold', marginTop: 3 }}> ( {item.id} )</Text>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ marginLeft: 10, marginTop: 10, color: Colors.brownTextTran, fontSize: 14 }}>{date}</Text>
                            <TouchableOpacity style={{ flex: 1, marginLeft: 10, marginTop: 4, width: '100%' }} onPress={() => this._pressSubList(item.images)}>
                                <ImageList data={item.images} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    _goToChat = (item) => {
        this.props.setDetailPhra(item)
        this.props.navigation.navigate('chatMyAmulet')
    }

    componentDidMount() {
        count = 1
        this.props.getMyRealAmulet(count)
    }

    componentWillUnmount() {
        count = 1
        this.props.clearDataMyRealAmulet()
    }

    _reload = () => {
        count = 1
        this.props.getMyRealAmulet(count)
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_myRealAmulet && this.props.data_myRealAmulet.length >= 10 && (this.props.request6 == false || this.props.request6 == null)) {
            count++
            this.props.getMyRealAmulet(count)
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
                    onDismissed={() => { this.setState({ img: null, modalVisible: false, index: 0 }) }}
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

                                index={this.state.index} // add + 
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
                            refreshing={this.props.request6 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePromotion')}</Text>}
                    data={this.props.data_myRealAmulet}
                    renderItem={this._renderItem} 
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={1.2} />

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editDetailPhra')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >

                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ height: 10 }}>
                            </View>

                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 5, height: 70 }} onPress={() => this.popupDialog.dismiss()}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('ok')}</Text>
                            </TouchableOpacity>

                            <View style={{ height: 15 }}>
                            </View>
                        </ScrollView>
                    </View>

                </PopupDialog>
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
        request6: state.showroom.request6,   // request for get my real amulet
        data_myRealAmulet: state.showroom.data_myRealAmulet,  // data for store my real amulet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        setRequestType: () => dispatch(QuestionActions.setRequestType()),
        setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        setDetailPhra: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        getMyRealAmulet: (page) => dispatch(ShowRoomActions.getMyRealAmulet(page)),
        clearDataMyRealAmulet: () => dispatch(ShowRoomActions.clearDataMyRealAmulet()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRealAmulet)