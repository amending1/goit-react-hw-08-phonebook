import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to={redirectTo} />}
    />
  );
}

export default PrivateRoute;

//tu mam komponent, które zapewniają odpowiednią obsługę trasy, w zależności od stanu zalogowania użytkownika
