import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { AuthTypes } from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { signin, signinWithCredential } from './AuthSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const authApi = API.Auth.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(AuthTypes.SIGNIN_REQUEST, signin, authApi),
    takeLatest(AuthTypes.SIGNIN_WITH_CREDENTIAL, signinWithCredential, authApi)
  ])
}
