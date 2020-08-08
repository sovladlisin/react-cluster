import { GET_WALL } from "./types"
import axios from 'axios';
import { $CombinedState } from "redux";
import $, { data } from "jquery"


export const getWall = (token, id, user) => dispatch => {
    $.ajax({
        url: 'https://api.vk.com/method/wall.getById?posts=' + id + '&access_token=' + token + "&v=5.122",
        type: 'GET',
        dataType: 'jsonp',
    }).done(function (data_post) {
        const owner_id = data_post.response[0].owner_id

        if (user) {
            $.ajax({
                url: 'https://api.vk.com/method/users.get?user_ids=' + owner_id + '&fields=photo_50' + '&access_token=' + token + "&v=5.122",
                type: 'GET',
                dataType: 'jsonp',
            }).done(function (data_owner) {
                dispatch({
                    type: GET_WALL,
                    payload: { post_data: data_post, owner_data: data_owner }
                });
            })
        }
        else {
            $.ajax({
                url: 'https://api.vk.com/method/groups.getById?group_id=' + owner_id * (-1) + '&access_token=' + token + "&v=5.122",
                type: 'GET',
                dataType: 'jsonp',
            }).done(function (data_owner) {
                dispatch({
                    type: GET_WALL,
                    payload: { post_data: data_post, owner_data: data_owner }
                });
            })
        }

    })

    // axios({
    //     method: 'POST',
    //     url: "https://api.vk.com/method/users.get?user_ids=210700286&fields=bdate&v=5.130",
    //     headers: {
    //         // Authorization: token,
    //         "Content-Type": "application/jsonp"
    //     },
    // }).then((res) => {
    //     // YOUR CODE HERE
    // }).catch((err) => {
    //     console.log(err);
    // });

    // var script = document.createElement('SCRIPT');
    // script.src = "https://api.vk.com/method/wall.getById?posts=" + id + "&access_token=" + token + "&v=5.122";
    // document.getElementsByTagName("head")[0].appendChild(script);
    // function callbackFunc(result) {
    //     alert(result.response)
    // }

    // axios.get(`https://api.vk.com/method/wall.getById`, {
    //     params: {
    //         posts: id,
    //         access_token: token,
    //         v: 5.122
    //     }
    // }).then(res => {
    //     dispatch({
    //         type: GET_WALL,
    //         payload: res.data
    //     });
    // }).catch(err => console.log(err));
}