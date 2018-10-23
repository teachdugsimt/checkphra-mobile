import React, { Component } from 'react'
import { ScrollView, Text, View, Image, Dimensions, TextInput, FlatList, RefreshControl, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PromotionActions from '../../Redux/PromotionRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";
import PaymentActions from '../../Redux/PaymentRedux'

const { width } = Dimensions.get('window')

class Promptpay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      money: this.props.money,
      type: 'promptpay',
    }
  }

  saveAndLinkData = () => {
    let data = {
      money: this.state.money,
      type: this.state.type
    }
    this.props.paymentBanking(data)
    this.props.navigation.goBack()
    this.props.navigation.navigate("historyAddPoint")
  }

  _pressButton = () => {
    Alert.alert(
      'Check Phra',
      'กรุณาแจ้งสลิปในหน้าประวัติการเติมเงิน',
      [
        { text: 'ตกลง', onPress: this.saveAndLinkData }
      ],
      { cancelable: false }
    )

  }

  render() {
    console.log(this.props.money)
    return (
      <LinearGradient colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}>
        <Image source={Images.watermarkbg} style={{
          position: 'absolute',
          right: 0, bottom: 0,
          width: width,
          height: width * 95.7 / 100
        }} resizeMode='contain' />
        <View style={{ marginTop: Metrics.doubleBaseMargin }}>
          <Text style={{ fontSize: 16, alignSelf: 'center' }}>รหัส Promptpay</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }} >092-981-8252</Text>

          {/* <TextInput
            value={this.state.money}
            onChangeText={(text) => { this.setState({ money: text }) }}
            keyboardType={'numeric'}
            numberOfLines={1}
            style={{ margin: 5, borderRadius: 12, width: '65%', alignSelf: 'center' }}
            placeholder={'กรุณาใส่จำนวนเงินที่ต้องการเติม'} /> */}

          <View style={{ width: '65%', alignSelf: 'center', marginTop: 10 }}>
            <RoundedButton
              style={{ marginHorizontal: 10 }}
              title={`ตกลง`}
              onPress={this._pressButton}  // can use
              // onPress={() => this._pressButton}  // can use
              fetching={this.props.fetching}
            />
          </View>
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
    fetching: state.payment.fetching,
    money: state.promotion.money,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getPromotion: () => dispatch(PromotionActions.promotionRequest()),
    paymentBanking: (data) => dispatch(PaymentActions.paymentRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promptpay)
