import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import Layout from '../layout';
import Sort from '../sort';

const Routers = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="/sort" />
      <Route path="sort" component={Sort} />
    </Route>
  </Router>);

export default Routers;
