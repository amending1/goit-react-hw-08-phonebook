import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RestrictedRoute({ component: Component, redirectTo, ...rest }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <Route {...rest} element={!isLoggedIn ?  <Navigate to={redirectTo} /> : <Component /> } />
    );
}

export default RestrictedRoute;