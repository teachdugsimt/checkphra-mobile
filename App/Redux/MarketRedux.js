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

  // getListTypeAmulet: null,  // here api get group amulet
  // getListTypeAmuletSuccess: ['data'],
  // getListTypeAmuletFailure: null,

  getListTypeAmulet: ['geo_id'],  // here api get group amulet
  getListTypeAmuletSuccess: ['data'],
  getListTypeAmuletFailure: null,

  getListTypeAmulet2: ['geo_id'],  // here api get group amulet 22222222222222222222222222222
  getListTypeAmuletSuccess2: ['data'],
  getListTypeAmuletFailure2: null,

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

  pushAmuletMarket: ['market_id', 'type'],
  pushAmuletMarketSuccess: ['data'],
  pushAmuletMarketFailure: null,
  setTmpTypeAmulet: ['t_id'],
  editPushData: ['data'],

  deleteAmuletMarket: ['market_id'],
  deleteAmuletMarketSuccess: ['data'],
  deleteAmuletMarketFailure: null,
  deleteFromList: ['data'],

  getListStoreGroup: ['page'],
  getListStoreGroupSuccess: ['data'],
  getListStoreGroupFailure: null,

  getListAmuletStore: ['page'],
  getListAmuletStoreSuccess: ['data'],
  getListAmuletStoreFailure: null,
  setShopId: ['data'],
  syncVoteData2: ['data'],

  searchRequest: ['text'],
  searchRequestSuccess: ['data'],
  searchRequestFailure: null,
  editVoteSearch: ['data'],

  followGroupAmulet: ['type_id'],
  followGroupAmuletSuccess: ['data'],
  followGroupAmuletFailure: null,

  requestAllTypeAmulet: null,
  requestAllSuccess: ['data'],
  requestAllFailure: null,

  setDataStore: ['store_name', 'province', 'contact'],

  updateRead: ['type_id', 'market_id'],
  updateReadSuccess: ['data'],
  updateReadFailure: null,

  editListMyMarket: ['data'],

  clearProvinceId: null,
  clearListSearch: null,
  clearShopGroup: null,
  clearListAmuletShop: null,
  clearDataMyList: null,
  clearListMyAmulet: null,
  clearListAreaAmulet: null,
  clearDataVote: null,
  clearDataAreaAmulet: null,
  clearDataOpen: null,
  clearDataPushAmulet: null,
  clearDataFollow: null,

  editUpdateRead: ['type_id', 'market_id'],
  setTypeName: ['name'],
  setStoreName: ['data'],
  setJangwad: ['id', 'name'],
})

export const MarketTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  // fetching: null,
  // payload: null,
  // error: null,

  store_name: null,  // tmp store name open store
  tmp_province: null,  // tmp province name about open store
  tmp_contact: null,  // tmp contact about open store

  data_location: null,  // store location amulet to  MarketPlace
  data_image: [],

  data_typeAmulet: null,  // store skin amulet 
  data_typeAmulet2: null, // store skin amulet 2
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
  data_areaAmulet_store: null, // store for red dot
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

  request10: null,  // for delete amulet in market
  data_delete: null,  // store data delete amulet in market

  request11: null,  // for get list store by province
  data_shopgroup: null,  // store list shop by province

  request12: null,  // for get amulet in each shop
  data_amuletstore: null,  // for store data list amulet in each store
  shop_id: null,  // set shop id for get list amulet in that shop

  request13: null,  // for search data
  data_search: null,  //  for store search data

  request14: null, // for folow group amulet 
  data_follow: null, // store follow group amulet

  request15: null,  // for request all type amulet
  data_alltype: null,  // store all type amulet

  request16: null,  // for  update read (Red dot)
  data_read: null,  // store update read (red dot data)

  tmp_typeID: null,  // store tmp type id before push amulet to market
  FOLLOWER: null,  // check list my follow
  type_name: null,  // store type name
  jangwad_id: null,  // set province id 11/04/2562 !!
  jangwad_name: null, // set province name
  tmp_store: null,
})

/* ------------- Selectors ------------- */

export const MarketSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api

export const setTmpTypeAmulet = (state, data) => {
  return state.merge({ tmp_typeID: data.t_id })
}

export const setStoreName = (state, { data }) => {
  console.log("++++++++++++++ DATA TMP STORE ++++++++++++++++++++++")
  return state.merge({ tmp_store: data })
}

export const setJangwad = (state, { id, name }) => {
  return state.merge({ jangwad_id: id, jangwad_name: name })
}

export const setTypeName = (state, data) => {
  return state.merge({ type_name: data.name })
}

export const editListMyMarket = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_mylist))
  if (tmp && tmp != null) {
    // tmp.map((e, i) => {
    tmp.splice(0, 0, data)
    // })
  }
  // console.log(tmp)
  // console.log('+++++++++++++ TMP AFTER UPDATE +++++++++++++++')
  return state.merge({ data_mylist: tmp })
}

export const editUpdateRead = (state, { type_id, market_id }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_areaAmulet))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.type == type_id && e.id == market_id) {
        e.is_new = false
      }
    })
  }
  return state.merge({ data_areaAmulet: tmp })
}

export const clearDataFollow = state => state.merge({ data_follow: null })

export const updateRead = state => state.merge({ request16: true })
export const updateReadSuccess = (state, { data }) => state.merge({ data_read: data })
export const updateReadFailure = state => state.merge({ request16: false })

export const requestAllTypeAmulet = (state) => state.merge({ request15: true })
export const requestAllSuccess = (state, { data }) => state.merge({ request15: false, data_alltype: data })
export const requestAllFailure = state => state.merge({ request15: false })

export const followGroupAmulet = state => state.merge({ request14: true })
export const followGroupAmuletSuccess = (state, { data }) => state.merge({ request14: false, data_follow: data })
export const followGroupAmuletFailure = state => state.merge({ request14: false })


export const clearDataOpen = state => state.merge({ data_open: null })

export const setDataStore = (state, { store, province, contact }) => {
  return state.merge({ store_name: store, tmp_province: province, tmp_contact: contact })
}

export const clearListSearch = state => state.merge({ data_search: null })
export const searchRequest = state => state.merge({ request13: true })
export const searchRequestSuccess = (state, { data }) => state.merge({ request13: false, data_search: data })
export const searchRequestFailure = state => state.merge({ request13: false })
export const editVoteSearch = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_search))
  tmp.map((e, i) => {
    if (e.id == data.id) {
      tmp.splice(i, 1, data)
    }
  })
  return state.merge({ data_search: tmp })
}

export const clearShopGroup = state => state.merge({ data_shopgroup: null })
export const clearListAmuletShop = state => state.merge({ data_amuletstore: null })
export const setShopId = (state, { data }) => state.merge({ shop_id: data })
export const getListAmuletStore = state => state.merge({ request12: true })
export const getListAmuletStoreSuccess = (state, { data }) => {
  let tmp
  if (state.data_amuletstore && state.data_amuletstore != null && state.data_amuletstore.length > 0) {
    tmp = JSON.parse(JSON.stringify(state.data_amuletstore))

    data.map((e, i) => {
      tmp.map((c, index) => {
        if (e.id == c.id && e != c) {  // 1. id เหมือนกัน แต่ข้อมูลข้างในต่างกัน
          tmp.splice(index, 1, e)  // แทนที่ช่องนั้นด้วยข้อมูลใหม่คือ e
        } else if (tmp.find(b => b.id == e.id) == undefined) {  // 2. ถ้าเป็นไอดีใหม่ ให้เพิ่มไปช่องบนสุด
          tmp.splice(0, 0, e)
        } else if (e.id == c.id && e == c) {
          console.log('SAME VALUE')
        }
      })
    })
    // main algorithm
  } else {
    tmp = data
  }

  // tmp.sort(function (a, b) {  // (b.id - a.id;) id มากไปน้อย 
  //   return b.id - a.id;       // (a.id - b.id;) id น้อยไปมาก 
  // })

  return state.merge({ data_amuletstore: tmp, request12: false })
}
export const getListAmuletStoreFailure = state => state.merge({ request12: false })

export const getListStoreGroup = state => state.merge({ request11: true })
export const getListStoreGroupSuccess = (state, { data }) => {
  let tmp
  if (state.data_shopgroup && state.data_shopgroup != null && state.data_shopgroup.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_shopgroup))

    data.map((e, i) => {
      tmp.map((c, index) => {
        if (e.id == c.id && e != c) {  // 1. id เหมือนกัน แต่ข้อมูลข้างในต่างกัน
          tmp.splice(index, 1, e)  // แทนที่ช่องนั้นด้วยข้อมูลใหม่คือ e
        } else if (tmp.find(b => b.id == e.id) == undefined) {  // 2. ถ้าเป็นไอดีใหม่ ให้เพิ่มไปช่องบนสุด
          tmp.splice(0, 0, e)
        } else if (e.id == c.id && e == c) {
          console.log('SAME VALUE')
        }
      })
    })
    // main algorithm
  } else {
    tmp = data
  }

  // tmp.sort(function (a, b) {  // (b.id - a.id;) id มากไปน้อย 
  //   return b.id - a.id;       // (a.id - b.id;) id น้อยไปมาก 
  // })

  return state.merge({ data_shopgroup: tmp, request11: false })
}
export const getListStoreGroupFailure = state => state.merge({ request11: false })

export const deleteFromList = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_mylist))

  if (tmp && tmp.length > 0) {
    tmp.map((e, i) => {
      if (e.id == data.id) {
        tmp.splice(i, 1)
      }
    })
  } else {
    console.log(" can't delete amulet ")
  }
  return state.merge({ data_mylist: tmp, request10: null })
}

export const syncVoteData2 = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_amuletstore))
  tmp.map((e, i) => {
    if (e.id == data.id) {
      tmp.splice(i, 1, data)
    }
  })
  return state.merge({ data_amuletstore: tmp })
}

export const editVoteData = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_areaAmulet))
  tmp.map((e, i) => {
    if (e.id == data.id) {
      tmp.splice(i, 1, data)
    }
  })
  return state.merge({ data_areaAmulet: tmp })
}

export const editVoteData2 = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_mylist))
  tmp.map((e, i) => {
    if (e.id == data.id) {
      tmp.splice(i, 1, data)
    }
  })
  return state.merge({ data_mylist: tmp })
}

export const deleteAmuletMarket = state => state.merge({ request10: true })
export const deleteAmuletMarketSuccess = (state, { data }) => state.merge({ request10: false, data_delete: data })
export const deleteAmuletMarketFailure = state => state.merge({ request10: false })

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
  // console.log(data)
  // console.log('++++++++++ DATA IN REDUX ++++++++++')
  let tmp = JSON.parse(JSON.stringify(state.data_mylist))
  let tmp2 = tmp
  tmp.map((e, i) => {
    if (e.id == data.id) {
      tmp2[i] = data
    }
  })
  // console.log(tmp)
  // console.log('++++++++++ AFTER EDIT ++++++++++')
  return state.merge({ data_mylist: tmp2, request9: null })
}
export const clearDataPushAmulet = state => state.merge({ data_push: null })

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

  return state.merge({ data_areaAmulet: tmp, data_areaAmulet_store: tmp[0] ? tmp[0].id : null, request2: false })
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

export const getListTypeAmulet2 = state => state.merge({ request: true })
export const getListTypeAmuletSuccess2 = (state, { data }) => state.merge({ request: false, data_typeAmulet2: data })
export const getListTypeAmuletFailure2 = state => state.merge({ request: false })

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

