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

class Performance extends React.Component {

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
      performs: {
        calctime: new Date(),
        txdelay:0,
        txtps:0,
        blocktpc:0
      },
      blocks:new Array(),
      calctime: NaN
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

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  render() {
    var blkcount = this.state.blocks.length;
    var avgdelay = 0;
    var avgdelayup = 0;
    var txtps = 0;
    var blktps = 0.0;
    if(blkcount>=2){
      var vblks = this.state.blocks;
      var bktime = 0;
      vblks[0].data.transactions.map ((row, index) => (
        bktime += ((Math.abs(row.timestamp.seconds - vblks[0].data.nonHashData.localLedgerCommitTimestamp.seconds))*1000
            +(Math.abs(row.timestamp.nanos - vblks[0].data.nonHashData.localLedgerCommitTimestamp.nanos))/1000000)

      ))
      var bktime1 = 0;

      vblks[1].data.transactions.map ((row, index) => (
        bktime1 += ((Math.abs(row.timestamp.seconds - vblks[1].data.nonHashData.localLedgerCommitTimestamp.seconds))*1000
        +(Math.abs(row.timestamp.nanos - vblks[1].data.nonHashData.localLedgerCommitTimestamp.nanos))/1000000)
      ))
      var avgdelay0 = parseInt(bktime/vblks[0].data.transactions.length);
      var avgdelay1 = parseInt(bktime/vblks[1].data.transactions.length);
      avgdelay = (avgdelay0+avgdelay1)/2;
      avgdelayup = avgdelay0-avgdelay1;

      txtps = (vblks[0].data.transactions.length+vblks[1].data.transactions.length)/(vblks[0].data.nonHashData.localLedgerCommitTimestamp.seconds
        -vblks[1].data.nonHashData.localLedgerCommitTimestamp.seconds);

      var blkdelay = 1;
      vblks.map((row,index) => {
        if (index < blkcount - 1){
          blkdelay += ((Math.abs(row.data.nonHashData.localLedgerCommitTimestamp.seconds - vblks[index+1].data.nonHashData.localLedgerCommitTimestamp.seconds))*1000
          +(Math.abs(row.data.nonHashData.localLedgerCommitTimestamp.nanos - vblks[index+1].data.nonHashData.localLedgerCommitTimestamp.nanos))/1000000)
        }
      });

      blktps = blkcount/blkdelay*1000.0;


      //console.log("performs:render::"+JSON.stringify(vblks[0])+"::"+JSON.stringify(vblks[blkcou1]));
    }
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
              当前算力
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="performance"
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
          <TableRow  style={{height:'10px'}}>
            <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}}>
              统计时间：
            </TableRowColumn>
            <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0,height:'28px'}} >
              {new Date().toLocaleString()}
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}}>交易延迟：
            </TableRowColumn>
            <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0,wordWrap:"break-word",overflow:"visible",whiteSpace:"pre-line"}}>
              {avgdelay}ms
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}} >
              交易速度：
            </TableRowColumn>
            <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0,wordWrap:"break-word",overflow:"visible",whiteSpace:"pre-line"}}>
              {txtps.toFixed(3)} /sec
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn colSpan="2" style={{color:"black",padding:"10px 0px 10px 10px"}} >
              挖块速度：
            </TableRowColumn>3)
            <TableRowColumn colSpan="6" style={{color:"black",paddingLeft:0,wordWrap:"break-word",overflow:"visible",whiteSpace:"pre-line"}}>
              {blktps.toFixed(3)} /sec
            </TableRowColumn>
          </TableRow>
        </TableBody>

      </Table>

    );
  }
}

Performance.defaultProps = {};

export default Performance;
