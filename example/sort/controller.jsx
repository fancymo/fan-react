import React from 'react';
import View from './view.jsx';

export default class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: ['list 01', 'list 02', 'list 03', 'list 04']
    };
  }

  render() {
    let props = {
    };
    props = Object.assign({}, this.state, props, this.props);
    return (<View {...props} />);
  }

}
