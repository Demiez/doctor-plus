import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/';
import { PrivateRoute } from '../modules/module.auth/';

export const MainRouter: React.FC = () => {
  return (
    <div>
      <Switch>
        {/* <PrivateRoute exact={true} path="/" component={HomePage} /> */}
        <Route exact={true} path="/" component={HomePage} />
      </Switch>
    </div>
  );
};
