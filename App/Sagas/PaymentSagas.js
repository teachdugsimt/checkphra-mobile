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
import PaymentActions, { creditRequest } from '../Redux/PaymentRedux'
// import { PaymentSelectors } from '../Redux/PaymentRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

const auth = state => state.auth
const money = state => state.promotion
const slip = state => state.payment.data_point
const pack = state => state.payment.package
// const pay = state => state.payment
I18n.locale = auth.language
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
    alert(I18n.t('addCoinFailure'))
  }
}

export function* historyAddpointRequest(api, { page }) {
  if (page == 1) {
    const aut = yield select(auth)
    // console.log(page)
    if (!aut.user_id) { return }

    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getHistoryPoint, data)
    console.log(response)
    console.log('HISTORY ADD POINT')
    if (response.ok) {
      yield put(PaymentActions.historyAddpointSuccess(response.data))
    } else {
      yield put(PaymentActions.historyAddpointFailure())
      alert(I18n.t('historyFailure'))
    }
  } else {
    const aut = yield select(auth)
    // console.log(page)
    if (!aut.user_id) { return }

    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getHistoryPoint, data)
    console.log(response)
    console.log('HISTORY ADD POINT')
    if (response.ok) {
      yield put(PaymentActions.historyAddpointSuccess2(response.data))
    } else {
      yield put(PaymentActions.historyAddpointFailure2())
      alert(I18n.t('historyFailure'))
    }
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
  body.append('type', item.type)

  console.log(body)

  const response = yield call(api.sendSlip, body)

  console.log(response)
  if (response.ok) {
    yield put(PaymentActions.sendSlipSuccess(response.data))
    yield put(PaymentActions.clearRequest())
    alert(I18n.t('addCoinSuccess'))
  } else {
    alert(I18n.t('addCoinFailure2'))
    yield put(PaymentActions.sendSlipFailure())
    yield put(PaymentActions.clearRequest())
  }
}

export function* cardRequest(api, { token }) {   // OMISE / PAYPAL CREDIT 
  const aut = yield select(auth)
  const mo = yield select(money)

  const data = {
    user_id: aut.user_id,
    amount: mo.money * 100,
    currency: 'thb',
    omiseToken: token,
  }
  console.log(data)
  const response = yield call(api.creditCard, data)
  console.log(response)

  if (response.ok) {
    alert(I18n.t('addCoinSuccess2'))
    yield put(PaymentActions.cardSuccess(response.data))
    yield put(PaymentActions.clearCardRequest())
  } else {
    alert(I18n.t('addCoinFailure'))
    yield put(PaymentActions.cardFailure())
    yield put(PaymentActions.clearCardRequest())
  }
}

export function* paypalRequest55(api) {
  const aut = yield select(auth)
  // const mo = yield select(money)
  const id = yield select(pack)
  
  const data = {
    user_id: aut.user_id,
    package_id: id
  }
  console.log(data)
  const response = yield call(api.paypal, data)
  console.log(response)
  console.log('********** PAYPAL API *************')
  if(response.ok){
    alert(I18n.t('successTransaction'))
    yield put(PaymentActions.paypalSuccess(response.data))
  } else {
    yield put(PaymentActions.paypalFailure())
  }
}