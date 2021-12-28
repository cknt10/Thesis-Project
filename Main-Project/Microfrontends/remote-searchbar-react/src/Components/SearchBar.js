import React from 'react';

const SearchBar = (/*{input,updateInput}*/props) => {

  const updateInput = props.onChange;

  const BarStyling = {
    width:"-webkit-fill-available", 
    background:"#F2F1F9", 
    border:"3px solid #C50FA3", 
    borderRadius: "12px",
    padding:"0.5rem"
  };
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={props.input}
     placeholder={"Suche"}
     onChange={(e) => updateInput(e.target.value)}
    />
  );
}

export default SearchBar