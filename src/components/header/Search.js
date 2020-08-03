import React, { Component, Fragment } from 'react'
import Alerts from '../alerts/Alerts'

export class Search extends Component {

    state = {
        filterMenu: false,
        selected_filter: null,
        alert: false,
        alert_message: ""
    }

    showFilterMenu = () => {
        this.setState({filterMenu: !this.state.filterMenu})
    }

    downloadUserList = () => {
        console.log("TODO : download user list")
    }

    onFilterChange = (e) => {
        this.setState({selected_filter : e.target.id})
    }

    toggleAlerts = (message) => {
        if (message.length == 0){
            this.setState({alert: !this.state.alert, alert_message: message})
        }
    }

    renderFilterMenu = () => {
        if (this.state.filterMenu){

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

    render() {
        return (
            <Fragment>
                <div className="header">
                    <div className="search">
                        <input></input>
                        <p><i className="fas fa-search"></i></p>
                    </div>
                    <button title="Скачать пользователей" id="download-users"onClick={this.downloadUserList}>
                        <p><i className="fas fa-file-download"></i></p>
                        <div className="highlight"></div>
                    </button>
                    <button title="Список фильтров" id="filters" onClick={this.showFilterMenu}>
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
