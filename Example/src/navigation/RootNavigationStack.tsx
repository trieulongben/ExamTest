// import {TRootStackParamList, TScreenItem} from '@hooks/useAppNavigation';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';

import React, {useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/Authen/SignIn/SignInScreen';
import {
  TAuthParamsList,
  TMainParamsList,
  TRootStackParamList,
  TScreenItem,
} from '../hooks/useAppNavigation';
import SignUpScreen from '../screens/Authen/SignUp/SignUpScreen';
import AuthStack from './stacks/authStack/AuthStack';
import MainStack from './stacks/mainStack/MainStack';
import HomeScreen from '../screens/Main/HomeScreen';
import {ELocalStorageKey, storage} from '../utils/storage';

export const ROOT_STACK: TScreenItem<TRootStackParamList>[] = [
  {
    key: 0,
    name: 'AuthStack',
    component: AuthStack,
    options: {headerShown: false},
  },
  {
    key: 1,
    name: 'MainStack',
    component: MainStack,
    options: {headerShown: false},
  },
];

export const AUTH_STACK: TScreenItem<TAuthParamsList>[] = [
  {
    key: 0,
    name: 'SignInScreen',
    component: SignInScreen,
    options: {headerShown: false},
  },
  {
    key: 1,
    name: 'SignUpScreen',
    component: SignUpScreen,
    options: {headerShown: false},
  },
];

export const MAIN_STACK: TScreenItem<TMainParamsList>[] = [
  {
    key: 0,
    name: 'HomeScreen',
    component: HomeScreen,
    options: {headerShown: false},
  },
];

interface IAppStackProps<T> {
  stackData: TScreenItem<T>[];
  initialRouteName?: Extract<keyof T, string>;
}
export const AppStack = <T extends ParamListBase>({
  initialRouteName,
  stackData,
}: IAppStackProps<T>) => {
  const [Stack] = useState(createNativeStackNavigator<T>());

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {stackData.map(({key, component, name, options}) => (
        <Stack.Screen
          key={key}
          name={name}
          component={component}
          options={{...options}}
        />
      ))}
    </Stack.Navigator>
  );
};

const RootNavigationStack = () => {
  const isTokenExist = storage.contains(ELocalStorageKey.SESSION_TOKEN);

  return (
    <NavigationContainer>
      <AppStack
        initialRouteName={isTokenExist ? 'MainStack' : 'AuthStack'}
        stackData={ROOT_STACK}
      />
    </NavigationContainer>
  );
};
export default RootNavigationStack;
