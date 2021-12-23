import React from 'react';

const ResultList = ({resultList=[]}) => {
  return (
    <>
    { resultList.map((data,index) => {
        if (data) {
          return (
            <div key={data.product.headline}>
              <h1>{data.product.headline}</h1>
	          </div>
          )
        }
        return null;
    }) }
    </>
  );
}

export default ResultList