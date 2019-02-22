import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, StyleSheet, RefreshControl, ImageBackground, Image, Platform, Linking, Animated,
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
// import { Card } from 'react-native-elements'
import GridView from "react-native-super-grid";
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import AuthActions from '../Redux/AuthRedux'
import VersionActions from '../Redux/VersionRedux'
import PromotionActions from '../Redux/PromotionRedux'
import styles from './Styles/HomeScreenStyle'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 5
let check = false
// let barArray = []
class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list_user: null,
            dataProifle: null,
            language: '',
            kawsod: null,

            tmp_publish: null,
            itemWidth: null,
            barFull: null,
        }

    }
    animVal = new Animated.Value(0)

    static navigationOptions = ({ navigation }) => {

        return {
            title: I18n.t('home'),
        }
    }
    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        console.log('============  HOME PAGE =============')

        const list_user = [{ name: I18n.t('checkAmuletScreen'), id: 1, logo: 'search' },
        // { name: I18n.t('showAmuletReal'), id: 2 },
        { name: I18n.t('market'), id: 4, logo: 'cart-plus' },
        { name: I18n.t('chat'), id: 3, logo: 'wechat' },]

        if (newProps.language != prevState.language) {
            newProps.getProfile()
        }

        let profile = newProps.profile
        if (newProps.profile && newProps.profile != null) {
            profile = newProps.profile
        }

        // if (newProps.data_publish && newProps.data_publish != null) {
        //     if (prevState.tmp_publish != newProps.data_publish && check == false) {
        //         check = true
        //         numItems = newProps.data_publish.length
        //         itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
        //         return {
        //             kawsod: newProps.data_publish,
        //             itemWidth,
        //         }
        //     }
        // }

        return {
            // listPromotion: plist
            dataProifle: profile,
            list_user,
            language: newProps.language,
            kawsod: newProps.data_publish,
        }
    }

    _pressList = (item) => {
        if (item.id == 1) {
            this.props.navigation.navigate('uploadScreen')
        } else if (item.id == 2) {
            this.props.navigation.navigate('showroom')
        } else if (item.id == 3) {
            this.popupDialog.show()
        } else if (item.id == 4) {
            this.props.navigation.navigate('marketHome')
        }
    }

    _reload = () => {
        this.props.getProfile()
    }

    componentDidMount() {
        this.props.getProfile()
        this.props.getPublish()
    }

    _webBoard = () => {
        this.props.navigation.navigate('webboard')
        this.popupDialog.dismiss()
    }

    _ownerAmulet = () => {
        this.props.navigation.navigate('userContactOwner')
        this.popupDialog.dismiss()
    }

    _contactAdmin = () => {
        this.props.navigation.navigate('contactAdmin')
        this.popupDialog.dismiss()
    }

    _pressLink(link) {
        const url = link
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }

    componentWillUnmount() {
        check = false
    }

    _showPublish = (item) => {
        this.setState({ tmp_publish: item })
        this.popupDialog2.show()
    }

    render() {
        I18n.locale = this.props.language
        console.log(this.state.kawsod)
        console.log('--------------- KAWSOD HOME PAGE --------------')

        // let barArray = []
        // if (this.state.kawsod && this.state.kawsod != null && this.state.kawsod.length > 0) {

        //     this.state.kawsod.forEach((e, i) => {

        //         const scrollBarVal = this.animVal.interpolate({
        //             inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        //             outputRange: [-this.state.itemWidth, this.state.itemWidth],
        //             extrapolate: 'clamp',
        //         })

        //         const thisBar = (
        //             <View
        //                 key={`bar${i}`}
        //                 style={[
        //                     styles2.track,
        //                     {
        //                         // width: this.state.itemWidth - (this.state.itemWidth / 2) - (this.state.itemWidth / 3) - (this.state.itemWidth / 17),
        //                         width: this.state.itemWidth - ((this.state.itemWidth / 2)),  // กำหนดแถบสีเทา
        //                         marginLeft: i === 0 ? 0 : BAR_SPACE,
        //                     },
        //                 ]}
        //             >
        //                 <Animated.View
        //                     style={[
        //                         styles2.bar,
        //                         {
        //                             // width: this.state.itemWidth - (this.state.itemWidth / 2) - (this.state.itemWidth / 3) - (this.state.itemWidth / 17),
        //                             width: this.state.itemWidth + 0,  // กำหนด แถบสีส้ม
        //                             transform: [
        //                                 { translateX: scrollBarVal },
        //                             ],
        //                         },
        //                     ]}
        //                 />
        //             </View>
        //         )
        //         barArray.push(thisBar)
        //     })
        // }

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <View style={{ marginHorizontal: 10, marginTop: 10, backgroundColor: Colors.milk, borderRadius: 10, height: height / 2.85, flexDirection: 'row' }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                        )
                    }>
                        {this.state.kawsod && this.state.kawsod != null && this.state.kawsod.length > 0 ?
                            this.state.kawsod.map((e, i) => {


                                return (
                                    <TouchableOpacity style={{ flexDirection: 'row', margin: 10, flex: 1 }} onPress={() => this._showPublish(e)}>
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={1} style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16, width: width - (40) }}>{e.topic}</Text>
                                            <Image source={{ uri: e.image_link }} style={{ height: '60%', marginTop: 10, borderRadius: 5, width: width - (40) }} />
                                            <Text numberOfLines={2} style={{ fontSize: 14, color: Colors.brownTextTran, marginTop: 10, width: width - (40) }}>{e.content}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : <TouchableOpacity style={{ flexDirection: 'row', margin: 10, flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={1} style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16, width: width - (40) }}>{I18n.t('nonePublish')}</Text>
                                    <Image source={Images.logoCheckphra} style={{ height: (height / 3.8), marginTop: 10, borderRadius: 5, width: width - (40) }} />
                                    {/* <Text numberOfLines={2} style={{ fontSize: 14, color: Colors.brownTextTran, marginTop: 10, width: width - (40) }}>{I18n.t('nonePublish')}</Text> */}
                                </View>
                            </TouchableOpacity>}
                    </ScrollView>
                    {/* <View style={styles2.barContainer}>
                        {barArray && barArray}
                    </View> */}
                </View>

                <GridView
                    itemDimension={width / 2.5}
                    items={this.state.list_user ? this.state.list_user : []}
                    renderItem={item => {
                        return (

                            <TouchableOpacity onPress={() => this._pressList(item)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 130, width: '100%', backgroundColor: Colors.milk, justifyContent: "center", alignItems: 'center', borderRadius: 8, padding: 10 }}>
                                    <Icon2 name={item.logo} size={40} />
                                    <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 18, paddingTop: 5, marginHorizontal: 7.5 }} >
                                        {item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editType')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.2}
                    height={height / 2.4}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >

                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1, height: (height / 2.4) - 50 }}>
                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, flex: 1, marginHorizontal: 10 }} onPress={this._webBoard}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('webBoard')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10, flex: 1, marginHorizontal: 10 }} onPress={this._ownerAmulet}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('contactOwnerAmulet')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginVertical: 10, flex: 1, marginHorizontal: 10 }} onPress={this._contactAdmin}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('contactAdmin')}</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>


                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('publish')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.2}
                    height={height / 1.75}
                    // height={150}
                    onDismissed={() => { this.setState({ tmp_publish: null }) }}
                >
                    <View style={{ flex: 1, margin: 10, backgroundColor: 'lightgrey', borderRadius: 10 }}>
                        <ScrollView style={{ flex: 1 }}>
                            {/* <View style={{ flex: 1 }}> */}
                            <Text style={{ marginTop: 10, marginHorizontal: 5, fontFamily: 'Prompt-SemiBold', color: Colors.brownText, fontSize: 16, }}>{this.state.tmp_publish ? this.state.tmp_publish.topic : ''}</Text>
                            {this.state.tmp_publish && this.state.tmp_publish.image_link && <Image source={{ uri: this.state.tmp_publish ? this.state.tmp_publish.image_link : "" }} style={{ height: 160, marginTop: 10, borderRadius: 5, marginHorizontal: 5 }} />}
                            <Text style={{ fontSize: 14, color: Colors.brownTextTran, marginTop: 10, marginHorizontal: 5 }}>{this.state.tmp_publish ? this.state.tmp_publish.content : ""}</Text>
                            {this.state.tmp_publish && this.state.tmp_publish.link && <TouchableOpacity onPress={() => this._pressLink(this.state.tmp_publish.link)} style={{ marginVertical: 10, }}><Text style={{ fontWeight: 'bold', color: Colors.brownText, marginHorizontal: 5 }}>{this.state.tmp_publish ? this.state.tmp_publish.link : ""}</Text></TouchableOpacity>}
                            {/* </View> */}
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
        profile: state.question.profile,
        request_profile: state.question.request_profile,

        data_publish: state.promotion.data_publish,  // data kawsod
        request_publish: state.promotion.request,  // data request kawsod
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),

        getPublish: () => dispatch(PromotionActions.publishRequest()),  // get Kawsod

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barContainer: {
        position: 'absolute',
        // zIndex: 2,
        // top: deviceHeight - 50,
        top: (height / 2.85) - 10,
        right: (width / 2) - (20),
        flexDirection: 'row',
    },
    track: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        height: 7,  //old 2
        borderRadius: 45, //add
    },
    bar: {
        // backgroundColor: '#229954',
        backgroundColor: Colors.bloodOrange,
        height: 7,  //old 2
        borderRadius: 45,  // add
        position: 'absolute',
        left: 0,
        top: 0,
    },
    rbutton: {
        width: '69%',
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: 'transparent',
        marginTop: (deviceHeight / 2) + (deviceHeight / 3),
        borderColor: 'white',
        alignSelf: 'center',
    }
})
