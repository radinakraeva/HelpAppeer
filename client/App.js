import React from 'react';
import { StyleSheet} from 'react-native';

import LoginScreen from "./Screens/LoginScreen";
import FeedScreen from "./Screens/FeedScreen";
import ChatListScreen from "./Screens/ChatListScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import NewListingScreen from "./Screens/NewListingScreen";
import SignupScreen from './Screens/SignupScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AuthNavigator from './Navigation/AuthNavigator';

export default function App() {

  LogBox.ignoreLogs([
    'Require cycle:'
  ]);

  return (
      // <WelcomeScreen/>
      // <LoginScreen/>
      // <SignupScreen/>
      // <NewListingScreen/>


  <AuthNavigator/>

  );
}
