import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";

import { CreditCardInput } from "react-native-credit-card-input";

const { width } = Dimensions.get('window')


class Creditcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {}
    }
  }

  _onChange = (form) => {
    this.setState({ form })
  }

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
          <CreditCardInput onChange={this._onChange} requiresName={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Creditcard)
