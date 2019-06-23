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
const expert = state => state.expert
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
  const exp = yield select(expert)
  const aut = yield select(auth)
  if (page == 1) {
    const data = {
      user_id: aut.user_id,
      page_number: page,
      proposer_uid: exp.tmp_proposer.proposer
    }

    const response = yield call(api.getDetailExpertBid, data) //getDetailExpertBid
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
      page_number: page,
      proposer_uid: exp.tmp_proposer.proposer
    }
    const response = yield call(api.getDetailExpertBid, data) //getDetailExpertBid
    console.log(response)
    console.log('****************GET LIST TRADE*******************')
    if (response.ok) {
      yield put(TradingActions.listTradingSuccess2(response.data))
    } else {
      yield put(TradingActions.listTradingFailure2())
    }
  }
}

export function* getListTrade2(api, { page }) {
  const aut = yield select(auth)
  if (page == 1) {
    const data = {
      user_id: aut.user_id,
      page_number: page,
    }

    const response = yield call(api.getListTrade, data) //getDetailExpertBid
    console.log(response)
    console.log('=========================GET LIST TRADE USER !! =========================***')
    if (response.ok) {
      yield put(TradingActions.listTradingSuccessu(response.data))
    } else {
      yield put(TradingActions.listTradingFailureu())
    }

  } else {
    const data = {
      user_id: aut.user_id,
      page_number: page,
    }
    const response = yield call(api.getListTrade, data) //getDetailExpertBid
    console.log(response)
    console.log('=========================GET LIST TRADE USER !! =========================***')
    if (response.ok) {
      yield put(TradingActions.listTradingSuccessu2(response.data))
    } else {
      yield put(TradingActions.listTradingFailureu2())
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
  // Gr4ZemIdAGMKh3R8xv5t9jp4EFN2

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

  if (response.ok) {
    yield put(TradingActions.sendMessageSuccess(response.data))
  } else {
    yield put(TradingActions.sendMessageFailure())
  }
}

export function* getPriceallday(api) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id
  }

  const response = yield call(api.getPriceLeasing, data)
  console.log(response)
  console.log('**************** GET PRICE ALL LEASING OF ADMIN ****************')
  if (response.ok) {
    yield put(TradingActions.getPriceSuccess(response.data))
  } else {
    yield put(TradingActions.getPriceFailure())
  }
}

export function* getListLeasing(api, { page }) {
  const aut = yield select(auth)
  if (page == 1) {
    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getListLeasing, data)
    console.log(response)
    console.log('**************** GET LIST LEASING OF ADMIN ****************')

    if (response.ok) {
      yield put(TradingActions.getLeasingSuccess(response.data))
    } else {
      yield put(TradingActions.getLeasingFailure())
    }

  } else {
    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getListLeasing, data)
    console.log(response)
    console.log('**************** GET LIST LEASING OF ADMIN ****************')

    if (response.ok) {
      yield put(TradingActions.getLeasingSuccess2(response.data))
    } else {
      yield put(TradingActions.getLeasingFailure2())
    }
  }
}


export function* wantToBuy(api, { qid, interest }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    qid,
    interested: interest
  }

  const response = yield call(api.wantToBuy, data)
  console.log(response)
  console.log('===================WANT TO BUY API ====================')
  if (response.ok) {
    yield put(TradingActions.wantSuccess())
  } else {
    yield put(TradingActions.wantFailure())
  }
}


export function* addDetailCertificateRequest(api, { qid, amuletName, temple, image, ownerName }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    qid,
    amuletName,
    temple,
    image,
    ownerName
  }

  const response = yield call(api.addDetailCertificate, data)
  console.log(response)
  console.log('================ ADD DETAIL CERTIFICATE ================')
  if (response.ok) {
    yield put(TradingActions.addDetailCertificateSuccess(response.data))
  } else {
    yield put(TradingActions.addDetailCertificateFailure())
  }
}

export function* getListCerfromUserRequest(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListCerFromUser, data)
  console.log(response)
  console.log('=================== GET LIST CERTIFICATE (ADMIN) ====================')

  if (response.ok) {
    yield put(TradingActions.getListCerFromUserSuccess(response.data))
  } else {
    yield put(TradingActions.getListCerFromUserFailure())
  }
}

export function* activeCerRequest(api, { qid, amuletName, temple }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    qid,
    amuletName,
    temple
  }

  const response = yield call(api.activeCertificate, data)
  console.log(response)
  console.log('================ ACTIVE CERTIFICATE ================')

  if (response.ok) {
    yield put(TradingActions.activeCertificateSuccess(response.data))
    alert(I18n.t('sellSucc'))
  } else {
    yield put(TradingActions.activeCertificateFailure())
    alert(I18n.t('sellFail'))
  }
}