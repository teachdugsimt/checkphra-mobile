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
            area: null,

            data_skin: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        let slist = newProps.data_typeAmulet
        if (newProps.data_typeAmulet && newProps.data_typeAmulet != null) {
            slist = newProps.data_typeAmulet
        }

        return {
            data_skin: slist
        }
    }

    componentDidMount() {
        this.props.getListTypeAmulet()
        this.props.getProfile()
    }

    _north = () => {
        this.setState({ area: 1 })
        this.popupDialog2.show()
    }

    _northEast = () => {
        this.setState({ area: 4 })
        this.popupDialog2.show()
    }

    _central = () => {
        this.setState({ area: 2 })
        this.popupDialog2.show()
    }

    _east = () => {
        this.setState({ area: 3 })
        this.popupDialog2.show()
    }

    _south = () => {
        this.setState({ area: 5 })
        this.popupDialog2.show()
    }

    _newItem = () => {
        this.popupDialog.show()
    }

    _goToUpload = () => {
        this.props.navigation.navigate('marketUpload1')
        this.popupDialog.dismiss()
    }

    _goToUpload2 = () => {
        this.props.navigation.navigate("marketUpload2")
        this.popupDialog.dismiss()
    }

    _openStore = () => {
        this.props.navigation.navigate("marketStore")
    }

    render() {
        console.log(this.props.data_typeAmulet)
        console.log('--------------- SKIN AMULET --------------')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <Image source={Images.map} style={styles.map} />

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

                {/* <TouchableOpacity style={styles.iconView} onPress={this._newItem}>
                    <Icon2 name={'plus-square-o'} color={'dark'} size={40} />
                </TouchableOpacity> */}


                {/* *******************OPEN STORE ZONE******************* */}
                <TouchableOpacity style={{ width: (width / 2.70), height: (height / 7.75), position: 'absolute', bottom: 7.5, right: 10, zIndex: 2 }} onPress={this._openStore}>
                    <Image source={Images.chat} style={{ width: width / 2.70, height: height / 7.75 }} />
                    <Text style={{ position: 'absolute', bottom: height / 12.5, right: 15 }}>You don't have store.</Text>
                    <Text style={{ position: 'absolute', bottom: (height / 12.5) - 20, right: 15 }}>Click to open store !!</Text>
                </TouchableOpacity>
                {/* *******************OPEN STORE ZONE******************* */}

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('reason')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog2 = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.5}
                    height={(height / 2) + (7 * 10)}
                    // height={150}
                    onDismissed={() => { this.setState({ id_type: null, area: null }) }}
                >
                    {this.props.data_typeAmulet && this.props.data_typeAmulet != null && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        {this.props.data_typeAmulet.map((e, i) => {
                            return (
                                <TouchableOpacity style={{ backgroundColor: 'lightgrey', flex: 1, justifyContent: 'center', width: '100%', borderBottomColor: 'white', borderBottomWidth: 1 }} onPress={() => {
                                    this.setState({ id_type: e.id })
                                    this.props.setZoneSkin(this.state.area, e.id)
                                    this.props.navigation.navigate('marketListArea1')
                                    this.popupDialog2.dismiss()
                                }}>
                                    <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>{e.name}</Text>
                                </TouchableOpacity>)
                        })}
                    </View>}
                </PopupDialog>

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('reason')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.5}
                    height={height / 4}
                    // height={150}
                    onDismissed={() => { this.setState({}) }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderBottomColor: 'orange', borderBottomWidth: 1, flex: 1, width: '100%', justifyContent: 'center' }} onPress={this._goToUpload2}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>Have Amulet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'lightgrey', flex: 1, justifyContent: 'center', width: '100%' }} onPress={this._goToUpload}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText }}>Have not Amulet</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>

                <Spinner
                    visible={this.props.request}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getListTypeAmulet: () => dispatch(MarketActions.getListTypeAmulet()),
        setZoneSkin: (zone, skin) => dispatch(MarketActions.setZoneSkin(zone, skin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketHome)