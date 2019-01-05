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
import { messaging } from 'react-native-firebase';
I18n.fallbacks = true;
// I18n.currentLocale('th');
// I18n.locale = 'th'  // true
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class ChatTheirAmulet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hide: false,
            text: null,
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)


    }


    componentWillUnmount() {
        this.setState({ text: null })
    }

    _sendMessage = () => {
        console.log('send message complete')
        console.log(this.state.text)
        this.props.sendMessageTheirAmulet(this.props.data_their.id, this.state.text)
        this.setState({ text: null })
    }




    componentDidMount() {
        this.props.getMessageTheirAmulet(this.props.data_their.id)
        count = 1
    }

    componentWillUnmount() {
        count = 1
    }

    _reload = () => {
        count = 1
        this.props.getListAmuletReal(count)
    }

    _onScrollEndList = () => {
        console.log('END LIST AGAIN')
        if (this.props.data_messageTheirAmulet && this.props.data_messageTheirAmulet.length >= 10 && (this.props.request3 == false || this.props.request3 == null)) {
            count++
            this.props.getListAmuletReal(count)
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                {item.messages.map((e, i) => {  //myArray.slice(0).reverse().map(
                    return (
                        <View style={{
                            backgroundColor: '#FCF3CF', marginVertical: 2.5, marginHorizontal: 2.5,
                            borderRadius: 10, flexDirection: 'row', alignSelf: e.uid == this.props.user_id ? 'flex-end' : 'flex-start'
                        }}><Text style={{ marginVertical: 5, marginHorizontal: 8, fontSize: 15 }}>{e.message}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }



    render() {
        I18n.locale = this.props.language
        // console.log(this.props.data_amulet)
        console.log(this.props.data_their)
        console.log('--------------------- ChatTheirAmulet DATA -------------------------')
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
                    {this.state.hide == false && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', height: 135, width: '100%' }} onPress={() => this.setState({ hide: true })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8, marginHorizontal: 8, flex: 1 }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <View style={{ backgroundColor: 'red', height: 85, width: 85, borderRadius: 15 }}></View>
                            </View>

                            <View style={{ marginHorizontal: 15, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Name: <Text style={{ fontSize: 14 }}>Phra Pidta5555588</Text></Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Price: <Text style={{ fontSize: 14 }}>750,000 </Text>฿ </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Priest Name: <Text style={{ fontSize: 14 }}>LuangPhor Ngern</Text></Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran }}>Temple: <Text style={{ fontSize: 14 }}>Wat Mai Phin Greaw</Text></Text>
                            </View>
                        </View>

                        <Icon2 size={22} name={'chevron-up'} style={{ alignSelf: 'center', marginVertical: 2.5 }} />
                    </TouchableOpacity>}

                    {this.state.hide && <TouchableOpacity style={{ backgroundColor: '#FFEFD5', width: '100%' }} onPress={() => this.setState({ hide: false })}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Prompt-SemiBold', color: Colors.brownTextTran, marginTop: 10, marginBottom: 1, alignSelf: 'center' }}>Phra Pidta</Text>
                        <Icon2 size={22} name={'chevron-down'} style={{ alignSelf: 'center', marginBottom: 2.5 }} />
                    </TouchableOpacity>}



                    {/* <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Chat Room My Amulet Solo </Text> */}


                </View>

                {/* ++++++++++++++++++++++++++++++++++++ MESSENGER ZONE ++++++++++++++++++++++++++++++++++++ */}
            
                <View style={{ marginTop: 5 }}></View>
                <FlatList
                    data={this.props.data_messageTheirAmulet}
                    renderItem={this._renderItem}
                // onEndReached={this._onScrollEndList}
                // onEndReachedThreshold={1.2}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.props.request3 == true}
                //         onRefresh={this._reload}
                //     />
                // }
                />
                <View style={{ marginBottom: 10 }}>
                </View>
                {/*++++++++++++++++++++++++++++++++++++ MESSENGER ZONE ++++++++++++++++++++++++++++++++++++*/}
                <View style={{ height: 35 }}>
                    <TextInput style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: '#fff5', height: 40 }}
                        value={this.state.text} onChangeText={(text) => this.setState({ text })} />
                </View>


                {this.state.text && this.state.text != null && <TouchableOpacity style={{ position: 'absolute', right: 5, bottom: 10 }} onPress={this._sendMessage}>
                    <Icon2 name={'arrow-right'} size={22} style={{}} />
                </TouchableOpacity>}

                <Spinner
                    visible={this.props.request2}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }} />
            </LinearGradient>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        user_id: state.auth.user_id,

        data_their: state.showroom.data_their,  // data set to this page (ChatTheirAmulet)

        request2: state.showroom.request2,  //  request send message of their amulet 
        data_sendMessageTheirAmulet: state.showroom.data_sendMessageTheirAmulet,  // request send message of their amulet

        request3: state.showroom.request3,  // request for get message of this room
        data_messageTheirAmulet: state.showroom.data_messageTheirAmulet, // request for get message of this room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessageTheirAmulet: (qid, message) => dispatch(ShowRoomActions.sendMessageTheirAmulet(qid, message)),
        getMessageTheirAmulet: (qid) => dispatch(ShowRoomActions.getMessageTheirAmulet(qid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTheirAmulet)