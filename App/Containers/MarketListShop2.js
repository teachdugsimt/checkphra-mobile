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
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
// import { Card } from 'react-native-elements'
import moment from 'moment'
import 'moment/locale/th'
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import ShowRoomActions from '../Redux/ShowRoomRedux'
import MarketActions from '../Redux/MarketRedux'
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
import ImageList from './ImageList/ImageList3'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class MarketListShop2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            index: 0,
            img: null,

            store_name: this.props.tmp_store.store_name,
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
            )
        };
    };

    _goToChatTheirAmulet = (item) => {
        this.props.setTheirAmuletData(item)
        this.props.navigation.navigate('chatTheirAmulet2')
    }

    // _renderItem = ({ item, index }) => {

    //     let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
    //     date = date.slice(0, 12)
    //     return (
    //         <TouchableOpacity style={{ height: 90, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._goToChatTheirAmulet(item)}>

    //             <View style={{ flexDirection: 'row', flex: 1 }}>
    //                 <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }} onPress={() => {
    //                     this._showImage(item.images)
    //                 }}>
    //                     {/* <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/checkphra/images/market/' + item.images[0] }} /> */}
    //                     <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: item.images[0] }} />
    //                 </TouchableOpacity>

    //                 <View style={{ justifyContent: 'center' }}>
    //                     <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
    //                         <Text style={{ marginLeft: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.amulet_detail.amuletName}</Text>
    //                         {/* <Text style={{ color: Colors.brownTextTran, fontSize: 14, fontFamily: 'Prompt-SemiBold', marginTop: 3 }}> ( {item.amulet_detail.id} )</Text> */}
    //                     </View>

    //                     <View style={{ flexDirection: 'row', width: width - 80, justifyContent: 'space-between' }}>
    //                         <View style={{ flexDirection: 'row', marginTop: 5 }}>
    //                             {item.images_thumbs != null && item.images_thumbs.map((e, i) => {
    //                                 if (i != 0) {
    //                                     return (
    //                                         <TouchableOpacity style={{ marginRight: 1.5, marginLeft: i == 1 ? 10 : 0 }} onPress={() => this._pressSubList(item.images, i)}>
    //                                             <Image source={{ uri: e }} style={{ width: 26, height: 26, borderRadius: 8 }} />
    //                                         </TouchableOpacity>
    //                                     )
    //                                 }
    //                             })}
    //                         </View>

    //                         <Text style={{ marginTop: 10, color: Colors.brownTextTran, fontSize: 14 }}>{date}</Text>

    //                     </View>
    //                 </View>
    //             </View>

    //         </TouchableOpacity>
    //     )

    // }

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        date = date.slice(0, 12)
        let color = item.display == 5 ? 'orange' : 'green'
        return (
            <TouchableOpacity style={{ height: 145, backgroundColor: Colors.milk, borderRadius: 10, marginLeft: 7.5, marginTop: 7.5, marginRight: index == 2 || index % 3 == 2 ? 7.5 : 0, width: (width / 3) - 10, justifyContent: 'center' }} onPress={() => this._goToChatTheirAmulet(item)}>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => this._showImage(item.images)}>
                        {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 5, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 16, textAlign: 'center' }} numberOfLines={1}>{item.amulet_detail.amuletName ? item.amulet_detail.amuletName : I18n.t("noneSpecify")}</Text>
                </View>
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
        this.setState({ img, index: 0, modalVisible: true })
    }

    // _pressSubList = (item) => {
    //     let img = []
    //     item.map(e => {
    //         img.push({ url: e })
    //     })
    //     this.setState({ img, index: 1, modalVisible: true })
    // }

    componentDidMount() {
        count = 1
        this.props.navigation.setParams({ getName: this.state.store_name })
        this.props.getListAmuletStore(count)
    }

    componentWillUnmount() {
        count = 1
        // this.props.clearDataListTheirAmulet()
        this.props.clearListAmuletShop()
        // !!!!!!!!!!!!!!!!!! clear list !!!!!!!!!!!!!!
    }

    _reload = () => {
        count = 1
        this.props.getListAmuletStore(count)
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_amuletstore && this.props.data_amuletstore.length >= 10 && (this.props.request12 == false || this.props.request12 == null)) {
            count++
            this.props.getListAmuletStore(count)
        }
    }

    render() {
        console.log(this.props.data_amuletstore)
        console.log('----------- List Other Shop 222 --------------')

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request12 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.props.data_amuletstore ? this.props.data_amuletstore : []}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={0.25}
                    numColumns={3} />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,

        request12: state.market.request12,  // for get amulet in each shop
        data_amuletstore: state.market.data_amuletstore,  // for store data list amulet in each store
        tmp_store: state.market.tmp_store, // store tmp of STORE
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListAmuletStore: (page) => dispatch(MarketActions.getListAmuletStore(page)),
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        clearListAmuletShop: () => dispatch(MarketActions.clearListAmuletShop()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketListShop2)