/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import PaymentActions from '../Redux/PaymentRedux'
// import { PaymentSelectors } from '../Redux/PaymentRedux'
const auth = state => state.auth

export function* paymentRequest(api, { money, type }) {
  console.log(money)
  console.log(type)
  console.log('MONEY AND TYPE')

  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    price: money,
    type: type,
  }

  const response = yield call(api.payment, data)
  console.log(response)
  console.log('PAYMENT')

  if (response.ok) {
    yield put(PaymentActions.paymentSuccess(response.data))
  } else {
    yield put(PaymentActions.paymentFailure())
    alert('เติมเงินล้มเหลว กรุณาทำรายการใหม่')
  }
}
