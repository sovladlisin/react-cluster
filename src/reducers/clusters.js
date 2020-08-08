import { GET_CLUSTERS } from '../actions/types.js'

const initialState = {
    all: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLUSTERS:
            return {
                ...state,
                all: action.payload
            };

        default:
            return state;
    }
}