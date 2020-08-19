import { GET_CLUSTERS, GET_GROUP_STATUS, UPDATE_CERTIFICATE_BLOCKS, SEARCH } from '../actions/types.js'
const initialState = {
    all: [],
    selected: [],
    group_status: {},

    update_block_status: {},

    search_result: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLUSTERS:
            return {
                ...state,
                selected: action.payload
            };

        case GET_GROUP_STATUS:
            return {
                ...state,
                group_status: action.payload
            }

        case UPDATE_CERTIFICATE_BLOCKS:
            return {
                ...state,
                update_block_status: action.payload
            }

        case SEARCH:
            return {
                ...state,
                search_result: action.payload
            }

        default:
            return state;
    }
}