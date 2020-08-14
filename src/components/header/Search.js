import React, { Component, Fragment } from 'react'
import Alerts from '../alerts/Alerts'
import PropTypes from 'prop-types';


export class Search extends Component {

    state = {
        selected_filter: null,
        alert: false,
        alert_message: "",

        keys: []
    }

    static propTypes = {
        filter_menu_state: PropTypes.bool.isRequired,
        toggleFilterMenu: PropTypes.func.isRequired
    }

    downloadUserList = () => {
        console.log("TODO : download user list")
    }

    onFilterChange = (e) => {
        this.setState({ selected_filter: e.target.id })
    }

    toggleAlerts = (message) => {
        if (message.length == 0) {
            this.setState({ alert: !this.state.alert, alert_message: message })
        }
    }

    renderFilterMenu = () => {
        if (this.props.filter_menu_state) {

            const selected = {
                background: "white",
                color: "#38455b"
            }

            return (
                <Fragment>
                    <div className="filter-menu">
                        <p>Доступные фильтры:</p>
                        <div>
                            <button onClick={this.onFilterChange} id="1" style={this.state.selected_filter == '1' ? selected : null}>Фильтр 1</button>
                            <button onClick={this.onFilterChange} id="2" style={this.state.selected_filter == '2' ? selected : null}>Фильтр 2</button>
                            <button onClick={this.onFilterChange} id="3" style={this.state.selected_filter == '3' ? selected : null}>Фильтр 3</button>
                            <button onClick={this.onFilterChange} id="4" style={this.state.selected_filter == '4' ? selected : null}>Фильтр 4</button>
                            <button onClick={this.onFilterChange} id="5" style={this.state.selected_filter == '5' ? selected : null}>Фильтр 5</button>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return null
    }

    renderKeys = () => {
        return this.state.keys.map(key => {
            return (
                <Fragment>
                    <p>{key}<i className="fas fa-times" onClick={() => { this.removeKeyword(key) }}></i></p>
                </Fragment>
            )
        })
    }

    removeKeyword = (key) => {
        var keys = this.state.keys
        const id = keys.indexOf(key);
        if (id > -1) {
            keys.splice(id, 1);
        }
        this.setState({ keys: keys })
    }

    onInputChange = (e) => {
        var text = e.target.value
        if (text === ' ') {
            e.target.value = ''
        }
        else if (text[text.length - 1] === ' ') {
            e.target.value = ''
            this.setState({ keys: [...this.state.keys, text.substring(0, text.length - 1)] })
        }
    }

    onInputSubmit = (e) => {
        if (e.keyCode === 13) {
            const search = this.state.keys.map(item => { return item + ' ' })
            alert('Будет поиск по словам: ' + search)
        }
    }

    render() {
        return (
            <Fragment>
                <div className="header">
                    <div className="search">
                        <p><i className="fas fa-search"></i></p>
                        <div className="keywords">
                            {this.renderKeys()}
                        </div>
                        <input onKeyUp={this.onInputSubmit} onSubmit={this.onInputChange} onChange={this.onInputChange}></input>
                    </div>
                    <button title="Скачать пользователей" id="download-users" onClick={this.downloadUserList}>
                        <p><i className="fas fa-file-download"></i></p>
                        <div className="highlight"></div>
                    </button>
                    <button title="Список фильтров" id="filters" onClick={this.props.toggleFilterMenu}>
                        <p><i className="fas fa-clipboard-list"></i></p>
                        <div className="highlight"></div>
                    </button>
                </div>

                {this.renderFilterMenu()}
                {this.state.alert ? <Alerts toggleAlerts={this.toggleAlerts}></Alerts> : null}
            </Fragment>
        )
    }
}

export default Search
