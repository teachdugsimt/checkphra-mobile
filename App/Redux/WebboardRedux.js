import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setWebboard: ['data'],

  getListAll: ['page'],
  getListAllSuccess: ['data'],
  getListAllFailure: null,

  getListMe: ['page'],
  getListMeSuccess: ['data'],
  getListMeFailure: null,


  getComment: null,
  getCommentSuccess: ['data'],
  getCommentFailure: null,

  addPost: ['topic', 'content'],
  addPostSuccess: ['data'],
  addPostFailure: null,

  addComment: ['comment'],
  addCommentSuccess: ['data'],
  addCommentFailure: null,

  clearComment: null,
  editDataComment: ['data'],

  like: ['id', 'from', 'status'],
  likeSuccess: ['data'],
  likeFailure: null,
  editLikeData: ['data'],
  editLikeData2: ['data'],

})

export const WebboardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data_webboard: null,

  request: null, // for get list all board
  data_allBoard: null, // store all webboard

  request1: null, // for get list me post board
  data_meBoard: null, // store my post board

  request2: null, // for request get comment post
  data_comment: null,  // store comment data

  request3: null, // for add post 
  data_addpost: null, // store add post data

  request4: null,  // for add comment
  data_addcomment: null, // store ad comment data

  request5: null, //for like post,
  data_like: null, // store like comment ans post data

})

/* ------------- Selectors ------------- */

export const WebboardSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const editLikeData2 = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_comment))
  let tmp2 = tmp
  tmp.comments.map((e, i) => {
    if (e.id == data.id) {
      tmp2.comments[i] = data
    }
  })
  return state.merge({ data_comment: tmp2 })
}

export const editLikeData = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_comment))
  let tmp2 = JSON.parse(JSON.stringify(state.data_webboard))
  tmp2.like = data.like
  tmp2.dislike = data.dislike
  tmp = data
  return state.merge({ data_comment: tmp, data_webboard: tmp2 })
}

export const editDataComment = (state, { data }) => {
  let tmp
  if (state.data_comment && state.data_comment != null && state.data_comment.comments && state.data_comment.comments != null && state.data_comment.comments.length > 0) {
    tmp = JSON.parse(JSON.stringify(state.data_comment))  // if can't push to array user JSON .....
    tmp.comments.push(data)

  } else {
    tmp = JSON.parse(JSON.stringify(state.data_comment)) // if can't push to array user JSON .....
    tmp.comments.push(data)
    // console.log(tmp)
  }

  // let temp = JSON.parse(JSON.stringify(state.data_allBoard))
  // let temp2 = JSON.parse(JSON.stringify(state.data_meBoard))

  // temp.map((e, i) => {

  // })

  return state.merge({ data_comment: tmp })
}

export const like = state => state.merge({ request5: true })
export const likeSuccess = (state, { data }) => state.merge({ request5: false, data_like: data })
export const likeFailure = state => state.merge({ request5: false })

export const clearComment = state => state.merge({ data_comment: null, data_addcomment: null })

export const addComment = state => state.merge({ request4: true })
export const addCommentSuccess = (state, { data }) => state.merge({ request4: false, data_addcomment: data })
export const addCommentFailure = state => state.merge({ request4: false })

export const addPost = state => state.merge({ request3: true })
export const addPostSuccess = (state, { data }) => {
  return state.merge({ request3: false, data_addpost: data })
}
export const addPostFailure = state => state.merge({ request3: false })

export const getComment = state => state.merge({ request2: true })
export const getCommentSuccess = (state, { data }) => state.merge({ data_comment: data })
export const getCommentFailure = state => state.merge({ request2: false })
// request the data from an api
export const getListAll = state => state.merge({ request: true })
// export const getListAllSuccess = (state, { data }) => {
//   let tmp
//   if (state.data_allBoard && state.data_allBoard != null && state.data_allBoard.length > 0) {
//     // data.forEach(e => tmp.push(e))
//     tmp = JSON.parse(JSON.stringify(state.data_allBoard))
//     data.forEach(e => {
//       if (tmp.find(b => b.id == e.id)) {
//         console.log('SAME VALUE')
//       } else { tmp.push(e) }
//     })
//     // main algorithm
//   } else {
//     tmp = data
//   }

//   // tmp.sort(function (a, b) {
//   //   return b.id - a.id;
//   // })

