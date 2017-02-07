import React from 'react';
// import C from '../../src';
import { Button, Menu } from '../../src';

export default class Layout extends React.Component {

  render() {
    console.log(Button);
    // console.log(C);
    return (<div className="layout">
    <Button>m</Button>
      <Menu mode="vertical" trigger="hover">
        <Menu.Button link>menu</Menu.Button>
          <Menu.ItemGroup>
            <Menu.Item active>menu-item 5</Menu.Item>
            <Menu.Item>menu-item 6</Menu.Item>
          </Menu.ItemGroup>
      </Menu>
    </div>);
  }

}
