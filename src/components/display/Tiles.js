import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';


Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

export class Tiles extends Component {


    state = {
        elements_on_page: 14,
        page_number: 1,
        number_of_clusters: null,
        data: [], //temporary
        selected_clusters: [],
        opened_cluster: null,
        current_page: []
        // ctrl: false
    }

    static propTypes = {
        data: PropTypes.array.isRequired
    }




    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        //TODO - recieve actual data
        var data = []
        for (var i = 1; i < 20; i++) {
            data.push({ id: i, quant: i, thumbnail: "http://shrayner.ru/sites/default/files/foxford25_03_2016.jpg", images: [] })
        }
        this.setState({ data: data, number_of_clusters: data.length })
    }

    selectCluster = (cluster_id, quant) => {
        if (this.props.getCtrl()) {
            const id = parseInt(cluster_id)
            var selected_clusters = this.state.selected_clusters
            if (selected_clusters.includes(id)) {
                const i = selected_clusters.indexOf(id);
                if (i > -1) {
                    selected_clusters.splice(i, 1);
                }
            }
            else {
                selected_clusters.push(id)
            }
            this.setState({ selected_clusters: selected_clusters })
        }
        else {
            this.props.openCluster(cluster_id, quant)
            this.setState({ opened_cluster: cluster_id })
        }
    }

    renderData = () => {
        const output = this.getCurrentPage()

        const cluster_panel_state = this.props.getClusterPanelState()
        return output.map(item => {
            const selected = this.state.selected_clusters.includes(item.id) ? true : false

            const selected_cluster_check = cluster_panel_state ? this.state.opened_cluster : null
            const opened_cluster = selected_cluster_check == item.id ? true : false

            const highlight_style = selected ? {} : { visibility: "hidden" }
            const tile_style = selected ? { boxShadow: "none" } : {}
            return (
                <div key={item.quant} className="tile" style={tile_style} onClick={() => this.selectCluster(item.id, item.quant)} >
                    <div className="counter">
                        {opened_cluster ? <i class="far fa-eye" style={{ fontSize: "11pt" }}></i> :
                            selected ? <i class="fas fa-check" style={{ fontSize: "8pt" }}></i> : item.quant}
                    </div>
                    <div className="thumbnail" style={{ backgroundImage: 'url("' + item.thumbnail + '")' }} ></div>
                    <div className="selected" style={highlight_style}>
                    </div>
                </ div>
            )
        })
    }

    selectPage = () => {
        const result = this.getCurrentPage().map(item => { return item.id })

        var selected_clusters = this.state.selected_clusters

        const new_data = selected_clusters.concat(result).unique();

        if (new_data.length == selected_clusters.length) {
            result.forEach(element => {
                if (selected_clusters.includes(element)) {
                    const i = selected_clusters.indexOf(element);
                    if (i > -1) {
                        selected_clusters.splice(i, 1);
                    }
                }
            });
            this.setState({ selected_clusters: selected_clusters, current_page: result })
        }
        else {
            this.setState({ selected_clusters: new_data, current_page: result })
        }
    }

    getCurrentPage = () => {
        const data = this.state.data

        const page_number = parseInt(this.state.page_number)
        const elements_on_page = parseInt(this.state.elements_on_page)
        const start = (page_number - 1) * elements_on_page
        const end = start + elements_on_page

        return data.slice(start, end)
    }

    selectAll = () => {
        if (this.state.selected_clusters.length != this.state.data.length) {
            this.setState({ selected_clusters: this.state.data.map(item => { return (item.id) }) })
        }
        else {
            this.setState({ selected_clusters: [] })
        }
    }

    render() {

        const check_selected_all = this.state.data.length == this.state.selected_clusters.length ? true : false

        const page = this.getCurrentPage().map(item => { return item.id })
        const new_data = this.state.selected_clusters.concat(page).unique();
        const check_selected_page = new_data.length == this.state.selected_clusters.length ? true : false

        return (
            <Fragment>
                <div className="tiles">
                    {this.renderData()}
                </div>
                <div className="panels">
                    <div className="navigation">
                        <p>Страница: </p>
                        <input type="number" min="1" step="1" name="page_number" value={this.state.page_number} onChange={this.onChange}></input>
                        <p>Число элементов на странице: </p>
                        <input type="number" min="1" max={this.state.number_of_clusters} step="1" name="elements_on_page" value={this.state.elements_on_page} onChange={this.onChange}></input>
                        <p>Всего элементов: {this.state.number_of_clusters}</p>
                    </div>
                    <button onClick={this.selectPage}>{check_selected_page ? <span>Снять выделение страницы</span> : <span>Выбрать страницу</span>}</button>
                    <button onClick={this.selectAll}>{check_selected_all ? <span>Снять выделение всех объектов</span> : <span>Выбрать все</span>}</button>
                </div>
            </Fragment>
        )
    }
}



export default Tiles
