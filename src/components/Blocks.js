/**
 * Created by brew on 16/02/2017.
 */
require('styles/App.css');

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import {CR_PannelTitle,CR_PannelTableHead,CT_PannelTitle,CT_PannelTableHead} from '../styles/color'

import Toggle from 'material-ui/Toggle';
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

class RecentBlocks extends React.Component {
  static defaultProps = {
    blocks:new Array()
  };


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
      blocks: new Array()
    };

  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  setBlocks(blocks) {
    this.setState({blocks:blocks});
  }


  handleChange = (event) => {
    this.setState({height: event.target.value});
  };
  render() {
    //console.log("render::this.state:")
    return (
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="9" tooltip="Recent Blocks" style={{textAlign: 'left',
              fontSize:"16px",color:CT_PannelTitle,backgroundColor:CR_PannelTitle}} className="blockHead" >
                最近产生区块
              </TableHeaderColumn>
            </TableRow>
            <TableRow className="tbhead" style={{height:"36px",backgroundColor:CR_PannelTableHead}}>
              <TableHeaderColumn style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} tooltip="BlockID#">区块ID</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} colSpan="3" tooltip="BlockHash">当前哈希值</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} colSpan="3" tooltip="PrevHash">上块哈希</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} tooltip="Details">事务个数</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} tooltip="Details">操作</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.blocks.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn style={{textAlign: 'center'}} >{row.config.url.split('/').pop()}</TableRowColumn>
                <TableRowColumn colSpan="3">{row.data.stateHash}</TableRowColumn>
                <TableRowColumn colSpan="3">{row.data.previousBlockHash}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{row.data.transactions.length}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}><FlatButton label="..." labelStyle={{padding: '0px'}} style={{minWidth:"20px"}}/></TableRowColumn>
              </TableRow>
            ))}
          </TableBody>

        </Table>

    );
  }
}

RecentBlocks.defaultProps = {};

export default RecentBlocks;
