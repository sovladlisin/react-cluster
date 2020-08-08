import { GET_WALL } from '../actions/types.js'

const initialState = {
    selected: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WALL:
            return {
                ...state,
                selected: action.payload
            };

        default:
            return state;
    }
}