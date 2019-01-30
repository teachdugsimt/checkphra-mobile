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
import Icon3 from "react-native-vector-icons/Entypo";
import * as RNIap from 'react-native-iap';
//cc-mastercard, cc-visa, cc-paypal, money, credit-card-alt
import I18n from '../I18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import QuestionActions from '../Redux/QuestionRedux'
import MarketActions from '../Redux/MarketRedux'
import styles from './Styles/HomeScreenStyle'

var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
I18n.fallbacks = true;

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
let { width, height } = Dimensions.get('window')
let count = 1
class MarketOpenstore extends Component {


    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null,
            avatarSource2: null,

            store_name: null,
            contact: null,
        }
    }

    pick = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // console.log(response)

                this.setState({
                    avatarSource: source
                });

                this.props.setImage({
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                })
            }
        });
    }

    pick2 = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // console.log(response)

                this.setState({
                    avatarSource2: source
                });

                this.props.setImage2({
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                })
            }
        });
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)
        console.log('---------------- Market Open Store ------------------')

        return {

        }
    }

    componentDidMount() {
        count = 1
        this.props.getProvince()
    }

    componentWillUnmount() {
        count = 1
    }

    // _reload = () => {
    //     count = 1
    //     this.props.getProvince(count)
    // }

    // _onScrollEndList = () => {
    //     console.log('END LIST AGAIN')
    //     if (this.props.province && this.props.province.length >= 10 && (this.props.request4 == false || this.props.request4 == null)) {
    //         count++
    //         this.props.getProvince(count)
    //     }
    // }

    // _pressList = (item) => {
    //     this.popupDialog.dismiss()
    // }

    // _renderItem = ({ item, index }) => {
    //     return (
    //         <TouchableOpacity onPress={() => this._pressList(item)}>
    //             <Text>555555KKKKK</Text>
    //         </TouchableOpacity>
    //     )
    // }

    render() {
        return (
            <LinearGradient
                colors={["#FF8C00", "#FFA500", "#FFCC33"]}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <Image source={Images.watermarkbg} style={{
                    position: 'absolute',
                    right: 0, bottom: 0,
                    width: width,
                    height: width * 95.7 / 100
                }} resizeMode='contain' />
                <View style={{ flex: 1, width: width }}>



                    <Text style={{ fontSize: 16, marginTop: 10, alignSelf: 'center' }}>{I18n.t('uploadCardPerson')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity style={{}} onPress={this.pick}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'center', borderWidth: 3,
                                borderColor: Colors.brownTextTran, borderRadius: 10, margin: 5, overflow: 'hidden', height: 150, width: 150
                            }}>
                                <Image source={this.state.avatarSource && this.props.image ? this.state.avatarSource : ''} style={{ width: '80%', height: '80%', marginTop: 8, marginHorizontal: 10 }} />
                                {!this.props.image && <Icon3
                                    name="camera"
                                    size={40}
                                    color={Colors.brownTextTran}
                                />}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={{
                                        fontFamily: 'Prompt-SemiBold', fontSize: 20, color: Colors.brownText,
                                    }}>ID card</Text>

                                    {this.props.image && < Icon3
                                        style={{ marginTop: 3.8, marginLeft: 3 }}
                                        name="squared-cross"
                                        size={22}
                                        color={Colors.brownTextTran}
                                        onPress={() => { this.props.deleteImage() }}
                                    />}
                                </View>


                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{}} onPress={this.pick2}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'center', borderWidth: 3,
                                borderColor: Colors.brownTextTran, borderRadius: 10, margin: 5, overflow: 'hidden', height: 150, width: 150
                            }}>
                                <Image source={this.state.avatarSource2 && this.props.image2 ? this.state.avatarSource2 : ''} style={{ width: '80%', height: '80%', marginTop: 8, marginHorizontal: 10 }} />
                                {!this.props.image2 && <Icon3
                                    name="camera"
                                    size={40}
                                    color={Colors.brownTextTran}
                                />}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={{
                                        fontFamily: 'Prompt-SemiBold', fontSize: 16, color: Colors.brownText,
                                    }}>card and face</Text>

                                    {this.props.image2 && < Icon3
                                        style={{ marginTop: 1.5, marginLeft: 2.5 }}
                                        name="squared-cross"
                                        size={20}
                                        color={Colors.brownTextTran}
                                        onPress={() => { this.props.deleteImage2() }}
                                    />}
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <PopupDialog
                        dialogTitle={<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, borderBottomWidth: 1, backgroundColor: 'orange' }}><Text style={{
                            fontSize: 18, fontWeight: 'bold'
                        }}>Select Province</Text></View>}
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        dialogAnimation={slideAnimation}
                        width={width / 1.15}
                        height={height / 1.6}
                        // height={150}
                        onDismissed={() => { this.setState({}) }} >
                        {/* <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.request4 == true}
                                    onRefresh={this._reload}
                                />
                            }
                            ListEmptyComponent={() => <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 20, color: '#aaa' }}>{I18n.t('nonePending')}</Text>}
                            data={this.props.province}
                            renderItem={this._renderItem}
                            onEndReached={this._onScrollEndList}
                            onEndReachedThreshold={1.0} /> */}

                        <View style={{ flex: 1 }}>
                            <Text>8888888888888888888</Text>
                        </View>

                    </PopupDialog>

                    <View style={{ alignSelf: 'center' }}>
                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('storeName') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.store_name} onChangeText={(text) => this.setState({ store_name: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>

                        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Prompt-SemiBold', alignSelf: 'center', textAlignVertical: 'center' }}>{I18n.t('contact') + " : "}</Text>
                            <TextInput underlineColorAndroid={'rgba(0,0,0,0)'} value={this.state.contact} onChangeText={(text) => this.setState({ contact: text })} style={{ width: width / 2, padding: 10, borderRadius: 10, backgroundColor: '#fff5' }}
                                placeholder={I18n.t('answerText')} />
                        </View>

                        <TouchableOpacity style={{ padding: 10, backgroundColor: '#fff5', borderRadius: 10, marginTop: 10 }} onPress={() => this.popupDialog.show()}>
                            <Text style={{ alignSelf: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 16 }}>{I18n.t('selectProvince')}</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <Spinner
                    visible={this.props.request4}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,
        image: state.market.img_store,
        image2: state.market.img_store2,

        request4: state.market.request4,  // request get province
        province: state.market.province,  // store province
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setImage: (data) => dispatch(MarketActions.setImageCardPerson(data)),
        deleteImage: () => dispatch(MarketActions.deleteImageCard()),

        setImage2: (data) => dispatch(MarketActions.setImage2(data)),
        deleteImage2: () => dispatch(MarketActions.deleteImage2()),
        // getProvince: (page) => dispatch(MarketActions.getProvince(page)),
        getProvince: () => dispatch(MarketActions.getProvince()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketOpenstore)