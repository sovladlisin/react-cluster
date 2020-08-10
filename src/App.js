import './static/css/all.css';
import './static/css/wall.css';
import './static/css/tiles.css';
import './static/css/panels.css';
import './static/css/fixer.css';
import './static/css/user.css';
import './static/css/header.css';
import './static/css/home.css';
import Search from './components/header/Search';
import LeftPanelBody from './components/panel/LeftPanelBody';
import Tiles from './components/display/Tiles';

import { Transition } from 'react-transition-group'

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import ClusterPanelBody from './components/panel/ClusterPanelBody';
import Slide from './components/display/Slide';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Workspace from './components/Workspace';
import Home from './components/Home';
import ServiceList from './components/ServiceList';

import { Provider } from 'react-redux';
import store from './store';
import MainParser from './components/Parser/MainParser';
import UserMenu from './components/auth/UserMenu';


class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router>
          <UserMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/service-list" component={ServiceList} />
            <Route exact path="/workspace" component={Workspace} />
            <Route exact path="/parser" component={MainParser} />
          </Switch>
        </Router>
      </Provider>

    )
  }
}

export default App
