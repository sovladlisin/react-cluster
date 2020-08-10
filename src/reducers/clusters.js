import { GET_CLUSTERS } from '../actions/types.js'

const initialState = {
    all: [],
    selected: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLUSTERS:
            return {
                ...state,
                selected: action.payload
            };

        default:
            return state;
    }
}