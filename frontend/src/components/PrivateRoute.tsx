import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
// ... 其他导入 ...

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}; 