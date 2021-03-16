import React from 'react';

import LoginScreen from "./Screens/LoginScreen";
import FeedScreen from "./Screens/FeedScreen";
import ChatListScreen from "./Screens/ChatListScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import NewListingScreen from "./Screens/NewListingScreen";
import SignupScreen from './Screens/SignupScreen';

import 'react-native-gesture-handler';
import Navigator from './Navigation/Navigator';
import { LogBox } from 'react-native'
import AnimationScreen from './Screens/AnimationScreen';

export default function App() {

  LogBox.ignoreLogs([
    'Require cycle:'
  ]);

  return (
      //<AnimationScreen/>
      //<LoginScreen/>
      //<SignupScreen/>
      // <NewListingScreen/>

  <Navigator/>

  );
}
