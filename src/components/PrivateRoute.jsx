import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Component {...rest} />;
  } else {
    return <Navigate to={redirectTo} />;
  }
}

export default PrivateRoute;

//tu mam komponent, które zapewniają odpowiednią obsługę trasy, w zależności od stanu zalogowania użytkownika
