import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AppContext } from '../contexts/AppContext.js';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const context = useContext(AppContext)

  return (
    context.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)};

export default ProtectedRoute;
