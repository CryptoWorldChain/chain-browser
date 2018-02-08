/**
 * Created by brew on 16/02/2017.
 */
require('styles/App.css');

import React from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {CR_PannelTitle,CR_PannelTableHead,CT_PannelTitle} from '../styles/color'

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {CT_CHART_RATE_BLK} from '../styles/color'


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

class TxBlocks extends React.Component {
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

      vblks.map((row,index) => {
        vdata.push({txs:row.data.transactions.length})
      });
    console.log("txrate::"+JSON.stringify(vdata))


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
              区块事务个数
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="performance"
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
          <BarChart className = 'txbarchart' width={width} height={height-70} data={vdata}
                    margin={{top: 10, right: 10, left: -30, bottom: 0}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Bar dataKey="txs" fill={CT_CHART_RATE_BLK} />
          </BarChart>
        </TableBody>

      </Table>
      </Measure>


    );
  }
}

TxBlocks.defaultProps = {};

export default TxBlocks;
