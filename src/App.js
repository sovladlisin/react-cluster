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

class App extends Component {

  state = {
    left_panel_state: false
  }

  toggleLeftPanel = () => {
    this.setState({left_panel_state: !this.state.left_panel_state})
  }


  render() {
      return (
      <Fragment>
          {!this.state.left_panel_state ? 
            <button id="toggle-left-panel" onClick={this.toggleLeftPanel}><p><i className="fas fa-chart-pie"></i></p></button>  
            : null}
          <Search />
          <Tiles />
          { this.state.left_panel_state ? <LeftPanelBody toggleLeftPanel={this.toggleLeftPanel}/> : null}
      </Fragment>
    )
  }
}

export default App
