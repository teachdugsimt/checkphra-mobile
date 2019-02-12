import { call, put, select } from 'redux-saga/effects'
import WebboardActions from '../Redux/WebboardRedux'
import { resolve } from 'dns';
import { WebboardSelectors } from '../Redux/WebboardRedux'
import I18n from '../I18n/i18n';

I18n.fallbacks = true;
const auth = state => state.auth
I18n.locale = auth.language

export function* getListAllBoard555(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListAll1, data)
  console.log(response)
  console.log('================ GET LIST ALL BOARD ================')
  if (response.ok) {
    yield put(WebboardActions.getListAllSuccess(response.data))
  } else {
    yield put(WebboardActions.getListAllFailure())
  }
}

export function* getListMyBoard555(api, { page }) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id,
    page_number: page
  }

  const response = yield call(api.getListMe1, data)

  console.log(response)
  console.log('================== GET LIST ME BOARD ===================')

  if (response.ok) {
    yield put(WebboardActions.getListMeSuccess(response.data))
  } else {
    yield put(WebboardActions.getListMeFailure())
  }
}
