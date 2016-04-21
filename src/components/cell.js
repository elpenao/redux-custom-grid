import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateCell, showLookupModal, currentCell, updateFormulaCell, moveToCell } from '../actions/index';
import { Modal, Glyphicon, Button, Input } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';

class Cell extends Component {
	constructor(props, state){
		super(props, state)
    const { cellKey, rowIdx, grid } = this.props;
    this.state = {disabled: false};
    // leaving disabled in case we choose to use it later
		this.handleCell = this.handleCell.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setMouseEnter = this.setMouseEnter.bind(this);
		this.setMouseLeave = this.setMouseLeave.bind(this);
    this.cell = this.cell.bind(this);
    this.editable = this.editable.bind(this);
    this.keyPress = this.keyPress.bind(this);
	}


	handleChange(evt){
	  const { dispatch, cellKey, rowIdx, row } = this.props;
    dispatch(updateCell(evt.target.value, cellKey, rowIdx, null, null));
	}

  editable (evt) {
    this.setState({disabled: false});
    if(evt.target.children[0]) evt.target.children[0].focus();
    else evt.target.focus();
  }

  cell(cell, cellKey, row, rowIdx, cellIdx){
    if (cell.formatter) {
      console.log(cell.formatter)
      let cellContent = React.cloneElement(cell.formatter, cell);
      let Formatter = cell.formatter
      cellContent = <Formatter data={cell.data} />;
      return (
        <div className='cellContent'>
          {cellContent}
        </div>
      );
    }
    return (
      <ContentEditable
        className='cellContent'
        html={cell.data} // innerHTML of the editable div
        disabled={this.state.disabled || this.props.disableAll}       // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
        onDoubleClick={this.editable} // allow for cell editing after focus
        onMouseEnter={this.setMouseEnter} // handle innerHTML change
        onMouseLeave={this.setMouseLeave} // handle innerHTML change
      />
    )
  }

	setMouseEnter (evt) {
		evt.target.parentElement.parentElement.style.backgroundColor = '#e9e9e9';
	}

	setMouseLeave (evt) {
		evt.target.parentElement.parentElement.style.backgroundColor = '';
	}

	handleCell() {
    if(!this.props.cell.focused) this.props.dispatch(currentCell(this.props));
	}

  keyPress (evt) {
      if (evt.keyCode >= 37 && evt.keyCode <= 40 || evt.keyCode === 13) {
          evt.preventDefault();
          this.props.dispatch(moveToCell(evt.keyCode))
      } else {
          this.editable(evt);
      }
  }

	render () {
    const { cellKey, rowIdx, grid, cell, row } = this.props;

    return (
      <div tabIndex='-1'
				className='cell'
				style={{width: this.props.cell.width}}
				id={''+this.props.cellKey+this.props.rowIdx}
        onDoubleClick={this.editable} // allow for cell editing after focus
				onClick={this.handleCell}
				onKeyDown={this.keyPress} // for key navigation
        ref={(c) => {
          if(this.props.cell.focused && c) c.focus();
        }}
        >
        {this.cell(cell,cellKey,row,rowIdx)}
      </div>
      );
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.cell.type === "Select") {
      // don't rerender when opening a select cell
      return this.props.cell.focused === nextProps.cell.focused;
    }

    for (let keys in nextProps.cell) {
      if (nextProps.cell[keys] !== this.props.cell[keys]) {
        return true
      }
    }

    return false;
  }
}



Cell.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Cell);
