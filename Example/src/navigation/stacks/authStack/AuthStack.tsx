import React from 'react';
import {AppStack, AUTH_STACK} from '../../RootNavigationStack';

const AuthStack = () => {
  return <AppStack initialRouteName="SignInScreen" stackData={AUTH_STACK} />;
};
export default AuthStack;
