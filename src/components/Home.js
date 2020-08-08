import React, { Component, Fragment } from 'react'
import Background from '../static/background.jpg';
import { Link } from 'react-router-dom';
import { handleLogin } from '../actions/auth/login'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Home extends Component {
    componentDidMount() {
        const $loading_screen = document.getElementById("loading");
        $loading_screen.style.visibility = "hidden"
    }

    static propTypes = {
        handleLogin: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                <div className="background" style={{ backgroundImage: 'url("' + Background + '")' }}></div>
                <div className="content">
                    <div className="logo"></div>
                    <p className="head">Рост трафика / Анализ аудитории</p>
                    <p className="mini-text">Набор сервисов по автоматизации анализа аудитории <br></br>и персонального менеджмента </p>
                    {/* <Link to={`/service-list`}><p className="link">Войти</p></Link> */}
                    <p className="link" onClick={this.props.handleLogin}>Войти</p>
                </div>

            </Fragment>

        )
    }
}

const mapDispatchToProps = {
    handleLogin
};

const mapStateToProps = state => ({
    user: state.login.name
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
