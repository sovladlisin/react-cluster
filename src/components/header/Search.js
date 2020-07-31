import React, { Component, Fragment } from 'react'

export class Search extends Component {

    state = {
        filterMenu: false,
        selected_filter: null
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
                    <button id="filters" onClick={this.showFilterMenu}>
                        <p><i className="fas fa-clipboard-list"></i></p>
                    </button>
                    <div className="search">
                        <input></input>
                        <p><i className="fas fa-search"></i></p>
                    </div>
                    <button id="download-users"onClick={this.downloadUserList}>
                        <p><i className="fas fa-file-download"></i></p>
                    </button>
                </div>
                {this.renderFilterMenu()}
            </Fragment>
        )
    }
}

export default Search
