import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RestrictedRoute({ component: Component, redirectTo }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  } else {
    return Component;
  }
}
export default RestrictedRoute;

//tu mam komponent, które zapewniają odpowiednią obsługę trasy, w zależności od stanu zalogowania użytkownika
