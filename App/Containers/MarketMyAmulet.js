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
class MarketMyAmulet extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <TouchableOpacity onPress={params.addAmulet}>
                    <Icon3 name={'ios-add-circle-outline'} color={'white'} size={40} style={{ paddingRight: 10 }} />
                </TouchableOpacity>
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
            if (newProps.data_push != prevState.tmp_push && newProps.request9 == false) {
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

    _amuletToMarket = (item) => {
        this.setState({ tmp_item: item })
        this.popupDialog3.show()
    }

    _deleteAmulet = (item, index) => {
        this.props.deleteAmuletMarket(item.id)
    }
    // 1. มี qid ไม่ต้องมี market
    // 2. ไม่มี qid ต้องมี market
    _renderItem = ({ item, index }) => {

        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        date = date.slice(0, 12)
        return (
            <TouchableOpacity style={{ height: 90, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._goToChat(item)}>

                {item.display == 1 && <TouchableOpacity style={{ position: 'absolute', top: 10, right: 42 }} onPress={() => this._amuletToMarket(item)}>
                    <Icon2 name={'truck'} size={28} color={'green'} />
                </TouchableOpacity>}

                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => this._deleteAmulet(item)}>
                    <Icon2 name={'trash-o'} size={28} color={'red'} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }} onPress={() => { this._showImage(item.images) }}>
                        {/* {item.images != null && <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/market/' + item.images[0] }} />} */}
                        {item.images != null && <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
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
        this.setState({ modalVisible: true })
        let img = []
        // item.map(e => {
        //     img.push({ url: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/market/' + e })
        // })
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img })
        this.popupDialog.show()
    }

    _goToChat = (item) => {
        this.props.setTheirAmuletData(item)
        this.props.navigation.navigate('chatMyAmulet')
    }

    componentDidMount() {
        this.props.navigation.setParams({ addAmulet: this._addAmulet });
        count = 1
        this.props.getListAreaAmulet(count)
    }

    componentWillUnmount() {
        this.props.clearListMyAmulet()
        count = 1
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
                    }}>{I18n.t('reason')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.5}
                    height={height / 4}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderBottomColor: 'orange', borderBottomWidth: 1, flex: 1, width: '100%', justifyContent: 'center' }} onPress={this._goToUpload2}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('haveAmulet')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', flex: 1, justifyContent: 'center', width: '100%' }} onPress={this._goToUpload}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('notAmulet')}</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('confirmSell')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog3 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 3}
                    onDismissed={() => { this.setState({ tmp_item: null }) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ marginHorizontal: 10, alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('wantMarketDetail')}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <View style={{ width: '40%', height: 45 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('ok')}
                                    onPress={() => {
                                        this.props.pushAmuletMarket(this.state.tmp_item.id)
                                        this.popupDialog3.dismiss()
                                    }}
                                />
                            </View>
                            <View style={{ width: '40%', height: 45 }}>
                                <RoundedButton
                                    style={{ marginHorizontal: 10 }}
                                    title={I18n.t('cancel')}
                                    onPress={() => this.popupDialog3.dismiss()}
                                />
                            </View>
                        </View>

                    </View>
                </PopupDialog>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request2 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.props.data_areaAmulet}
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
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        getListAreaAmulet: (page) => dispatch(MarketActions.getListMyMarket(page)),
        clearListMyAmulet: () => dispatch(MarketActions.clearListMyAmulet()),
        pushAmuletMarket: (market_id) => dispatch(MarketActions.pushAmuletMarket(market_id)),
        editPushData: (data) => dispatch(MarketActions.editPushData(data)),
        deleteAmuletMarket: (market_id) => dispatch(MarketActions.deleteAmuletMarket(market_id)),
        deleteFromList: (data) => dispatch(MarketActions.deleteFromList(data)),
        // setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketMyAmulet)


//  *********************************  " 165 "  ****************************************