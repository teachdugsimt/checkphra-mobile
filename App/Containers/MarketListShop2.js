import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform, Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from 'react-native-image-zoom-viewer';
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images, ApplicationStyles } from '../Themes';
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
            tmp_item: null,

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

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        date = date.slice(0, 12)
        let color = item.display == 5 ? 'orange' : 'green'
        return (
            <View style={{ height: 145, backgroundColor: Colors.milk, borderRadius: 10, marginLeft: 7.5, marginTop: 7.5, marginRight: index == 2 || index % 3 == 2 ? 7.5 : 0, width: (width / 3) - 10, justifyContent: 'center' }} >

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => this._showImage(item)}>
                        {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 5, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 16, textAlign: 'center' }} numberOfLines={1}>{item.amulet_detail.amuletName ? item.amulet_detail.amuletName : I18n.t("noneSpecify")}</Text>
                </View>
            </View>
        )
    }

    _pressSubList = (item, index) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, index, modalVisible: true })
    }

    // _showImage = (item) => {
    //     let img = []
    //     item.map(e => {
    //         img.push({ url: e })
    //     })
    //     this.setState({ img, index: 0, modalVisible: true })
    // }
    _showImage = (item) => {
        this.setState({ tmp_item: item })
        this.popupDialog4.show()
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
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('noneAmuletOnStore')}</Text>}
                    data={this.props.data_amuletstore ? this.props.data_amuletstore : []}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={0.25}
                    numColumns={3} />




                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('menu')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog4 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    // height={this.state.tmp_item && this.state.tmp_item.display == 1 ? height / 3 : (height / 4)}
                    height={height / 1.65}
                    onDismissed={() => { }}
                >
                    <ScrollView>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ marginTop: 7.5, fontFamily: 'Prompt-SemiBold', fontSize: 14, color: Colors.brownText }}>{this.state.tmp_item ? this.state.tmp_item.type_name : I18n.t("noneCategory")}</Text>
                            <ScrollView style={{ flex: 0.7 }} horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10, borderRadius: 14 }}>
                                    {this.state.tmp_item && this.state.tmp_item.images && this.state.tmp_item.images.map((e, i) => {
                                        return (
                                            <View style={{ width: 94.75, height: 94.75, marginRight: i == this.state.tmp_item.images.length - 1 ? 0 : 10, borderRadius: 12, borderColor: 'blue', borderWidth: 2.5 }}>
                                                <Image source={{ uri: e }} style={{ width: 90, height: 90, marginRight: i == this.state.tmp_item.images.length - 1 ? 0 : 10, borderRadius: 12, borderColor: 'lightgrey', borderWidth: 2.25 }} />
                                            </View>
                                        )
                                    })}
                                </View>
                            </ScrollView>

                            <View style={{ flex: 1, width: "90%", justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingHorizontal: 10, borderTopColor: 'lightgrey', borderTopWidth: 2.5, marginBottom: 5 }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Text style={{}}>{this.state.tmp_item ? (I18n.t("amuletName") + " : " + this.state.tmp_item.amulet_detail.amuletName) : "Loading..."}</Text>
                                    <Text style={{ paddingTop: 5 }}>{this.state.tmp_item ? (I18n.t("templeName") + " : " + this.state.tmp_item.amulet_detail.temple) : "Loading..."}</Text>
                                    <Text style={{ paddingTop: 5 }}>{this.state.tmp_item ? (I18n.t("ownerName") + " : " + this.state.tmp_item.amulet_detail.owner) : "Loading..."}</Text>
                                    <Text style={{ paddingTop: 5 }}>{this.state.tmp_item ? (I18n.t("costAmulet") + " : " + this.state.tmp_item.amulet_detail.price) : "Loading..."}</Text>
                                    <Text style={{ paddingTop: 5 }}>{this.state.tmp_item ? (I18n.t("contact") + " : " + this.state.tmp_item.amulet_detail.contact) : "Loading..."}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, width: "90%", justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingHorizontal: 10, borderTopColor: 'lightgrey', borderTopWidth: 2.5 }}>

                                <TouchableOpacity style={{ flex: 1, width: '95%', padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginHorizontal: 5, marginTop: 5, justifyContent: 'center', height: 60 }} onPress={() => {
                                    // this._goToChat(this.state.tmp_item)
                                    this._goToChatTheirAmulet(this.state.tmp_item)
                                    this.popupDialog4.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{I18n.t('chat')}</Text>
                                </TouchableOpacity>
                            </View>



                        </View>
                    </ScrollView>
                </PopupDialog>




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