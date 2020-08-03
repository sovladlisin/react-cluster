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


class App extends Component {

  state = {
    left_panel_state: false,
    cluster_panel_state: false,
    ctrl: false,
    current_cluster_id: null,

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
        <Tiles getCtrl={this.getCtrl} openCluster={this.openCluster} />
        {this.state.left_panel_state ? <LeftPanelBody toggleLeftPanel={this.toggleLeftPanel} /> : null}
        {this.state.cluster_panel_state ? <ClusterPanelBody getCtrl={this.getCtrl} closeCluster={this.closeCluster} quant={this.state.quant} cluster_id={this.state.current_cluster_id} /> : null}
      </Fragment>
    )
  }
}

export default App
