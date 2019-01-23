/* ***********************************************************


==================== ADMIN & USER ONLY =======================


*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import ChatActions, { ChatTypes } from '../Redux/ChatRedux'
import ContactAdmin from '../Containers/ContactAdmin';
// import { ChatSelectors } from '../Redux/ChatRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;
const auth = state => state.auth
const discuss = state => state.chat.data_message
const dgroup = state => state.chat.data_gChatAdmin
I18n.locale = auth.language

export function* contactAdmin(api, { message }) {
  const aut = yield select(auth)
  const g = yield select(dgroup)

  const data = {
    user_id: aut.user_id,
    message,
    uid_contact: aut.profile.role == 'user' ? null : g.user_id
  }
  console.log(data)
  console.log('HERE MESSAGE TO ADMIN')

  const response = yield call(api.chatToAdmin, data)
  console.log(response)
  console.log('==================== Contact Admin ===================')
  if (response.ok) {
    yield put(ChatActions.sendMessageSuccess(response.data))
  } else {
    yield put(ChatActions.sendMessageFailure())
  }
}

export function* getMessageAdmin(api, { page }) {
  const aut = yield select(auth)
  const dis = yield select(discuss)
  const dg = yield select(dgroup)
  const data = {
    user_id: aut.user_id,
    page_number: page,
    discuss_id: aut.profile.role == "admin" ? dg.id : dis[dis.length - 1].id
  }

  const response = yield call(api.getMessageAdmin, data)
  console.log(response)
  console.log('==================== Get Message Contact Admin ===================')
  if (response.ok) {
    yield put(ChatActions.getMessageSuccess(response.data))
  } else {
    yield put(ChatTypes.getMessageFailure())
  }
}

export function* getListUserForAdmin(api, { page }) {
  const aut = yield select(auth)

  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.adminContactUser, data)
  console.log(response)
  console.log('==================== Admin Get List User ========================')
  if (response.ok) {
    yield put(ChatActions.getListUserContactSuccess(response.data))
  } else {
    yield put(ChatActions.getListUserContactFailure())
  }
}
