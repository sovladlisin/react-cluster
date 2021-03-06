import React, { Component, Fragment } from 'react'
import Background from '../static/background.jpg';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCode, setToken, getAccountInfo } from '../actions/auth/login';



export class ServiceList extends Component {

    componentDidMount() {
        const $loading_screen = document.getElementById("loading");
        $loading_screen.style.visibility = "hidden"
        this.props.setToken()
    }

    static propTypes = {
        setCode: PropTypes.func.isRequired,
        setToken: PropTypes.func.isRequired,
        getAccountInfo: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
        if (this.props.token != prevProps.token) {
            this.props.getAccountInfo(this.props.token)
        }
    }


    render() {
        return (
            <Fragment>
                <div className="background" style={{ backgroundImage: 'url("' + Background + '")' }}></div>
                <div className="content">
                    <div className="logo"></div>
                    <p className="service-list-head">Список сервисов</p>
                    <div className="service-list">
                        <Link to={`/workspace`}><p className="service-link">Анализ групп Вконтакте</p></Link>
                        <Link to={`/parser`}><p className="service-link">Банк креативов</p></Link>
                    </div>
                </div>

            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    setCode,
    setToken,
    getAccountInfo
};

const mapStateToProps = state => ({
    code: state.login.code,
    token: state.login.token,
    account_info: state.login.account_info

})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
