import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendDataAmuletMarket: null,
  sendDataAmuletMarketSuccess: ['data'],
  sendDataAmuletMarketFailure: null,

  sendDataAmuletMarket2: null,
  sendDataAmuletMarketSuccess2: ['data'],
  sendDataAmuletMarketFailure2: null,

  setMainData2: ['data'],

  setLocationAmulet: ['data'],
  setMainData: ['data'],

  setImageCardPerson: ['data'],
  deleteImageCard: null,
  setImage2: ['data'],
  deleteImage2: null,

  getListTypeAmulet: null,
  getListTypeAmuletSuccess: ['data'],
  getListTypeAmuletFailure: null,

  setImageMarket: ['index', 'source'],
  deleteImageMarket: ['index'],
  clearImageMarket: null,
  setTmpDataUpload: ['data'],


  getListAreaAmulet: ['page'],
  getListAreaAmuletSuccess: ['data'],
  getListAreaAmuletFailure: null,

  setZoneSkin: ['zone', 'province'],
  setSkinAmulet: ['skin'],

  getRegion: ['geo_id'],
  getRegionSuccess: ['data'],
  getRegionFailure: null,


  // getProvince: ['page'],
  getProvince: null,
  getProvinceSuccess: ['data'],
  getProvinceFailure: null,

  getListMyMarket: ['page'],
  getListMyMarketSuccess: ['data'],
  getListMyMarketFailure: null,

  openStore: ['store_name', 'province_id', 'img1', 'img2', 'contact'],
  openStoreSuccess: ['data'],
  openStoreFailure: null,

  voteAmulet: ['id', 'status'],
  voteAmuletSuccess: ['data'],
  voteAmuletFailure: null,
  editVoteData: ['data'],
  editVoteData2: ['data'],

  pushAmuletMarket: ['market_id'],
  pushAmuletMarketSuccess: ['data'],
  pushAmuletMarketFailure: null,
  editPushData: ['data'],

  clearDataMyList: null,
  clearListMyAmulet: null,
  clearListAreaAmulet: null,
  clearDataVote: null,
  clearDataAreaAmulet: null,
})

export const MarketTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  // fetching: null,
  // payload: null,
  // error: null,

  data_location: null,  // store location amulet to  MarketPlace
  data_image: [],

  data_typeAmulet: null,  // store skin amulet 
  request: null,  // for request to get type amulet

  maindata: null,  // array data set detail amulet before send to tum
  maindata2: null,  //  array data 2 set detail amulet before send to tum
  tmp_upload: null,  // tmp data upload pass to 2n1 
  img_store: null,  // card person to open store
  img_store2: null, // for open store data => id card with face owner

  data_sendAmulet: null,  // store send amulet data
  request1: null,  // request for send amulet data

  data_sendAmulet2: null,  //  store data send detail amulet to tum
  request3: null, // request for send data detail phra to tum

  data_areaAmulet: null,  // store area & type amulet data
  request2: null, // request for get list type*area amulet

  zone: null,  // store zone id
  skin: null,  // store skin amulet id
  pro_id: null,  // set province id

  request4: null,  // request get province
  province: null,  // store province

  request5: null,  // request for open store
  data_open: null,  // store data open store

  request6: null,  // for get list my amulet in market
  data_mylist: null,  // store list amulet in my market

  request7: null,  // get province in each region
  data_region: null,  // store province n each region

  request8: null,  // for vote amulet
  data_vote: null,  // store vote amulet

  request9: null, // request for push amulet to market
  data_push: null,  // store push my amulet to market
})

/* ------------- Selectors ------------- */

export const MarketSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const editVoteData = (state, {data}) => {
  let tmp = JSON.parse(JSON.stringify(state.data_areaAmulet))
  tmp.map((e, i) => {
    if(e.id == data.id){
      tmp.splice(i, 1, data)
    }
  })
  return state.merge({ data_areaAmulet: tmp})
}

export const editVoteData2 = (state, {data}) => {
  let tmp = JSON.parse(JSON.stringify(state.data_mylist))
  tmp.map((e, i) => {
    if(e.id == data.id){
      tmp.splice(i, 1, data)
    }
  })
  return state.merge({ data_mylist: tmp})
}

export const clearDataMyList = state => state.merge({ data_mylist: null })
export const clearDataAreaAmulet = state => state.merge({ data_areaAmulet: null })
export const clearDataVote = state => state.merge({ data_vote: null })
export const voteAmulet = state => state.merge({ request8: true })
export const voteAmuletSuccess = (state, { data }) => state.merge({ data_vote: data })
export const voteAmuletFailure = state => state.merge({ request8: false })

