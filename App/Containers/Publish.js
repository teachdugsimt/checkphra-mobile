import React, { Component } from "react";
import { Image, Dimensions, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux"
import LinearGradient from "react-native-linear-gradient";
import PromotionActions from '../Redux/PromotionRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'react-native-firebase';
// Styles
import styles from "./Styles/RegisterScreenStyle";
import { Colors, Images } from "../Themes";
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
let { width } = Dimensions.get('window')

class Publish extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        console.log(newProps)
        console.log(prevState)

        return {
            data: newProps.data_publish
        }
    }

    componentDidMount() {
        this.props.getPublish()
    }

    render() {
        I18n.locale = this.props.language
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
                <ScrollView style={{ flex: 1 }}>

                    {this.props.data_publish ? <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <Text style={{}}>{I18n.t('nonePublish')}</Text>
                    </View> : <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Text style={{}}>HAVE PUBLISH</Text>
                        </View>}

                </ScrollView>

            </LinearGradient>
        )
    }

}

const mapStateToProps = (state) => ({
    // request: state.auth.request,
    // dataRegister: state.auth.dataRegister,
    // request2: state.auth.request2,
    language: state.auth.language,
    data_publish: state.promotion.data_publish,
});

const mapDispatchToProps = (dispatch) => ({
    // signup: (id, password) => dispatch(AuthActions.signup(id, password)),
    // createUser: (email, uid) => dispatch(AuthActions.createUser(email, uid))
    getPublish: () => dispatch(PromotionActions.publishRequest()),
});

export default compose(
    // firebaseConnect(), // withFirebase can also be used
    connect(mapStateToProps, mapDispatchToProps)
)(Publish);
