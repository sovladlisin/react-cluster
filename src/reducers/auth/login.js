import { LOGIN_SUCCESS, LOGIN_FAIL, SET_CODE, GET_TOKEN, CHECK_TOKEN, SET_TOKEN } from "../../actions/types"
import { handleLogin } from '../../actions/auth/login'


const initialState = {
    name: '',
    error: '',
    token: null,
}

export default function user(state = initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, name: action.payload, error: '' }

        case LOGIN_FAIL:
            return { ...state, error: action.payload.message }

        case SET_CODE:
            return { ...state, code: action.payload }
        case GET_TOKEN:
            return state

        case SET_TOKEN:
            return { ...state, token: action.payload }

        case CHECK_TOKEN:
            {
                if (state.token != null) { return state }
                else {
                    hehe()
                }
            }

        default:
            return state
    }

}

//very temporary
function hehe() {
    const querystring = require('querystring');

    var client_id = 7560681
    var display = 'page'

    // var redirect_uri = "http://localhost:3000/service-list"
    var redirect_uri = "https://cluster-management.herokuapp.com/service-list"

    var response_type = 'token'
    var scope = 'friends'
    var v = '5.122'

    const data = {
        client_id,
        display,
        redirect_uri,
        response_type,
        scope,
        v,
    };
    console.log('1234')
    const searchParams = "https://oauth.vk.com/authorize?" + querystring.stringify(data);

    window.location.replace(searchParams);

}