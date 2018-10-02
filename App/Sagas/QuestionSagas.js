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
import QuestionActions from '../Redux/QuestionRedux'
// import { QuestionSelectors } from '../Redux/QuestionRedux'

const question = state => state.question
const auth = state => state.auth

export function * getAmuletType (api) {
  // get current data from Store
  // const currentData = yield select(QuestionSelectors.getData)
  // make the call to the api
  const response = yield call(api.getAmuletType)
  console.log(response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(QuestionActions.getAmuletTypeSuccess(response.data))
  } else {
    yield put(QuestionActions.getAmuletTypeFailure())
  }
}

export function * getQuestionType (api) {
  // get current data from Store
  // const currentData = yield select(QuestionSelectors.getData)
  // make the call to the api
  const response = yield call(api.getQuestionType)
  console.log(response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(QuestionActions.getQuestionTypeSuccess(response.data))
  } else {
    yield put(QuestionActions.getQuestionTypeFailure())
  }
}

export function * addQuestion (api) {

  const q = yield select(question)
  const a = yield select(auth)

  const response = yield call(api.addQuestion, q.images, q.questions, q.amuletType, a.user_id)
  console.log(response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(QuestionActions.getQuestionTypeSuccess(response.data))
  } else {
    // yield put(QuestionActions.getQuestionTypeFailure())
  }
}
