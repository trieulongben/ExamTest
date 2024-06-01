import React from 'react';
import {AppStack, MAIN_STACK} from '../../RootNavigationStack';

const MainStack = () => {
  return <AppStack initialRouteName="HomeScreen" stackData={MAIN_STACK} />;
};
export default MainStack;
