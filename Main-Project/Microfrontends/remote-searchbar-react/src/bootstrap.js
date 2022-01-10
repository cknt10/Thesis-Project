import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const mount = (el, handover) => {

  if(handover){
    console.log("handover",handover);
    //do sth.
  }

  ReactDOM.render(
      <App handover={handover}/>,
    el
  );
}

const devRoot = document.querySelector('#remote_searchbar-root');

if(devRoot) {
    mount(devRoot);
}
/*
const staticRoot = document.querySelector('#shell-root');

if(staticRoot) {
  mount(staticRoot);
}
*/

export { mount }
