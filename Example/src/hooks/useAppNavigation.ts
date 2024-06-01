import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import React from 'react';

export type TAuthParamsList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type TMainParamsList = {
  HomeScreen: undefined;
};

export type TRootStackParamList = {
  AuthStack: NavigatorScreenParams<TAuthParamsList>;
  MainStack: NavigatorScreenParams<TMainParamsList>;
};

export type AppStackParamsList = TAuthParamsList & TRootStackParamList;

export type TScreenItem<T> = {
  key: number;
  name: keyof T;
  component: React.FC;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<AppStackParamsList, keyof AppStackParamsList>;
        navigation: any;
      }) => NativeStackNavigationOptions);
};

export const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
};

export const useAppRoute = <RouteName extends keyof AppStackParamsList>(
  name: RouteName,
) => {
  return useRoute<RouteProp<AppStackParamsList, typeof name>>();
};
