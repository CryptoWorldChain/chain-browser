require('normalize.css/normalize.css');
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')
require('styles/fontello.css');
require('styles/App.css');

import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightGreen700} from 'material-ui/styles/colors';
import { ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {CR_AppBar,CR_AppBar_BtnSelected} from '../styles/color'
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import axios from 'axios'
import {  Link } from 'react-router'
import Measure from 'react-measure';


import Paper from 'material-ui/Paper';

import IconButton from 'material-ui/IconButton';

import FlatButton from 'material-ui/FlatButton';


import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RecentBlocks from './Blocks'
import CurrentBlocks from './CurrentBlock'
import Networks from './Networks'
import Performance from './Performance'
import TxRate from './TxRate'
import TxBlocks from './TxBlocks'
import LatestTxs from './LatestTxs'
import Footer from './Footer'

const   PEER_RPC = "http://114.215.223.158:7150";


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: lightGreen700
  }
});


function handleTouchTap() {
  console.log('eello:deviceWidth==');
}

const style = {

  width: '100%',
  margin: '20px 0px 20px 0px',
  textAlign: 'center',
  display: 'inline-block'
};


class AppComponent extends React.Component {


  onLayoutChange = (layout, layouts) => {
    //this.props.onLayoutChange(layout, layouts);

    //console.log("::!!layoutchange!!::"+JSON.stringify(layout));
    var sorted = layout.sort((x,y) => y.w-x.w);
    //console.log("::!!layoutchange!!::"+JSON.stringify(sorted));

    if(sorted[0].w<=6)
    {
      this.refs.grid.setState({margin:[10,20]});
    }else{
      this.refs.grid.setState({margin:[30,30]});
    }
  };
  //static propTypes = {
  //  onLayoutChange: React.PropTypes.func.isRequired
  //};
  static defaultProps = {
    className: "layout",
    rowHeight: '460px',
    margin: [20,20],
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    dimensions: {
      width: -1,
      height: -1
    }
  };


  state = {
    currentBreakpoint: 'lg',
    mounted: false,
    layouts: {lg: [
      {i: 'BLOCKS', x: 0, y: 0, w: 8, h: 4},
      {i: 'CURRENT', x: 8, y: 0, w: 4, h: 2},
      {i: 'Networks', x: 8, y: 2, w: 4, h: 2},
      {i: 'Performance', x: 0, y: 4, w: 4, h: 2}
      ,{i:'TxRate', x: 4, y: 4, w: 4, h: 2}
      ,{i:'TxBlocks', x: 8, y: 4, w: 4, h: 2}
      ,{i:'LatestTxs', x: 0, y: 6, w: 12, h: 5}


    ],md: [
      {i: 'BLOCKS', x: 0, y: 0, w: 8, h: 4},
      {i: 'CURRENT', x: 8, y: 0, w: 2, h: 2},
      {i: 'Networks', x: 8, y: 2, w: 2, h: 2},
      {i: 'Performance', x: 0, y: 4, w: 4, h: 2}
      ,{i:'TxRate', x: 4, y: 4, w: 4, h: 2}
      ,{i:'TxBlocks', x: 0, y: 6, w: 4, h: 2}
      ,{i:'LatestTxs', x: 0, y: 8, w: 8, h: 5}

    ],
      sm: [
        {i: 'BLOCKS', x: 0, y: 0, w: 6, h: 4},
        {i: 'CURRENT', x: 0, y: 4, w: 3, h: 2},
        {i: 'Networks', x: 0, y: 6, w: 3, h: 2},
        {i: 'Performance', x: 0, y: 8, w: 3, h: 2}
        ,{i:'TxRate', x: 0, y: 10, w: 4, h: 2}
        ,{i:'TxBlocks', x: 0, y: 12, w: 4, h: 2}
        ,{i:'LatestTxs', x: 0, y: 14, w: 6, h: 5}

      ],

      xs: [
        {i: 'BLOCKS', x: 0, y: 0, w: 4, h: 4},
        {i: 'CURRENT', x: 0, y: 4, w: 2, h: 2},
        {i: 'Networks', x: 0, y: 4, w:2, h: 2},
        {i: 'Performance', x: 0, y: 6, w:2, h: 2}
        ,{i:'TxRate', x: 0, y: 8, w: 2, h: 2}
        ,{i:'TxBlocks', x: 0, y: 10, w: 4, h: 2}
        ,{i:'LatestTxs', x: 0, y: 12, w: 4, h: 5}

      ],
      xxs: [
        {i: 'BLOCKS', x: 0, y: 0, w: 2, h: 4},
        {i: 'CURRENT', x: 0, y: 4, w: 2, h: 2},
        {i: 'Networks', x: 0, y: 6, w: 2, h: 2},
        {i: 'Performance', x: 0, y: 8, w:2, h: 2}
        ,{i:'TxRate', x: 0, y: 10, w: 2, h: 2}
        ,{i:'TxBlocks', x: 0, y: 12, w: 2, h: 2}
        ,{i:'LatestTxs', x: 0, y: 14, w: 2, h: 5}

      ]},
  };

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  constructor(props) {
    super(props);

  }


  componentDidMount() {

    this.tick();
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );
  }

  tick() {
    var com = this
      axios.get(PEER_RPC+'/chain')
      .then(function (response) {
        //console.log(response);
        if(response.data.height > 0) {

          com.refs.currentBlock.setState({chain:response.data})

          var syncs=new Array();
          //console.log("height=="+response.data.height)
          for(var i=response.data.height-1 ;i>=0&&i>response.data.height-10;i--){
            syncs.push(axios.get('http://114.215.223.158:7150/chain/blocks/'+i));
          }
          axios.all(syncs).then(axios.spread(function(...datas){
            var blocksnew=new Array();
            for(var data of datas)
            {
              blocksnew.push(data)
            }
            //console.log("recent blocks/blocksnew=="+JSON.stringify(blocksnew))
            var sortblock=blocksnew.sort((x,y) => x.config.url - y.config.url)
            //console.log("recent blocks=="+com.refs.recentBlocks);
            com.refs.recentBlocks.setState({blocks:sortblock});
            com.refs.performs.setState({blocks:sortblock});
            com.refs.txrate.setState({blocks:sortblock});
            com.refs.txblocks.setState({blocks:sortblock});
            com.refs.LatestTxs.setState({blocks:sortblock});
          }));
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }



  render() {
    console.log("render main---all");
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Measure
          onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
        >
          <div style={{textAlign:"center"}}>
          <AppBar
            style={{backgroundColor:CR_AppBar}}
            title="BlockChain Browser"
            iconElementLeft={
             <IconMenu
             onTouchTap={handleTouchTap}
             iconStyle={{color:'white'}}
              iconButtonElement={<IconButton iconClassName="demo-icon icon-globe"/>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
               >
              <a href="/#BLOCKS"><MenuItem primaryText="区块" /></a>
              <a href="/#CURRENT"><MenuItem primaryText="状态" /></a>
              <a href='/#Networks'><MenuItem primaryText="网络" /></a>
              <a href="/#Performance"><MenuItem primaryText="监控" /></a>
              <a href="/#LatestTxs"><MenuItem primaryText="事务" /></a>
             </IconMenu>

            }
          >
            <ToolbarGroup style={{}} id="menu">
              <ToolbarSeparator />
              <a href="/#BLOCKS"><FlatButton label="区块" backgroundColor={CR_AppBar_BtnSelected} style={{color:'white'}}/></a>
              <a href="/#CURRENT"><FlatButton label="当前" style={{color:'white'}}/></a>
              <a href='/#Networks'><FlatButton label="网络" style={{color:'white'}}/></a>
              <a href="/#Performance"><FlatButton label="监控" style={{color:'white'}}/></a>
              <a href="/#LatestTxs"><FlatButton label="事务" style={{color:'white'}}/></a>
            </ToolbarGroup>
          </AppBar>

            <ResponsiveReactGridLayout
              {...this.props}
              style={{...style,
              width:"85%"}}
              margin={[30,30]}
              rowHeight={120}
              layouts={this.state.layouts}
              isResizable={false}
              //onBreakpointChange={this.onBreakpointChange}
              onLayoutChange={this.onLayoutChange}
              // WidthProvider option
              measureBeforeMount={false}
              isDraggable={false}
              ref="grid"
              // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
              // and set `measureBeforeMount={true}`.
              useCSSTransforms={this.state.mounted}>
              <Paper key={'BLOCKS'}  ><Link name="BLOCKS"/><RecentBlocks ref="recentBlocks"/></Paper>
              <Paper key={'CURRENT'}> <Link name="CURRENT"/><CurrentBlocks ref="currentBlock"/></Paper>
              <Paper key={'Networks'}> <Link name="Networks"/><Networks ref="networks"/></Paper>
              <Paper key={'Performance'}> <Link name="Performance"/><Performance  ref="performs"/></Paper>
              <Paper key={'TxRate'}> <Link name="TxRate"/><TxRate ref="txrate"/></Paper>
              <Paper key={'TxBlocks'}> <Link name="TxBlocks"/><TxBlocks ref="txblocks"/></Paper>
              <Paper key={'LatestTxs'}> <Link name="LatestTxs"/><LatestTxs ref="LatestTxs"/></Paper>
            </ResponsiveReactGridLayout>
            <Footer/>
          </div>
          </Measure>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
