import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ModuleAuth_AuthHelper } from './auth-helper.util';

interface IPrivateRouteProps {
  component: React.FC;
  path?: string;
  exact?: boolean;
}

export const PrivateRoute = ({ component: ReactComponent, ...rest }: IPrivateRouteProps) => {
  const createContent = (props: any) =>
    ModuleAuth_AuthHelper.checkAuthentication() ? (
      <ReactComponent {...props} />
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    );

  return <Route {...rest} render={createContent} />;
};
