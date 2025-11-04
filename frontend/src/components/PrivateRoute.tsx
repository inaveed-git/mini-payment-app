import React from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../recoil/authAtom'
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {

  const { user, isLoading } = useRecoilValue(userState);




  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  }

  return user ? <Outlet /> : <Navigate to="/auth/signup" replace />;



}

export default PrivateRoute