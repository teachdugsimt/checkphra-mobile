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
            img: null
        }
    }

    _goToChatTheirAmulet = (item) => {
        this.props.setTheirAmuletData(item)
        this.props.navigation.navigate('chatTheirAmulet')
    }


    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")

        return (
            <TouchableOpacity style={{ height: 90, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }} onPress={() => this._goToChatTheirAmulet(item)}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 10 }} onPress={() => {
                        this._showImage(item.images)
                    }}>
                        <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={{ uri: item.images[0] }} />
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ marginLeft: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.amulet_detail.amuletName}</Text>
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

    _showImage = (item) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, modalVisible: true })
    }

    _pressSubList = (item) => {
        let img = []
        item.map(e => {
            img.push({ url: e })
        })
        this.setState({ img, index: 1, modalVisible: true })
    }

    componentDidMount() {
        count = 1
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
                    data={this.props.data_amuletstore}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    // onEndReachedThreshold={0.025}
                    onEndReachedThreshold={1.2} />
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