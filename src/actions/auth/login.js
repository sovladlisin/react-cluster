import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, SET_CODE, GET_TOKEN, CHECK_TOKEN, SET_TOKEN, GET_ACCOUNT_INFO } from "../types"
import $, { data } from "jquery"


import axios from 'axios';
import fetch from 'node-fetch';


export function handleLogin() {
    return function (dispatch) {
        // const querystring = require('querystring');

        // var client_id = 7560681
        // var display = 'page'
        // var redirect_uri = "http://localhost:3000/service-list"
        // // var redirect_uri = "http://cluster-management.herokuapp.com/service-list"


        // var response_type = 'token'
        // var scope = 'friends'
        // var v = '5.122'

        // const data = {
        //     client_id,
        //     display,
        //     redirect_uri,
        //     response_type,
        //     scope,
        //     v,
        // };
        // const searchParams = "https://oauth.vk.com/authorize?" + querystring.stringify(data);



        // window.location.replace(searchParams);
        const url = "http://80.89.204.142:14289/api/"
        const data = { 'certificate_id': 1, 'text_blocks': [] }
        $.ajax({
            url: url + `update_cetrificate_blocks`,
            type: "POST",
            data: JSON.stringify(data),
            contentType:"application/json",
        }).done(function (data) {
            console.log(data.response)
        })
    }
}

export const setCode = () => dispatch => {

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);

    dispatch({
        type: SET_CODE,
        payload: urlParams.get('code')
    })
}

export const setToken = () => dispatch => {
    var url = window.location.href;
    url = url.replace('#', '?')
    var url_new = new URL(url);

    const urlParams = new URLSearchParams(url_new.search);

    const access_token = urlParams.get('access_token')
    const expires_in = urlParams.get('expires_in')
    const user_id = urlParams.get('user_id')

    const data = { access_token, expires_in, user_id }


    dispatch({
        type: SET_TOKEN,
        payload: data
    })
}

export const checkToken = () => dispatch => {
    dispatch({
        type: CHECK_TOKEN,
        payload: null
    })
}

export const getToken = () => dispatch => {
    dispatch({
        type: GET_TOKEN,
        payload: null
    })
}

export const getAccountInfo = (token) => dispatch => {

    $.ajax({
        url: 'https://api.vk.com/method/users.get?user_ids=' + token.user_id + '&fields=photo_200' + '&access_token=' + token.access_token + "&v=5.122",
        type: 'GET',
        dataType: 'jsonp',
    }).done(function (data) {
        dispatch({
            type: GET_ACCOUNT_INFO,
            payload: data.response[0]
        })
    })
}

// export const getToken = code => (dispatch) => {
//     const url = window.location.search;
//     const urlParams = new URLSearchParams(url);


//     var client_id = 7560681
//     var client_secret = 'embnwcBl4aN3g5xMNN5c'
//     var redirect_uri = 'http://localhost:3000/service-list'
//     var code = urlParams.get('code')

//     const r =
//         "client_id=" + client_id +
//         "&client_secret=" + client_secret +
//         "&redirect_uri=" + redirect_uri +
//         "&code=" + code
//     const searchParams = "https://oauth.vk.com/access_token?" + r;
//     console.log(searchParams)
//     // var xmlHttp = new XMLHttpRequest();
//     // xmlHttp.open("GET", "https://oauth.vk.com/access_token", false); // false for synchronous request
//     // xmlHttp.send(null);
//     // console.log(xmlHttp.responseText)
//     axios({
//         url: searchParams,
//         method: 'GET',
//     }).then(res => {
//         console.log(res)
//     }).catch(err => console.log(err));

//     // window.location.replace(searchParams);

// }