export const clearProvinceId = state => state.merge({ pro_id: null })
export const clearImageMarket = state => state.merge({ data_image: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.MARKET_REQUEST]: request,
  // [Types.MARKET_SUCCESS]: success,
  // [Types.MARKET_FAILURE]: failure,
  [Types.CLEAR_DATA_FOLLOW]: clearDataFollow,
  [Types.CLEAR_DATA_OPEN]: clearDataOpen,
  [Types.SET_DATA_STORE]: setDataStore,
  [Types.CLEAR_SHOP_GROUP]: clearShopGroup,
  [Types.CLEAR_LIST_AMULET_SHOP]: clearListAmuletShop,
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

  [Types.EDIT_UPDATE_READ]: editUpdateRead,

  [Types.EDIT_VOTE_SEARCH]: editVoteSearch,
  [Types.CLEAR_LIST_SEARCH]: clearListSearch,
  [Types.SEARCH_REQUEST]: searchRequest,
  [Types.SEARCH_REQUEST_SUCCESS]: searchRequestSuccess,
  [Types.SEARCH_REQUEST_FAILURE]: searchRequestFailure,

  [Types.SET_IMAGE_CARD_PERSON]: setImageCardPerson,
  [Types.DELETE_IMAGE_CARD]: deleteImageCard,
  [Types.SET_IMAGE2]: setImage2,
  [Types.DELETE_IMAGE2]: deleteImage2,

  [Types.SET_SHOP_ID]: setShopId,
  [Types.GET_LIST_AMULET_STORE]: getListAmuletStore,
  [Types.GET_LIST_AMULET_STORE_SUCCESS]: getListAmuletStoreSuccess,
  [Types.GET_LIST_AMULET_STORE_FAILURE]: getListAmuletStoreFailure,

  [Types.SEND_DATA_AMULET_MARKET]: sendDataAmuletMarket,
  [Types.SEND_DATA_AMULET_MARKET_SUCCESS]: sendDataAmuletMarketSuccess,
  [Types.SEND_DATA_AMULET_MARKET_FAILURE]: sendDataAmuletMarketFailure,

  [Types.SEND_DATA_AMULET_MARKET2]: sendDataAmuletMarket2,
  [Types.SEND_DATA_AMULET_MARKET_SUCCESS2]: sendDataAmuletMarketSuccess2,
  [Types.SEND_DATA_AMULET_MARKET_FAILURE2]: sendDataAmuletMarketFailure2,

  [Types.GET_LIST_TYPE_AMULET]: getListTypeAmulet,
  [Types.GET_LIST_TYPE_AMULET_SUCCESS]: getListTypeAmuletSuccess,
  [Types.GET_LIST_TYPE_AMULET_FAILURE]: getListTypeAmuletFailure,

  [Types.GET_LIST_TYPE_AMULET2]: getListTypeAmulet2,
  [Types.GET_LIST_TYPE_AMULET_SUCCESS2]: getListTypeAmuletSuccess2,
  [Types.GET_LIST_TYPE_AMULET_FAILURE2]: getListTypeAmuletFailure2,

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

  [Types.DELETE_AMULET_MARKET]: deleteAmuletMarket,
  [Types.DELETE_AMULET_MARKET_SUCCESS]: deleteAmuletMarketSuccess,
  [Types.DELETE_AMULET_MARKET_FAILURE]: deleteAmuletMarketFailure,
  [Types.DELETE_FROM_LIST]: deleteFromList,

  [Types.GET_LIST_STORE_GROUP]: getListStoreGroup,
  [Types.GET_LIST_STORE_GROUP_SUCCESS]: getListStoreGroupSuccess,
  [Types.GET_LIST_STORE_GROUP_FAILURE]: getListStoreGroupFailure,
  [Types.SYNC_VOTE_DATA2]: syncVoteData2,

  [Types.VOTE_AMULET]: voteAmulet,
  [Types.VOTE_AMULET_SUCCESS]: voteAmuletSuccess,
  [Types.VOTE_AMULET_FAILURE]: voteAmuletFailure,
  [Types.CLEAR_DATA_VOTE]: clearDataVote,

  [Types.REQUEST_ALL_TYPE_AMULET]: requestAllTypeAmulet,
  [Types.REQUEST_ALL_SUCCESS]: requestAllSuccess,
  [Types.REQUEST_ALL_FAILURE]: requestAllFailure,

  [Types.CLEAR_PROVINCE_ID]: clearProvinceId,

  [Types.CLEAR_DATA_PUSH_AMULET]: clearDataPushAmulet,

  [Types.FOLLOW_GROUP_AMULET]: followGroupAmulet,
  [Types.FOLLOW_GROUP_AMULET_SUCCESS]: followGroupAmuletSuccess,
  [Types.FOLLOW_GROUP_AMULET_FAILURE]: followGroupAmuletFailure,

  [Types.UPDATE_READ]: updateRead,
  [Types.UPDATE_READ_SUCCESS]: updateReadSuccess,
  [Types.UPDATE_READ_FAILURE]: updateReadFailure,

  [Types.EDIT_LIST_MY_MARKET]: editListMyMarket,
  [Types.SET_TYPE_NAME]: setTypeName,
  [Types.SET_JANGWAD]: setJangwad,
  [Types.SET_STORE_NAME]: setStoreName,
  [Types.SET_TMP_TYPE_AMULET]: setTmpTypeAmulet,
})
