import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ResultList from './ResultList';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [resultListDefault, setResultListDefault] = useState();
  const [resultList, setResultList] = useState();

  const fetchData = async () => {
    //return await fetch('https://restcountries.eu/rest/v2/all')
    return await fetch('http://localhost:8087/searchresult', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
        //setResultList(data);
        setResultListDefault(data);
        //setResultList([]);
        //setResultListDefault([]);
        //setResultListDefault(data);
       });}

  const updateInput = async (input) => {
    
    console.log("try update", resultListDefault);
     const filtered = resultListDefault.filter(result => {
       console.log("result", result.product.headline);

      return result.product.headline.toLowerCase().includes(input.toLowerCase())
     });
     setInput(input);
     setResultList(filtered);
  }

  useEffect( () => {fetchData()},[]);

  console.log("sp", typeof input, typeof updateInput);
	
  return (
    <>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <ResultList resultList={resultList}/>
    </>
   );
}

export default SearchPage
