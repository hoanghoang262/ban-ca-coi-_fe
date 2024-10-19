import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { isLoggedInState } from '../state/atom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (!isLoggedIn) {
    // Show toast notification and navigate to login page if not authenticated
    toast.error('You are not logged in. Please log in to continue.');
    return <Navigate to="/auth/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
