import React, { Component } from 'react'
import { ScrollView, Text, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LinearGradient from "react-native-linear-gradient";
// Styles
import Spinner from 'react-native-loading-spinner-overlay';
import PaymentActions from '../../Redux/PaymentRedux'
import styles from '../Styles/PaypalStyle'
import { Colors, Images, Metrics } from '../../Themes';
import PayPal from 'react-native-paypal-wrapper';

import I18n from '../../I18n/i18n';
I18n.fallbacks = true;
const { width } = Dimensions.get('window')


class Paypal extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {

    // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
    PayPal.initialize(PayPal.NO_NETWORK, "AUwtvwghu-ggxeDzKl0FRRh0siucIypDHKr2IESwQ1pSCR407jYlh4rxg8A3MJ6-0PLw9lru6OLO_3pI");
    PayPal.pay({
      // price: '100',
      // currency: 'THB',
      // description: 'เติมเหรียญ 100 บาท',
      price: this.props.money.toString(),
      currency: 'THB',
      description: `Add ${this.props.money} coins by paypal`.toString()
    }).then(confirm => {
      console.log(confirm)
      if (confirm.response.state == 'approved') {
        this.props.paypal()
        this.props.navigation.goBack()
        this.props.navigation.navigate("historyAddPoint")
      }
      console.log('********** CONFIRM PAYPAL *************')
    })
      .catch(error => {
        alert(I18n.t('failureTransaction'))
        console.log(error)
        console.log('************** ERROR PAYPAL ***************')
      });
  }

  render() {
    // console.log(this.props.money)
    // console.log('***************PAYPAL PAGE**************')
    return (
      <LinearGradient
        colors={["#FF9933", "#FFCC33"]} style={{ flex: 1 }}
      >
        <Image source={Images.watermarkbg} style={styles.imageBackground} resizeMode='contain' />
        <ScrollView style={styles.container}>
          <Text style={styles.paypalText}>Paypal Container</Text>
          <Spinner
            visible={this.props.request == true}
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
          />
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    money: state.promotion.money,
    language: state.auth.language,
    request: state.payment.request4,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkCard: (token) => dispatch(PaymentActions.cardRequest(token)),
    paypal: () => dispatch(PaymentActions.paypalRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paypal)
