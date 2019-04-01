// My store page , (Manage amulet in store)
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal, Alert
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
// import ImageList2 from './ImageList/ImageList2'
import ImageList from './ImageList/ImageList3'
import GridView from "react-native-super-grid";
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let check = false

// <View style={{ flexDirection: 'row' }}>
//     <TouchableOpacity onPress={params.showShop} style={{ paddingRight: 7.5 }}>
//         <Icon3 name={'ios-information-circle-outline'} color={'white'} size={40} style={{ paddingRight: 10 }} />
//     </TouchableOpacity>
class MarketMyAmulet extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={params.showShop} style={{ paddingRight: 7.5 }}>
                        <Icon3 name={'ios-information-circle-outline'} color={'white'} size={40} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={params.addAmulet}>
                        <Icon3 name={'ios-add-circle-outline'} color={'white'} size={40} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                </View>
            ),
        };
    };

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

            tmp_push: null,
            tmp_item: null,
            tmp_delete: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('--------------- MY AMULET PAGE -----------------')

        if (newProps.data_push && newProps.data_push != null) {
            if (newProps.data_push != prevState.tmp_push && (newProps.request9 == false || newProps.request9 == null)) {
                newProps.editPushData(newProps.data_push)
                return {
                    tmp_push: newProps.data_push
                }
            }
        }

        if (newProps.data_delete && newProps.data_delete != null) {
            if (newProps.data_delete != prevState.tmp_delete && newProps.request10 == false) {
                newProps.deleteFromList(newProps.data_delete)
                return {
                    tmp_delete: newProps.data_delete
                }
            }
        }

        return {

        }
    }

    componentWillMount() {
        // this.props.navigation.setParams({ addAmulet: this._addAmulet });  // can't
        // this.props.navigation.setParams({ addAmulet: this._addAmulet });
    }

    _addAmulet = () => {
        // add amulet here
        this.popupDialog2.show()
    };

    _goToUpload = () => {
        this.props.navigation.navigate('marketUpload1')
        this.popupDialog2.dismiss()
    }

    _goToUpload2 = () => {
        this.props.navigation.navigate("marketUpload2")
        this.popupDialog2.dismiss()
    }

    _pressSubMenu = (item) => {
        this.setState({ tmp_item: item })
        this.popupDialog4.show()
    }

    _addSlot = () => {
        Alert.alert(
            I18n.t('wantAddSlot'),
            I18n.t('use10Coins'),
            [
                { text: I18n.t('ok'), onPress: () => console.log('OK want to add slot') },
                { text: I18n.t('cancel') }
            ]
        )
    }

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        date = date.slice(0, 12)
        let color = item.display == 5 ? 'black' : 'green'
        return (
            <TouchableOpacity style={{ height: 145, backgroundColor: Colors.milk, borderRadius: 10, marginLeft: 7.5, marginTop: 7.5, marginRight: index == 2 || index % 3 == 2 ? 7.5 : 0, width: (width / 3) - 10, justifyContent: 'center' }} onPress={() => this._goToChat(item)}>

                <TouchableOpacity style={{ position: 'absolute', top: 1.5, right: 5, zIndex: 1 }} onPress={() => this._pressSubMenu(item)}>
                    <Icon2 name={'gear'} size={28} color={color} />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => { this._showImage(item.images) }}>
                        {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 5, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 16, textAlign: 'center' }} numberOfLines={1}>{item.amulet_detail.amuletName}</Text>
                </View>
            </TouchableOpacity>
        )



    }

    _pressSubList = (item, index) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, index: index, modalVisible: true })
    }

    _showImage = (item) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, modalVisible: true, index: 0 })
        // this.popupDialog.show()
    }

    _goToChat = (item) => {
        this.props.setTheirAmuletData(item)
        this.props.navigation.navigate('chatMyAmulet')
    }

    componentDidMount() {
        this.props.navigation.setParams({ addAmulet: this._addAmulet });
        this.props.navigation.setParams({ showShop: this._showShop });
        count = 1
        this.props.getListAreaAmulet(count)
    }

    componentWillUnmount() {
        this.props.clearListMyAmulet()
        this.props.clearDataPushAmulet()
        count = 1
    }

    _reload = () => {
        count = 1
        this.props.getListAreaAmulet(count)
        this.props.getProfile()
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_areaAmulet && this.props.data_areaAmulet.length >= 10 && (this.props.request2 == false || this.props.request2 == null)) {
            count++
            this.props.getListAreaAmulet(count)
        }
    }

    _showShop = () => {
        this.popupDialog3.show()
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
                        }}
                        enableSwipeDown={true}
                        failImageSource={'https://www.img.live/images/2018/11/08/none_1.png'}
                    />
                </Modal>

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

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('detailShop')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog3 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 3}
                    onDismissed={() => { this.setState({ tmp_item: null }) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', justifyContent: 'center' }}>
                        {/* <View style={{ backgroundColor: '#FFA500', borderRadius: 10, padding: 12 }}> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Name : "}</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.store_name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Contact : "}</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.contact}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownText }}>{"Province : "}</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: -2.5 }}>{this.props.profile.store.province_name}</Text>
                        </View>
                    </View>
                    {/* </View> */}
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('menu')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog4 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={this.state.tmp_item && this.state.tmp_item.display == 1 ? height / 3 : (height / 4)}
                    onDismissed={() => { this.setState({ tmp_item: null }) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.tmp_item && this.state.tmp_item.display == 1 && <TouchableOpacity style={{ flex: 1, width: '95%', borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 5, justifyContent: 'center' }} onPress={() => {
                            this.props.pushAmuletMarket(this.state.tmp_item.id)
                            this.popupDialog4.dismiss()
                        }}>
                            <Text style={{ alignSelf: 'center', fontSize: 15, color: Colors.brownText }}>{I18n.t('sendToMarket') + (this.state.tmp_item.qid == null ? " 40 coins" : " 20 coins")}</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={{ flex: 1, width: '95%', borderRadius: 10, backgroundColor: 'lightgrey', marginHorizontal: 5, marginBottom: 5, marginTop: 5, justifyContent: 'center' }} onPress={() => {
                            this.props.deleteAmuletMarket(this.state.tmp_item.id)
                            this.popupDialog4.dismiss()
                        }}>
                            <Text style={{ alignSelf: 'center', fontSize: 15, color: Colors.brownText }}>{I18n.t('deleteAmulet')}</Text>
                        </TouchableOpacity>

                    </View>
                </PopupDialog>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, paddingHorizontal: 10, paddingVertical: 7.5, borderRadius: 10, backgroundColor: Colors.milk, marginHorizontal: 7.5, marginTop: 7.5 }} onPress={this._addSlot}>
                    <Text style={{ fontFamily: 'Prompt-SemiBold' }}>Use </Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16 }}>{this.props.profile.store ? this.props.profile.store.total_count + "/" + this.props.profile.store.limit : '?'}</Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold' }}> slot. Upload for add slot</Text>
                    <Icon2 name={'plus-circle'} size={26} color={Colors.brownTextTran} style={{ paddingLeft: 7.5 }} />
                </View>

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
                    numColumns={3}
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
        profile: state.question.profile,
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        // data_amulet: state.showroom.data_amulet,

        data_areaAmulet: state.market.data_mylist,  // store area & type amulet zone
        request2: state.market.request6, // request for get list type*area amuletore my message from other person ( Chat Solo )

        request9: state.market.request9, // request for push amulet to market
        data_push: state.market.data_push,  // store push my amulet to market

        request10: state.market.request10,  // for delete amulet in market
        data_delete: state.market.data_delete,  // store data delete amulet in market
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
        getListAreaAmulet: (page) => dispatch(MarketActions.getListMyMarket(page)),
        clearListMyAmulet: () => dispatch(MarketActions.clearListMyAmulet()),
        pushAmuletMarket: (market_id) => dispatch(MarketActions.pushAmuletMarket(market_id)),
        editPushData: (data) => dispatch(MarketActions.editPushData(data)),
        deleteAmuletMarket: (market_id) => dispatch(MarketActions.deleteAmuletMarket(market_id)),
        deleteFromList: (data) => dispatch(MarketActions.deleteFromList(data)),

        clearDataPushAmulet: () => dispatch(MarketActions.clearDataPushAmulet()),
        // setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketMyAmulet)


//  *********************************  " 165 "  ****************************************