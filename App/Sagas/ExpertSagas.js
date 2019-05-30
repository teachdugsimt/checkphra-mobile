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
import RoundedButton from "../Components/RoundedButton";

import { call, put, select } from 'redux-saga/effects'
import ExpertActions, { verifyRequest, cancelCoin } from '../Redux/ExpertRedux'
import QuestionActions from '../Redux/QuestionRedux'
import { LinearGradient } from '../../node_modules/react-native-linear-gradient';
// import { ExpertSelectors } from '../Redux/ExpertRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
const auth = state => state.auth
const expert = state => state.expert
I18n.locale = auth.language

export function* expertRequest(api, { pack, q_id, argument, interested, permit }) {   //   for add in checkList screen ANSWER ONLY!!!!!!!
  const aut = yield select(auth)
  if (!aut.user_id) { return }
  // console.log(argument)
  // console.log(pack)
  // console.log(q_id)
  // console.log('SAGAS')
  const response = yield call(api.addAnswer, pack, q_id, aut.user_id, argument, interested, permit)
  console.log(response)
  console.log('==================== SEND ANSWER =========================')
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    alert(I18n.t('answerSuccess'))
    yield put(ExpertActions.expertSuccess(response.data))
    yield put(QuestionActions.clearAmuletChecked(response.data)) // FOCUS
    yield put(ExpertActions.clearSendAnswer())
    // clearAmuletChecked  // Question
  } else {
    alert(I18n.t('answerFailure'))
    yield put(ExpertActions.expertFailure())
    yield put(ExpertActions.clearSendAnswer())
  }
}

export function* updateAnswer(api, { pack, q_id, argument }) {   //   for UPDATE ANSWER ONLY!!!!!!!
  const aut = yield select(auth)
  if (!aut.user_id) { return }

  // console.log(pack)
  // console.log(q_id)
  console.log(argument)
  console.log('SAGAS UPDATE')

  const response = yield call(api.updateAnswer, pack, q_id, aut.user_id, argument)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    alert(I18n.t('editSuccess'))
    yield put(ExpertActions.updateSuccess(response.data))
    yield put(ExpertActions.clearUpdateRequest())
  } else {
    alert(I18n.t('editFailure'))
    yield put(ExpertActions.updateFailure())
    yield put(ExpertActions.clearUpdateRequest())
  }
}

export function* getProfileRequest(api, { page }) {
  const aut = yield select(auth)

  if (!aut.user_id) { return }

  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getVerify, data)
  console.log(response)
  console.log('============== GET LIST Verify By Banking ===============')

  if (response.ok) {
    yield put(ExpertActions.verifySuccess(response.data))
  } else {
    yield put(ExpertActions.verifyFailure())
  }

}

export function* acceptRequest(api, { id }) {
  const aut = yield select(auth)
  if (!aut.user_id) { return }
  console.log(id)
  console.log('HERE ID')

  const data = {
    user_id: aut.user_id,
    transfer_id: id
  }

  const response = yield call(api.acceptPoint, data)
  console.log(response)
  console.log('================== Accept Payment By Banking =======================')

  if (response.ok) {
    alert(I18n.t('verifySuccess'))
    yield put(ExpertActions.acceptSuccess(response.data))
    yield put(ExpertActions.clearAcceptRequest())
  } else {
    alert(I18n.t('verifyFailure'))
    yield put(ExpertActions.acceptFailure())
    yield put(ExpertActions.clearAcceptRequest())
  }

}

export function* getAnswerAdmin(api, { page }) {  // get answer for Admin Change api
  const aut = yield select(auth)
  const ex = yield select(expert)
  console.log('PAGE')
  if (page == 1) {

    const data = {
      user_id: aut.user_id,
      page_number: page,
      answer_type: ex.type_answer
    }

    const response = yield call(api.answerAdmin, data)
    console.log(response)
    console.log("================ ANSWER OF ADMIN P1 =================")
    if (response.ok) {
      // yield put(ExpertActions.clearDataAnswer())
      yield put(ExpertActions.answerSuccess(response.data))
      yield put(ExpertActions.clearGetAnswer())
    } else {
      yield put(ExpertActions.answerFailure())
      yield put(ExpertActions.clearGetAnswer())
    }

  }
  else {

    const data = {
      user_id: aut.user_id,
      page_number: page,
      answer_type: ex.type_answer
    }

    const response = yield call(api.answerAdmin, data)
    console.log(response)
    console.log("=================== ANSWER OF ADMIN P2 ========================")
    if (response.ok) {
      // yield put(ExpertActions.clearDataAnswer())
      yield put(ExpertActions.answerSuccess2(response.data))
      yield put(ExpertActions.clearGetAnswer())
    } else {
      yield put(ExpertActions.answerFailure2())
      yield put(ExpertActions.clearGetAnswer())
    }

  }
}

export function* cancelPoint(api, { id, argument }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    transfer_id: id,
    argument
  }

  const response = yield call(api.cancelCoin, data)
  console.log(response)
  if (response.ok) {
    yield put(ExpertActions.cancelCoinSuccess(response.data))
    alert(I18n.t('cancelSucc'))
  } else {
    yield put(ExpertActions.cancelCoinFailure())
    alert(I18n.t('cancelFail'))
  }
}

export function* getAutoText55(api) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id
  }

  const response = yield call(api.getText, data)

  if (response.ok) {
    yield put(ExpertActions.getAutoTextSuccess(response.data))
  } else {
    yield put(ExpertActions.getAutoTextFailure())
  }
}

export function* editTypeQuestion(api, { type_id, qid }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    type_id,
    qid
  }

  const response = yield call(api.editGroupQuestion, data)
  console.log(response)
  console.log('==================== EDIT TYPE QUESTION ======================')
  if (response.ok) {
    yield put(ExpertActions.editGroupSuccess(response.data))
    yield put(QuestionActions.editTypeAmulet(response.data))
  } else {
    yield put(ExpertActions.editGroupFailure())
  }
}

export function* getListShop(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListShop, data)
  console.log(response)
  console.log('============ GET LIST SHOP ==============')
  if (response.ok) {
    yield put(ExpertActions.getListStoreSuccess(response.data))
  } else {
    yield put(ExpertActions.getListStoreFailure())
  }
}

export function* verifyStoreRequest(api, { shop_id, status }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    shop_id,
    status
  }

  const response = yield call(api.verifyStore, data)
  console.log(response)
  console.log('=========== CONFIRM STORE ============')

  if (response.ok) {
    yield put(ExpertActions.verifyStoreSuccess(response.data))
    alert(I18n.t('successTransaction'))
  } else {
    yield put(ExpertActions.verifyStoreFailure())
    alert(I18n.t('failureTransaction'))
  }
}