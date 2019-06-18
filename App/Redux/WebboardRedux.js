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


  getComment: ['page_number'],
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

  setMyBoard: ['data'],
  setAllBoard: ['data'],

  updateMyBoard: ['id', 'updated_at', 'status'],  // my post actions
  updateAllBoard: ['id', 'updated_at', 'status'],   // all actions

  addMyNewPost: ['data'],  // my post actions
  editRedDotData: ['data'],

  clearListMyAll: null,
  clearTmp: null,
  clearDataLike: null,
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

  tmp_my: null,  // store temp my webboard
  tmp_all: null,  // store temp all webboard

})

/* ------------- Selectors ------------- */

export const WebboardSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const clearDataLike = state => state.merge({ data_like: null })

export const clearTmp = state => state.merge({ tmp_all: null, tmp_my: null })

export const clearListMyAll = (state) => state.merge({ data_meBoard: null, data_allBoard: null, data_addpost: null })

export const editRedDotData = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_my))
  let tmp2 = JSON.parse(JSON.stringify(state.tmp_all))

  if (tmp && tmp != null)
    tmp.forEach((e, i) => {
      if (e.id == data.id) {
        e.status = false
        e.updated_at = data.updated_at
      }
    })

  if (tmp2 && tmp2 != null)
    tmp2.forEach((e, i) => {
      if (e.id == data.id) {
        e.status = false
        e.updated_at = data.updated_at
      }
    })

  return state.merge({ tmp_my: tmp, tmp_all: tmp2 })

}

export const addMyNewPost = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_my))
  let tmp2 = JSON.parse(JSON.stringify(state.tmp_all))
  if ((tmp == null || !tmp)) {
    tmp = []
    tmp.push({
      id: data.id,
      status: false,
      updated_at: data.updated_at
    })
  } else {
    console.log(tmp)
    console.log("HERERERERERERERERER+++++++++++++++++++++++++=")
    tmp.push({
      id: data.id,
      status: false,
      updated_at: data.updated_at
    })
  }

  if ((tmp2 == null || !tmp2)) {
    tmp2 = []
    tmp2.push({
      id: data.id,
      status: false,
      updated_at: data.updated_at
    })
  } else {
    console.log(tmp2)
    console.log("HERERERERERERERERER+++++++++++++++++++++++++=")
    tmp2.push({
      id: data.id,
      status: false,
      updated_at: data.updated_at
    })
  }
  console.log(tmp)
  console.log(tmp2)
  console.log("+++++++++++++++++ TMP1 & TMP2 ++++++++++++++++++++")
  return state.merge({ tmp_my: tmp, tmp_all: tmp2 })
}

export const updateAllBoard = (state, { id, updated_at, status }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_all))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.id == id) {
        e.status = status
        e.updated_at = updated_at
      }
    })
  }
  console.log('+++++++++++++++++ UPDATE ALL BOARD ERROR ++++++++++++++++++++++')
  return state.merge({ tmp_all: tmp })
}

export const updateMyBoard = (state, { id, updated_at, status }) => {
  let tmp = JSON.parse(JSON.stringify(state.tmp_my))
  if (tmp && tmp != null) {
    tmp.forEach((e, i) => {
      if (e.id == id) {
        e.status = status
        e.updated_at = updated_at
      }
    })
  }
  console.log('+++++++++++++++++++++ UPDATE MY BOARD ERROR ++++++++++++++++++++++++++++')
  return state.merge({ tmp_my: tmp })
}

export const setMyBoard = (state, { data }) => state.merge({ tmp_my: data })
export const setAllBoard = (state, { data }) => state.merge({ tmp_all: data })

// export const editLikeData2 = (state, { data }) => {
//   let tmp = JSON.parse(JSON.stringify(state.data_comment))
//   let tmp2 = tmp
//   tmp.comments.map((e, i) => {
//     if (e.id == data.id) {
//       tmp2.comments[i] = data
//     }
//   })
//   return state.merge({ data_comment: tmp2 })
// }
export const editLikeData2 = (state, { data }) => {
  let tmp = JSON.parse(JSON.stringify(state.data_comment))
  let tmp2 = tmp
  if (tmp && tmp != null)
    tmp.map((e, i) => {
      if (e.id == data.id) {
        tmp2[i] = data
      }
    })
  // console.log(tmp2)
  // console.log(" +++++++++++++++++++ TMP AFTER LIKE ++++++++++++++++++++++")
  return state.merge({ data_comment: tmp2 })
}

