import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestAccesTokenAsync,
  selectCurrentUser,
} from '../../../shared/slices/currentUserSlice';
import LoginComponent from '../LoginComponent/LoginComponent';
import './UserLogin.scss';

const UserLogin = ({ children }: any) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(
      requestAccesTokenAsync({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        code: currentUser.auth.code,
      })
    );
  }, [currentUser.auth.code]);

  //TODO: refactor this to check if user data has been fetched @ProudBloom
  const isUserLoggedIn = currentUser.auth.accessToken !== null;

  const getRenderedComponent = () => {
    return isUserLoggedIn ? <>{children}</> : <LoginComponent />;
  };
  return getRenderedComponent();
};

export default UserLogin;
