// a library to wrap and simplify api calls
import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
    b = 'https://infiltech.org/checkphra-api/web/index.php/v1/'
} else {
    // b = 'https://infiltech.org/checkphra-api/web/index.php/v2/'   //true
    b = 'http://192.168.1.45/CheckPhraApi/web/index.php/v2/'
}

// our "constructor"
const create = (baseURL = b) => {
    // ------
    // STEP 1
    // ------
    //
    // Create and configure an apisauce-based api object.
    //
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data'
        },
        // 10 second timeout...
        timeout: 10000
    })

    // ------
    // STEP 2
    // ------
    //
    // Define some functions that call the api.  The goal is to provide
    // a thin wrapper of the api layer providing nicer feeling functions
    // rather than "get", "post" and friends.
    //
    // I generally don't like wrapping the output at this level because
    // sometimes specific actions need to be take on `403` or `401`, etc.
    //
    // Since we can't hide from that, we embrace it by getting out of the
    // way at this level.
    //

    const getAmuletType = (data) => api.get('type/list', data)
    const getQuestionType = () => api.get('manage-question/list')
    const editGroupQuestion = (data) => api.post('type/update-type', data)


    return {
        // a list of the API functions from step 2
        getAmuletType,
        getQuestionType,
        editGroupQuestion
    }
}

// let's return back our create method as the default.
export default {
    create
}
