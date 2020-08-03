import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export class Tiles extends Component {


    state = {
        elements_on_page: 14,
        page_number: 1,
        number_of_clusters: null,
        data: [], //temporary
        selected_clusters: [],
        opened_cluster: null
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
            data.push({ id: i, quant: i, thumbnail: "image_url", images: [] })
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
        const data = this.state.data

        const page_number = parseInt(this.state.page_number)
        const elements_on_page = parseInt(this.state.elements_on_page)
        const start = (page_number - 1) * elements_on_page
        const end = start + elements_on_page

        const output = data.slice(start, end)

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
                    <img url={item.thumbnail}></img>
                    <div className="selected" style={highlight_style}>
                    </div>
                </ div>
            )
        })
    }

    // ctrlDown = () => {
    //     if (!this.state.ctrl) {
    //         this.setState({ ctrl: true })
    //     }
    // }

    // ctrlUp = () => {
    //     if (this.state.ctrl) {
    //         this.setState({ ctrl: false })
    //     }
    // }

    render() {
        return (
            <Fragment>
                {/* <KeyboardEventHandler
                    handleKeys={['ctrl']}
                    handleEventType={"keydown"}
                    onKeyEvent={(key, e) => this.ctrlDown()}
                />
                <KeyboardEventHandler
                    handleKeys={['ctrl']}
                    handleEventType={"keyup"}
                    onKeyEvent={(key, e) => this.ctrlUp()}
                /> */}
                <div className="tiles">
                    {this.renderData()}
                </div>
                <div className="navigation">
                    <p>Страница: </p>
                    <input type="number" min="1" step="1" name="page_number" value={this.state.page_number} onChange={this.onChange}></input>
                    <p>Число элементов на странице: </p>
                    <input type="number" min="1" max={this.state.number_of_clusters} step="1" name="elements_on_page" value={this.state.elements_on_page} onChange={this.onChange}></input>
                    <p>Всего элементов: {this.state.number_of_clusters}</p>
                </div>
            </Fragment>
        )
    }
}

export default Tiles
