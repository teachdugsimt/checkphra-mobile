// THAILAND MAP
import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions,
    TextInput, FlatList, RefreshControl, ImageBackground, Image, Platform
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from '../Components/RoundedButton'
import { Colors, Images } from '../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import MarketActions from '../Redux/MarketRedux'
import styles from './Styles/HomeScreenStyle'
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')

class MarketHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id_type: null,
            id_province: null,
            area: null,

            search_text: null,
            show_icon: true,

            data_skin: null,
            tmp_region: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        let tmp_region = null
        if (newProps.data_region && newProps.data_region != null) {
            tmp_region = newProps.data_region
        }

        let slist = newProps.data_typeAmulet
        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            slist = newProps.data_typeAmulet
        }

        return {
            data_skin: slist,
            tmp_region
        }
    }

    componentDidMount() {
        this.props.getListTypeAmulet()
        this.props.getProfile()
    }

    _north = () => {
        this.setState({ area: 1 })
        this.props.getRegion(1)
        this.popupDialog2.show()
    }

    _northEast = () => {
        this.setState({ area: 4 })
        this.props.getRegion(4)
        this.popupDialog2.show()
    }

    _central = () => {
        this.setState({ area: 2 })
        this.props.getRegion(2)
        this.popupDialog2.show()
    }

    _east = () => {
        this.setState({ area: 3 })
        this.props.getRegion(3)
        this.popupDialog2.show()
    }

    _south = () => {
        this.setState({ area: 5 })
        this.props.getRegion(5)
        this.popupDialog2.show()
    }

    _openStore = () => {
        if (this.props.profile.store == null) {
            this.props.navigation.navigate("marketStore")
        } else if (this.props.profile.store && this.props.profile.store.status == 1) {
            alert(I18n.t('waitShop'))
        } else if (this.props.profile.store && this.props.profile.store.status == 5) {
            this.props.navigation.navigate("marketMylistAmulet")
        }
    }

    handleInputFocus = () => this.setState({ show_icon: false })

    handleInputBlur = () => this.setState({ show_icon: true })

    _pressSearch = () => {
        if (this.state.search_text) {
            this.props.searchRequest(this.state.search_text)
            this.setState({ search_text: null })
            this.props.navigation.navigate("marketSearch1")
        } else {

        }
    }

    render() {
        console.log(this.props.data_typeAmulet)
        console.log('--------------- SKIN AMULET --------------')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <Image source={Images.map} style={styles.map} />

                <TextInput value={this.state.search_text} onChangeText={(text) => this.setState({ search_text: text })}
                    style={{ width: '80%', height: 40, backgroundColor: '#fff5', paddingVertical: 8, paddingHorizontal: 30, borderRadius: 8, alignSelf: 'center', marginTop: 2.5, zIndex: 2 }}
                    // onFocus={() => this.setState({ show_icon: false })} 
                    ref={(textfield) => { this.textfield = textfield }}
                    placeholder={I18n.t('amuletOrProvince')}
                    placeholderStyle={{ marginLeft: 15 }}
                    onFocus={this.handleInputFocus}  // when focus text input
                    onBlur={this.handleInputBlur}  // when not focus text input
                />
                {!this.state.show_icon && <TouchableOpacity style={{ position: 'absolute', top: 5, right: width / 9, zIndex: 2 }} onPress={this._pressSearch}><Icon2 name={'arrow-right'} size={24} style={{}} /></TouchableOpacity>}

                {this.state.show_icon && < Icon2 name={'search'} size={24} color={Colors.brownTextTran} style={{ position: 'absolute', top: 5, left: width / 9 }} />}

                <TouchableOpacity style={styles.touchPin1} onPress={this._north}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>North</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin2} onPress={this._northEast}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>North East</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin3} onPress={this._central}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>Central</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin4} onPress={this._east}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>East</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchPin5} onPress={this._south}>
                    <Image source={Images.pin} style={styles.pin} />
                    <Text style={styles.textMap}>South</Text>
                </TouchableOpacity>


                {/* *******************OPEN STORE ZONE******************* */}
                <TouchableOpacity style={{ width: (width / 3.7), height: (height / 8.5), position: 'absolute', bottom: 7.5, right: 10, zIndex: 2 }} onPress={this._openStore}>
                    <Image source={Images.chat} style={{ width: width / 3.7, height: height / 8.5 }} />
                    <Text style={{ position: 'absolute', bottom: height / 14, right: 34 }}>Go To.</Text>
                    <Text style={{ position: 'absolute', bottom: (height / 14) - 20, right: 22 }}>My store !!</Text>
                </TouchableOpacity>
                {/* *******************OPEN STORE ZONE******************* */}

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('reason')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.15}
                    height={height / 1.75}
                    // height={150}
                    onDismissed={() => { this.setState({ id_type: null, area: null }) }}
                >
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.tmp_region && this.state.tmp_region != null && this.state.tmp_region.map((e, i) => {
                            return (
                                <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: 'lightgrey', marginTop: 5, marginHorizontal: 5, marginBottom: 2.5 }} onPress={() => {
                                    this.setState({ id_province: e.id })
                                    this.props.setZoneSkin(this.state.area, e.id)  // zone & province
                                    this.props.navigation.navigate('marketSelectType')
                                    this.popupDialog2.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 15, color: Colors.brownText }}>{e.name}</Text>
                                </TouchableOpacity>)
                        })}
                    </ScrollView>
                </PopupDialog>

                <Spinner
                    visible={(this.props.request || this.props.request_profile)}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

            </LinearGradient >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,
        request_profile: state.question.request_profile,

        data_typeAmulet: state.market.data_typeAmulet,  // store skin amulet 
        request: state.market.request,  // for request to get type amulet

        request7: state.market.request7,  // get province in each region
        data_region: state.market.data_region,  // store province n each region
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getListTypeAmulet: () => dispatch(MarketActions.getListTypeAmulet()),
        setZoneSkin: (zone, province) => dispatch(MarketActions.setZoneSkin(zone, province)),
        getRegion: (geo_id) => dispatch(MarketActions.getRegion(geo_id)),
        searchRequest: (text) => dispatch(MarketActions.searchRequest(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketHome)