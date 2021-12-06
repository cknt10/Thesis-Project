import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {
    width:"100%", 
    background:"#F2F1F9", 
    border:"1px solid #C50FA3", 
    borderRadius: "12px",
    padding:"0.5rem"
  };
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Suche"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar