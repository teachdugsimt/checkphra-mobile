import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import Reactotron from 'reactotron-react-native'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  versatileRequest: ['data'],
  versatileSuccess: ['payload'],
  versatileFailure: null,

  getNormalData: null,
  getNormalDataSuccess: ['data'],
  getNormalDataFailure: null,

  setTempPublish: ['data'],
  addPublish: ['data'],
  editRedDotPublish: ['data'],
  deletePublish: ['data'],
})

export const VersatileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,

  request: null,  // request for get versatile data
  data_versatile: null,  // store versatile data

  tmp_publish: null,  // store temp publish
})

/* ------------- Selectors ------------- */

export const VersatileSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const deletePublish = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_publish))
  if (tmp && tmp != null) {
    tmp.map((e, i) => {
      if (data.id == e.id) {
        tmp.splice(i, 1)
      }
    })
  }
  // Reactotron.display({
  //   name: "TMP AFTER DELETE",
  //   preview: "TEMP PUBLISH AFTER DELETE",
  //   value: tmp
  // })
  return state.merge({ tmp_publish: tmp })
}

export const editRedDotPublish = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_publish))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.id == data.id) {
        e.status = true
      }
    })
  }
  // Reactotron.display({
  //   name: "TMP EDIT RED DOT PUBLISH",
  //   display: "tmp after edit red dot publish",
  //   value: tmp
  // })
  return state.merge({ tmp_publish: tmp })
}

export const addPublish = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_publish))
  if (tmp && tmp != null) {
    tmp.push(data)
  }
  // Reactotron.display({
  //   name: "TMP ADD PUBLISH",
  //   display: "tmp  after add new publish",
  //   value: tmp
  // })
  return state.merge({ tmp_publish: tmp })
}
export const setTempPublish = (state, { data }) => state.merge({ tmp_publish: data })

export const getNormalData = state => state.merge({ request: true })
export const getNormalDataSuccess = (state, { data }) => state.merge({ request: false, data_versatile: data })
export const getNormalDataFailure = (state) => state.merge({ request: false })

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERSATILE_REQUEST]: request,
  [Types.VERSATILE_SUCCESS]: success,
  [Types.VERSATILE_FAILURE]: failure,

  [Types.GET_NORMAL_DATA]: getNormalData,
  [Types.GET_NORMAL_DATA_SUCCESS]: getNormalDataSuccess,
  [Types.GET_NORMAL_DATA_FAILURE]: getNormalDataFailure,

  [Types.SET_TEMP_PUBLISH]: setTempPublish,
  [Types.ADD_PUBLISH]: addPublish,
  [Types.EDIT_RED_DOT_PUBLISH]: editRedDotPublish,
  [Types.DELETE_PUBLISH]: deletePublish,
})
