import React, { Component } from 'react';
import Classnames from 'classnames';

import './index.less';

const CLASS_PREFIX = 'fan-';
const CHECKBOX_CLASS = `${CLASS_PREFIX}checkbox`;
const CHECKBOX_ACTIVE = `${CHECKBOX_CLASS}-active`;
const CHECKBOX_DISABLED = `${CHECKBOX_CLASS}-disabled`;
const INNER_CLASS = `${CHECKBOX_CLASS}-inner`;
const INPUT_CLASS = `${CHECKBOX_CLASS}-input`;
const LABEL_CLASS = `${CHECKBOX_CLASS}-label`;

const propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  onChange: () => {},
};

class Checkbox extends Component {

  constructor(props, context) {
    super(props, context);

    const checked = !!props.checked || false;

    this.state = { checked };

    this.handleChangeState = this.handleChangeState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      const nextChecked = !!nextProps.checked;
      const prevChecked = this.state.checked;

      if (nextChecked !== prevChecked) {
        this.setState({ checked: nextChecked });
      }
    }
  }

  componentDidMount() {
    this.checkbox.addEventListener('click', this.handleChangeState);
  }

  handleChangeState(event) {
    const checked = !this.state.checked;
    this.setState({ checked });
    this.props.onChange(checked, this.props.disabled);
  }

  render() {
    const { className, checked, disabled, children, onChange, ...rest } = this.props;

    const classes = Classnames(className, CHECKBOX_CLASS, {
      [CHECKBOX_DISABLED]: disabled,
      [CHECKBOX_ACTIVE]: this.state.checked,
    });

    const reactDOM = (<div className={classes} ref={(checkbox) => { this.checkbox = checkbox; }}>
      <span className={INNER_CLASS} />
      <input {...rest} disabled={disabled} checked={this.state.checked} className={INPUT_CLASS} type="checkbox" onChange={this.handleChange} />
      <span className={LABEL_CLASS}>{children}</span>
    </div>);

    return reactDOM;
  }

}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
