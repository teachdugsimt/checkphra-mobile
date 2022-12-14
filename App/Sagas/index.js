import { takeLatest, all, take } from 'redux-saga/effects'
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
import { ChatTypes } from '../Redux/ChatRedux'
import { WebboardTypes } from '../Redux/WebboardRedux'
import { MarketTypes } from '../Redux/MarketRedux'
import { VersatileTypes } from '../Redux/VersatileRedux'
import { PointTypes } from '../Redux/PointRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {
  signin, signinWithCredential, signup, createUser, changePassword, forgetPassword, saveDeviceToken,
  changeProfileRequest
} from './AuthSagas'
import { getAmuletType, getQuestionType, addQuestion, getHistory, getAnswer, getProfile, deleteQuestion } from './QuestionSagas'
import { getPromotion, getPublish, sharedAnswer, getLoginPromotion, addBonus } from './PromotionSagas'
import {
  paymentRequest, historyAddpointRequest, sendSlipRequest, cardRequest,
  paypalRequest55, cardHistoryRequest, appleHistoryRequest
} from './PaymentSagas'
import {
  expertRequest, getProfileRequest, acceptRequest, getAnswerAdmin, updateAnswer, cancelPoint,
  getAutoText55, editTypeQuestion, getListShop, verifyStoreRequest, getDetailAmuletCheckedRequest,
  getListExpertBidRequest, getListDetailExpertBidRequest, getListExpertCheckedRequest
} from './ExpertSagas'
import {
  getTrading, getDetail, getListTrade, updateAmulet, sendMessage555, sharedLeasing555,
  getListLeasing, getPriceallday, wantToBuy, addDetailCertificateRequest, getListCerfromUserRequest,
  activeCerRequest, getListTrade2
} from './TradingSagas'

import {
  getListAmulet, sendMessageTheirAmulet55, getMessageFromTheirAmulet, sendMessageToOwner,
  getMessageFromOwner, getMyRealAmulet, getMyMessageFromOtherPerson, getListOwnerContactWithUser,
  getListAllBoard555, getListMyBoard555, getCommentRequest, addPostRequest, addCommentRequest, addLike,
  getMessageOtherContactMyAmuletRequest,
} from './ShowRoomSagas'

import {
  getTypeAmuletRequest, sendDataAmuletForMarket, getListAreaAmuletRequest,
  sendDataAmuletForMarket2, getProvinceRequest, openStoreRequest, getListMyMarketRequest, getRegionRequest,
  voteAmuletRequest, pushAmuletToMarket, deleteAmuletMarketRequest, getListStoreGroupRequest,
  getListAmuletStoreRequest, searchRequestMarket, getTypeAmuletRequest2, followGroupAmuletRequest,
  requestAllTypeAmulet55, updateReadRequest
} from './MarketSagas'

import { contactAdmin, getMessageAdmin, getListUserForAdmin } from './ChatSagas'
import { getVersion } from './VersionSagas'
import { getNormalDataRequest } from './VersatileSagas'
import { addReward } from './PointSagas'

