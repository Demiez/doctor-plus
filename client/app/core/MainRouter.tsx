import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, HomePage, UsersPage, Signup } from '../views/';
import { PrivateRoute } from '../modules/module.auth/';

export const MainRouter: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        {/* <PrivateRoute exact={true} path="/" component={HomePage} /> */}
        <Route exact={true} path="/" component={HomePage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};
