// ==================================
// ***************** ห้องดูรายการพระแท้ทั้งหมดของฉัน ในหมวดหมู่ "พระของฉัน" *****************
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

class MyRealAmulet extends Component {


    constructor(props) {
        super(props)
        this.state = {

        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ height: 120, backgroundColor: Colors.milk, borderBottomColor: 'orange', borderBottomWidth: 1, width: '100%' }}
                onPress={() => this._goToChat(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View>
                        <Text style={{ padding: 10, color: Colors.brownTextTran, fontFamily: 'Prompt-SemiBold', fontSize: 18 }}>{item.name}</Text>
                        <Text style={{ padding: 10, color: Colors.brownTextTran, fontSize: 14 }}>{item.date}</Text>
                    </View>

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => this.popupDialog.show()}>
                        <Icon2
                            style={{ marginRight: 20 }}
                            name={'pencil-square-o'}
                            size={30}
                            color={'black'} />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        )
    }

    _goToChat = (item) => {
        this.props.setDetailPhra(item)
        this.props.navigation.navigate('chatMyAmulet')
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        const data = [{ name: 'no1.', date: '24/12/18' },
        { name: 'no2', date: '24/12/18' },
        { name: 'no3', date: '24/12/18' },
        { name: 'no4.', date: '24/12/18' }]
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

                <PopupDialog
                    dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                        fontSize: 18, fontWeight: 'bold'
                    }}>{I18n.t('editDetailPhra')}</Text></View>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    width={width / 1.05}
                    height={height / 2}
                    // height={150}
                    onDismissed={() => { this.setState({}) }} >

                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ height: 10 }}>
                            </View>

                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 5, height: 70 }} onPress={() => this.popupDialog.dismiss()}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.brownTextTran }}>{I18n.t('ok')}</Text>
                            </TouchableOpacity>

                            <View style={{ height: 15 }}>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRealAmulet)