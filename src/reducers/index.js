import clusters from './clusters'
import login from './auth/login'
import walls from './walls'
import { combineReducers } from 'redux';

export default combineReducers({
    clusters,
    login,
    walls
});