//   return state.merge({ data_allBoard: tmp, request: false })
// }
export const getListAllSuccess = (state, { data }) => {
  let tmp
  if (state.data_allBoard && state.data_allBoard != null && state.data_allBoard.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_allBoard))
    data.map((e, index) => {
      tmp.map((b, index2) => {
        if (e.id == b.id && e != b) {  // 1. id new data == id old data, data in new arr != data in old arr
          if (e.count > b.count) {  // 1.1 comment in new data > comment in old data
            tmp.splice(index2, 1)  // cut old data 
            tmp.splice(0, 0, e)    // and push new data in first array 
          } else {
            tmp.splice(index2, 1, e)  // 1.2 don't interest comment count splice at that index
          }
        }
        else if (tmp.find(c => c.id == e.id) == undefined) {  // 2. add new post into first array
          tmp.splice(0, 0, e)
        }
        else if (e.id == b.id && e == b) { // 3. id new data == id old data , data in new arr == data in old arr
          console.log('SAME VALUE')
        }
      })
    })
    // main algorithm
  } else {
    tmp = data
  }

  // tmp.sort(function (a, b) {
  //   return b.id - a.id;
  // })

  return state.merge({ data_allBoard: tmp, request: false })
}
export const getListAllFailure = state => state.merge({ request: false })

export const getListMe = state => state.merge({ request1: true })
// export const getListMeSuccess = (state, { data }) => {
//   let tmp
//   if (state.data_meBoard && state.data_meBoard != null && state.data_meBoard.length > 0) {
//     // data.forEach(e => tmp.push(e))
//     tmp = JSON.parse(JSON.stringify(state.data_meBoard))
//     data.forEach(e => {
//       if (tmp.find(b => b.id == e.id)) {
//         console.log('SAME VALUE')
//       } else { tmp.push(e) }
//     })
//     // main algorithm
//   } else {
//     tmp = data
//   }

//   // tmp.sort(function (a, b) {
//   //   return b.id - a.id;
//   // })

//   return state.merge({ data_meBoard: tmp, request1: false })
// }
export const getListMeSuccess = (state, { data }) => {
  let tmp
  if (state.data_meBoard && state.data_meBoard != null && state.data_meBoard.length > 0) {
    // data.forEach(e => tmp.push(e))
    tmp = JSON.parse(JSON.stringify(state.data_meBoard))
    data.map((e, index) => {
      tmp.map((b, index2) => {
        if (e.id == b.id && e != b) {  // 1. id new data == id old data, data in new arr != data in old arr
          if (e.count > b.count) {  // 1.1 comment in new data > comment in old data
            tmp.splice(index2, 1)  // cut old data 
            tmp.splice(0, 0, e)    // and push new data in first array 
          } else {
            tmp.splice(index2, 1, e)  // 1.2 don't interest comment count splice at that index
          }
        }
        else if (tmp.find(c => c.id == e.id) == undefined) {  // 2. add new post into first array
          tmp.splice(0, 0, e)
        }
        else if (e.id == b.id && e == b) { // 3. id new data == id old data , data in new arr == data in old arr
          console.log('SAME VALUE')
        }
      })
    })
    // main algorithm
  } else {
    tmp = data
  }

  // tmp.sort(function (a, b) {
  //   return b.id - a.id;
  // })

  return state.merge({ data_meBoard: tmp, request1: false })
}
export const getListMeFailure = state => state.merge({ request1: false })

export const setWebboard = (state, { data }) => state.merge({ data_webboard: data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_WEBBOARD]: setWebboard,
  [Types.GET_LIST_ALL]: getListAll,
  [Types.GET_LIST_ALL_SUCCESS]: getListAllSuccess,
  [Types.GET_LIST_ALL_FAILURE]: getListAllFailure,

  [Types.GET_LIST_ME]: getListMe,
  [Types.GET_LIST_ME_SUCCESS]: getListMeSuccess,
  [Types.GET_LIST_ME_FAILURE]: getListMeFailure,

  [Types.GET_COMMENT]: getComment,
  [Types.GET_COMMENT_SUCCESS]: getCommentSuccess,
  [Types.GET_COMMENT_FAILURE]: getCommentFailure,

  [Types.ADD_POST]: addPost,
  [Types.ADD_POST_SUCCESS]: addPostSuccess,
  [Types.ADD_POST_FAILURE]: addPostFailure,

  [Types.ADD_COMMENT]: addComment,
  [Types.ADD_COMMENT_SUCCESS]: addCommentSuccess,
  [Types.ADD_COMMENT_FAILURE]: addCommentFailure,

  [Types.LIKE]: like,
  [Types.LIKE_SUCCESS]: likeSuccess,
  [Types.LIKE_FAILURE]: likeFailure,
  [Types.EDIT_LIKE_DATA]: editLikeData,
  [Types.EDIT_LIKE_DATA2]: editLikeData2,

  [Types.EDIT_DATA_COMMENT]: editDataComment,

  [Types.CLEAR_COMMENT]: clearComment,
})
