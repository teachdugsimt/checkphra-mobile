// After select province and type amulet go to this page show list amulet in other province and type
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
import Icon3 from "react-native-vector-icons/Ionicons"
import moment from 'moment'
import 'moment/locale/th'
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import MarketActions from '../Redux/MarketRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import QuestionActions from '../Redux/QuestionRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
// import ImageList2 from './ImageList/ImageList2'
import ImageList from './ImageList/ImageList3'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let check = false
class MarketHomeList1 extends Component {
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

            checkTypeIsMyFollow: false,
            type_name: this.props.type_name
        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            // title: params.getName,  // change title => String
            headerTitle: (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: "white" }} numberOfLines={1}>
                        {params.getName}
                    </Text>
                </View>
            ),
            headerRight: (
                <TouchableOpacity onPress={params.addAmulet}>
                    <Icon3 name={'ios-add-circle-outline'} color={'white'} size={40} style={{ paddingRight: 10 }} />
                </TouchableOpacity>
            )
        };
    };

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        // if (newProps.data_areaAmulet && newProps.data_areaAmulet != null && newProps.data_areaAmulet.length > 0 && prevState.checkTypeIsMyFollow == true) {
        //     console.log('FUCK YEAH first IF')
        //     // ถ้า มีลิสพระหมวดนี้ และ เป้นหมวดที่เราติดตามอยู่ ให้ทำ
        //     if (newProps.lastIDofGroupAmulet && newProps.lastIDofGroupAmulet != null && check == false) {
        //         console.log('FUCK YOU second IF')
        //         //ถ้ามีข้อมูลจำลองการติดตาม ให้...
        //         // **** เซ็ทข้อมูลจำลองให้ 1. last_id = ไอดีบนสุดในลิสพระหมวดนี้ 2. status = true ****
        //         check = true
        //         newProps.editRedDotData(newProps.data_areaAmulet[0].id, true, newProps.pro_id)
        //         // note: data change status to "FALSE" this *correct*
        //         // console.log(newProps.lastIDofGroupAmulet)
        //         // console.log('----- HERE DATA LAST... -----')
        //     }
        // }
    }

    _addAmulet = () => {
        // add amulet here
        // this.popupDialog2.show()
        if (this.props.profile && this.props.profile.role != "admin")
            this.props.navigation.navigate("marketMylistAmulet")
        else alert("You don't have permission")
    };

    _goToUpload = () => {
        this.props.navigation.navigate('marketUpload1')
        this.popupDialog2.dismiss()
    }

    _goToUpload2 = () => {
        this.props.navigation.navigate("marketUpload2")
        this.popupDialog2.dismiss()
    }


    _renderItem = ({ item, index }) => {

        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        date = date.slice(0, 12)
        return (
            <TouchableOpacity style={{ height: 90, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._goToChat(item)}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }} onPress={() => {
                        this._showImage(item.images)
                    }}>
                        {/* <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/market/' + item.images[0] }} /> */}
                        <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: item.images[0] }} />
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ marginLeft: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.amulet_detail.amuletName}</Text>
                            <Text style={{ color: Colors.brownTextTran, fontSize: 14, fontFamily: 'Prompt-SemiBold', marginTop: 3 }}> ( {item.amulet_detail.id} )</Text>
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
                {item.is_new == true && <View style={{ width: 11, height: 11, backgroundColor: 'red', borderRadius: 5.5, borderColor: 'white', borderWidth: 1, position: 'absolute', top: 2.5, right: 2.5 }}></View>}

            </TouchableOpacity>
        )

    }

    _pressSubList = (item, index) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, index, modalVisible: true })
    }

    _showImage = (item) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, modalVisible: true, index: 0 })
    }

    _goToChat = (item) => {
        console.log(item)
        console.log('Item Before go to Chat')
        this.props.setTheirAmuletData(item)
        this.props.navigation.navigate('chatTheirAmulet')
    }

    componentDidMount() {
        count = 1
        this.props.navigation.setParams({ getName: this.state.type_name, addAmulet: this._addAmulet })
        this.props.getListAreaAmulet(count)

        // if (this.props.profile && this.props.profile.my_follow) {
        //     if (this.props.profile.my_follow.find((e, i) => e.type_id == this.props.pro_id) != undefined) {  // ถ้าสายนี้มีในประเภทที่เราติดตาม
        //         this.setState({ checkTypeIsMyFollow: true })
        //     }
        // }
    }

    componentWillUnmount() {
        count = 1
        check = false
        this.props.clearListAreaAmulet()
        this.props.getProfile()
    }

    _reload = () => {
        count = 1
        this.props.getListAreaAmulet(count)
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_areaAmulet && this.props.data_areaAmulet.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
            count++
            this.props.getListAreaAmulet(count)
        }
    }

    render() {
        I18n.locale = this.props.language
        console.log(this.state.type_name)
        console.log('-------------------------- MARKET HOME LIST1 -------------------------')
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
                            refreshing={this.props.request2 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('noMessages')}</Text>}
                    data={this.props.data_areaAmulet}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={1.2} />

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('menu')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 4}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', flex: 1, width: '95%', justifyContent: 'center', marginHorizontal: 7.5, marginVertical: 2.5, borderRadius: 8 }} onPress={this._goToUpload2}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('haveAmulet') + (this.props.profile.store && this.props.profile.store.total_count == this.props.profile.store.limit ? " (add slot - 10 coins)" : "")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', flex: 1, justifyContent: 'center', width: '95%', marginHorizontal: 7.5, marginBottom: 2.5, borderRadius: 8 }} onPress={this._goToUpload}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('notAmulet') + (this.props.profile.store && this.props.profile.store.total_count == this.props.profile.store.limit ? " (add slot - 10 coins)" : "")}</Text>
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
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        // data_amulet: state.showroom.data_amulet,

        data_areaAmulet: state.market.data_areaAmulet,  // store area & type amulet zone
        request2: state.market.request2, // request for get list type*area amuletore my message from other person ( Chat Solo )

        pro_id: state.market.pro_id,  // TYPE_ID

        lastIDofGroupAmulet: state.question.data_follow,  // build new array save my_follow

        type_name: state.market.type_name,  // store type name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        // setRequestType: () => dispatch(QuestionActions.setRequestType()),
        // setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        // setDetailPhra: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        getProfile: () => dispatch(QuestionActions.getProfile()),
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        getListAreaAmulet: (page) => dispatch(MarketActions.getListAreaAmulet(page)),
        clearListAreaAmulet: () => dispatch(MarketActions.clearListAreaAmulet()),

        editRedDotData: (id, status, type_id) => dispatch(QuestionActions.editRedDotData(id, status, type_id)),
        // setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketHomeList1)


// North East ,  กาฬสินธ์