import React from "react";
import { Route, Redirect } from "react-router-dom";
import SecurityService from "./SecurityService";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      SecurityService.isAuth(roles) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
