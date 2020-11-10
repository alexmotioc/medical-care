import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./../context/authcontext";

function AdminRoute({ component: Component, ...rest }) {
  const { authTokens, role } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authTokens && role === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default AdminRoute;