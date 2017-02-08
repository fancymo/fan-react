import React from 'react';
import { Button, Menu, Switch } from '../../src';

import './index.less';

export default class Layout extends React.Component {

  render() {
    console.log(Switch);
    return (
      <div className="layout">
        <Button>m</Button>
        <Menu mode="vertical" trigger="hover">
          <Menu.Button link>menu</Menu.Button>
            <Menu.ItemGroup>
            <Menu.Item active>menu-item 5</Menu.Item>
            <Menu.Item>menu-item 6</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
        <Switch>开关</Switch>
        {this.props.children}
      </div>);
  }

}
