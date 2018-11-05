import React, { Component } from "react";
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { Images, Metrics } from '../Themes'
import AuthActions from '../Redux/AuthRedux'
import Spinner from 'react-native-loading-spinner-overlay';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/SigninScreenStyle";
import { Colors } from "../Themes";
import RoundedButton from "../Components/RoundedButton";
import I18n from '../I18n/i18n';

I18n.fallbacks = true;

let { width, height } = Dimensions.get('window')
class ForgetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            chkMail: null,
        }
    }

    validate = (text) => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            this.setState({ email: text, chkMail: false })
            return false;
        }
        else {
            this.setState({ email: text, chkMail: true })
            // console.log("Email is Correct");
        }
    }

    _forgetEmail = () => {
        if (this.state.chkMail == false) {
            alert('Please check your email')
        } else {
            this.props.forget(this.state.email)
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        I18n.locale = this.props.language ? this.props.language : 'en'
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


                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TextInput
                        style={{ borderWidth: 1, marginTop: 20, width: width - 40, height: 45, borderRadius: 5, borderColor: 'lightgrey' }}
                        numberOfLines={1}
                        onChangeText={(email) => this.validate(email)}
                        value={this.state.email}
                        placeholder={I18n.t('email')}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholderTextColor="white"
                    />


                    <View style={{
                        height: 45, width: 160, backgroundColor: Colors.button, alignSelf: "center",
                        borderRadius: 15, marginTop: 20
                    }} >
                        <TouchableOpacity onPress={this._forgetEmail}>
                            <Text
                                style={{
                                    fontFamily: "Prompt-Regular",
                                    fontSize: 20,
                                    alignSelf: "center",
                                    color: "white",
                                    marginTop: 8
                                }}
                            >
                                {I18n.t('ok')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: 45, width: 160, backgroundColor: Colors.button, alignSelf: "center",
                        borderRadius: 15, marginTop: 20
                    }} >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}>
                            <Text
                                style={{
                                    fontFamily: "Prompt-Regular",
                                    fontSize: 20,
                                    alignSelf: "center",
                                    color: "white",
                                    marginTop: 8
                                }}
                            >
                                Back to signin
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </LinearGradient>
        )
    }
}




const mapStateToProps = state => {
    return {
        //   profile: state.auth.profile,
        //   requestData: state.auth.data,
        //   fetch: state.auth.fetching,
        language: state.auth.language,
        //   error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //   setUserId: (user_id) => dispatch(AuthActions.setUserId(user_id)),
        //   signinWithCredential: (data) => dispatch(AuthActions.signinWithCredential(data)),
        //   signin: (email, password) => dispatch(AuthActions.signinRequest(email, password)),
        //   clearError: () => dispatch(AuthActions.clearError())
        // setLanguage: (language) => dispatch(AuthActions.setLanguage(language))
        forget: (email) => dispatch(AuthActions.forgetPassword(email)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgetPassword);
