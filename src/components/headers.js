import React, { Component, PropTypes } from 'react';
import {Pane,SortablePane} from './sortablepane';


function generateColumnOptions (headers) {
  return headers.map((header) => {
      return (
        <Pane
        className='thead'
        id={header.id}
        key={header.id}
        width={header.width||200}
        height={34}>
        </Pane>
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
        <div className='topCorner' ></div>
        <SortablePane
           direction="horizontal"
           margin={0}
           disableEffect={true}
           onResize={(id, dir, size, rect) => props.resizeCol(id)}
           onOrderChange={(oldPanes,newPanes) => {
            //  let bounced=_.debounce(() => props.dragCol(newPanes),500);
            //  bounced();
           }}
           >
            {generateColumnOptions(props.headers)}
        </SortablePane>
      </div>
    );
}

export default Headers;
