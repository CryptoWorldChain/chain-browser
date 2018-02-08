/**
 * Created by brew on 16/02/2017.
 */
require('styles/App.css');

import React from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {CR_PannelTitle,CR_PannelTableHead,CT_PannelTitle,CT_PannelTableHead} from '../styles/color'
import MobileTearSheet from './MobileTearSheet';

import axios from 'axios'

const   PEER_RPC = "http://114.215.223.158:7150";


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

class Networks extends React.Component {
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
      height: '180px',
      peers: new Array()
    }
    ;

  }



  componentDidMount() {

    this.tick();
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );

  }

  tick() {
    var com = this;
    axios.get(PEER_RPC+'/network/peers')
      .then(function (response) {
           console.log(response);
            var peers = response.data.peers.sort((x,y) => parseInt(x.ID.name.split('vp').pop()) - parseInt(y.ID.name.split('vp').pop()));
        //console.log(JSON.stringify(peers))
           com.setState({peers:peers})
        }).catch(function (error) {
          console.log(error);
      });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
          <TableHeaderColumn colSpan="8" tooltip="Recent Blocks" style={{textAlign: 'left',
              fontSize:"16px",color:CT_PannelTitle,backgroundColor:CR_PannelTitle}} >网络节点&nbsp;<span style={{fontSize:'13px',color:'#616161'}}>(总数：{this.state.peers.length}个)</span>
          </TableHeaderColumn>
        </TableRow>
        <TableRow style={{height:"36px",backgroundColor:CR_PannelTableHead}}>
          <TableHeaderColumn colSpan="2" style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} tooltip="NodeName#">节点号</TableHeaderColumn>
          <TableHeaderColumn colSpan="4" style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} tooltip="Address:port">地址</TableHeaderColumn>
          <TableHeaderColumn colSpan="2"style={{textAlign: 'center',height:"20px",color:CT_PannelTableHead}} tooltip="type">类型</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={this.state.showCheckboxes}
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}
      >
        {this.state.peers.map( (row, index) => (
          <TableRow key={index} selected={row.selected}>
            <TableRowColumn colSpan="2" style={{textAlign: 'center'}} >{row.ID.name}</TableRowColumn>
            <TableRowColumn colSpan="4">{row.address}</TableRowColumn>
            <TableRowColumn >{row.type}</TableRowColumn>
          </TableRow>
        ))}

      </TableBody>

    </Table>

    );
  }
}

Networks.defaultProps = {};

export default Networks;
