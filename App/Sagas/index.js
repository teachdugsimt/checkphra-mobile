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
import { PaymentTypes } from '../Redux/PaymentRedux'
import { ExpertTypes } from '../Redux/ExpertRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { signin, signinWithCredential, signup, createUser } from './AuthSagas'
import { getAmuletType, getQuestionType, addQuestion, getHistory, getAnswer, getProfile, deleteQuestion } from './QuestionSagas'
import { getPromotion } from './PromotionSagas'
import { paymentRequest, historyAddpointRequest, sendSlipRequest, cardRequest } from './PaymentSagas'
import { expertRequest, getProfileRequest, acceptRequest } from './ExpertSagas'

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
    takeLatest(AuthTypes.CREATE_USER, createUser, authApi),

    takeLatest(QuestionTypes.GET_AMULET_TYPE, getAmuletType, questionApi),
    takeLatest(QuestionTypes.GET_QUESTION_TYPE, getQuestionType, questionApi),
    takeLatest(QuestionTypes.ADD_QUESTION, addQuestion, questionApi),

    takeLatest(QuestionTypes.GET_HISTORY, getHistory, questionApi),
    takeLatest(QuestionTypes.GET_ANSWER, getAnswer, questionApi),

    takeLatest(QuestionTypes.GET_PROFILE, getProfile, questionApi),
    takeLatest(QuestionTypes.DELETE_QUESTION, deleteQuestion, questionApi),
    takeLatest(ExpertTypes.EXPERT_REQUEST, expertRequest, questionApi),

    takeLatest(PromotionTypes.PROMOTION_REQUEST, getPromotion, promotionApi),

    takeLatest(PaymentTypes.PAYMENT_REQUEST, paymentRequest, promotionApi),
    takeLatest(PaymentTypes.HISTORY_ADDPOINT_REQUEST, historyAddpointRequest, promotionApi), 

    takeLatest(PaymentTypes.SEND_SLIP_REQUEST, sendSlipRequest, promotionApi),
    takeLatest(ExpertTypes.GET_PROFILE_REQUEST, getProfileRequest, promotionApi),
    takeLatest(ExpertTypes.ACCEPT_REQUEST, acceptRequest, promotionApi),
    takeLatest(PaymentTypes.CARD_REQUEST, cardRequest, promotionApi)
  ])
}
