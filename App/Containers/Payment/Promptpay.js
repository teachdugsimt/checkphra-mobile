import React, { Component } from 'react'
import { ScrollView, Text, View, Image, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get('window')

class Promptpay extends Component {
  render() {
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{ marginTop: Metrics.doubleBaseMargin }}>

        </View>
      </LinearGradient>
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
