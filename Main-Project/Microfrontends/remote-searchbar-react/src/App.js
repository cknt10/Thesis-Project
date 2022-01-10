import React, { Component } from 'react';
import './App.css';
import SearchPage from './Components/SearchPage.js';

/*
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
*/

class App extends Component{

  render(){
    const handover = this.props.handover;

    let bubble;
    if(handover){

      const arrowStyle = {
        /*
        border: "solid black",
        borderWidth: "0 3px 3px 0",
        display: "inline-block",
        padding: "3px",
        transform: "rotate(-135deg)"
        */

        backgroundColor: "rgb(228, 93, 193)",
        display: "inline-block",
        padding: "3px",
        transform: "rotate(-135deg)",
        transform: "rotate(-135deg)",
        width: "14px",
        height: "14px",
        position: "absolute",
        right: "100px",
        top: "56px",
      }

      const bubbleStyle = {
        position: "absolute",
        right: 0,
        backgroundColor: "#e45dc1",
        padding: "6px",
        borderRadius: "16px",
        color: "#fff",
        bottom: "-60px",
      }

      bubble = 
        
        <div>
          <div style={ arrowStyle }><i class="arrow right"></i></div>
          <div style={ bubbleStyle }>Wir haben neue Vorschläge für dich!</div>
        </div>
      ;
      console.log("inside App", handover);
    }
    const AppStyle = {
      position: "relative"
    }
    return (
      <div style={ AppStyle } className="App">
      <SearchPage />
      {bubble?bubble:""}
    </div>
    )
  }
}

export default App