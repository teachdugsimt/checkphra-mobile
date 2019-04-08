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
import MarketActions, { getListMyMarket, requestAllTypeAmulet } from '../Redux/MarketRedux'
// import { MarketSelectors } from '../Redux/MarketRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
const auth = state => state.auth
const image = state => state.market
I18n.locale = auth.language

// export function* getTypeAmuletRequest(api) {
//   const aut = yield select(auth)

//   const response = yield call(api.getTypeMarket, aut.user_id)
//   console.log(response)
//   console.log('============ GET TYPE MARKET =============')

//   if (response.ok) {
//     yield put(MarketActions.getListTypeAmuletSuccess(response.data))
//   } else {
//     yield put(MarketActions.getListTypeAmuletFailure())
//   }

// }

export function* getTypeAmuletRequest(api, { geo_id }) {   // here api get group amulet
  const aut = yield select(auth)
  let data

  data = {
    user_id: aut.user_id,
    geo_id
  }

  const response = yield call(api.getTypeMarket, data)
  console.log(response)
  console.log('============ GET GROUP TYPE Amulet IN MARKET =============')

  if (response.ok) {
    yield put(MarketActions.getListTypeAmuletSuccess(response.data))
  } else {
    yield put(MarketActions.getListTypeAmuletFailure())
  }
}

export function* getTypeAmuletRequest2(api, { geo_id }) {   // here api get group amulet
  const aut = yield select(auth)
  let data

  data = {
    user_id: aut.user_id,
    geo_id
  }

  const response = yield call(api.getTypeMarket, data)
  console.log(response)
  console.log('============ GET GROUP TYPE Amulet IN MARKET 2222222 =============')

  if (response.ok) {
    yield put(MarketActions.getListTypeAmuletSuccess2(response.data))
  } else {
    yield put(MarketActions.getListTypeAmuletFailure2())
  }
}

export function* requestAllTypeAmulet55(api) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    geo_id: "all"
  }

  const response = yield call(api.getTypeMarket, data)
  console.log(response)
  console.log('============= GET ALL TYPE AMULET ==============')
  if (response.ok) {
    yield put(MarketActions.requestAllSuccess(response.data))
  } else {
    yield put(MarketActions.requestAllFailure())
  }
}

export function* sendDataAmuletForMarket(api) {
  const aut = yield select(auth)
  const img = yield select(image)

  const response = yield call(api.sendDataAmuletMarket, img.maindata.name, img.maindata.temple, img.maindata.price, img.maindata.owner, img.maindata.contact, img.maindata.type, aut.user_id, img.data_image)
  // const response = yield call(api.sendDataAmuletMarket, name, temple, price, owner, contact, zone, type, aut.user_id, img.data_image)
  console.log(response)
  console.log('============= SEND DATA AMULET TO MY MARKET ==============')

  if (response.ok) {
    yield put(MarketActions.sendDataAmuletMarketSuccess(response.data))
    yield put(MarketActions.clearImageMarket())
    alert(I18n.t('succ'))
  } else {
    yield put(MarketActions.sendDataAmuletMarketFailure())
    yield put(MarketActions.clearImageMarket())
    alert(I18n.t('fail'))
  }
}

export function* sendDataAmuletForMarket2(api) {
  const aut = yield select(auth)
  const img = yield select(image)  // state.market

  const data = {
    user_id: aut.user_id,
    type: img.maindata2.type,
    // zone_id: img.maindata2.zone,
    qid: img.tmp_upload.id,
    price: img.maindata2.price,
    owner: img.maindata2.owner,
    contact: img.maindata2.contact,
    amuletName: img.maindata2.name,
    temple: img.maindata2.temple,
  }

  const response = yield call(api.sendDataAmuletMarket2, data)
  console.log(response)
  console.log('============= SEND DATA AMULET MARKET 222 ==============')

  if (response.ok) {
    yield put(MarketActions.sendDataAmuletMarketSuccess2(response.data))
    // yield put(MarketActions.clearImageMarket())
    alert(I18n.t('successTransaction'))
  } else {
    yield put(MarketActions.sendDataAmuletMarketFailure2())
    // yield put(MarketActions.clearImageMarket())
    alert(I18n.t('failureTransaction'))
  }
}

export function* getListAreaAmuletRequest(api, { page }) {
  const aut = yield select(auth)
  const img = yield select(image)
  const data = {
    user_id: aut.user_id,
    zone_id: img.zone,
    type: img.pro_id,
    province_id: null, // don't use
    page_number: page,
  }

  const response = yield call(api.getListAreaAmulet, data)

  console.log(response)
  console.log('=============== GET LIST SKIN * ZONE AMULET ================')

  if (response.ok) {
    yield put(MarketActions.getListAreaAmuletSuccess(response.data))
  } else {
    yield put(MarketActions.getListAreaAmuletFailure())
  }
}

export function* getProvinceRequest(api) {
  // const data = {
  //   page_number: page
  // }
  // const response = yield call(api.getProvince, data)

  const response = yield call(api.getProvince)
  // const response = yield call(api.getProvince)
  console.log(response)
  console.log('============= GET PROVINCE 5558 ==============')

  if (response.ok) {
    yield put(MarketActions.getProvinceSuccess(response.data))
  } else {
    yield put(MarketActions.getProvinceFailure())
  }
}

