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
import PromotionActions, { publishRequest } from '../Redux/PromotionRedux'
// import { PromotionSelectors } from '../Redux/PromotionRedux'
const auth = state => state.auth

export function* getPromotion(api) {
  // get current data from Store
  // const currentData = yield select(PromotionSelectors.getData)
  // make the call to the api
  const response = yield call(api.getPromotion)
  console.log(response)
  // success?
  if (response.ok) {
    yield put(PromotionActions.promotionSuccess(response.data))
  } else {
    yield put(PromotionActions.promotionFailure())
  }
}

export function* getPublish(api) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id
  }
  const response = yield call(api.getPublish, data)

  console.log(response)
  console.log('PUBLISH DATA')
  if (response.ok) {
    yield put(PromotionActions.publishSuccess(response.data))
  } else {
    yield put(PromotionActions.publishFailure())
  }
}

export function* sharedAnswer(api, { qid }) {
  const aut = yield select(auth)
  console.log(qid)
  console.log('SHARED QID')
  const data = {
    user_id: aut.user_id,
    qid
  }

  const response = yield call(api.sharedAnswer, data)
  console.log(response)
  if (response.ok) {
    yield put(PromotionActions.sharedSuccess(response.data))
  } else {
    yield put(PromotionActions.sharedFailure())
  }
}



