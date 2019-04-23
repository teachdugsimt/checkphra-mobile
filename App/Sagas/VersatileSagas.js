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
import VersatileActions from '../Redux/VersatileRedux'
// import { VersatileSelectors } from '../Redux/VersatileRedux'
import I18n from '../I18n/i18n';
// import Reactotron from 'reactotron-react-native'
I18n.fallbacks = true;
const auth = state => state.auth
I18n.locale = auth.language

// export function* getVersatile(api, action) {
//   const { data } = action
//   // get current data from Store
//   // const currentData = yield select(VersatileSelectors.getData)
//   // make the call to the api
//   const response = yield call(api.getversatile, data)

//   // success?
//   if (response.ok) {
//     // You might need to change the response here - do this with a 'transform',
//     // located in ../Transforms/. Otherwise, just pass the data back from the api.
//     yield put(VersatileActions.versatileSuccess(response.data))
//   } else {
//     yield put(VersatileActions.versatileFailure())
//   }
// }

export function* getNormalDataRequest(api) {
  const aut = yield select(auth)
  const data = {
    user_id: aut.user_id
  }

  const response = yield call(api.getVersatile, data)
  // Reactotron.warn(response)
  if (response.ok) {
    yield put(VersatileActions.getNormalDataSuccess(response.data))
  } else {
    yield put(VersatileActions.getNormalDataFailure())
  }
}
