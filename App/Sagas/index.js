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
import { TradingTypes } from '../Redux/TradingRedux'
import { VersionTypes } from '../Redux/VersionRedux'
import { ShowRoomTypes } from '../Redux/ShowRoomRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { signin, signinWithCredential, signup, createUser, changePassword, forgetPassword, saveDeviceToken } from './AuthSagas'
import { getAmuletType, getQuestionType, addQuestion, getHistory, getAnswer, getProfile, deleteQuestion } from './QuestionSagas'
import { getPromotion, getPublish, sharedAnswer, getLoginPromotion, addBonus } from './PromotionSagas'
import {
  paymentRequest, historyAddpointRequest, sendSlipRequest, cardRequest,
  paypalRequest55, cardHistoryRequest, appleHistoryRequest
} from './PaymentSagas'
import {
  expertRequest, getProfileRequest, acceptRequest, getAnswerAdmin, updateAnswer, cancelPoint,
  getAutoText55, editTypeQuestion
} from './ExpertSagas'
import {
  getTrading, getDetail, getListTrade, updateAmulet, sendMessage555, sharedLeasing555,
  getListLeasing, getPriceallday, wantToBuy
} from './TradingSagas'

import {
  getListAmulet, sendMessageTheirAmulet55, getMessageFromTheirAmulet, sendMessageToOwner,
  getMessageFromOwner, getMyRealAmulet, getMyMessageFromOtherPerson
} from './ShowRoomSagas'
import { getVersion } from './VersionSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const authApi = API.Auth.create()
const questionApi = API.Question.create()
const promotionApi = API.Promotion.create()
const tradeApi = API.Trade.create()
const faceApi = API.Face.create()
const versionApi = API.Version.create()
const showroomApi = API.Showroom.create()

const question2Api = API.Question2.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(ShowRoomTypes.GET_LIST_AMULET, getListAmulet, showroomApi),
    takeLatest(ShowRoomTypes.SEND_MESSAGE_THEIR_AMULET, sendMessageTheirAmulet55, showroomApi),
    takeLatest(ShowRoomTypes.GET_MESSAGE_THEIR_AMULET, getMessageFromTheirAmulet, showroomApi),
    takeLatest(ShowRoomTypes.SEND_MESSAGE_OWNER, sendMessageToOwner, showroomApi),
    takeLatest(ShowRoomTypes.GET_MESSAGE_OWNER, getMessageFromOwner, showroomApi),
    takeLatest(ShowRoomTypes.GET_MY_REAL_AMULET, getMyRealAmulet, showroomApi),
    takeLatest(ShowRoomTypes.GET_MY_MESSAGE_FROM_OTHER, getMyMessageFromOtherPerson, showroomApi),

    takeLatest(TradingTypes.TRADING_REQUEST, getTrading, tradeApi),
    takeLatest(TradingTypes.GET_DETAIL, getDetail, tradeApi),
    takeLatest(TradingTypes.LIST_TRADING, getListTrade, tradeApi),
    takeLatest(TradingTypes.UPDATE_STATUS, updateAmulet, tradeApi),
    takeLatest(TradingTypes.SEND_MESSAGE, sendMessage555, faceApi),
    takeLatest(TradingTypes.SHARED_LEASING, sharedLeasing555, tradeApi),
    takeLatest(TradingTypes.GET_LEASING_ADMIN, getListLeasing, tradeApi),
    takeLatest(TradingTypes.GET_PRICE_LEASING, getPriceallday, tradeApi),
    takeLatest(TradingTypes.WANT_BUY, wantToBuy, tradeApi),

    takeLatest(AuthTypes.SIGNIN_REQUEST, signin, authApi),
    takeLatest(AuthTypes.SIGNIN_WITH_CREDENTIAL, signinWithCredential, authApi),
    takeLatest(AuthTypes.SIGNUP, signup, authApi),
    takeLatest(AuthTypes.CREATE_USER, createUser, authApi),
    takeLatest(AuthTypes.CHANGE_PASSWORD, changePassword, authApi),
    takeLatest(AuthTypes.FORGET_PASSWORD, forgetPassword, authApi),
    takeLatest(AuthTypes.SAVE_DEVICE_TOKEN, saveDeviceToken, authApi),

    takeLatest(ExpertTypes.GET_AUTO_TEXT, getAutoText55, questionApi),
    // takeLatest(QuestionTypes.GET_AMULET_TYPE, getAmuletType, questionApi),
    // takeLatest(QuestionTypes.GET_QUESTION_TYPE, getQuestionType, questionApi),
    takeLatest(QuestionTypes.GET_AMULET_TYPE, getAmuletType, question2Api),  // new api v2
    takeLatest(QuestionTypes.GET_QUESTION_TYPE, getQuestionType, question2Api), // new api v2
    takeLatest(ExpertTypes.EDIT_GROUP, editTypeQuestion, question2Api),
    takeLatest(QuestionTypes.ADD_QUESTION, addQuestion, questionApi),
    takeLatest(QuestionTypes.GET_HISTORY, getHistory, questionApi),
    takeLatest(QuestionTypes.GET_ANSWER, getAnswer, questionApi),
    takeLatest(QuestionTypes.GET_PROFILE, getProfile, questionApi),
    takeLatest(QuestionTypes.DELETE_QUESTION, deleteQuestion, questionApi),

    takeLatest(ExpertTypes.EXPERT_REQUEST, expertRequest, questionApi),
    takeLatest(ExpertTypes.ANSWER_LIST, getAnswerAdmin, questionApi),
    takeLatest(ExpertTypes.UPDATE_ANSWER, updateAnswer, questionApi),
    takeLatest(ExpertTypes.GET_PROFILE_REQUEST, getProfileRequest, promotionApi),
    takeLatest(ExpertTypes.ACCEPT_REQUEST, acceptRequest, promotionApi),
    takeLatest(ExpertTypes.CANCEL_COIN, cancelPoint, promotionApi),

    takeLatest(PromotionTypes.PROMOTION_REQUEST, getPromotion, promotionApi),
    takeLatest(PromotionTypes.SHARED_ANSWER, sharedAnswer, promotionApi),
    takeLatest(PromotionTypes.ADD_BONUS, addBonus, promotionApi),
    takeLatest(PromotionTypes.PUBLISH_REQUEST, getPublish, promotionApi),
    takeLatest(PromotionTypes.GET_LOGIN_PRO, getLoginPromotion, promotionApi),

    takeLatest(PaymentTypes.PAYMENT_REQUEST, paymentRequest, promotionApi),
    takeLatest(PaymentTypes.HISTORY_ADDPOINT_REQUEST, historyAddpointRequest, promotionApi),
    takeLatest(PaymentTypes.SEND_SLIP_REQUEST, sendSlipRequest, promotionApi),
    takeLatest(PaymentTypes.CARD_REQUEST, cardRequest, promotionApi),
    takeLatest(PaymentTypes.PAYPAL_REQUEST, paypalRequest55, promotionApi),
    takeLatest(PaymentTypes.CARD_HISTORY, cardHistoryRequest, promotionApi),
    takeLatest(PaymentTypes.APPLE_HISTORY, appleHistoryRequest, promotionApi),

    takeLatest(VersionTypes.GET_VERSION, getVersion, versionApi),



  ])
}
