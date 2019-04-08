// ==================================
// ***************** ห้องดูรายการข้อความของพระ... และไปห้องแชทรวมพระ... ในหมวด "พระของฉัน" *****************
// ==================================
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
import moment from 'moment'
import 'moment/locale/th'
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
let count = 1
class ChatMyAmulet extends Component {

    _renderItem = ({ item, index }) => {
        let date = moment.unix(item.updated_at).format("DD MMM YYYY (HH:mm)")
        return (
            <TouchableOpacity style={{ height: 80, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={() => this._goToChat(item)}>
                <View style={{ flexDirection: 'row' }}>
                    {item.profile.facebook_id && <Image source={{ uri: 'https://graph.facebook.com/' + item.profile.facebook_id + '/picture?width=500&height=500' }} style={{ width: 60, height: 60, borderRadius: 10, margin: 10 }} />}
                    {item.profile.facebook_id == null && item.profile.image && <Image source={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/core-profile/images/' + item.profile.image }} style={{ width: 60, height: 60, borderRadius: 10, margin: 10 }} />}
                    {item.profile.facebook_id == null && !item.profile.image && <Image source={Images.user} style={{ width: 60, height: 60, borderRadius: 10, margin: 10 }} />}
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.profile.fullname}</Text>
                        <Text style={{ color: Colors.brownTextTran, fontSize: 14 }}>{date}</Text>
                    </View>
                </View>

                
                    <Icon2 name={'chevron-right'} size={30} style={{ alignSelf: 'center', marginRight: 15 }} />
               
            </TouchableOpacity>
        )
    }

    static getDerivedStateFromProps(newProps, prevState){
        console.log(newProps)
        console.log(prevState)
        console.log('---------------  LIST CHAT MY AMULET ----------------')
        return {

        }
    }

    _goToChat = (item) => {
        // this.props.setDetailPhra(item)
        // this.props.navigation.navigate('')
        this.props.setDataGroupChat(item)
        this.props.navigation.navigate('chatRoomMyAmuletSolo')
    }

    componentDidMount() {
        count = 1
        this.props.getMyMessageFromOther(count)
    }

    componentWillUnmount() {
        count = 1
        this.props.clearDataListMyMessageFromOtherPerson()
    }

    _reload = () => {
        count = 1
        this.props.getMyMessageFromOther(count)
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_myMessageFromOther && this.props.data_myMessageFromOther.length >= 10 && (this.props.request7 == false || this.props.request7 == null)) {
            count++
            this.props.getMyMessageFromOther(count)
        }
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        console.log('------------ SEE LIST OTHER PERSON MESSAGE TO ME ----------------')
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

                <View style={{ height: 40, backgroundColor: Colors.milk, }}>
                    <TouchableOpacity style={{ borderColor: 'orange', borderWidth: 5, alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => this.props.navigation.navigate("chatRoomMyAmulet")}>
                        <Text style={{ fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, fontSize: 18 }}>{I18n.t('chat')}</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.request7 == true}
                            onRefresh={this._reload}
                        />
                    }
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                    data={this.props.data_myMessageFromOther}
                    renderItem={this._renderItem}
                    onEndReached={this._onScrollEndList}
                    onEndReachedThreshold={1.0} />
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

        request7: state.showroom.request7,  // request for get data my real amulet message from other person ( Chat Solo )
        data_myMessageFromOther: state.showroom.data_myMessageFromOther,  // data for store my message from other person ( Chat Solo )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAmuletType: () => dispatch(QuestionActions.getAmuletType()),
        setRequestType: () => dispatch(QuestionActions.setRequestType()),
        setAmuletType: (data) => dispatch(ShowRoomActions.setAmuletType(data)),
        setDetailPhra: (data) => dispatch(ShowRoomActions.setDetailPhra(data)),
        getMyMessageFromOther: (page) => dispatch(ShowRoomActions.getMyMessageFromOther(page)),
        setDataGroupChat: (data) => dispatch(ShowRoomActions.setDataGroupChat(data)),
        clearDataListMyMessageFromOtherPerson: () => dispatch(ShowRoomActions.clearDataListMyMessageFromOtherPerson()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMyAmulet)