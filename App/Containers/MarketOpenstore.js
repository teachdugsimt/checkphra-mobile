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

class MarketOpenstore extends Component {


    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null
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
                <ScrollView style={{ flex: 1, width: width }}>


                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16 }}>{I18n.t('uploadSlip')}</Text>

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
                                    }}>Slip</Text>

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

                    </View>


                </ScrollView>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.auth.language,
        profile: state.question.profile,
        img_store: state.market.img_store,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setImage: (data) => dispatch(MarketActions.setImageCardPerson(data)),
        deleteImage: () => dispatch(MarketActions.deleteImageCard()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketOpenstore)