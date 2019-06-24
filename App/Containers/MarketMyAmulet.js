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
import { Colors, Images, ApplicationStyles } from '../Themes';
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
import firebase from 'react-native-firebase';
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
let check = false

let region = [{ name: "North", id: 1 }, { name: "Central & West", id: 2 }, { name: "East", id: 3 }, { name: "North East", id: 4 }, { name: "South", id: 5 }]
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
            tmp_profile: null,

            type_name1: null,
            type_name2: null,
            zone_name: null,
            zone: null,
            type: null,
            type2: null,
            tmp_type: null,
            tmp_type2: null,

            category1: null,
            category2: null,
        }

    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('------------------------- MY AMULET SCREEN PAGE ----------------------------')

        if (newProps.data_push && newProps.data_push != null) {
            if (newProps.data_push != prevState.tmp_push && (newProps.request9 == false || newProps.request9 == null)) {
                newProps.editPushData(newProps.data_push)
                return {
                    tmp_push: newProps.data_push
                }
            }
        }

        // if()

        if (newProps.data_delete && newProps.data_delete != null) {
            if (newProps.data_delete != prevState.tmp_delete && newProps.request10 == false) {
                newProps.deleteFromList(newProps.data_delete)
                newProps.getProfile()
                return {
                    tmp_delete: newProps.data_delete
                }
            }
        }

        if (newProps.data_typeAmulet2 && newProps.data_typeAmulet2 != null) {
            if (newProps.data_typeAmulet2 != prevState.tmp_type2) {
                return {
                    tmp_type2: newProps.data_typeAmulet2
                }
            }
        }

        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            if (newProps.data_typeAmulet != prevState.tmp_type) {
                return {
                    tmp_type: newProps.data_typeAmulet
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
        this.setState({
            tmp_item: item,
            zone: null, zone_name: null, type: null, type_name1: null, type2: null, type_name2: null
        })

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
        let color = item.display == 5 ? 'orange' : 'green'
        // if (item.display == 1) {

        return (
            <View style={{ height: 145, backgroundColor: Colors.milk, borderRadius: 10, marginLeft: 7.5, marginTop: 7.5, marginRight: index == 2 || index % 3 == 2 ? 7.5 : 0, width: (width / 3) - 10, justifyContent: 'center' }}>

                {/* <TouchableOpacity style={{ position: 'absolute', top: 1.5, right: 5, zIndex: 2 }} onPress={() => this._pressSubMenu(item)}>
                    <Icon2 name={'gear'} size={28} color={color} />
                </TouchableOpacity> */}

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => { this._showImage(item.images) }}>
                        {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => this._pressSubMenu(item)}>
                        {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 5, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 16, textAlign: 'center' }} numberOfLines={1}>{item.amulet_detail.amuletName ? item.amulet_detail.amuletName : I18n.t("noneSpecify")}</Text>
                </View>
            </View>
        )

        // }
        // else
        //     return (
        //         <TouchableOpacity style={{ height: 145, backgroundColor: Colors.milk, borderRadius: 10, marginLeft: 7.5, marginTop: 7.5, marginRight: index == 2 || index % 3 == 2 ? 7.5 : 0, width: (width / 3) - 10, justifyContent: 'center' }} onPress={() => this._goToChat(item)}>

        //             {/* <TouchableOpacity style={{ position: 'absolute', top: 1.5, right: 5, zIndex: 2 }} onPress={() => this._pressSubMenu(item)}>
        //             <Icon2 name={'gear'} size={28} color={color} />
        //         </TouchableOpacity> */}

        //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //                 {/* <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => { this._showImage(item.images) }}>
        //                 {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
        //             </TouchableOpacity> */}
        //                 <TouchableOpacity style={{ justifyContent: 'center', zIndex: 1 }} onPress={() => this._pressSubMenu(item)}>
        //                     {item.images != null && <Image style={{ width: 100, height: 100, borderRadius: 12 }} source={{ uri: item.images[0] }} />}
        //                 </TouchableOpacity>

        //                 <Text style={{ marginHorizontal: 5, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 16, textAlign: 'center' }} numberOfLines={1}>{item.amulet_detail.amuletName ? item.amulet_detail.amuletName : I18n.t("noneSpecify")}</Text>
        //             </View>
        //         </TouchableOpacity>
        //     )



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
        // this.props.navigation.navigate('chatMyAmulet')
        this.props.navigation.navigate("chatRoomMyAmulet")
    }

    componentDidMount() {
        this.props.navigation.setParams({ addAmulet: this._addAmulet });
        this.props.navigation.setParams({ showShop: this._showShop });
        count = 1
        if (!this.props.data_typeAmulet) {
            this.props.getListTypeAmulet()
        }
        this.props.getListAreaAmulet(count)
    }

    componentWillUnmount() {
        this.props.clearListMyAmulet()
        this.props.clearDataPushAmulet()
        this.props.getProfile()
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
        console.log(this.props.data_areaAmulet)
        console.log(this.state.type)
        console.log(this.state.type2)
        console.log('***************** Market MY AMULET **********************')
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
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
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
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('haveAmulet') + (this.props.profile && this.props.profile.store && this.props.profile.store.total_count == this.props.profile.store.limit ? " (add slot - 10 coins)" : "")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', flex: 1, justifyContent: 'center', width: '95%', marginHorizontal: 7.5, marginBottom: 2.5, borderRadius: 8 }} onPress={this._goToUpload}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{I18n.t('notAmulet') + (this.props.profile && this.props.profile.store && this.props.profile.store.total_count == this.props.profile.store.limit ? " (add slot - 10 coins)" : "")}</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
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
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t("zone2")}</Text></View>}
                    ref={(popupDialog) => { this.popupDialogZone = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1, height: (height / 2) - 50 }}>
                            {region.map((e, i) => {
                                return (
                                    <TouchableOpacity style={{ flex: 1, padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 5 }} onPress={() => {
                                        this.setState({
                                            zone: e.id, zone_name: e.name,
                                            // tmp_type2: null, type_name2: null, type2: null, type: null
                                        })
                                        this.props.getListTypeAmulet2(e.id)
                                        this.popupDialogZone.dismiss()
                                        this.popupDialog4.show()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', textAlign: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t("typeAmuletMarket")}</Text></View>}
                    ref={(popupDialog) => { this.popupDialogType1 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >


                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_type2 && this.state.tmp_type2 != null && this.state.tmp_type2.map((e, i) => {
                            if (e.parent_id == 1 || e.parent_id == 2 || e.parent_id == 3 || e.parent_id == 4 || e.parent_id == 5) {
                                // return (
                                //     <View style={{ marginTop: 5, marginHorizontal: 5, marginBottom: 2.5, padding: 10, borderRadius: 10, backgroundColor: 'orange' }}>
                                //         <Text style={{ textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                //     </View>
                                // )
                            } else {
                                return (
                                    <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ type2: e.id, type: null, type_name2: e.name })
                                        this.popupDialogType1.dismiss()
                                        this.popupDialog4.show()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </ScrollView>

                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ ...ApplicationStyles.popupHeader }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t("typeAmuletMarket2")}</Text></View>}
                    ref={(popupDialog) => { this.popupDialogNormal1 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.6}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >

                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_type && this.state.tmp_type.map((e, i) => {
                            if (e.parent_id == null) {
                                return (
                                    <View style={{ marginTop: 5, marginHorizontal: 5, marginBottom: 2.5, padding: 10, borderRadius: 10, backgroundColor: 'orange' }}>
                                        <Text style={{ textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                        this.setState({ type: e.id, type2: null, tmp_type2: null, type_name1: e.name })
                                        this.popupDialogNormal1.dismiss()
                                        this.popupDialog4.show()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontFamily: 'Prompt-SemiBold' }}>{e.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </ScrollView>

                </PopupDialog>

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

                            {this.state.tmp_item && this.state.tmp_item.display == 1 && <View style={{ flex: 1, width: "90%", justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingHorizontal: 10, borderTopColor: 'lightgrey', borderTopWidth: 2.5, marginBottom: 5 }}>
                                <View style={{ alignItems: 'flex-start' }}>

                                    {this.state.type == null && <TouchableOpacity style={{ padding: 10, backgroundColor: 'lightgrey', width: "95%", margin: 7.5, flexDirection: 'row' }} onPress={() => {
                                        this.popupDialog4.dismiss()
                                        this.popupDialogZone.show()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }} numberOfLine={1}>{this.state.zone_name ? this.state.zone_name : I18n.t('zone2')}</Text>
                                        {this.state.zone_name && <TouchableOpacity style={{ margin: 5, justifyContent: 'center' }} onPress={() => this.setState({ type2: null, type_name2: null, zone: null, zone_name: null })}><Icon2 name={"close"} size={20} /></TouchableOpacity>}
                                    </TouchableOpacity>}

                                    {this.state.type == null && this.state.zone && <TouchableOpacity style={{ padding: 10, backgroundColor: 'lightgrey', width: "95%", margin: 7.5, flexDirection: 'row' }} onPress={() => {
                                        this.popupDialog4.dismiss()
                                        this.popupDialogType1.show()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }} numberOfLine={1}>{this.state.type_name2 ? this.state.type_name2 : I18n.t('typeAmuletMarket')}</Text>
                                        {this.state.type_name2 && this.state.zone_name && <TouchableOpacity style={{ margin: 5, justifyContent: 'center' }} onPress={() => this.setState({ type_name2: null })}><Icon2 name={"close"} size={20} /></TouchableOpacity>}
                                    </TouchableOpacity>}

                                    {(this.state.type2 == null && this.state.zone == null) && <TouchableOpacity style={{ padding: 10, backgroundColor: 'lightgrey', width: "95%", margin: 7.5, flexDirection: 'row' }} onPress={() => {
                                        this.popupDialog4.dismiss()
                                        this.popupDialogNormal1.show()
                                    }}>
                                        <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }} numberOfLine={1}>{this.state.type_name1 ? this.state.type_name1 : I18n.t('typeAmuletMarket2')}</Text>
                                        {this.state.type_name1 && <TouchableOpacity style={{ margin: 5, justifyContent: 'center' }} onPress={() => this.setState({ type: null, type_name1: null })}><Icon2 name={"close"} size={20} /></TouchableOpacity>}
                                    </TouchableOpacity>}

                                </View>
                            </View>}

                            <View style={{ flex: 1, width: "90%", justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingHorizontal: 10, borderTopColor: 'lightgrey', borderTopWidth: 2.5 }}>
                                {this.state.tmp_item && this.state.tmp_item.display == 1 && <TouchableOpacity style={{ flex: 1, width: '95%', padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 5, justifyContent: 'center', height: 60 }} onPress={() => {
                                    if (this.state.type) {  // General Category -> type_name1
                                        this.props.setTmpTypeAmulet(this.state.type)
                                        this.props.pushAmuletMarket(this.state.tmp_item.id)
                                        this.amulet = firebase.database().ref('amulet/' + this.state.tmp_item.id)
                                        this.amulet.set({
                                            amuletName: this.state.tmp_item.amulet_detail.amuletName ? this.state.tmp_item.amulet_detail.amuletName : "-",
                                            contact: this.state.tmp_item.amulet_detail.contact,
                                            mid: this.state.tmp_item.amulet_detail.mid,
                                            owner: this.state.tmp_item.amulet_detail.owner,
                                            price: this.state.tmp_item.amulet_detail.price,
                                            temple: this.state.tmp_item.amulet_detail.temple ? this.state.tmp_item.amulet_detail.temple : "-",
                                            amulet_typeid: this.state.type,
                                            amulet_typename: this.state.type_name1,
                                            image: this.state.tmp_item.images,
                                            image_thumbs: this.state.tmp_item.images_thumbs,

                                        })
                                        this.popupDialog4.dismiss()
                                    } else if (this.state.type2) {  // type_name2
                                        this.props.setTmpTypeAmulet(this.state.type2)
                                        this.props.pushAmuletMarket(this.state.tmp_item.id)
                                        this.amulet = firebase.database().ref('amulet/' + this.state.tmp_item.id)
                                        this.amulet.set({
                                            amuletName: this.state.tmp_item.amulet_detail.amuletName ? this.state.tmp_item.amulet_detail.amuletName : "-",
                                            contact: this.state.tmp_item.amulet_detail.contact,
                                            mid: this.state.tmp_item.amulet_detail.mid,
                                            owner: this.state.tmp_item.amulet_detail.owner,
                                            price: this.state.tmp_item.amulet_detail.price,
                                            temple: this.state.tmp_item.amulet_detail.temple ? this.state.tmp_item.amulet_detail.temple : "-",
                                            amulet_typeid: this.state.type2,
                                            amulet_typename: this.state.type_name2,
                                            image: this.state.tmp_item.images,
                                            image_thumbs: this.state.tmp_item.images_thumbs,

                                        })
                                        this.popupDialog4.dismiss()
                                    } else {
                                        alert(I18n.t("editType"))
                                    }
                                }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{I18n.t('sendToMarket') + (this.state.tmp_item.qid == null ? " 40 coins" : " 20 coins")}</Text>
                                </TouchableOpacity>}

                                {this.state.tmp_item && this.state.tmp_item.display == 5 && <TouchableOpacity style={{ flex: 1, width: '95%', padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginHorizontal: 5, marginTop: 5, justifyContent: 'center', height: 60 }} onPress={() => {
                                    this._goToChat(this.state.tmp_item)
                                    this.popupDialog4.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{I18n.t('chat')}</Text>
                                </TouchableOpacity>}

                                <TouchableOpacity style={{ flex: 1, width: '95%', padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginHorizontal: 5, marginTop: 5, justifyContent: 'center', height: 60 }} onPress={() => {
                                    this.props.deleteAmuletMarket(this.state.tmp_item.id)
                                    this.popupDialog4.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 14, color: Colors.brownText }}>{I18n.t('deleteAmulet')}</Text>
                                </TouchableOpacity>
                            </View>



                        </View>
                    </ScrollView>
                </PopupDialog>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, paddingHorizontal: 10, paddingVertical: 7.5, borderRadius: 10, backgroundColor: Colors.milk, marginHorizontal: 7.5, marginTop: 7.5 }} onPress={this._addSlot}>
                    <Text style={{ fontFamily: 'Prompt-SemiBold' }}>Use </Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16 }}>{this.props.profile.store ? this.props.profile.store.total_count + "/" + this.props.profile.store.limit : '?'}</Text>
                    <Text style={{ fontFamily: 'Prompt-SemiBold' }}> slot. Upload for add slot</Text>
                    {/* <Icon2 name={'plus-circle'} size={26} color={Colors.brownTextTran} style={{ paddingLeft: 7.5 }} /> */}
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

        data_typeAmulet: state.market.data_typeAmulet,  // GENERAL CATEGORY
        data_typeAmulet2: state.market.data_typeAmulet2, // SUB CATEGORY
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListTypeAmulet: (geo_id) => dispatch(MarketActions.getListTypeAmulet(geo_id)), // request GENERAL CATEGORY
        getListTypeAmulet2: (geo_id) => dispatch(MarketActions.getListTypeAmulet2(geo_id)),  // request SUB CATEGORY
        getProfile: () => dispatch(QuestionActions.getProfile()),
        setTheirAmuletData: (data) => dispatch(ShowRoomActions.setTheirAmuletData(data)),
        getListAreaAmulet: (page) => dispatch(MarketActions.getListMyMarket(page)),
        clearListMyAmulet: () => dispatch(MarketActions.clearListMyAmulet()),
        pushAmuletMarket: (market_id) => dispatch(MarketActions.pushAmuletMarket(market_id)),
        editPushData: (data) => dispatch(MarketActions.editPushData(data)),
        deleteAmuletMarket: (market_id) => dispatch(MarketActions.deleteAmuletMarket(market_id)),
        deleteFromList: (data) => dispatch(MarketActions.deleteFromList(data)),

        clearDataPushAmulet: () => dispatch(MarketActions.clearDataPushAmulet()),
        setTmpTypeAmulet: (t_id) => dispatch(MarketActions.setTmpTypeAmulet(t_id)),
        // setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketMyAmulet)


//  *********************************  " 165 "  ****************************************