export const editLikeData = (state, { data }) => {
  // let tmp = JSON.parse(JSON.stringify(state.data_comment))
  // let tmp2 = JSON.parse(JSON.stringify(state.data_webboard))
  // tmp2.like = data.like
  // tmp2.dislike = data.dislike
  // tmp = data
  // return state.merge({ data_comment: tmp, data_webboard: tmp2 })
  // console.log(data)
  // console.log('++++++++++++++++++ LIKE POST ++++++++++++++++++++++++++')
  return state.merge({ data_webboard: data })
}

export const editDataComment = (state, { data }) => {
  console.log(data)
  let tmp = JSON.parse(JSON.stringify(state.data_comment))
  if (tmp && tmp != null) {
    tmp.push(data)
  } else {
    tmp.push(data)
  }
  console.log(tmp)
  console.log('+++++++++++++++ TMP AFTER ADD COMMENT ++++++++++++++++')
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
// export const getCommentSuccess = (state, { data }) => state.merge({ data_comment: data })
export const getCommentSuccess = (state, { data }) => {
  console.log(data)
  console.log("+++++++++++++++++++++ DATA COMMENT ++++++++++++++++++++++++++++++")
  // let tmp = JSON.parse(JSON.stringify(state.data_comment))
  // if (tmp && tmp != null) {
  //   data.map((e, i) => {
  //     tmp.map((el, index) => {
  //       if (e.id == el.id && e != el) {
  //         if ((e.like != el.like) || (e.dislike != el.dislike)) {
  //           console.log('++++ edit like/dislike comment ++++')
  //           tmp.splice(index, 1, e)
  //         }
  //       } else if (el.find(c => c.id == e.id) == undefined) {
  //         console.log('++++ add new comment ++++')
  //         tmp.splice(tmp.length, 0, e)
  //       } 
  //       // else if () {

  //       // }
  //     })
  //   })
  // } else {
  //   tmp = data
  // }

  let tmp
  if (state.data_comment && state.data_comment != null && state.data_comment.length > 0) {
    tmp = JSON.parse(JSON.stringify(state.data_comment))

    data.map((e, i) => {
      tmp.map((c, index) => {
        if (e.id == c.id && e != c) {  // 1. id เหมือนกัน แต่ข้อมูลข้างในต่างกัน
          tmp.splice(index, 1, e)  // แทนที่ช่องนั้นด้วยข้อมูลใหม่คือ e
        } else if (tmp.find(b => b.id == e.id) == undefined) {  // 2. ถ้าเป็นไอดีใหม่ ให้เพิ่มไปช่องบนสุด
          tmp.splice(tmp.length, 0, e)
        } else if (e.id == c.id && e == c) {
          console.log('SAME VALUE')
        }
      })
    })
    // main algorithm
  } else {
    tmp = data
  }
  console.log(tmp)
  console.log("+++++++++++++++++++++++++ TMP AFTER EDIT +++++++++++++++++++++++++++++++")
  return state.merge({ data_comment: tmp, request2: false })
}
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
          // tmp.splice(0, 0, e)
          // WE MUST CHECK UPDATED AT OF EACh POST
          if(e.updated_at && e.updated_at > tmp[0].updated_at){
            tmp.splice(0, 0, e)  // update 12/06/2019 !!
          } else {
            tmp.splice(tmp.length, 0, e)  // update 12/06/2019 !!
          }
          // tmp.splice(tmp.length, 0, e)  // update 12/06/2019 !!
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

  // data.sort(function (a, b) {
  //   return new Date(a.updated_at) - new Date(b.updated_at);
  // });
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
          // tmp.splice(0, 0, e)
          // WE MUST CHECK UPDATED AT OF EACh POST
          tmp.splice(tmp.length, 0, e)  // update 12/06/2019 !!
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

  [Types.SET_MY_BOARD]: setMyBoard,
  [Types.SET_ALL_BOARD]: setAllBoard,

  [Types.UPDATE_MY_BOARD]: updateMyBoard,
  [Types.UPDATE_ALL_BOARD]: updateAllBoard,

  [Types.ADD_MY_NEW_POST]: addMyNewPost,
  [Types.EDIT_RED_DOT_DATA]: editRedDotData,

  [Types.CLEAR_LIST_MY_ALL]: clearListMyAll,
  [Types.CLEAR_TMP]: clearTmp,
  [Types.CLEAR_DATA_LIKE]: clearDataLike,
})
