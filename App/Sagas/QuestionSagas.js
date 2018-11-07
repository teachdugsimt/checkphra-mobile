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
import { Alert } from 'react-native'

import { call, put, select } from 'redux-saga/effects'
import QuestionActions from '../Redux/QuestionRedux'
// import { QuestionSelectors } from '../Redux/QuestionRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

const question = state => state.question
const auth = state => state.auth
I18n.locale = auth.language

export function* getAmuletType(api) {
  const aut = yield select(auth)
  // get current data from Store
  // const currentData = yield select(QuestionSelectors.getData)
  // make the call to the api
  const data = {
    user_id: aut.user_id
  }
  const response = yield call(api.getAmuletType, data)
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

export function* getQuestionType(api) {
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

export function* addQuestion(api) {

  const q = yield select(question)
  const a = yield select(auth)
  console.log(q.questions)
  console.log('SAGA Q')

  const response = yield call(api.addQuestion, q.images, q.questions, q.amuletID, a.user_id)
  console.log(response)

  // success?
  if (response.ok) {
    // alert("ส่งพระตรวจ สำเร็จ!!")
    // Alert.alert(
    //   'Check Phra',
    //   'ส่งพระตรวจ สำเร็จ!!',
    //   [
    //     { text: 'ตกลง' }
    //   ],
    //   // { cancelable: false }
    // )
    yield put(QuestionActions.addQuestionSuccess(response.data))
    yield put(QuestionActions.clearForm())
    yield put(QuestionActions.clearImage())

  } else {

    alert(response.problem)
    yield put(QuestionActions.addQuestionFailure())
    yield put(QuestionActions.clearForm())
    yield put(QuestionActions.clearImage())

  }
}


export function* getHistory(api, { count }) {
  if (count == 1) {

    const a = yield select(auth)

    const data = {
      user_id: a.user_id,
      pageNumber: count,
    }

    const response = yield call(api.getHistory, data)
    console.log(response)

    if (response.ok) {
      yield put(QuestionActions.getHistorySuccess(response.data))
    } else {
      yield put(QuestionActions.getHistoryFailure())
    }
  } else {
    const a = yield select(auth)

    const data = {
      user_id: a.user_id,
      pageNumber: count
    }

    const response = yield call(api.getHistory, data)
    console.log(response)
    if (response.ok) {
      yield put(QuestionActions.getHistorySuccess2(response.data))
    } else {
      yield put(QuestionActions.getHistoryFailure2())
    }

  }
}

export function* getAnswer(api, { qid }) {

  // const q = yield select(question)
  const a = yield select(auth)

  const data = {
    qid
  }

  const response = yield call(api.getAnswer, data)
  console.log(response)

  // success?
  if (response.ok) {
    yield put(QuestionActions.getAnswerSuccess(response.data))
  } else {
    yield put(QuestionActions.getHistoryFailure())
  }
}

export function* getProfile(api) {

  // const q = yield select(question)
  const a = yield select(auth)

  const data = {
    user_id: a.user_id
  }

  const response = yield call(api.getProfile, data)
  console.log(response)

  // success?
  if (response.ok) {
    yield put(QuestionActions.getProfileSuccess(response.data))
  } else {
    yield put(QuestionActions.getHistoryFailure())
  }
}

export function* deleteQuestion(api, qid) {
  const aut = yield select(auth)
  const data = {
    q_id: qid.q_id,
    user_id: aut.user_id,
  }

  const response = yield call(api.cancelQuestion, data)
  console.log(response)
  if (response.ok) {
    alert(I18n.t('editSuccess'))
    yield put(QuestionActions.deleteQuestionSuccess(response.data))
  } else {
    yield put(QuestionActions.deleteQuestionFailure())
    alert(I18n.t('editFailure'))
  }
}