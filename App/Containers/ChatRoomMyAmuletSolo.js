// ==================================
// ***************** ห้องแชทรวม ในหมวด "พระของฉัน" *****************
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

class ChatRoomMyAmuletSolo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hide: false
        }
    }

    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)

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
                <View>
                    {this.state.hide == false && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', height: 120, width: '100%' }} onPress={() => this.setState({ hide: true })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 8, flex: 1 }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <View style={{ backgroundColor: 'red', height: 85, width: 85, borderRadius: 15 }}></View>
                            </View>

                            <View style={{ marginHorizontal: 15, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Name: <Text style={{ fontSize: 14 }}>Phra Pidta</Text></Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Price: <Text style={{ fontSize: 14 }}>750,000 </Text>฿ </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Priest Name: <Text style={{ fontSize: 14 }}>LuangPhor Ngern</Text></Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Temple: <Text style={{ fontSize: 14 }}>Wat Mai Phin Greaw</Text></Text>
                            </View>
                        </View>

                    </TouchableOpacity>}

                    {this.state.hide && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', width: '100%' }} onPress={() => this.setState({ hide: false })}>
                     <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginVertical: 15, alignSelf: 'center' }}>Phra Pidta</Text>
                    </TouchableOpacity>}



                    <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Chat Room My Amulet Solo </Text>
                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomMyAmuletSolo)