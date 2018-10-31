import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, Dimensions, TextInput, FlatList, RefreshControl, Alert } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";
import { Colors, Images, Metrics } from '../../Themes';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import PaymentActions from '../../Redux/PaymentRedux'
import RoundedButton from '../../Components/RoundedButton'
import Icon2 from "react-native-vector-icons/FontAwesome";
import Omise from 'omise-react-native';
Omise.config('pkey_test_4xmprhd0qqlcoi4mpca', '2015-11-17');
// import { CreditCardInput } from "react-native-credit-card-input";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Spinner from 'react-native-loading-spinner-overlay';
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
      spinner: false,
    }
    obj = this
  }



  static getDerivedStateFromProps(newProps, PrevState) {
    console.log(PrevState)
    console.log(newProps)
    let tmp = newProps.data_card
    if (newProps.request3) {
      return {
        spinner: true
      }
    } else {
      return {
        spinner: false
      }
    }

    // if(newProps.data_card != PrevState.)
    return {
      // card: tmp
    }
  }

  componentWillUnmount(){
    this.props.navigation.goBack()
  }

  componentDidMount() {
    this.setState({ spinner: false })
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

  // _checkCard = ({ status, response}) =>{
  //   console.log(status)
  //   console.log(response)
  //   console.log('here FUNCTION')
  // }

  async _onPressButton() {
    const data = await Omise.createToken(cardObj, function (statusCode, response) {
      console.log(response)
      console.log(statusCode)
      // if (response.ok == false) {
      //   alert('กรุณาตรวจสอบข้อมูลบัตรเครดิต')
      // }
    });
    // const data = await Omise.createToken(cardObj, (STATUS_CODES, response) => this._checkCard(STATUS_CODES, response));

    console.log('TOKEN DATA')
    console.log(data);

    // if (this.state.form.valid == true) {
    if (this.state.form.valid == true) {
      Alert.alert(
        'Check Phra',
        'ยืนยันการทำรายการ?',
        [
          {
            text: 'ตกลง', onPress: () => {
              this.props.checkCard(data.id)
              setTimeout(() => {
                this.props.navigation.goBack()
                this.props.navigation.navigate("historyAddPoint")
              }, 2000);
            }
          },
          { text: 'ยกเลิก' }
        ]
      )
    } else {
      Alert.alert(
        'Check Phra',
        'กรุณาตรวจสอบข้อมูล',
        [
          { text: 'ตกลง' }
        ]
      )
    }
    // this.props.checkCard(data.id)
    // setTimeout(() => {
    //   this.props.navigation.goBack()
    //   this.props.navigation.navigate("historyAddPoint")
    // }, 2000);
    // } else {
    //   alert('กรุณาตรวจสอบข้อมูลบัตรเครดิต')
    // }
  }

  render() {
    console.log(this.state.form)
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

        <View style={{ marginTop: 20, width: 140, alignSelf: 'center' }}>
          <RoundedButton
            style={{ marginHorizontal: 10 }}
            title={'ตกลง'}
            onPress={() => { this._onPressButton() }}
            fetching={this.props.request}
          />

          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
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