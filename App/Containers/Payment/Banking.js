import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl, Image, Alert, Picker } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from '../../Redux/PaymentRedux'
// import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Entypo";
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay';
import { INITIAL_STATE } from '../../Redux/AuthRedux';
import I18n from '../../I18n/i18n';
I18n.fallbacks = true;
// I18n.currentLocale("th");

var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let { width } = Dimensions.get('window')

let check = false
class Banking extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     const params = navigation.state.params || {};

    //     return {
    //         headerLeft: (
    //             <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
    //                 <Text
    //                     style={{
    //                         marginLeft: 20,
    //                         fontSize: 18,
    //                         fontFamily: "Prompt-SemiBold",
    //                         color: Colors.brownText
    //                     }}
    //                 >
    //                     {"< กลับ "}
    //                 </Text>
    //                 <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>Bangking</Text>
    //             </TouchableOpacity>
    //         )
    //     };
    // };

    constructor(props) {
        super(props)
        this.state = {
            money: this.props.money,
            type: 'transfer',
            bank: '',
            avatarSource: '',

            spinner: false,

            kbankBackground: null,
            kbankBorder: null,

            scbBackground: null,
            scbBorder: null,

            krungthepBackground: null,
            krungthepBorder: null,

            ktbBackground: null,
            ktbBorder: null,

            tmbBackground: null,
            tmbBorder: null,

        }
    }

    componentWillMount() {
        check = false
        this.props.deleteImage()
    }

    componentWillUnmount() {
        this.props.deleteImage()
        this.props.navigation.goBack()
    }

    componentDidMount() {
        check = false
        this.setState({ spinner: false })
    }

    _pressButtonOk = () => {
        let day = new Date()
        let f = moment(day).format()
        let time1 = f.slice(0, 10)
        let time2 = f.slice(11, 19)
        let full = time1 + " " + time2
        if (!this.state.avatarSource) {
            alert(I18n.t('uploadSlip'))
        } else {
            if (!this.state.bank) {
                alert(I18n.t('selectBank'))
            } else {
                Alert.alert(
                    'Check Phra',
                    I18n.t('submitTransaction'),
                    [
                        {
                            text: I18n.t('ok'), onPress: () => {
                                let item = {
                                    user_id: this.props.user_id,
                                    price: this.props.money,
                                    bank: this.state.bank,
                                    date: full,
                                    file: this.props.image,
                                    type: this.state.type,
                                }
                                this.props.sendSlip(item)

                                // setTimeout(() => {
                                //     this.props.navigation.goBack()
                                //     this.props.navigation.navigate("historyAddPoint")
                                // }, 3000);
                            }
                        },
                        { text: I18n.t('cancel')}
                    ],
                    { cancelable: false }
                )

            }
        }

    }

    static getDerivedStateFromProps(newProps, prevState) {

        // console.log(newProps)
        // console.log(prevState)
        if (check == true && newProps.image == null && newProps.request2 == false) {
            newProps.navigation.goBack()
            newProps.navigation.navigate("historyAddPoint")
        }

        if (newProps.request2) {
            let spinner = true
            check = false
            return {
                spinner
            }
        } else if (newProps.request2 == false) {
            let spinner = false
            check = true
            newProps.deleteImage()
            return {
                spinner,
            }

        } else {
            let spinner = false
            return {
                spinner
            }
        }

        return {

        }
    }

    pick = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // console.log(response)

                this.setState({
                    avatarSource: source
                });

                this.props.setImage({
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                })
            }
        });
    }

    _kbank = () => {
        this.setState({
            bank: 'ธนาคารกสิกร',
            kbankBorder: 1,
            kbankBackground: 'lightgrey',
            scbBackground: null,
            scbBorder: null,
            krungthepBackground: null,
            krungthepBorder: null,
            ktbBackground: null,
            ktbBorder: null,
            tmbBackground: null,
            tmbBorder: null,
        })
    }

    _scb = () => {
        this.setState({
            bank: 'ธนาคารไทยพาณิชย์',
            kbankBorder: null,
            kbankBackground: null,
            scbBackground: 'lightgrey',
            scbBorder: 1,
            krungthepBackground: null,
            krungthepBorder: null,
            ktbBackground: null,
            ktbBorder: null,
            tmbBackground: null,
            tmbBorder: null,
        })
    }

    _krungthep = () => {
        this.setState({
            bank: 'ธนาคารกรุงเทพ',
            kbankBorder: null,
            kbankBackground: null,
            scbBackground: null,
            scbBorder: null,
            krungthepBackground: 'lightgrey',
            krungthepBorder: 1,
            ktbBackground: null,
            ktbBorder: null,
            tmbBackground: null,
            tmbBorder: null,
        })
    }

    _ktb = () => {
        this.setState({
            bank: 'ธนาคารกรุงไทย',
            kbankBorder: null,
            kbankBackground: null,
            scbBackground: null,
            scbBorder: null,
            krungthepBackground: null,
            krungthepBorder: null,
            ktbBackground: 'lightgrey',
            ktbBorder: 1,
            tmbBackground: null,
            tmbBorder: null,
        })
    }

    _tmb = () => {
        this.setState({
            bank: 'ธนาคารทหารไทย',
            kbankBorder: null,
            kbankBackground: null,
            scbBackground: null,
            scbBorder: null,
            krungthepBackground: null,
            krungthepBorder: null,
            ktbBackground: null,
            ktbBorder: null,
            tmbBackground: 'lightgrey',
            tmbBorder: 1,
        })
    }

    _changeText = (text) => {
        this.setState({ money: text })
    }

    render() {
        I18n.locale = this.props.language
        let heightView = 60
        let widthView = '50%'
        let heightImg = 60
        let widthImg = 60

        const img = [Images.capture1, Images.capture2, Images.capture3, Images.capture4, Images.capture5]
        return (
            <LinearGradient
                colors={["#FF8C00", "#FFA500", "#FFCC33"]}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />
                <ScrollView style={{ flex: 1, width: width }}>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 18, }}>{I18n.t('selectBank')}</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 8, fontSize: 20, fontWeight: 'bold' }}>นาย ทดสอบ ทดสอบ</Text>

                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', height: 330, width: '100%', marginTop: 15 }}>

                        <TouchableOpacity
                            onPress={this._kbank}
                            style={{ flexDirection: 'row', height: heightView, width: widthView, borderWidth: this.state.kbankBorder, backgroundColor: this.state.kbankBackground }}>
                            <Image source={img[0]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>753-0-11694-0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._scb}
                            style={{ flexDirection: 'row', height: heightView, width: widthView, borderWidth: this.state.scbBorder, backgroundColor: this.state.scbBackground }}>
                            <Image source={img[1]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>519-2-81889-8</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._krungthep}
                            style={{ flexDirection: 'row', height: heightView, width: widthView, borderWidth: this.state.krungthepBorder, backgroundColor: this.state.krungthepBackground }}>
                            <Image source={img[2]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>019-3-90118-2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._ktb}
                            style={{ flexDirection: 'row', height: heightView, width: widthView, borderWidth: this.state.ktbBorder, backgroundColor: this.state.ktbBackground }}>
                            <Image source={img[3]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>019-3-90118-2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._tmb}
                            style={{ flexDirection: 'row', height: heightView, width: widthView, borderWidth: this.state.tmbBorder, backgroundColor: this.state.tmbBackground }}>
                            <Image source={img[4]} style={{ height: heightImg, width: widthImg, marginRight: 10 }} />
                            <Text style={{ color: Colors.brownText, fontSize: 18, marginTop: 15 }}>019-3-90118-2</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16, alignSelf: 'center' }}>{I18n.t('priceProduct')} </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green', alignSelf: 'center' }}>{this.props.money}</Text>
                    </View>

                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16 }}>{I18n.t('uploadSlip')}</Text>

                        <TouchableOpacity style={{}} onPress={this.pick}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'center', borderWidth: 3,
                                borderColor: Colors.brownTextTran, borderRadius: 10, margin: 5, overflow: 'hidden', height: 150, width: 150
                            }}>
                                <Icon3
                                    name="camera"
                                    size={40}
                                    color={Colors.brownTextTran}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        fontFamily: 'Prompt-SemiBold', fontSize: 25, color: Colors.brownTextTran,
                                    }}>Slip</Text>

                                    {this.props.image && < Icon3
                                        style={{ marginLeft: 40 }}
                                        name="squared-cross"
                                        size={24}
                                        color={'red'}
                                        onPress={() => { this.props.deleteImage() }}
                                    />}
                                </View>

                                <Image source={this.state.avatarSource && this.props.image ? this.state.avatarSource : ''} style={{ width: '100%', height: '100%' }} />
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{ margin: 10, width: 200 }}>
                            <RoundedButton title={I18n.t('ok')}
                                onPress={() => this._pressButtonOk()}
                            // fetching={this.props.request2} 
                            />
                        </View>
                    </View>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                    />
                    <View style={{ height: 30 }}>
                    </View>

                </ScrollView>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        money: state.promotion.money,
        user_id: state.auth.user_id,
        image: state.payment.img_slip,
        request2: state.payment.request2,
        language: state.auth.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        paymentBanking: (data) => dispatch(PaymentActions.paymentRequest(data)),

        deleteImage: () => dispatch(PaymentActions.deleteImage()),
        sendSlip: (item) => dispatch(PaymentActions.sendSlipRequest(item)),
        setImage: (source) => dispatch(PaymentActions.setImage(source)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banking)