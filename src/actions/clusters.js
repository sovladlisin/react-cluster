import axios from 'axios';

import { GET_CLUSTERS } from './types';


export const getClusters = () => dispatch => {
    // axios.get(`/api/${model_name}/${id}/`).then(res => {
    //     dispatch({
    //         type: GET_PIN_WINDOW,
    //         payload: res.data
    //     });
    // }).catch(err => console.log(err));

    dispatch({
        type: GET_CLUSTERS,
        payload: [{ data: "hehe" }]
    })
}