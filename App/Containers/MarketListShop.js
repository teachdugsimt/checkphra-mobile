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
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class MarketListShop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            index: 0,
            img: null,
        }
    }

    _gotoShop = (item, index) => {
        this.props.setShopId(item.id)
        this.props.navigation.navigate("marketListShop2")
        // go to list amulet in each shop
    }

    _showImg = (item, index) => {
        let img = []
        item.images.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, index, modalVisible: true })
    }

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        return (
            <TouchableOpacity style={{ height: 160, marginTop: 10, marginHorizontal: 15, borderRadius: 10, backgroundColor: Colors.milk }} onPress={() => this._gotoShop(item, index)}>
                <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {item.images && item.images.map((e, i) => {
                        return (
                            <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 5, width: 100, height: '100%' }} onPress={() => this._showImg(item, i)}>
                                <Image source={{ uri: e }} style={{ width: '100%', height: '100%', borderRadius: 7.5 }} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                <View style={{ flex: 0.6, marginHorizontal: 7.5 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Prompt-SemiBold', color: Colors.bloodOrange }}>{item.store_name}</Text>
                    <Text style={{ fontSize: 14, color: Colors.brownTextTran }}>{item.contact + " ( " + date + " )"}</Text>
                </View>
            </TouchableOpacity>

        )
    }


    componentDidMount() {
        count = 1
        this.props.getListStoreGroup(count)
    }

    componentWillUnmount() {
        count = 1
        this.props.clearShopGroup()
    }

    _reload = () => {
        count = 1
        this.props.getListStoreGroup(count)
    }

    _onScrollEndList = () => {
        if (this.props.data_shopgroup && this.props.data_shopgroup.length >= 10 && (this.props.request11 == false || this.props.request11 == null)) {
            count++
            this.props.getListStoreGroup(count)
        }
    }

    render() {
        console.log('----------- List Other Shop --------------')
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
                            refreshing={this.props.request11 == true}
                            onRefresh={this._reload.bind(this)}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.props.data_shopgroup ? this.props.data_shopgroup : []}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.0}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,

        request11: state.market.request11,  // for get list store by province
        data_shopgroup: state.market.data_shopgroup,  // store list shop by province

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListStoreGroup: (page) => dispatch(MarketActions.getListStoreGroup(page)),
        setShopId: (data) => dispatch(MarketActions.setShopId(data)),
        clearShopGroup: () => dispatch(MarketActions.clearShopGroup()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketListShop)