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
import TradingActions from '../Redux/TradingRedux'
// import { TradingSelectors } from '../Redux/TradingRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
const auth = state => state.auth
I18n.locale = auth.language

export function* getTrading(api, { qid, message }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    qid,
    message
  }
  // console.log(qid)
  // console.log(message)
  
  // console.log(data)
  // console.log('-------------------------------------------')
  const response = yield call(api.trading, data)
  console.log(response)
  console.log('*************TRADING**************')
  // success?
  if (response.ok) {
    yield put(TradingActions.tradingSuccess(response.data))
    alert(I18n.t('BidSuc'))
  } else {
    yield put(TradingActions.tradingFailure())
    alert(I18n.t('BidFail'))
  }
}

export function* getDetail(api, { id }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    id
  }

  const response = yield call(api.getDetail, data)

  if (response.ok) {
    yield put(TradingActions.getDetailSuccess(response.data))
  } else {
    yield put(TradingActions.getDetailFailure())
  }
}

export function* getListTrade(api, { page }) {

  const aut = yield select(auth)
  if (page == 1) {
    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getListTrade, data)
    console.log(response)
    console.log('****************GET LIST TRADE*******************')
    if (response.ok) {
      yield put(TradingActions.listTradingSuccess(response.data))
    } else {
      yield put(TradingActions.listTradingFailure())
    }

  } else {
    const data = {
      user_id: aut.user_id,
      page_number: page
    }
    const response = yield call(api.getListTrade, data)
    console.log(response)
    console.log('****************GET LIST TRADE*******************')
    if (response.ok) {
      yield put(TradingActions.listTradingSuccess2(response.data))
    } else {
      yield put(TradingActions.listTradingFailure2())
    }
  }
}

export function* updateAmulet(api, { qid, status }){
  const aut = yield select(auth)
  console.log(qid)
  console.log(status)
  const data ={
    user_id: aut.user_id,
    qid,
    status
  }

  const response = yield call(api.updateStatus, data)
  console.log(response)
  console.log('===========UPDATE STATUS============')
  if(response.ok){
    yield put(TradingActions.updateSuccess(response.data))
    alert(I18n.t('sellSucc'))
  } else {
    yield put(TradingActions.updateFailure())
    alert(I18n.t('sellFail'))
  }
}
