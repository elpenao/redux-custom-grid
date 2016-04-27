import React, { Component, PropTypes } from 'react';
import {Pane,SortablePane} from './sortablepane';
// import ColumnOptions from './columnOptions';


function generateColumnOptions (headers) {
  return headers.map((header, i) => {
      return (
        <div className='cell cellContent colHead' style={{width: 200}} key={i}>
          {header.name}
        </div>
      )
  })
}

function findAddMargin (headers) {
  let totColWidth = headers.reduce((accum, header) => {
    return accum + header.width;
  }, 0);
  return totColWidth;
};

const Headers = (props) => {
  
  return (
      <div className='theaders'>
        <div className='topCorner' />
        {generateColumnOptions(props.headers)}
      </div>
    );
}

export default Headers;
