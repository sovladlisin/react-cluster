import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { checkToken } from '../../actions/auth/login';
import { getUser } from '../../actions/walls';
import user from '../../reducers/auth/login';

import Background from '../../static/background.jpg';


export class UserPage extends Component {

    static propTypes = {
        checkToken: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        token: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        account_info: PropTypes.object.isRequired
    }

    state = {
        user: {}
    }


    componentDidMount() {
        this.props.checkToken()
    }

    renderHead = () => {
        const user = this.props.account_info
        return (
            <div className="user-info">
                <img src={user.photo_200}></img>
                <p className="user-info_name">{user.first_name} {user.last_name}</p>
            </div>
        )
    }


    renderContent = () => {
        return null
    }

    render() {
        const user = this.props.account_info
        return (
            <Fragment>
                {Object.keys(user).length ?
                    <Fragment>
                        <div className="background" style={{ backgroundImage: 'url("' + Background + '")' }}></div>
                        <div className="user-body">
                            <div className="user-navigation">
                                {this.renderHead()}
                                <div className="user-choices">
                                    <button><i class="fas fa-balance-scale-right"></i>  Права доступа</button>
                                    <button><i class="fas fa-cog"></i>  Настройки</button>
                                    <button><i class="fas fa-upload"></i>  Текущие запросы</button>
                                    <button><i class="fas fa-user-tie"></i>  Сменить аккаунт</button>
                                    <button><i class="fas fa-question-circle"></i>  Что-нибудь еще..</button>
                                </div>
                            </div>
                            <div className="user-content">
                                {this.renderContent()}
                            </div>
                        </div>

                    </Fragment>
                    : null}
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    checkToken,
};

const mapStateToProps = state => ({
    token: state.login.token,
    account_info: state.login.account_info
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
