import React, { Component, Fragment } from 'react'
import onClickOutside from "react-onclickoutside";

export class ClusterPanelBody extends Component {


    state = {
        selected_items: [],
        items: [],
        cluster: {}
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
        }
    }

    selectAllItems = () => {
        if (this.state.selected_items.length == this.state.items.length) {
            this.setState({ selected_items: [] })
        }
        else this.setState({ selected_items: this.state.items.map(item => { return item.id }) })
    }

    handleClickOutside = () => {
        this.props.closeCluster()
    };


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
                        <button className="select-all-items" onClick={this.selectAllItems}>{
                            check_selected ? <p>Снять выделение</p> : <p>Выбрать все</p>}</button>
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

export default onClickOutside(ClusterPanelBody);
