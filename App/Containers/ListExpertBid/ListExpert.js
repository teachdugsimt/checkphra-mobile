import React, { Component } from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Dimensions, AsyncStorage,
    TextInput, Linking, ImageBackground, Image, Platform, Alert, FlatList, RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon2 from "react-native-vector-icons/FontAwesome";
import I18n from '../../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import styles from '../Styles/HomeScreenStyle'
import QuestionActions from '../../Redux/QuestionRedux'
import AuthActions from '../../Redux/AuthRedux'
import VersatileActions from '../../Redux/VersatileRedux'
import ExpertActions from '../../Redux/ExpertRedux'
I18n.fallbacks = true;
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
class ListExpert extends Component {

    componentDidMount() {
        this.props.getListExpertBid()
    }

    _reload = () => {
        this.props.getListExpertBid()
    }

    _pressList = (item) => {
        if(item.proposer == this.props.user_id){
            this.props.setDataProposer(item)
            this.props.navigation.navigate('bit')
        } else {
            this.props.setDataProposer(item)
            this.props.navigation.navigate('listExpert2')
        }
    }

    _renderItem = ({ item, index }) => {
        return (<TouchableOpacity style={{ flexDirection: 'row', height: 70, width: "100%", alignItems: 'center', backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1.5 }} onPress={() => this._pressList(item)}>
            <View style={{ width: 50, height: 50, margin: 10 }}>
                {item.profile && item.profile.img_full_link && <Image source={{ uri: item.profile.img_full_link }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                {item.profile && !item.profile.img_full_link && <Image source={Images.user} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                {!item.profile && <Image source={Images.user} style={{ width: 50, height: 50, borderRadius: 25 }} />}
            </View>
            <View style={{ marginTop: 10, marginBottom: 7.5, justifyContent: 'center' }}>
                <Text style={{ color: Colors.brownTextTran, fontFamily: "Prompt-SemiBold", fontSize: 16 }}>{item.profile && item.profile.name ? item.profile.name : 'Expert Account'}</Text>
                <Text>{I18n.t("countExpertBid") + item.count}</Text>
                {/* <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{}}>
                        <Text style={{ borderRadius: 12, paddingVertical: 2.5, paddingHorizontal: 8.5, backgroundColor: 'orange' }}>{I18n.t("countExpertChecked")}</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </TouchableOpacity >)
    }

    render() {

        return (
            <LinearGradient colors={["#FF9933", "#FFCC33"]} style={styles.container}>
                <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={this.props.request_getListExpertBid == true}
                        onRefresh={this._reload.bind(this)}
                    />}
                    data={this.props.data_getListExpertBid}
                    renderItem={this._renderItem}
                    ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,
        profile: state.question.profile,
        request_profile: state.question.request_profile,
        data_versatile: state.versatile.data_versatile,
        data_getListExpertBid: state.expert.data_getListExpertBid,
        request_getListExpertBid: state.expert.request_getListExpertBid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(QuestionActions.getProfile()),
        getNormalData: () => dispatch(VersatileActions.getNormalData()),
        saveDeviceToken: (token) => dispatch(AuthActions.saveDeviceToken(token)),
        getListExpertBid: () => dispatch(ExpertActions.getListExpertBid()),
        setDataProposer: (data) => dispatch(ExpertActions.setDataProposer(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpert)
