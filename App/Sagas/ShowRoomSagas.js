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
import ShowRoomActions from '../Redux/ShowRoomRedux'
import I18n from '../I18n/i18n';
I18n.fallbacks = true;

// import { ShowRoomSelectors } from '../Redux/ShowRoomRedux'
const auth = state => state.auth
const type = state => state.showroom.data_amulet
I18n.locale = auth.language

export function* getShowRoom(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(ShowRoomSelectors.getData)
  // make the call to the api
  const response = yield call(api.getshowRoom, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ShowRoomActions.showRoomSuccess(response.data))
  } else {
    yield put(ShowRoomActions.showRoomFailure())
  }
}

// export function* getListAmulet(api, { page }) {
//   const aut = yield select(auth)
//   const typ = yield select(type)
//   console.log('COME HERE 0')
//   if (page == 1) {

//     const data = {
//       user_id: aut.user_id,
//       page_number: page,
//       type_id: typ.id
//     }
//     console.log('COME HERE')
//     console.log(data)

//     const response = yield call(api.getListReal, data)
//     console.log('================= GET LIST THEIR REAL AMULET ==================')
//     console.log(response)
//     if (response.ok) {
//       yield put(ShowRoomActions.getListSuccess(response.data))
//     } else {
//       yield put(ShowRoomActions.getListFailure())
//     }

//   } else {

//     const data = {
//       user_id: aut.user_id,
//       page_number: page,
//       type_id: typ.id
//     }
//     const response = yield call(api.getListReal, data)
//     console.log('================= GET LIST THEIR REAL AMULET ==================')
//     console.log(response)
//     if (response.ok) {
//       yield put(ShowRoomActions.getListSuccess2(response.data))
//     } else {
//       yield put(ShowRoomActions.getListFailure2())
//     }

//   }

// }
export function* getListAmulet(api, { page }) {
  const aut = yield select(auth)
  const typ = yield select(type)
    
    const data = {
      user_id: aut.user_id,
      page_number: page,
      type_id: typ.id
    }

    const response = yield call(api.getListReal, data)
    console.log('================= GET LIST THEIR REAL AMULET ==================')
    console.log(response)
    if (response.ok) {
      yield put(ShowRoomActions.getListSuccess(response.data))
    } else {
      yield put(ShowRoomActions.getListFailure())
    }

}
