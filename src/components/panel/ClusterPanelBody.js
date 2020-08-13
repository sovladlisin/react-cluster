import React, { Component, Fragment } from 'react'

export class ClusterPanelBody extends Component {


    state = {
        selected_items: [],
        items: [],
        cluster: {},

        current_item: {}
    }

    componentDidMount() {
        this.setState({ cluster: this.props.cluster, items: this.props.cluster.certificates })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cluster != nextProps.cluster) {
            this.setState({ cluster: nextProps.cluster, items: nextProps.cluster.certificates })
        }
    }

    selectItem = (item) => {
        if (this.props.getCtrl()) {
            const id = parseInt(item.id)
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
        else {
            this.props.openImage(item)
            this.setState({ current_item: item })
        }
    }

    selectAllItems = () => {
        if (this.state.selected_items.length == this.state.items.length) {
            this.setState({ selected_items: [] })
        }
        else this.setState({ selected_items: this.state.items.map(item => { return item.id }) })
    }

    nextItem = () => {
        const current_item = this.state.current_item
        const items = this.state.items
        const id = items.indexOf(current_item)
        if (id + 1 === items.length) {
            this.props.openImage(items[0])
            this.setState({ current_item: items[0] })
        }
        else {
            this.props.openImage(items[id + 1])
            this.setState({ current_item: items[id + 1] })
        }
    }

    prevItem = () => {
        const current_item = this.state.current_item
        const items = this.state.items
        const id = items.indexOf(current_item)
        if (id - 1 < 0) {
            this.props.openImage(items[items.length - 1])
            this.setState({ current_item: items[items.length - 1] })
        }
        else {
            this.props.openImage(items[id - 1])
            this.setState({ current_item: items[id - 1] })
        }
    }

    renderItems = () => {
        const data = this.state.items
        return data.map(item => {
            const selected_style = this.state.selected_items.includes(item.id) ? {} : { visibility: "hidden" }
            return (
                <Fragment>
                    <div className="item" onClick={() => this.selectItem(item)}>
                        <div className="thumbnail" style={{ backgroundImage: 'url("' + item.image_url + '")' }} ></div>
                        <div className="item-highlight" style={selected_style}>
                            <p><i class="fas fa-check"></i></p>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }


    render() {


        const check_selected = this.state.selected_items.length == this.state.items.length ? true : false

        return (
            <Fragment>
                <div className="right-panel">
                    <div className="panel-body">
                        <button id="close" onClick={this.props.closeCluster}><i className="fas fa-times"></i></button>
                        <p className="title">Набор №{this.state.cluster.cluster_id}</p>
                        <button
                            class="select-all-items"
                            onClick={this.selectAllItems}>
                            {check_selected ?
                                <span><i className="far fa-check-circle"></i></span> :
                                <span><i className="far fa-circle"></i></span>
                            } Выделить все
                        </button>
                        <div className="clusters">
                            <p className="block-title">Объектов выбрано: {this.state.selected_items.length}</p>
                            <div className="items">
                                {this.renderItems()}
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.slide_state ?
                    <Fragment>
                        <button onClick={this.nextItem} className="item-nav" id="right"><i className="fas fa-arrow-right"></i></button>
                        <button onClick={this.prevItem} className="item-nav" id="left"><i className="fas fa-arrow-left"></i></button>
                    </Fragment> : null}

            </Fragment>
        )
    }
}

export default ClusterPanelBody;
