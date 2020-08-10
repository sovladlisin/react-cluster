import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { getClusters } from '../../actions/clusters';
import { setCode } from '../../actions/auth/login';




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
        selected_clusters: [],
        opened_cluster: null,
        current_page: [],


        code: null
        // ctrl: false
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        code: PropTypes.string.isRequired,
        getClusters: PropTypes.func.isRequired,
        getLoginStatus: PropTypes.func.isRequired,
        setCode: PropTypes.func.isRequired
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.props.getClusters()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current_group_data != nextProps.current_group_data) {
            this.setState({ number_of_clusters: nextProps.current_group_data.length })
        }
    }

    selectCluster = (cluster) => {
        if (this.props.getCtrl()) {
            const id = parseInt(cluster.cluster_id)
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
            this.props.openCluster(cluster)
            this.setState({ opened_cluster: cluster.cluster_id })
        }
    }

    renderData = () => {
        const output = this.getCurrentPage()

        const cluster_panel_state = this.props.getClusterPanelState()
        return output.map(item => {
            const selected = this.state.selected_clusters.includes(item.cluster_id) ? true : false

            const selected_cluster_check = cluster_panel_state ? this.props.opened_cluster : null
            const opened_cluster = selected_cluster_check == item.cluster_id ? true : false

            const highlight_style = selected ? {} : { visibility: "hidden" }
            const tile_style = selected ? { boxShadow: "none" } : {}

            const quant = item.certificates.length
            const thumbnail = item.certificates[0].image_url
            return (
                <div key={item.cluster_id} className="tile" style={tile_style} onClick={() => this.selectCluster(item)} >
                    <div className="counter">
                        {opened_cluster ? <i class="far fa-eye" style={{ fontSize: "11pt" }}></i> :
                            selected ? <i class="fas fa-check" style={{ fontSize: "8pt" }}></i> : quant}
                    </div>
                    <div className="thumbnail" style={{ backgroundImage: 'url("' + thumbnail + '")' }} ></div>
                    <div className="selected" style={highlight_style}>
                    </div>
                </ div>
            )
        })
    }

    selectPage = () => {
        const result = this.getCurrentPage().map(item => { return item.cluster_id })

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
        if (this.props.current_group_data.length) {
            const data = this.props.current_group_data

            const page_number = parseInt(this.state.page_number)
            const elements_on_page = parseInt(this.state.elements_on_page)
            const start = (page_number - 1) * elements_on_page
            const end = start + elements_on_page

            return data.slice(start, end)
        }
        return []
    }

    selectAll = () => {
        if (this.state.selected_clusters.length != this.props.current_group_data.length) {
            this.setState({ selected_clusters: this.props.current_group_data.map(item => { return (item.cluster_id) }) })
        }
        else {
            this.setState({ selected_clusters: [] })
        }
    }

    render() {
        if (this.props.current_group_data.length) {
            const check_selected_all = this.props.current_group_data.length == this.state.selected_clusters.length ? true : false

            const page = this.getCurrentPage().map(item => { return item.cluster_id })
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
        return null
    }
}



const mapDispatchToProps = {
    getClusters,
    setCode
};

const mapStateToProps = state => ({
    data: state.clusters.all,
    code: state.login.code
})

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);
