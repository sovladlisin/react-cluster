import React from 'react';
import logo from './logo.svg';
import './static/css/all.css';
import './static/css/tiles.css';
import './static/css/fixer.css';
import './static/css/header.css';
import Search from './components/header/Search';
import LeftPanelBody from './components/panel/SidePanelBody';
import Tiles from './components/display/Tiles';

function App() {
  return (
    <div className="App">
      <Search />
      <Tiles />
      <LeftPanelBody />

    </div>
  );
}

export default App;
