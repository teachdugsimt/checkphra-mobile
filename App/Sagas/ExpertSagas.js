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
import ExpertActions, { verifyRequest } from '../Redux/ExpertRedux'
import { LinearGradient } from '../../node_modules/react-native-linear-gradient';
// import { ExpertSelectors } from '../Redux/ExpertRedux'
const auth = state => state.auth

export function* expertRequest(api, { pack, q_id }) {   //   for add ANSWER ONLY!!!!!!!
  const aut = yield select(auth)
  if (!aut.user_id) { return }

  // console.log(pack)
  // console.log(q_id)
  // console.log('SAGAS')

  const response = yield call(api.addAnswer, pack, q_id, aut.user_id)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    alert('ส่งคำตอบสำเร็จ')
    yield put(ExpertActions.expertSuccess(response.data))
  } else {
    alert('ส่งผลตรวจล้มเหลว')
    yield put(ExpertActions.expertFailure())
  }
}

// export function* getProfileRequest(api, { page }) {
//   console.log(page)
//   console.log('PAGE SAGA')
//   const aut = yield select(auth)

//     if (!aut.user_id) { return }

//     const data = {
//       user_id: aut.user_id,
//       page_number: page
//     }

//     const response = yield call(api.getVerify, data)

//     if (response.ok) {
//       yield put(ExpertActions.verifySuccess(response.data))
//     } else {
//       yield put(ExpertActions.verifyFailure())
//     }
  
// }


export function* getProfileRequest(api, { page }) {
  const aut = yield select(auth)

  if (page == 1) {
    if (!aut.user_id) { return }

    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getVerify, data)

    if (response.ok) {
      yield put(ExpertActions.verifySuccess(response.data))
    } else {
      yield put(ExpertActions.verifyFailure())
    }
  } else {
    if (!aut.user_id) { return }

    const data = {
      user_id: aut.user_id,
      page_number: page
    }

    const response = yield call(api.getVerify, data)

    if (response.ok) {
      yield put(ExpertActions.verifySuccess2(response.data))
    } else {
      yield put(ExpertActions.verifyFailure2())
    }

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

  if (response.ok) {
    alert('อนุมัติสำเร็จ')
    yield put(ExpertActions.acceptSuccess(response.data))
    yield put(ExpertActions.clearAcceptRequest())
  } else {
    alert('อนุมัติล้มเหลว')
    yield put(ExpertActions.acceptFailure())
    yield put(ExpertActions.clearAcceptRequest())
  }

}