import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { QuestionTypes } from '../Redux/QuestionRedux'
import { PromotionTypes } from '../Redux/PromotionRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { signin, signinWithCredential, signup } from './AuthSagas'
import { getAmuletType, getQuestionType, addQuestion, getHistory, getAnswer, getProfile } from './QuestionSagas'
import { getPromotion } from './PromotionSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const authApi = API.Auth.create()
const questionApi = API.Question.create()
const promotionApi = API.Promotion.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(AuthTypes.SIGNIN_REQUEST, signin, authApi),
    takeLatest(AuthTypes.SIGNIN_WITH_CREDENTIAL, signinWithCredential, authApi),
    takeLatest(AuthTypes.SIGNUP, signup, authApi),

    takeLatest(QuestionTypes.GET_AMULET_TYPE, getAmuletType, questionApi),
    takeLatest(QuestionTypes.GET_QUESTION_TYPE, getQuestionType, questionApi),
    takeLatest(QuestionTypes.ADD_QUESTION, addQuestion, questionApi),

    takeLatest(QuestionTypes.GET_HISTORY, getHistory, questionApi),
    takeLatest(QuestionTypes.GET_ANSWER, getAnswer, questionApi),

    takeLatest(QuestionTypes.GET_PROFILE, getProfile, questionApi),

    takeLatest(PromotionTypes.PROMOTION_REQUEST, getPromotion, promotionApi),

  ])
}
