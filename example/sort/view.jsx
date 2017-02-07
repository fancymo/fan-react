import React from 'react';
import { Button, Menu, Sort } from '../../src';

import './index.less';

export default class Layout extends React.Component {

  render() {
    return (
      <div className="sort">
        <Sort sortItems={this.props.data} />
      </div>);
  }

}
