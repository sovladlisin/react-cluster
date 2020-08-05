import './static/css/all.css';
import './static/css/tiles.css';
import './static/css/panels.css';
import './static/css/fixer.css';
import './static/css/header.css';
import Search from './components/header/Search';
import LeftPanelBody from './components/panel/LeftPanelBody';
import Tiles from './components/display/Tiles';

import { Transition } from 'react-transition-group'

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import ClusterPanelBody from './components/panel/ClusterPanelBody';
import Slide from './components/display/Slide';


class App extends Component {

  state = {
    left_panel_state: false,
    cluster_panel_state: false,
    ctrl: false,
    current_cluster_id: null,

    current_slide_url: "",
    slide_state: false,

    quant: 0
  }

  toggleLeftPanel = () => {
    this.setState({ left_panel_state: !this.state.left_panel_state })
  }

  ctrlDown = () => {
    if (!this.state.ctrl) {
      console.log("+")
      this.setState({ ctrl: true })
    }
  }

  ctrlUp = () => {
    if (this.state.ctrl) {
      console.log("-")
      this.setState({ ctrl: false })
    }
  }

  getCtrl = () => {
    return this.state.ctrl
  }

  openCluster = (cluster_id, quant) => {
    this.setState({ cluster_panel_state: true, quant: quant, current_cluster_id: cluster_id })
  }

  closeCluster = () => {
    this.setState({ current_cluster_id: null, cluster_panel_state: false })

  }

  getClusterPanelState = () => {
    return this.state.cluster_panel_state
  }

  componentDidMount() {
    const $loading_screen = document.getElementById("loading");
    $loading_screen.style.visibility = "hidden"
  }

  openImage = (url) => {
    this.setState({ current_slide_url: url, slide_state: true })
  }

  closeImage = () => {
    this.setState({ current_slide_url: "", slide_state: false })
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
        {!this.state.left_panel_state ?
          <button title="Панель управления" id="toggle-left-panel" onClick={this.toggleLeftPanel}>
            <p><i className="fas fa-chart-pie"></i></p>
            <div className="highlight"></div>
          </button>
          : null}
        <Search />
        {this.state.slide_state ? <Slide closeImage={this.closeImage} url={this.state.current_slide_url} /> : null}
        <Tiles getCtrl={this.getCtrl} openCluster={this.openCluster} getClusterPanelState={this.getClusterPanelState} />
        {this.state.left_panel_state ? <LeftPanelBody toggleLeftPanel={this.toggleLeftPanel} /> : null}
        {this.state.cluster_panel_state ? <ClusterPanelBody openImage={this.openImage} getCtrl={this.getCtrl} closeCluster={this.closeCluster} quant={this.state.quant} cluster_id={this.state.current_cluster_id} /> : null}
      </Fragment>
    )
  }
}

export default App
