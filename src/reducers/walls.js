import { GET_WALL, GET_USER } from '../actions/types.js'

const initialState = {
    selected: {},
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WALL:
            return {
                ...state,
                selected: action.payload
            };

        case GET_USER:
            return { ...state, user: action.payload }

        default:
            return state;
    }
}