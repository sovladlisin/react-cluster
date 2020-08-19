import axios from 'axios';
import { GET_CLUSTERS, GET_GROUP_STATUS, UPDATE_CERTIFICATE_BLOCKS, SEARCH } from './types';
import $, { data } from "jquery"

const url = "https://80.89.204.142:14289/api/"


// Метод: GET api/get_all_clusters
// Данные: 
// Результат: {'response': [{'certificates': [{'id': 1, 'image_url': 'https://sun9-62.userapi.com/MY7roA6iWI_Ykietz4EHQQP8-1eSgWgkDrINnA/5dwO5T2hgP8.jpg', 'post_id': 5066, 'text_blocks': [{'h': 0.023076923076923078, 'text': 'СЕРТИФИКАТ', 'w': 0.205607476635514, 'x': 0.19781931464174454, 'y': 0.15538461538461537}, {'h': 0.026153846153846153, 'text': 'СПЕЦИАЛИСТА', 'w': 0.2803738317757009, 'x': 0.40654205607476634, 'y': 0.15538461538461537}], 'user_id': 95976927}, {'id': 2, 'image_url': 'https://sun9-20.userapi.com/pXC9FsKje43QNSLutJv-BQkHlBDaeKCAF0jprQ/14ceOpnFxis.jpg', 'post_id': 5066, 'text_blocks': [{'h': 0.024147727272727272, 'text': 'СЕРТИФИКАТ', 'w': 0.22655122655122656, 'x': 0.1976911976911977, 'y': 0.1534090909090909}, {'h': 0.028409090909090908, 'text': 'СПЕЦИАЛИСТА', 'w': 0.25685425685425683, 'x': 0.43434343434343436, 'y': 0.1534090909090909}], 'user_id': 95976927}], 'cluster_id': 1, 'cluster_name': 'кластер #1'}, {'certificates': [{'id': 3, 'image_url': 'https://sun9-65.userapi.com/c856136/v856136174/1947d4/GgdR0yPEAeU.jpg', 'post_id': 5049, 'text_blocks': [{'h': 0.03329506314580941, 'text': 'Максим', 'w': 0.20416666666666666, 'x': 0.23055555555555557, 'y': 0.39724454649827784}, {'h': 0.04247990815154994, 'text': 'Бушмелев', 'w': 0.2361111111111111, 'x': 0.45555555555555555, 'y': 0.39724454649827784}], 'user_id': 95976927}], 'cluster_id': 2, 'cluster_name': 'кластер #2'}]}
export const getClusters = (user_id, group_id) => dispatch => {
    $.ajax({
        url: url + `get_all_clusters`,
        type: 'GET',
        dataType: 'jsonp',
    }).done(function (data) {
        dispatch({
            type: GET_CLUSTERS,
            payload: data.response
        });
    })
}

// Метод: GET api/get_status
// Данные: 
// Результат: {'response': [{'id': 1, 'name': 'session_server_test_01', 'status': '20.0%'}, {'id': 2, 'name': 'session_server_test_01', 'status': '50.0%'}, {'id': 3, 'name': 'анализ группы 1', 'status': 'in_queue'}]}
export const getGroupStatus = () => dispatch => {
    $.ajax({
        url: url + `get_status`,
        type: 'GET',
        dataType: 'jsonp',
    }).done(function (data) {
        dispatch({
            type: GET_GROUP_STATUS,
            payload: data.response
        });
    })
}

// Метод: POST api/update_cetrificate_blocks
// Данные: {'certificate_id': 1, 'text_blocks': [{'h': 0.023076923076923078, 'text': 'СЕРТИФИКАТ', 'w': 0.205607476635514, 'x': 0.19781931464174454, 'y': 0.15538461538461537}, {'h': 0.026153846153846153, 'text': 'СПЕЦИАЛИСТА', 'w': 0.2803738317757009, 'x': 0.40654205607476634, 'y': 0.15538461538461537}]}
// Результат: {"response":"success"}
export const updateCertificateBlocks = (id, blocks) => dispatch => {
    const data = { 'certificate_id': id, 'text_blocks': blocks }
    $.ajax({
        url: url + `update_cetrificate_blocks`,
        type: "GET",
        data: data,
        dataType: 'jsonp',
    }).done(function (data) {
        dispatch({
            type: UPDATE_CERTIFICATE_BLOCKS,
            payload: data.response
        });
    })
}


// Метод: POST api/search
// Данные: {'fuilds': {'text': 'Иван Иванов'}}
// Результат: [метод на доработке]
export const search = (text) => dispatch => {
    const data = { 'fields': { 'text': text } }
    $.ajax({
        url: url + `search`,
        type: "POST",
        data: data,
        dataType: 'jsonp',
        success: function (data) {
            dispatch({
                type: SEARCH,
                payload: data.response
            });
        },
    });
}


