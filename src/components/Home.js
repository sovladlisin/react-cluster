import React, { Component, Fragment } from 'react'
import Background from '../static/background.png';
import { Link } from 'react-router-dom';

export class Home extends Component {
    componentDidMount() {
        const $loading_screen = document.getElementById("loading");
        $loading_screen.style.visibility = "hidden"
    }

    render() {
        return (
            <Fragment>
                <div className="background" style={{ backgroundImage: 'url("' + Background + '")' }}></div>
                <div className="content">
                    <div className="logo"></div>
                    <p className="head">Рост трафика / Анализ аудитории</p>
                    <p className="mini-text">Набор сервисов по автоматизации анализа аудитории <br></br>и персонального менеджмента </p>
                    <Link to={`/service-list`}><p className="link">Войти</p></Link>
                </div>

            </Fragment>

        )
    }
}

export default Home
