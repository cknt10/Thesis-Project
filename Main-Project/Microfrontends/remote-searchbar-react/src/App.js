import React from 'react';
import './App.css';
import SearchPage from './Components/SearchPage.js';


export default () => {
  const AppStyle = {
    position: "relative"
  }
  return (
    <div style={ AppStyle } className="App">
      <SearchPage />
    </div>
  );
};