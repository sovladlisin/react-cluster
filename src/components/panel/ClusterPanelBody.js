import React, { Component, Fragment } from 'react'

export class ClusterPanelBody extends Component {


    state = {
        selected_items: [],
        items: []
    }

    componentDidMount() {
        // TODO - get actual items

        // Temporary part:
        const quant = this.props.quant
        var items = []
        for (var i = 0; i < quant; i++) {
            items.push({ id: i, url: "item_url", name: "item_name" })
        }
        this.setState({ items: items })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cluster_id != nextProps.cluster_id) {

            // Temporary part:
            const quant = nextProps.quant
            var items = []
            for (var i = 0; i < quant; i++) {
                items.push({ id: i, url: "item_url", name: "item_name" })
            }
            this.setState({ items: items })
        }
    }

    selectItem = (item_id) => {
        if (this.props.getCtrl()) {
            const id = parseInt(item_id)
            var selected_items = this.state.selected_items
            if (selected_items.includes(id)) {
                const i = selected_items.indexOf(id);
                if (i > -1) {
                    selected_items.splice(i, 1);
                }
            }
            else {
                selected_items.push(id)
            }
            this.setState({ selected_items: selected_items })
        }
    }


    renderItems = () => {
        const data = this.state.items
        return data.map(item => {
            const selected_style = this.state.selected_items.includes(item.id) ? {} : { visibility: "hidden" }
            return (
                <Fragment>
                    <div className="item" onClick={() => this.selectItem(item.id)}>
                        <div className="item-highlight" style={selected_style}>
                            <p><i class="fas fa-check"></i></p>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }


    render() {
        return (
            <Fragment>
                <div className="right-panel">
                    <div className="panel-body">
                        <button id="close" onClick={this.props.closeCluster}><i className="fas fa-times"></i></button>
                        <p className="title">Набор №{this.props.cluster_id}</p>

                        <div className="clusters">
                            <p className="block-title">Объектов выбрано: {this.state.selected_items.length}</p>
                            <div className="items">
                                {this.renderItems()}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ClusterPanelBody
