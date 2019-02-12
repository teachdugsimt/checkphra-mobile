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

    getTypePhra = (item) => {
        this.props.setSkinAmulet(item.id)
        this.props.navigation.navigate('marketListArea1')
    }

    _ListShop = () => {
        // this.props.getListStoreGroup()
        this.props.navigation.navigate("marketListShop")
    }

    render() {
        console.log(this.props.skin)
        console.log('----------- SELECT TYPE AMULET --------------')
        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
                <Text style={{ alignSelf: 'center', fontFamily: 'Prompt-SemiBold', fontSize: 18, color: Colors.brownText, marginTop: 10, marginBottom: 5 }}>{I18n.t('selectAmuletType')}</Text>

                <TouchableOpacity style={{ backgroundColor: Colors.milk, borderRadius: 8, width: '70%', alignSelf: 'center' }} onPress={this._ListShop}>
                    <Text style={{ fontSize: 16, fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, alignSelf: 'center', textAlign: 'center', padding: 8 }}>Go to shop</Text>
                </TouchableOpacity>

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketSelectType)