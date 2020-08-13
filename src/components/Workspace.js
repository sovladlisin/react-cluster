import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Search from './header/Search';
import Tiles from './display/Tiles';
import LeftPanelBody from './panel/LeftPanelBody';
import ClusterPanelBody from './panel/ClusterPanelBody';
import Slide from './display/Slide';
import Background from '../static/background.jpg';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkToken } from '../actions/auth/login'
import { getClusters } from '../actions/clusters';



export class Workspace extends Component {
    state = {
        left_panel_state: false,
        cluster_panel_state: false,
        filter_menu_state: false,
        ctrl: false,
        current_cluster: [],
        current_slide_item: {},
        slide_state: false,
        quant: 0,
        current_group_data: []
    }

    static propTypes = {
        checkToken: PropTypes.func.isRequired,
        getClusters: PropTypes.func.isRequired,
        display_data: PropTypes.array.isRequired

    }

    toggleLeftPanel = () => {
        this.setState({ left_panel_state: !this.state.left_panel_state })
    }

    toggleFilterMenu = () => {
        console.log('1')
        this.setState({ filter_menu_state: !this.state.filter_menu_state })
    }

    ctrlDown = () => {
        if (!this.state.ctrl) {
            this.setState({ ctrl: true })
        }
    }

    ctrlUp = () => {
        if (this.state.ctrl) {
            this.setState({ ctrl: false })
        }
    }

    getCtrl = () => {
        return this.state.ctrl
    }

    openCluster = (cluster) => {
        this.setState({ cluster_panel_state: true, current_cluster: cluster })
    }

    closeCluster = () => {
        this.setState({ current_cluster: [], cluster_panel_state: false })
    }

    getClusterPanelState = () => {
        return this.state.cluster_panel_state
    }

    componentDidMount() {
        const $loading_screen = document.getElementById("loading");
        $loading_screen.style.visibility = "hidden"
        this.props.checkToken()
        this.props.getClusters()
    }

    openImage = (item) => {
        this.setState({ current_slide_item: item, slide_state: true })
    }

    closeImage = () => {
        this.setState({ current_slide_item: {}, slide_state: false })
    }

    closePanels = () => {
        this.setState({ left_panel_state: false, cluster_panel_state: false, filter_menu_state: false })
    }


    setGroupData = (data) => {
        this.setState({ current_group_data: data })
    }

    render() {
        return (
            <Fragment>
                <KeyboardEventHandler
                    handleKeys={['ctrl']}
                    handleEventType={"keydown"}
                    onKeyEvent={(key, e) => this.ctrlDown()}
                />
                <KeyboardEventHandler
                    handleKeys={['ctrl']}
                    handleEventType={"keyup"}
                    onKeyEvent={(key, e) => this.ctrlUp()}
                />
                {/* {!this.state.left_panel_state ?
                    <button title="Панель управления" id="toggle-left-panel" onClick={this.toggleLeftPanel}>
                        <p><i className="fas fa-chart-pie"></i></p>
                        <div className="highlight"></div>
                    </button>
                    : null} */}
                <Search toggleFilterMenu={this.toggleFilterMenu} filter_menu_state={this.state.filter_menu_state} />
                {this.state.slide_state ?
                    <Slide
                        closeImage={this.closeImage}
                        item={this.state.current_slide_item}
                    /> : null}
                <Tiles
                    current_group_data={this.props.display_data}
                    getCtrl={this.getCtrl}
                    opened_cluster={this.state.current_cluster.cluster_id}
                    openCluster={this.openCluster}
                    cluster_panel_state={this.state.cluster_panel_state} />
                {/* {this.state.left_panel_state ?
                    <LeftPanelBody
                        setGroupData={this.setGroupData}
                        toggleLeftPanel={this.toggleLeftPanel} /> : null} */}
                {this.state.cluster_panel_state ?
                    <ClusterPanelBody
                        openImage={this.openImage}
                        getCtrl={this.getCtrl}
                        closeCluster={this.closeCluster}
                        quant={this.state.quant}
                        cluster={this.state.current_cluster}
                        slide_state={this.state.slide_state} /> : null}

                <div className="closePanels" onClick={this.closePanels}></div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    checkToken,
    getClusters
};

const mapStateToProps = state => ({
    token: state.login.token,
    display_data: state.clusters.selected,
})

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
