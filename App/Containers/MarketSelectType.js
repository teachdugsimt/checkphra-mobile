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

class MarketSelectType extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search_text: null,
            show_icon: true,
        }
    }

    componentWillUnmount() {
        this.props.clearProvinceId()
    }

    getTypePhra = (item) => {
        this.props.setSkinAmulet(item.id)
        this.props.navigation.navigate('marketListArea1')
    }

    _ListShop = () => {
        // this.props.getListStoreGroup()
        this.props.navigation.navigate("marketListShop")
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
        console.log(this.props.skin)
        console.log('----------- SELECT TYPE AMULET --------------')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />

                <TextInput value={this.state.search_text} onChangeText={(text) => this.setState({ search_text: text })}
                    style={{ width: '80%', height: 40, backgroundColor: '#fff5', paddingVertical: 8, paddingHorizontal: 30, borderRadius: 8, alignSelf: 'center', marginTop: 2.5, zIndex: 2 }}
                    // onFocus={() => this.setState({ show_icon: false })} 
                    ref={(textfield) => { this.textfield = textfield }}
                    underlineColorAndroid={'transparent'}
                    placeholder={I18n.t('amuletSearch')}
                    placeholderStyle={{ marginLeft: 15 }}
                    onFocus={this.handleInputFocus}  // when focus text input
                    onBlur={this.handleInputBlur}  // when not focus text input
                    onSubmitEditing={this._pressSearch}
                />
                {!this.state.show_icon && <TouchableOpacity style={{ position: 'absolute', top: 5, right: width / 9, zIndex: 2 }} onPress={this._pressSearch}><Icon2 name={'arrow-right'} size={24} style={{}} /></TouchableOpacity>}

                {this.state.show_icon && < Icon2 name={'search'} size={24} color={Colors.brownTextTran} style={{ position: 'absolute', top: 7.5, left: width / 9 }} />}

                <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText, marginTop: 10, marginBottom: 5 }}>{I18n.t('selectAmuletType')}</Text>

                <GridView
                    itemDimension={100}
                    items={this.props.data_typeAmulet}
                    renderItem={item => {
                        return (
                            <TouchableOpacity onPress={() => this.getTypePhra(item)}>
                                <View
                                    style={{
                                        height: 85,
                                        width: '100%',
                                        backgroundColor: '#FBD190',
                                        justifyContent: "center",
                                        borderRadius: 8,
                                        padding: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.brownText,
                                            fontFamily: "Prompt-Regular",
                                            fontSize: 16,
                                            alignSelf: "center",
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }} />

                <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: Colors.milk, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={this._ListShop}>
                    <Icon2 name={'shopping-cart'} size={24} />
                    <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, alignSelf: 'center', textAlign: 'center' }}> Shop</Text>
                </TouchableOpacity>

            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,

        data_typeAmulet: state.market.data_typeAmulet,  // store skin amulet 
        skin: state.market.skin,  // store skin amulet id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSkinAmulet: (skin) => dispatch(MarketActions.setSkinAmulet(skin)),
        getListStoreGroup: (page) => dispatch(MarketActions.getListStoreGroup(page)),
        clearProvinceId: () => dispatch(MarketActions.clearProvinceId()),

        searchRequest: (text) => dispatch(MarketActions.searchRequest(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketSelectType)