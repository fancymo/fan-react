import React, { Component } from 'react';
import Classnames from 'classnames';
import Checkbox from '../checkbox';

import './index.less';

const CLASS_PREFIX = 'fan-';
const RADIO_CLASS = `${CLASS_PREFIX}radio`;

const propTypes = {};

const defaultProps = {};

class Radio extends Component {

  render() {
    const { className, ...rest } = this.props;

    const classes = Classnames(className, RADIO_CLASS);

    const reactDOM = <Checkbox {...rest} className={classes} />;

    return reactDOM;
  }

}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
