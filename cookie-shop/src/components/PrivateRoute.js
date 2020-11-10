import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./../context/authcontext";


 export const DoctorRoute = ({ component: Component, ...rest })  => {
  
  const { role } = useAuth();
  const isDoctor = role && Array.isArray(role) && role.includes("doctor")

  return (
    <Route
      {...rest}
      render={props =>
        // this guards unwanted roles
        isDoctor ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export const CaregiverRoute = ({ component: Component, ...rest })  => {
  
  const { role } = useAuth();
  const isCareGiver = role && Array.isArray(role) && role.includes("caregiver")

  return (
    <Route
      {...rest}
      render={props =>
        isCareGiver ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}