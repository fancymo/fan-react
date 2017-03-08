import React, { Component } from 'react';
import { Link } from 'react-router';
import Classnames from 'classnames';
import Button from '../button';

import './index.less';

const CLASS_PREFIX = 'fan-';
const MENU_CLASS = `${CLASS_PREFIX}menu`;
const MENU_ACTIVE = `${MENU_CLASS}-active`;
const MENU_VERTICAL = `${MENU_CLASS}-vertical`;
const MENU_INLINE = `${MENU_CLASS}-inline`;
const MENU_ALIGN_RIGHT = `${MENU_CLASS}-align-right`;
const MENU_BUTTON = `${MENU_CLASS}-button`;
const MENU_ITEMGROUP = `${MENU_CLASS}-itemgroup`;
const MENU_ITEM = `${MENU_CLASS}-item`;
const MENU_ITEM_ACTIVE = `${MENU_CLASS}-item-active`;

const propTypes = {
  active: React.PropTypes.bool,
  trigger: React.PropTypes.oneOf(['hover', 'click']),
  mode: React.PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
  autoFocus: React.PropTypes.bool,   // 是否自动对焦到点击的元素
  onSelect: React.PropTypes.func
};

const defaultProps = {
  active: false,
  mode: 'horizontal',
  trigger: 'click',
  autoFocus: true,
  onSelect: () => {}
};

class Menu extends Component {

  constructor(props, context) {
    super(props, context);

    const active = false || this.props.active;

    this.state = { active };

    this.handleExpendDropdown = this.handleExpendDropdown.bind(this);
    this.handleRemoveDropdown = this.handleRemoveDropdown.bind(this);
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this);
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleMouseleave = this.handleMouseleave.bind(this);
  }

  componentDidMount() {
    this.menuItems = this.menu.querySelector(`.${MENU_ITEMGROUP}`).querySelectorAll(`.${MENU_ITEM}`);
    this.menu.addEventListener('click', this.handleExpendDropdown, false);
    if (this.props.trigger === 'hover') this.menu.addEventListener('mouseover', this.handleMouseover, false);

    if (this.props.active) {
      this.menuItems.length && this.menuItems.forEach((child) => {
        child.addEventListener('click', this.handleClickMenuItem);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('active' in nextProps) {
      const nextActive = !!nextProps.active;
      const prevActive = this.state.active;

      if (nextActive !== prevActive) {
        this.setState({ active: nextActive });
      }
    }
  }

  componentWillUnmount() {
    this.menu.removeEventListener('click', this.handleExpendDropdown);
    document.removeEventListener('click', this.handleRemoveDropdown);
    if (this.props.active) {
      this.menuItems.length && this.menuItems.forEach((child) => {
        child.removeEventListener('click', this.handleClickMenuItem);
      });
    }
  }

  render() {
    const { className, autoFocus, active, trigger, mode, align, onSelect, children, ...rest } = this.props;

    const classes = Classnames(className, MENU_CLASS, {
      [MENU_ACTIVE]: this.state.active,
      [MENU_VERTICAL]: mode === 'vertical' || mode === 'inline',
      [MENU_INLINE]: mode === 'inline',
      [MENU_ALIGN_RIGHT]: align === 'right'
    });

    const reactDOM = <div {...rest} className={classes} ref={(menu) => { this.menu = menu; }}>{children}</div>;

    return reactDOM;
  }

  /* 展开下拉 */
  handleExpendDropdown() {
    const self = this;
    const active = true;
    if (this.state.active) return false;
    this.setState({ active });
    setTimeout(() => {
      document.addEventListener('click', self.handleRemoveDropdown, false);
      self.menuItems.length && this.menuItems.forEach((child) => {
        child.addEventListener('click', self.handleClickMenuItem);
      });
    });
  }

  /* 收起下拉 */
  handleRemoveDropdown(event) {
    event.stopPropagation();

    const self = this;
    const active = false;
    this.setState({ active });
    document.removeEventListener('click', this.handleRemoveDropdown);
  }

  /* 下拉条目点击事件 */
  handleClickMenuItem(event) {
    const self = this;
    const targetNode = event.target;
    if (event.target.className.indexOf(MENU_ITEM_ACTIVE) !== -1 || !this.props.autoFocus) return false;
    self.menuItems.forEach((child) => {
      const isActive = child.className.indexOf(MENU_ITEM_ACTIVE) !== -1;
      if (isActive) {
        child.classList.remove(MENU_ITEM_ACTIVE);
      }
    });
    targetNode.classList.add(MENU_ITEM_ACTIVE);
    this.props.onSelect(targetNode.innerHTML);
  }

  handleMouseover(event) {
    if (this.leaveSetimeout) {
      clearTimeout(this.leaveSetimeout);
    }
    this.handleExpendDropdown();
    this.menu.addEventListener('mouseleave', this.handleMouseleave);
    this.menu.removeEventListener('mouseover', this.handleMouseover);
  }

  handleMouseleave(event) {
    this.leaveSetimeout = setTimeout(() => {
      this.handleRemoveDropdown(event);
      this.menu.removeEventListener('mouseleave', this.handleMouseleave);
    }, 300);

    this.menu.addEventListener('mouseover', this.handleMouseover, false);
  }

}

Menu.Button = function (props) {
  const { className, type, children, ...rest } = props;
  const classes = Classnames(className, MENU_BUTTON);
  return <Button {...rest} className={classes}>{children}</Button>;
};

Menu.ItemGroup = function (props) {
  const { className, children, ...rest } = props;
  const classes = Classnames(className, MENU_ITEMGROUP);
  return <div {...rest} className={classes}>{children}</div>;
};

Menu.Item = function (props) {
  const { className, active, children, ...rest } = props;
  const classes = Classnames(className, MENU_ITEM, {
    [MENU_ITEM_ACTIVE]: active
  });
  return <Link {...rest} className={classes}>{children}</Link>;
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