export function* openStoreRequest(api, { store_name, province_id, img1, img2, contact }) {
  const aut = yield select(auth)
  let body = new FormData()
  body.append('user_id', aut.user_id)
  body.append('store_name', store_name)
  body.append('province_id', province_id)
  body.append('images[0]', img1)
  body.append('images[1]', img2)
  body.append('contact', contact)

  const response = yield call(api.openStore, body)
  console.log(response)
  console.log('=============== OPEN STORE ================')
  if (response.ok) {
    yield put(MarketActions.openStoreSuccess(response.data))
    alert(I18n.t('storeSuccess'))
  } else {
    yield put(MarketActions.openStoreFailure())
    alert(I18n.t('failureTransaction'))
  }
}

export function* getListMyMarketRequest(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListMarketMyAmulet, data)

  console.log(response)
  console.log('================ GET LIST MY AMULET IN MARKET ==================')
  if (response.ok) {
    yield put(MarketActions.getListMyMarketSuccess(response.data))
  } else {
    yield put(MarketActions.getListMyMarketFailure())
  }
}

export function* getRegionRequest(api, { geo_id }) {
  const data = {
    geo_id
  }

  const response = yield call(api.getRegion, data)

  console.log(response)
  console.log('============ GET REGION ==============')

  if (response.ok) {
    yield put(MarketActions.getRegionSuccess(response.data))
  } else {
    yield put(MarketActions.getRegionFailure())
  }
}

export function* voteAmuletRequest(api, { id, status }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    id,
    status
  }

  const response = yield call(api.voteAmulet, data)  // showroom api  market/update-fact
  console.log(response)
  console.log('============= VOTE AMULET ==============')
  if (response.ok) {
    alert(I18n.t('succ'))
    yield put(MarketActions.voteAmuletSuccess(response.data))
  } else {
    alert(I18n.t('fail'))
    yield put(MarketActions.voteAmuletFailure())
  }
}

export function* pushAmuletToMarket(api, { market_id }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    market_id
  }

  const response = yield call(api.pushAmuletMarket, data)
  console.log(response)
  console.log('================ PUSH AMULET TO MARKET =================')
  if (response.ok) {
    alert(I18n.t('succ'))
    yield put(MarketActions.pushAmuletMarketSuccess(response.data))
  } else {
    if (response.data.message == "There is not enough money for the transaction.") {
      alert('You have not enough coins.')
    }
    yield put(MarketActions.pushAmuletMarketFailure())
  }

}

export function* deleteAmuletMarketRequest(api, { market_id }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    market_id
  }

  const response = yield call(api.deleteAmuletMarket, data)
  console.log(response)
  console.log('===================== DELETE AMULET MY MARKET ==========================')
  if (response.ok) {
    yield put(MarketActions.deleteAmuletMarketSuccess(response.data))
  } else {
    yield put(MarketActions.deleteAmuletMarketFailure())
  }
}

export function* getListStoreGroupRequest(api, { page }) {
  const aut = yield select(auth)
  const img = yield select(image)

  const data = {
    user_id: aut.user_id,
    province_id: img.pro_id,
    page_number: page,
  }

  const response = yield call(api.getListStore, data)
  console.log(response)
  console.log("=================== GET LIST STORE =====================")
  if (response.ok) {
    yield put(MarketActions.getListStoreGroupSuccess(response.data))
  } else {
    yield put(MarketActions.getListStoreGroupFailure())
  }
}

export function* getListAmuletStoreRequest(api, { page }) {
  const aut = yield select(auth)
  const img = yield select(image)
  const data = {
    user_id: aut.user_id,
    shop_id: img.shop_id,
    page_number: page
  }

  const response = yield call(api.getAmuletStore, data)

  console.log(response)
  console.log("================  GET LIST AMULET IN SHOP =================")
  if (response.ok) {
    yield put(MarketActions.getListAmuletStoreSuccess(response.data))
  } else {
    yield put(MarketActions.getListAmuletStoreFailure())
  }
}

export function* searchRequestMarket(api, { text }) {
  const aut = yield select(auth)
  const img = yield select(image)
  let data
  if (img.pro_id && img.pro_id != null) {
    data = {
      user_id: aut.user_id,
      text,
      province_id: img.pro_id
    }
  } else {
    data = {
      user_id: aut.user_id,
      text,
    }
  }

  console.log(data)
  console.log('============ HERE DATA SEND TO SEARCH =============')

  const response = yield call(api.search, data)
  console.log(response)
  console.log('=============== SEARCH SAGA ==================')
  if (response.ok) {
    yield put(MarketActions.searchRequestSuccess(response.data))
  } else {
    yield put(MarketActions.searchRequestFailure())
  }
}

export function* followGroupAmuletRequest(api, { type_id }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    type_id
  }

  const response = yield call(api.followRoom, data)

  console.log(response)
  console.log('=============== FOLLOW GROUP AMULET =================')

  if (response.ok) {
    alert(I18n.t('succ'))
    yield put(MarketActions.followGroupAmuletSuccess(response.data))
  } else {
    if (response.data.message == 'You must follow at least 3 types of amulets') {
      alert(I18n.t("follow3group"))
    } else {
      alert(I18n.t('fail'))
    }
    yield put(MarketActions.followGroupAmuletFailure())
  }
}

export function* updateReadRequest(api, { type_id, market_id }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    type_id,
    market_id
  }
  console.log(data)

  const response = yield call(api.checkRead, data)
  console.log(response)
  console.log('============= UPDATE READ ==============')
  if (response.ok) {
    yield put(MarketActions.updateReadSuccess(response.data))
  } else {
    yield put(MarketActions.updateReadFailure())
  }
}

