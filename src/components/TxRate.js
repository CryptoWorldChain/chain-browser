/**
 * Created by brew on 16/02/2017.
 */
require('styles/App.css');

import React from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {CR_PannelTitle,CR_PannelTableHead,CT_PannelTitle} from '../styles/color'

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CT_CHART_RATE} from '../styles/color'

import Measure from 'react-measure';


import axios from 'axios'
const styles = {
  propContainer: {
    width: '100%',
    height:'220px',
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class TxRate extends React.Component {
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
      height: '220px',
      performs: {
        calctime: new Date(),
        txdelay:0,
        txtps:0,
        blocktpc:0
      },
      dimensions: {
        width: -1,
        height: -1
      }
      ,blocks:new Array()
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
    console.log("txrate::")

    const { width, height } = this.state.dimensions
    var vdata = new Array();

    var blkcount = this.state.blocks.length;
    if(blkcount>=2){
      var vblks = this.state.blocks;
      vblks.map((blk,index) => {
        //vdata.push({txs:row.data.transactions.length})

        var bktime = 0;

        blk.data.transactions.map ((row, index) => (
          bktime += ((Math.abs(row.timestamp.seconds - blk.data.nonHashData.localLedgerCommitTimestamp.seconds))*1000
          +(Math.abs(row.timestamp.nanos - blk.data.nonHashData.localLedgerCommitTimestamp.nanos))/1000000)
        ))
        var delay = parseInt(bktime/blk.data.transactions.length/1000)
        console.log("delay::"+delay)
        vdata.push({delay:delay})
      });



      //console.log("performs:render::"+JSON.stringify(vblks[0])+"::"+JSON.stringify(vblks[blkcou1]));
    }


    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
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
              平均事务延迟(秒)
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="performance"
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
          <LineChart className = 'txbarchart' width={width} height={height-70} data={vdata}
                    margin={{top: 10, right: 10, left: -30, bottom: 0}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Line dataKey="delay" type="monotone" stroke={CT_CHART_RATE} />
          </LineChart>
        </TableBody>

      </Table>
      </Measure>


    );
  }
}

TxRate.defaultProps = {};

export default TxRate;
