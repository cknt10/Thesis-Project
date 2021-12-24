import React from 'react';

const SearchBar = (/*{input,updateInput}*/props) => {

  console.log("props",props, props.onChange);
  const updateInput = props.onChange;
  console.log("sb", typeof input, typeof updateInput);

  const BarStyling = {
    width:"100%", 
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