import React, { Component, Fragment } from 'react'
import Background from '../static/background.png';
import { Link } from 'react-router-dom';


export class ServiceList extends Component {

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
                    <p className="service-list-head">Список сервисов</p>
                    <div className="service-list">
                        <Link to={`/workspace`}><p className="service-link">Анализ групп Вконтакте</p></Link>
                        <Link to={`/`}><p className="service-link">Менеджер статей</p></Link>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default ServiceList
