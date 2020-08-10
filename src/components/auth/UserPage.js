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
    }


    componentDidMount() {
        this.props.checkToken()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.token != nextProps.token) {
            this.props.getUser(nextProps.token.access_token, nextProps.token.user_id)
        }
    }

    renderHead = () => {
        if (Object.keys(this.props.user).length != 0) {
            const user = this.props.user.response[0]
            return (
                <div className="user-info">
                    <img src={user.photo_200}></img>
                    <p className="user-info_name">{user.first_name} {user.last_name}</p>
                </div>
            )
        }
        return null
    }


    renderContent = () => {
        return null
    }

    render() {
        return (
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
        )
    }
}

const mapDispatchToProps = {
    checkToken,
    getUser
};

const mapStateToProps = state => ({
    token: state.login.token,
    user: state.walls.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
