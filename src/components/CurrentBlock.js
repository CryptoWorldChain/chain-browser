/**
 * Created by brew on 16/02/2017.
 */
require('styles/App.css');

import React from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {CR_PannelTitle,CR_PannelTableHead,CT_PannelTitle} from '../styles/color'
import MobileTearSheet from './MobileTearSheet';

import axios from 'axios'
const styles = {
  propContainer: {
    width: 'auto',
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class CurrentBlocks extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: 'auto',
      chain: {}
    }
    ;

  }
   render() {

    return (
    <Table
      height={this.state.height}
      width="100%"
      fixedHeader={this.state.fixedHeader}
    >
      <TableHeader
        displaySelectAll={this.state.showCheckboxes}
        adjustForCheckbox={this.state.showCheckboxes}
        enableSelectAll={this.state.enableSelectAll}
      >
        <TableRow>
          <TableHeaderColumn colSpan="5" tooltip="Recent Blocks" style={{textAlign: 'left',
              fontSize:"16px",color:CT_PannelTitle,backgroundColor:CR_PannelTitle}} >
            当前区块
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={this.state.showCheckboxes}
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}
      >
        <TableRow>
          <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}}>
            当前块高度：
          </TableRowColumn>
          <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0}} >
            {this.state.chain.height}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}}>当前块哈希：
          </TableRowColumn>
          <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0,wordWrap:"break-word",overflow:"visible",whiteSpace:"pre-line"}}>
            {this.state.chain.currentBlockHash}
          </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}} >
            上区块哈希：
          </TableRowColumn>
          <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0,wordWrap:"break-word",overflow:"visible",whiteSpace:"pre-line"}}>
            {this.state.chain.previousBlockHash}
          </TableRowColumn>
        </TableRow>

      </TableBody>

    </Table>

    );
  }
}

CurrentBlocks.defaultProps = {};

export default CurrentBlocks;
