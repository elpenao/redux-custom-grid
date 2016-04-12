import React, { Component, PropTypes } from 'react';
import Headers from './Headers';
import Grid from './Grid';


export default class Table extends Component {

  render () {
    if(!this.props.headers) return <div>Loading...</div>
    return (
      <div className='table'>
        <Headers headers={this.props.headers}
          resizeCol={this.props.resizeCol}
          dragCol={this.props.dragCol} />
        <Grid grid={this.props.grid} headers={this.props.headers}
          disableAll={this.props.disableAll} searching={this.props.searching}
          filteredRows={this.props.filteredRows}
        />
      </div>
    );
  }

}


