import React, { Component } from 'react'
import { Fragment } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { setCode, getToken } from '../../actions/auth/login';
import { getUser } from '../../actions/walls';
import { Link } from 'react-router-dom';


export class UserMenu extends Component {

    state = {
        user_settings_visibility: false
    }

    componentDidMount() {
        this.props.getToken()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.token != nextProps.token) {
            this.props.getUser(nextProps.token.access_token, nextProps.token.user_id)
        }
    }

    static propTypes = {
        setCode: PropTypes.func.isRequired,
        getToken: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        token: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    }

    toggleUserSettings = () => {
        this.setState({ user_settings_visibility: !this.state.user_settings_visibility })
    }

    renderSettings = () => {
        return (
            <Fragment>
                <Link to={`/account`}><button>Личный кабинет</button></Link>
                <button>Выйти</button>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                {this.props.user.response ?
                    <div className="user-menu">
                        <img className="user-photo" src={this.props.user.response[0].photo_200}></img>
                        <p className="user-name">{this.props.user.response[0].first_name} {this.props.user.response[0].last_name}  <i class="fas fa-user-cog" onClick={this.toggleUserSettings}></i></p>

                    </div>
                    : null
                }
                {this.state.user_settings_visibility ?
                    <div className="user-settings">
                        {this.renderSettings()}
                    </div> : null
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    setCode,
    getToken,
    getUser
};

const mapStateToProps = state => ({
    code: state.login.code,
    token: state.login.token,
    user: state.walls.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
