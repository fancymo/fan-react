import React, { Component } from 'react';
import Classnames from 'classnames';

import './index.less';

const CLASS_PREFIX = 'fan-';
const SWITCH_CLASS = `${CLASS_PREFIX}switch`;
const TRACK_CLASS = `${SWITCH_CLASS}-track`;
const SLIDER_CLASS = `${SWITCH_CLASS}-slider`;
const ACTIVE_CLASS = `${SWITCH_CLASS}-active`;
const DISABLED_CLASS = `${SWITCH_CLASS}-disabled`;

const propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

const defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {}
};

class Switch extends Component {

  constructor(props, context) {
    super(props, context);

    let checked = this.props.checked;
    if ('checked' in props) {
      checked = !!props.checked;
    }

    this.state = { checked };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      const nextChecked = !!nextProps.checked;
      const prevChecked = this.state.checked;

      if (nextChecked !== prevChecked) {
        this.setState({ checked: nextChecked });
        this.props.onChange(nextChecked, this.props.disabled);
      }
    }
  }

  render() {
    const { className, disabled, ...rest } = this.props;

    const classes = Classnames(className, SWITCH_CLASS, {
      [DISABLED_CLASS]: disabled,
      [ACTIVE_CLASS]: this.state.checked
    });

    const reactDOM = <span className={classes} onClick={this.handleClick}><span className={TRACK_CLASS} /><span className={SLIDER_CLASS} /></span>;

    return reactDOM;
  }

  handleClick(event) {
    if (!this.props.disabled) {
      const checked = !this.state.checked;
      this.setState({ checked });
      this.props.onChange(checked, this.props.disabled);
    }
  }

}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