// import { getListAllBoard, getListMeBoard } from './WebboardSagas'
// import { getListAllBoard555 } from './WebboardSagas'
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
const webboardApi = API.Webboard.create()
const question2Api = API.Question2.create()
const marketApi = API.Market.create()
const coreReadApi = API.CoreRead.create()
const coreDiscussApi = API.CoreDiscuss.create()
const pointApi = API.Point.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(ExpertTypes.GET_LIST_EXPERT_CHECKED, getListExpertCheckedRequest, question2Api),
    takeLatest(ShowRoomTypes.GET_MESSAGE_OTHER_CONTACT_MY_AMULET, getMessageOtherContactMyAmuletRequest, coreDiscussApi),
    takeLatest(VersatileTypes.GET_NORMAL_DATA, getNormalDataRequest, question2Api),

    takeLatest(MarketTypes.UPDATE_READ, updateReadRequest, coreReadApi),
    takeLatest(MarketTypes.REQUEST_ALL_TYPE_AMULET, requestAllTypeAmulet55, question2Api),
    takeLatest(MarketTypes.FOLLOW_GROUP_AMULET, followGroupAmuletRequest, question2Api),
    takeLatest(MarketTypes.SEARCH_REQUEST, searchRequestMarket, question2Api),
    takeLatest(MarketTypes.GET_LIST_AMULET_STORE, getListAmuletStoreRequest, question2Api),
    takeLatest(MarketTypes.GET_LIST_STORE_GROUP, getListStoreGroupRequest, question2Api),
    takeLatest(MarketTypes.DELETE_AMULET_MARKET, deleteAmuletMarketRequest, question2Api),
    takeLatest(MarketTypes.VOTE_AMULET, voteAmuletRequest, showroomApi),
    takeLatest(MarketTypes.GET_LIST_MY_MARKET, getListMyMarketRequest, showroomApi),
    takeLatest(ExpertTypes.VERIFY_STORE, verifyStoreRequest, showroomApi),
    takeLatest(MarketTypes.OPEN_STORE, openStoreRequest, question2Api),
    takeLatest(MarketTypes.GET_PROVINCE, getProvinceRequest, marketApi),
    takeLatest(MarketTypes.GET_REGION, getRegionRequest, marketApi),
    takeLatest(MarketTypes.PUSH_AMULET_MARKET, pushAmuletToMarket, question2Api),

    takeLatest(WebboardTypes.ADD_COMMENT, addCommentRequest, webboardApi),
    takeLatest(WebboardTypes.ADD_POST, addPostRequest, webboardApi),
    takeLatest(WebboardTypes.GET_COMMENT, getCommentRequest, webboardApi),
    takeLatest(WebboardTypes.GET_LIST_ALL, getListAllBoard555, webboardApi),
    takeLatest(WebboardTypes.GET_LIST_ME, getListMyBoard555, webboardApi),
    takeLatest(WebboardTypes.LIKE, addLike, webboardApi),

    takeLatest(ExpertTypes.GET_LIST_STORE, getListShop, showroomApi),
    takeLatest(ShowRoomTypes.GET_LIST_AMULET, getListAmulet, showroomApi),
    takeLatest(ShowRoomTypes.SEND_MESSAGE_THEIR_AMULET, sendMessageTheirAmulet55, showroomApi),
    takeLatest(ShowRoomTypes.GET_MESSAGE_THEIR_AMULET, getMessageFromTheirAmulet, showroomApi),
    takeLatest(ShowRoomTypes.SEND_MESSAGE_OWNER, sendMessageToOwner, showroomApi),
    takeLatest(ShowRoomTypes.GET_MESSAGE_OWNER, getMessageFromOwner, showroomApi),
    takeLatest(ShowRoomTypes.GET_MY_REAL_AMULET, getMyRealAmulet, showroomApi),
    takeLatest(ShowRoomTypes.GET_MY_MESSAGE_FROM_OTHER, getMyMessageFromOtherPerson, showroomApi),

    takeLatest(ChatTypes.SEND_MESSAGE_ADMIN, contactAdmin, showroomApi), //********* */
    takeLatest(ChatTypes.GET_MESSAGE_ADMIN, getMessageAdmin, showroomApi), //********** */
    takeLatest(ChatTypes.GET_LIST_USER_CONTACT, getListUserForAdmin, showroomApi),
    takeLatest(ShowRoomTypes.GET_LIST_OWNER_CONTACT, getListOwnerContactWithUser, showroomApi),

    takeLatest(MarketTypes.SEND_DATA_AMULET_MARKET2, sendDataAmuletForMarket2, question2Api),
    takeLatest(MarketTypes.GET_LIST_AREA_AMULET, getListAreaAmuletRequest, question2Api),
    takeLatest(MarketTypes.SEND_DATA_AMULET_MARKET, sendDataAmuletForMarket, question2Api),
    takeLatest(MarketTypes.GET_LIST_TYPE_AMULET, getTypeAmuletRequest, question2Api), // here api get group amulet
    takeLatest(MarketTypes.GET_LIST_TYPE_AMULET2, getTypeAmuletRequest2, question2Api),
    takeLatest(TradingTypes.ACTIVE_CERTIFICATE, activeCerRequest, question2Api),
    takeLatest(TradingTypes.TRADING_REQUEST, getTrading, tradeApi),
    takeLatest(TradingTypes.ADD_DETAIL_CERTIFICATE, addDetailCertificateRequest, question2Api),
    takeLatest(TradingTypes.GET_LIST_CER_FROM_USER, getListCerfromUserRequest, question2Api),
    takeLatest(TradingTypes.GET_DETAIL, getDetail, tradeApi),
    // takeLatest(TradingTypes.LIST_TRADING, getListTrade, tradeApi),
    takeLatest(TradingTypes.LIST_TRADINGU, getListTrade2, tradeApi),
    takeLatest(TradingTypes.LIST_TRADING, getListTrade, question2Api),
    takeLatest(TradingTypes.UPDATE_STATUS, updateAmulet, tradeApi),
    takeLatest(TradingTypes.SEND_MESSAGE, sendMessage555, faceApi),
    takeLatest(TradingTypes.SHARED_LEASING, sharedLeasing555, tradeApi),
    takeLatest(TradingTypes.GET_LEASING_ADMIN, getListLeasing, tradeApi),
    takeLatest(TradingTypes.GET_PRICE_LEASING, getPriceallday, tradeApi),
    takeLatest(TradingTypes.WANT_BUY, wantToBuy, tradeApi),

    takeLatest(AuthTypes.CHANGE_PROFILE, changeProfileRequest, authApi),
    takeLatest(AuthTypes.SIGNIN_REQUEST, signin, authApi),
    takeLatest(AuthTypes.SIGNIN_WITH_CREDENTIAL, signinWithCredential, authApi),
    takeLatest(AuthTypes.SIGNUP, signup, authApi),
    takeLatest(AuthTypes.CREATE_USER, createUser, authApi),
    takeLatest(AuthTypes.CHANGE_PASSWORD, changePassword, authApi),
    takeLatest(AuthTypes.FORGET_PASSWORD, forgetPassword, authApi),
    takeLatest(AuthTypes.SAVE_DEVICE_TOKEN, saveDeviceToken, authApi),

    takeLatest(ExpertTypes.GET_AUTO_TEXT, getAutoText55, question2Api),
    takeLatest(QuestionTypes.GET_AMULET_TYPE, getAmuletType, question2Api),  // new api v2
    takeLatest(QuestionTypes.GET_QUESTION_TYPE, getQuestionType, question2Api), // new api v2
    takeLatest(ExpertTypes.EDIT_GROUP, editTypeQuestion, question2Api),
    takeLatest(QuestionTypes.ADD_QUESTION, addQuestion, question2Api),
    takeLatest(QuestionTypes.GET_HISTORY, getHistory, question2Api),  // edit new 2019
    takeLatest(QuestionTypes.GET_ANSWER, getAnswer, question2Api), // edit new 2019
    takeLatest(QuestionTypes.GET_PROFILE, getProfile, questionApi),
    takeLatest(QuestionTypes.DELETE_QUESTION, deleteQuestion, questionApi),

    takeLatest(ExpertTypes.EXPERT_REQUEST, expertRequest, questionApi),
    takeLatest(ExpertTypes.ANSWER_LIST, getAnswerAdmin, question2Api),
    takeLatest(ExpertTypes.UPDATE_ANSWER, updateAnswer, questionApi),
    takeLatest(ExpertTypes.GET_PROFILE_REQUEST, getProfileRequest, promotionApi),
    takeLatest(ExpertTypes.ACCEPT_REQUEST, acceptRequest, promotionApi),
    takeLatest(ExpertTypes.CANCEL_COIN, cancelPoint, promotionApi),

    takeLatest(PromotionTypes.PROMOTION_REQUEST, getPromotion, promotionApi),
    takeLatest(PromotionTypes.SHARED_ANSWER, sharedAnswer, question2Api),  // old = promotionApi
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
    takeLatest(ExpertTypes.GET_DETAIL_AMULET_CHECKED, getDetailAmuletCheckedRequest, question2Api),
    takeLatest(ExpertTypes.GET_LIST_EXPERT_BID, getListExpertBidRequest, question2Api),
    takeLatest(ExpertTypes.GET_LIST_DETAIL_EXPERT_BID, getListDetailExpertBidRequest, question2Api),

    takeLatest(PointTypes.ADD_REWARD, addReward, pointApi)
  ])
}
