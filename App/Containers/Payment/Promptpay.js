import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";

class Promptpay extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            fontSize: 18,
                            fontFamily: "Prompt-SemiBold",
                            color: Colors.brownText
                        }}
                    >
                        {"< กลับ "}
                    </Text>
                    <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: "Prompt-SemiBold", color: Colors.brownText }}>Promptpay</Text>
                </TouchableOpacity>
            )
        };
    };
    render(){
        return(
            <View>
                <Text style={{ alignSelf: 'center' }}>PROMPTPAY PAGE</Text>
                </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // promotion: state.promotion.data,
        // fetching: state.promotion.fetching,
        // profile: state.question.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getPromotion: () => dispatch(PromotionActions.promotionRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promptpay)