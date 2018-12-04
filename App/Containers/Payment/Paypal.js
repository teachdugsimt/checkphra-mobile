import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/PaypalStyle'

import PayPal from 'react-native-paypal-wrapper';

class Paypal extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
    PayPal.initialize(PayPal.NO_NETWORK, "AUwtvwghu-ggxeDzKl0FRRh0siucIypDHKr2IESwQ1pSCR407jYlh4rxg8A3MJ6-0PLw9lru6OLO_3pI");
    PayPal.pay({
      price: '100',
      currency: 'THB',
      description: 'เติมเหรียญ 100 บาท',
    }).then(confirm => console.log(confirm))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Paypal Container</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paypal)
