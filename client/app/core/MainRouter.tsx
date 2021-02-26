import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/';

export const MainRouter: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
      </Switch>
    </div>
  );
};
