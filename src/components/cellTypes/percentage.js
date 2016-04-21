import React, { Component, PropTypes } from 'react';

const Percentage = (props) => {
  var percentComplete = props.data + '%';
  return (
    <div className="progress" style={{marginTop: '5px', marginRight: '5px'}}>
      <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:percentComplete}}>
      {percentComplete}
      </div>
    </div>
  );
}



export default Percentage;