import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
// import RowOpener from './RowOpener'
// import classNames from 'classnames/bind';
// import styles from 'css/components/table';

// const cx = classNames.bind(styles);

const Grid = (props) => {

  function generateRows(grid, filtered) {
    return grid.map( (row, idx) => {
        return (
          <div className={filtered.indexOf(idx) === -1 ? 'trow' : 'trowHidden'} key={idx}>
            <div className='rnum'>{idx + 1}</div>
            {generateCells(row, idx)}
          </div>);
        });
  }

  function generateCells (row, idx) {
    return props.headers.map((head) => {
      return (<Cell
        cell={row[head.id]}
        key={head.id}
        cellKey={head.id}
        row={row}
        rowIdx={idx}
        cellIdx={head.idx}
        disableAll={props.disableAll}
        searching={props.searching}
      /> );
    });
  }

  return (
    <div className='trows'}>
      {generateRows(props.grid ? props.grid : [], props.filteredRows ? props.filteredRows : [])}
    </div>
  );
}

export default Grid;
