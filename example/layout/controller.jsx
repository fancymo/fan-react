import React from 'react';
import View from './view.jsx';

export default class Layout extends React.Component {

  render() {
    let props = {
    };
    props = Object.assign({}, this.state, props, this.props);
    return (<View {...props} />);
  }

}
