import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from '../../Redux/PaymentRedux'
import RoundedButton2 from '../../Components/RoundedButton2'
import Icon2 from "react-native-vector-icons/FontAwesome";
import Omise from 'omise-react-native';
Omise.config('pkey_test_4xmprhd0qqlcoi4mpca', '2015-11-17');
// import { CreditCardInput } from "react-native-credit-card-input";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
const { width } = Dimensions.get('window')

let obj
let Token_id = ''
let cardObj = []

class Creditcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
      money: this.props.money,
      token: null,
      type: 'credit',
      // card: null,
    }
    obj = this
  }



  static getDerivedStateFromProps(newProps, PrevState) {
    console.log(PrevState)
    console.log(newProps)
    let tmp = newProps.data_card

    // if(newProps.data_card != PrevState.)
    return {
      // card: tmp
    }
  }

  _onChange = (form) => {
    // wait check if else
    cardObj = {
      card: {
        name: form.values.name,
        number: form.values.number,
        expiration_month: form.values.expiry.slice(0, 2),
        expiration_year: form.values.expiry.slice(3, 5),
        security_code: form.values.cvc
      }
    }
    this.setState({ form })
  }

  async _onPressButton() {
    const data = await Omise.createToken(cardObj, function (statusCode, response) {
      console.log(response)
      console.log(statusCode)
    });

    this.props.checkCard(data.id)
    // Token_id = data.id
    console.log("dataToken", data);
    
    setTimeout(() => {
      this.props.navigation.goBack()
      this.props.navigation.navigate("historyAddPoint")
    }, 2000);

  }

  render() {
    // console.log(this.state.form)
    console.log(this.state.data)

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
            onPress={() => { this._onPressButton() }}
            fetching={this.props.request}
          />

        </View>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    money: state.promotion.money,
    token: state.payment.form,
    request: state.payment.request3,
    // data_card: state.payment.data_credit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setForm: (data) => dispatch(PaymentActions.setForm(data)),
    checkCard: (token) => dispatch(PaymentActions.cardRequest(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creditcard)

// 1. use MR.BLUE => นามแฝง
// 2. login 7 day get free 100 point
// 3. login at Wensday get 150 point free
// 4. edit answer only admin and give point to user
// 5. add contact to admin ( tel.no , chat box)


//EDIT REQUEST HISTORY POINT