import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Layout from '../layout';

const Routers = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout} />
  </Router>);

export default Routers;
