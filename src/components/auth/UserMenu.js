import React, { Component } from 'react'
import { Fragment } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { setCode, getToken } from '../../actions/auth/login';
import { getUser } from '../../actions/walls';
import { Link } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";



export class UserMenu extends Component {

    state = {
        user_settings_visibility: false,
        user: {}
    }

    componentDidMount() {
    }


    // componentDidUpdate(prevProps) {
    //     if (prevProps != this.props && Object.keys(this.props.user).length && this.props.token.user_id == this.props.user.response[0].id) {
    //         this.setState({ user: this.props.user })
    //     }
    //     if (this.props.token != prevProps.token) {
    //         this.props.getUser(this.props.token.access_token, this.props.token.user_id)
    //     }
    // }

    handleClickOutside = evt => {
        this.closeUserSettings()
    };

    static propTypes = {
        setCode: PropTypes.func.isRequired,
        getToken: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        token: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        account_info: PropTypes.object.isRequired
    }

    toggleUserSettings = () => {
        this.setState({ user_settings_visibility: !this.state.user_settings_visibility })
    }

    closeUserSettings = () => {
        this.setState({ user_settings_visibility: false })
    }


    render() {
        const user = this.props.account_info

        return (
            <Fragment>
                <div>
                    {Object.keys(user).length ?
                        <div className="user-menu">
                            <img className="user-photo" onClick={this.toggleUserSettings} src={user.photo_200}></img>
                        </div>
                        : null
                    }
                    {this.state.user_settings_visibility ?
                        <div className="user-settings">
                            <Link to={`/account`}><button>Личный кабинет</button></Link>
                            <button>Выйти</button>
                        </div> : null
                    }
                </div>
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
    account_info: state.login.account_info
})

UserMenu = onClickOutside(UserMenu);
UserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenu);

export default UserMenu;
