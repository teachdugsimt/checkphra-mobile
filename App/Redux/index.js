import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
// import { firebaseReducer } from 'react-redux-firebase'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  // firebase: firebaseReducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  auth: require('./AuthRedux').reducer,
  question: require('./QuestionRedux').reducer,
  promotion: require('./PromotionRedux').reducer,
  payment: require('./PaymentRedux').reducer,
  expert: require('./ExpertRedux').reducer,
  trading: require('./TradingRedux').reducer,
  version: require('./VersionRedux').reducer,
  showroom: require('./ShowRoomRedux').reducer,
  chat: require('./ChatRedux').reducer,
  webboard: require('./WebboardRedux').reducer,
  market: require('./MarketRedux').reducer,
  versatile: require('./VersatileRedux').reducer,
  realtime: require('./RealtimeRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
