import React from 'react';

const ResultList = ({resultList=[]}) => {
  /*const ResultStyling = {
    position: "absolute",
    top: "48px",
    left: "0",
    right: "0",
    width: "100%",
    backgroundColor: "white"
  }
  */
  return (
    <div /*style= { ResultStyling }*/ className="search_results">
    { resultList.map((data,index) => {
        if (data) {
          return (
            <div key={data.product.headline}>
              <a href={'http://localhost:8080/pdp/' + data.product.id}>{data.product.headline}</a>
	          </div>
          )
        }
        return null;
    }) }
    </div>
  );
}

export default ResultList