export const clearListMyAmulet = state => state.merge({ data_mylist: null })
export const clearListAreaAmulet = state => state.merge({ data_areaAmulet: null })
export const deleteImage2 = state => state.merge({ img_store2: null })
export const deleteImageCard = state => state.merge({ img_store: null })
export const setImageCardPerson = (state, { data }) => state.merge({ img_store: data })
export const setImage2 = (state, { data }) => state.merge({ img_store2: data })

export const setTmpDataUpload = (state, { data }) => state.merge({ tmp_upload: data })
export const setMainData = (state, { data }) => state.merge({ maindata: data })
export const setMainData2 = (state, { data }) => state.merge({ maindata2: data })
export const setLocationAmulet = (state, { data }) => state.merge({ data_location: data })
export const setZoneSkin = (state, { zone, province }) => state.merge({ zone, pro_id: province })
export const setSkinAmulet = (state, { skin }) => state.merge({ skin })

export const pushAmuletMarket = state => state.merge({ request9: true })
export const pushAmuletMarketSuccess = (state, { data }) => state.merge({ data_push: data, request9: false })
export const pushAmuletMarketFailure = state => state.merge({ request9: false })
export const editPushData = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_mylist))
  let tmp2 = tmp
  tmp.map((e, i) => {
    if (e.id == data.id) {
      tmp2[i] = data
    }
  })

  return state.merge({ data_mylist: tmp2, request9: null })
}

export const getRegion = state => state.merge({ request7: true })
export const getRegionSuccess = (state, { data }) => state.merge({ request7: false, data_region: data })
export const getRegionFailure = state => state.merge({ request7: false })

export const openStore = state => state.merge({ request5: true })
export const openStoreSuccess = (state, { data }) => state.merge({ request5: false, data_open: data })
export const openStoreFailure = state => state.merge({ request5: false })

export const getProvince = state => state.merge({ request4: true })
export const getProvinceSuccess = (state, { data }) => state.merge({ province: data, request4: false })
export const getProvinceFailure = state => state.merge({ request4: false })

export const getListMyMarket = state => state.merge({ request6: true })
export const getListMyMarketSuccess = (state, { data }) => {
  let tmp
  if (state.data_mylist && state.data_mylist != null && state.data_mylist.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_mylist))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  tmp.sort(function (a, b) {  // (b.id - a.id;) id มากไปน้อย 
    return b.id - a.id;       // (a.id - b.id;) id น้อยไปมาก 
  })

  return state.merge({ data_mylist: tmp, request6: false })
}
export const getListMyMarketFailure = state => state.merge({ request6: false })

export const getListAreaAmulet = state => state.merge({ request2: true })
export const getListAreaAmuletFailure = state => state.merge({ request2: false })
export const getListAreaAmuletSuccess = (state, { data }) => {
  let tmp
  if (state.data_areaAmulet && state.data_areaAmulet != null && state.data_areaAmulet.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_areaAmulet))
    data.forEach(e => {
      if (tmp.find(b => b.id == e.id)) {
        console.log('SAME VALUE')
      } else { tmp.push(e) }
    })
    // main algorithm
  } else {
    tmp = data
  }

  tmp.sort(function (a, b) {
    return b.id - a.id;
  })

  return state.merge({ data_areaAmulet: tmp, request2: false })
}

export const sendDataAmuletMarket = state => state.merge({ request1: true })
export const sendDataAmuletMarketSuccess = (state, { data }) => state.merge({ request1: false, data_sendAmulet: data })
export const sendDataAmuletMarketFailure = state => state.merge({ request1: false })

export const sendDataAmuletMarket2 = state => state.merge({ request3: true })
export const sendDataAmuletMarketSuccess2 = (state, { data }) => state.merge({ request3: false, data_sendAmulet2: data })
export const sendDataAmuletMarketFailure2 = state => state.merge({ request3: false })

export const getListTypeAmulet = state => state.merge({ request: true })
export const getListTypeAmuletSuccess = (state, { data }) => state.merge({ request: false, data_typeAmulet: data })
export const getListTypeAmuletFailure = state => state.merge({ request: false })

export const setImageMarket = (state, { index, source }) => {
  let images
  if (state.data_image) {
    images = [...state.data_image]
  } else {
    images = []
  }

  images[index] = source
  return state.merge({ data_image: images })
}

export const deleteImageMarket = (state, { index }) => {
  let tmp = [...state.data_image]
  tmp[index] = undefined
  return state.merge({ data_image: tmp })
}

export const clearImageMarket = state => state.merge({ data_image: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.MARKET_REQUEST]: request,
  // [Types.MARKET_SUCCESS]: success,
  // [Types.MARKET_FAILURE]: failure,
  [Types.EDIT_VOTE_DATA]: editVoteData,
  [Types.EDIT_VOTE_DATA2]: editVoteData2,
  [Types.CLEAR_DATA_MY_LIST]: clearDataMyList,
  [Types.CLEAR_DATA_AREA_AMULET]: clearDataAreaAmulet,
  [Types.CLEAR_LIST_MY_AMULET]: clearListMyAmulet,
  [Types.CLEAR_LIST_AREA_AMULET]: clearListAreaAmulet,
  [Types.SET_LOCATION_AMULET]: setLocationAmulet,
  [Types.SET_IMAGE_MARKET]: setImageMarket,
  [Types.DELETE_IMAGE_MARKET]: deleteImageMarket,
  [Types.CLEAR_IMAGE_MARKET]: clearImageMarket,
  [Types.SET_MAIN_DATA]: setMainData,
  [Types.SET_MAIN_DATA2]: setMainData2,
  [Types.SET_ZONE_SKIN]: setZoneSkin,
  [Types.SET_SKIN_AMULET]: setSkinAmulet,
  [Types.SET_TMP_DATA_UPLOAD]: setTmpDataUpload,

  [Types.SET_IMAGE_CARD_PERSON]: setImageCardPerson,
  [Types.DELETE_IMAGE_CARD]: deleteImageCard,
  [Types.SET_IMAGE2]: setImage2,
  [Types.DELETE_IMAGE2]: deleteImage2,

  [Types.SEND_DATA_AMULET_MARKET]: sendDataAmuletMarket,
  [Types.SEND_DATA_AMULET_MARKET_SUCCESS]: sendDataAmuletMarketSuccess,
  [Types.SEND_DATA_AMULET_MARKET_FAILURE]: sendDataAmuletMarketFailure,

  [Types.SEND_DATA_AMULET_MARKET2]: sendDataAmuletMarket2,
  [Types.SEND_DATA_AMULET_MARKET_SUCCESS2]: sendDataAmuletMarketSuccess2,
  [Types.SEND_DATA_AMULET_MARKET_FAILURE2]: sendDataAmuletMarketFailure2,

  [Types.GET_LIST_TYPE_AMULET]: getListTypeAmulet,
  [Types.GET_LIST_TYPE_AMULET_SUCCESS]: getListTypeAmuletSuccess,
  [Types.GET_LIST_TYPE_AMULET_FAILURE]: getListTypeAmuletFailure,

  [Types.GET_LIST_AREA_AMULET]: getListAreaAmulet,
  [Types.GET_LIST_AREA_AMULET_SUCCESS]: getListAreaAmuletSuccess,
  [Types.GET_LIST_AREA_AMULET_FAILURE]: getListAreaAmuletFailure,

  [Types.GET_PROVINCE]: getProvince,
  [Types.GET_PROVINCE_SUCCESS]: getProvinceSuccess,
  [Types.GET_PROVINCE_FAILURE]: getProvinceFailure,

  [Types.OPEN_STORE]: openStore,
  [Types.OPEN_STORE_SUCCESS]: openStoreSuccess,
  [Types.OPEN_STORE_FAILURE]: openStoreFailure,

  [Types.GET_LIST_MY_MARKET]: getListMyMarket,
  [Types.GET_LIST_MY_MARKET_SUCCESS]: getListMyMarketSuccess,
  [Types.GET_LIST_MY_MARKET_FAILURE]: getListMyMarketFailure,

  [Types.GET_REGION]: getRegion,
  [Types.GET_REGION_SUCCESS]: getRegionSuccess,
  [Types.GET_REGION_FAILURE]: getRegionFailure,

  [Types.PUSH_AMULET_MARKET]: pushAmuletMarket,
  [Types.PUSH_AMULET_MARKET_SUCCESS]: pushAmuletMarketSuccess,
  [Types.PUSH_AMULET_MARKET_FAILURE]: pushAmuletMarketFailure,
  [Types.EDIT_PUSH_DATA]: editPushData,

  [Types.VOTE_AMULET]: voteAmulet,
  [Types.VOTE_AMULET_SUCCESS]: voteAmuletSuccess,
  [Types.VOTE_AMULET_FAILURE]: voteAmuletFailure,
  [Types.CLEAR_DATA_VOTE]: clearDataVote,

})
