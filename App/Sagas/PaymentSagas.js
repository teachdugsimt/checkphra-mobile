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
const slip = state => state.payment.data_point
// const pay = state => state.payment

export function* paymentRequest(api, { data }) {

  const aut = yield select(auth)

  if (!aut.user_id) { return }

  const data2 = {
    user_id: aut.user_id,
    price: data.money,
    type: data.type,
  }

  const response = yield call(api.payment, data2)
  // console.log(response)
  // console.log('PAYMENT')

  if (response.ok) {
    yield put(PaymentActions.paymentSuccess(response.data))
  } else {
    yield put(PaymentActions.paymentFailure())
    alert('เติมเงินล้มเหลว กรุณาทำรายการใหม่')
  }
}

export function* historyAddpointRequest(api, { page }) {
  const aut = yield select(auth)
  // console.log(page)
  if (!aut.user_id) { return }

  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getHistoryPoint, data)
  // console.log(response)
  // console.log('HISTORY ADD POINT')
  if (response.ok) {
    yield put(PaymentActions.historyAddpointSuccess(response.data))
  } else {
    yield put(PaymentActions.historyAddpointFailure())
    alert('ร้องขอประวัติล้มเหลว')
  }

}

export function* sendSlipRequest(api, { item }) {
  
  const sl = yield select(slip)

  let body = new FormData()

  body.append('user_id', item.user_id)
  body.append('price', item.price)
  body.append('bank', item.bank)
  body.append('date', item.date)
  body.append('file', item.file)
  body.append('type', sl.type)

  const response = yield call(api.sendSlip, body)

  console.log(response)
  if (response.ok) {
    yield put(PaymentActions.sendSlipSuccess(response.data))
    alert('แจ้งโอนเงินสำเร็จ')
  } else {
    alert('แจ้งโอนเงินล้มเหลว')
    yield put(PaymentActions.sendSlipFailure())
  }
}