import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from '../../Redux/PaymentRedux'
import RoundedButton2 from '../../Components/RoundedButton2'
import Icon2 from "react-native-vector-icons/FontAwesome";
import Omise from 'omise-react-native';
Omise.config('pkey_test_5doxpm6drkzstcuya7r', '2015-11-17');
// import { CreditCardInput } from "react-native-credit-card-input";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
const { width } = Dimensions.get('window')

let obj
let Token_id = ''

class Creditcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
      money: this.props.money,
      // useLiteCreditCardInput: false
      token: null,
      type: 'credit',
      // a = {
      //   card: {
      //     name: 'FUCKER',
      //     number: 4242424242424242,
      //     expiration_month: 10,
      //     expiration_year: 2018,
      //     security_code: 433
      //   }
      // }
      cvv: 433,
      name: 'tuntikorn',
      month: 10,
      year: 2018,
      number: 4242424242424242
    }
    obj = this
  }



  static getDerivedStateFromProps(newProps, PrevState) {
    console.log(newProps)
    console.log(PrevState)
    return {

    }
  }

  _onChange = (form) => {
    // let a = {
    //   card: {
    //     name: this.state.form.values.name ? this.state.form.values.name : '',
    //     number: this.state.form.values.number ? this.state.form.values.number : '',
    //     expiration_month: this.state.form.values.expiry.slice(0, 2) ? this.state.form.values.expiry.slice(0, 2) : '',
    //     expiration_year: this.state.form.values.expiry.slice(3, 5) ? 20 + (this.state.form.values.expiry.slice(3, 5)) : '',
    //     security_code: this.state.form.values.cvc ? this.state.form.values.cvc : ''
    //   }
    // }
    // this.setState({ form, a })
    this.setState({ form })
  }

  //   async componentWillMount() {
  //   const data = await Omise.createToken({
  //     'card': {
  //       'name': this.state.form.values.name,
  //       'city': '',
  //       'postal_code': this.state.form.values.postalCode,
  //       'number': this.state.form.values.number,
  //       'expiration_month': this.state.form.values.expiry.slice(0,2),
  //       'expiration_year': 20+(this.state.form.values.expiry.slice(3,5)),
  //       'security_code': this.state.form.values.cvc
  //     }
  //   });
  //   console.log("data", data);
  // }

  async _onPressButton() {

    // let a = {
    //   card: {
    //     name: 'HONNN',
    //     number: 4242424242424242,
    //     expiration_month: 10,
    //     expiration_year: 2018,
    //     security_code: 432,
    //   }
    // }
    const cardObj = {
      card: {
        name: 'HONNN',
        number: 4242424242424242,
        expiration_month: 10,
        expiration_year: 2018,
        security_code: 432,
      }
    }
    const data = await Omise.createToken(cardObj);
    console.log("data", data);


    // const data = await Omise.createToken({
    //   'card': {
    //     'name': 'JOE DHON',
    //     'number': 4242424242424242,
    //     'expiration_month': 10,
    //     'expiration_year': 2018,
    //     'security_code': 432
    //   }
    // }, function (statusCode, response) {
    //   // console.log(response.id)
    //   // console.log(statusCode)
    //   Token_id = response.id
    //   this.setState({ token: response.id })
    //   obj.checkOut()
    // });

    // console.log("data", data);
  }

  // saveAndLinkData = () => {                              //////////////////////////////////////////////////////
  //   // let data = {
  //   //   money: this.state.money,
  //   //   type: this.state.type
  //   // }
  //   // this.props.paymentBanking(data)
  //   this.props.navigation.goBack()
  //   this.props.navigation.navigate("historyAddPoint")
  // }

  // _onPressButton = () => {                              //////////////////////////////////////////////////////
  //   Alert.alert(
  //     'Check Phra',
  //     'กรุณาแจ้งสลิปในหน้าประวัติการเติมเงิน',
  //     [
  //       { text: 'ตกลง', onPress: this.saveAndLinkData }
  //     ],
  //     { cancelable: false }
  //   )
  // }

  render() {
    console.log(this.state.form)
    // console.log(this.state.token)

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

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <RoundedButton2
            style={{ marginHorizontal: 10, width: 140 }}
            text={'ตกลง'}
            onPress={this._onPressButton}
          />

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
    money: state.promotion.money,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getPromotion: () => dispatch(PromotionActions.promotionRequest()),
    setForm: (data) => dispatch(PaymentActions.setForm(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creditcard)

