import React from 'react';

import Paper from 'material-ui/Paper';
import {CR_AppBar,CR_AppBar_BtnSelected} from '../styles/color'
import {ToolbarTitle} from 'material-ui/Toolbar';
var FontAwesome = require('react-fontawesome');


class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { hidden } = this.props;

    const style = {
      height: "70px",
      width: "100%",
      marginTop: 20,
      textAlign: 'center',
      display: 'inline-block',
      color:'white',
      lineHeight:"70px",
      fontSize:"13px",
      backgroundColor:CR_AppBar
    };

    const zDepth = this.props.zDepth || 0;

    return (
      <Paper style={style} zDepth={zDepth}>
        版权所有<FontAwesome name="copyright"/> 北京泛融科技有限公司（2017）
      </Paper>
    );
  }
}

Footer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Footer;
