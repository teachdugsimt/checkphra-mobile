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
import styles from './Styles/HomeScreenStyle'
import GridView from "react-native-super-grid";
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')

class ChatMyAmulet extends Component {

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ height: 120, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1 }}
                onPress={() => this._goToChat(item)}>

                <Text style={{ padding: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.name}</Text>
                <Text style={{ padding: 10, color: Colors.brownTextTran, fontSize: 14 }}>{item.date}</Text>
            </TouchableOpacity>
        )
    }

    _goToChat = (item) => {
        // this.props.setDetailPhra(item)
        // this.props.navigation.navigate('')
        this.props.navigation.navigate('')
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        const data = [{ name: 'chat1.', date: '25/12/18' },
        { name: 'chat2.', date: '25/12/18' },
        { name: 'chat3.', date: '25/12/18' },
        { name: 'chat4.', date: '25/12/18' },
        { name: 'chat5.', date: '25/12/18' }]
        // console.log('***************************************')
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

                <View style={{  height: 45, backgroundColor: Colors.milk,  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ borderColor: 'orange', alignItems: 'center', justifyContent: 'center', borderWidth: 5, flex: 1 }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, fontSize: 18 }}>{I18n.t('messages')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderBottomColor: 'orange', borderBottomWidth: 5,borderRightColor: 'orange', borderRightWidth: 5,borderTopColor: 'orange', borderTopWidth: 5, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, fontSize: 18 }}>{I18n.t('chat')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.props.fetching == true}
                    //         onRefresh={this._reload}
                    //     />
                    // }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePromotion')}</Text>}
                    data={data}
                    renderItem={this._renderItem} />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        // profile: state.question.profile,
        // request_profile: state.question.request_profile,
        // data_amulet: state.question.amuletType,   // data request type amulet
        // request_type: state.question.request_type,  // request type
        data_amulet: state.showroom.data_amulet,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        setRequestType: () => dispatch(QuestionActions.setRequestType()),
        setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        setDetailPhra: (data) => dispatch(ShowRoomActions.setDetailPhra(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMyAmulet)