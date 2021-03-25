import React from 'react';
import 'react-native-gesture-handler';
import AuthNavigator from './Navigation/AuthNavigator';
import {LogBox} from 'react-native';

export default function App() {

  LogBox.ignoreLogs([
    'Require cycle:'
  ]);

  return (
 <AuthNavigator/>
  );
}
