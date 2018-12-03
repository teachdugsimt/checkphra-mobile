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
import { MessageDialog, ShareDialog } from 'react-native-fbsdk'
import { call, put, select } from 'redux-saga/effects'
import TradingActions, { sendMessage } from '../Redux/TradingRedux'
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

export function* updateAmulet(api, { qid, status }) {
  const aut = yield select(auth)
  console.log(qid)
  console.log(status)
  const data = {
    user_id: aut.user_id,
    qid,
    status
  }

  const response = yield call(api.updateStatus, data)
  console.log(response)
  console.log('===========UPDATE STATUS============')
  if (response.ok) {
    yield put(TradingActions.updateSuccess(response.data))
    alert(I18n.t('sellSucc'))
  } else {
    yield put(TradingActions.updateFailure())
    alert(I18n.t('sellFail'))
  }
}

export function* sendMessage555(api, { text }) {
  console.log(text)

  const data = {
    messaging_type: "RESPONSE",
    recipient: {
      // id: "541100422998912"
      // id: "541100422998912|YicGjkjNUUvnQwHBcUSCnSJw5XY"
      id: "316834699141900"
    },
    message: {
      text
    }
  }
  console.log(data)
  const response = yield call(api.fbmessage)
  console.log(response)
  console.log('***********TRADING MESSENGER***********')

  if (response.ok) {
    yield put(TradingActions.sendMessageSuccess(response.data))
  } else {
    yield put(TradingActions.sendMessageFailure())
  }
}

export function* sharedLeasing555(api, { qid, status }) {
  console.log(qid)
  console.log(status)
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    qid,
    leasing: status
  }

  const response = yield call(api.sharedLeasing, data)
  console.log(response)
  console.log('****************** SHARED LEASING *********************')
  
  if(response.ok){
    yield put(TradingActions.sendMessageSuccess(response.data))
  } else {
    yield put(TradingActions.sendMessageFailure())
  }
}
