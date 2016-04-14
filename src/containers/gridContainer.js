import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/table';
import * as SheetActions from '../actions/index';
// import Navigation from 'containers/Navigation';
// import BottomBar from 'components/BottomBar/BottomBar';
// import ShareModal from 'components/SpaceControls/ShareModal';
// import Lookup from 'components/Sheet/Lookup';

class gridContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {searching: false};
    // this.runUpdateCell = this.runUpdateCell.bind(this);
    // this.superMoveCell = this.superMoveCell.bind(this);
    // this.toggleMagicBar = this.toggleMagicBar.bind(this);
    // this.searchSheet = this.searchSheet.bind(this);
    // this.resizeCol = this.resizeCol.bind(this);
    // this.dragCol = this.dragCol.bind(this);
    // this.deleteSheet = this.deleteSheet.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sheetNames && this.props.sheetNames && nextProps.sheetNames.length !== this.props.sheetNames.length) this.forceUpdate()
  }

  runUpdateCell(evt, cellKey, rowIdx) {
    this.props.dispatch(SheetActions.updateCell(evt, cellKey, rowIdx, true));
  }

  superMoveCell(keyCode) {
    this.props.dispatch(SheetActions.moveToCell(keyCode));
  }

  toggleMagicBar() {
    this.props.dispatch(SheetActions.currentCell())
    if (!!this.props.searching) this.props.dispatch(SheetActions.clearFilteredRows())
  }

  resizeCol(e) {
    this.props.dispatch(SheetActions.resizeCol(e))
  }

  dragCol(e) {
    this.props.dispatch(SheetActions.dragCol(e))
  }

  searchSheet(e) {
    this.props.dispatch(SheetActions.searchSheet(e.target.value))
  }

  render() {
    if (!this.props.sheet || !this.props.sheet.grid) return <div>loading ...</div>
    return (
      <Table
        grid={this.props.sheet.grid}
        headers={this.props.sheet.columnHeaders}
        searching={this.props.searching}
        filteredRows={this.props.filteredRows}
        resizeCol={this.resizeCol}
        dragCol={this.dragCol}
      />
    );
  }
}



function mapStateToProps(store) {
  return {
    sheet: store.sheet,
  };
}

export default connect(mapStateToProps)(gridContainer);
