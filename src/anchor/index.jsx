import React, { Component } from 'react';
import { Link } from 'react-router';
import Classnames from 'classnames';
import Menu from '../menu';

import './index.less';

const CLASS_PREFIX = 'fan-';
const ANCHOR_CLASS = `${CLASS_PREFIX}anchor`;
const ANCHOR_INDICATE = `${ANCHOR_CLASS}-indicate`;
const ANCHOR_PORT = `${ANCHOR_CLASS}-port`;
const ANCHOR_CHILD = `${ANCHOR_CLASS}-child`;

const propTypes = {
  activePage: React.PropTypes.number,
  onSelect: React.PropTypes.func
};

const defaultProps = {
  activePage: 0,
  onSelect: () => {}
};

class Anchor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      activePage: props.activePage || 0
    };
    this.handleAnchorChange = this.handleAnchorChange.bind(this);
    this.handleFocusIndicateDot = this.handleFocusIndicateDot.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('activePage' in nextProps) {
      const nextActive = nextProps.activePage;
      const prevActive = this.state.activePage;

      if (nextActive !== prevActive) {
        this.setState({ activePage: nextActive });
      }
    }
  }

  componentDidMount() {
    this.handleFocusIndicateDot();
  }

  componentDidUpdate() {
    this.handleFocusIndicateDot();
  }

  render() {
    const { className, items, activePage, children, onSelect, ...rest } = this.props;

    const classes = Classnames(className, ANCHOR_CLASS, {
    });
    const itemContent = [];
    items.forEach((item) => {
      const active = item.index === this.state.activePage && !item.items;
      itemContent.push(<Menu.Item key={item.index} active={active} onClick={() => this.handleAnchorChange(item.index)}>{item.label}</Menu.Item>);
      // console.log(item.label, active);
      if (item.items) {
        item.items.forEach((childItem) => {
          itemContent.push(<Menu.Item className={ANCHOR_CHILD} key={`child${childItem.index}`} active={childItem.index === this.state.activePage} onClick={() => this.handleAnchorChange(childItem.index)}>{childItem.label}</Menu.Item>);
        });
      }
    });

    const reactDOM = (
      <Menu {...rest} className={classes} autoFocus={false} active mode="vertical">
        <Menu.ItemGroup>
          <div className={ANCHOR_PORT} ref={(anchor) => { this.anchor = anchor; }}>
            {itemContent}
            <span className={ANCHOR_INDICATE} ref={(indicate) => { this.indicate = indicate; }} />
          </div>
        </Menu.ItemGroup>
      </Menu>
    );

    return reactDOM;
  }

  /* 改变当前 anchor
   *
   * @params index 点击元素的index
   */
  handleAnchorChange(index) {
    const self = this;
    if (index === this.state.activePage) return false;
    this.setState({ activePage: index });
    this.props.onSelect(index);
  }

  /* 根据当前 activePage 展示小圆点的位置 */
  handleFocusIndicateDot() {
    const self = this;
    const indicateDom = this.indicate;
    const offsetTop = this.anchor.querySelector('.fan-menu-item-active').offsetTop;
    indicateDom.style.transform = `translateY(${offsetTop}px)`;
  }

}

Anchor.propTypes = propTypes;
Anchor.defaultProps = defaultProps;

export default Anchor;
