import React from 'react';
import 'react-native-gesture-handler';
import AuthNavigator from './Navigation/AuthNavigator';
import {LogBox} from 'react-native';

import LoginScreen from "./Screens/LoginScreen";
import FeedScreen from "./Screens/FeedScreen";
import ChatListScreen from "./Screens/ChatListScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import NewListingScreen from "./Screens/NewListingScreen";
import SignupScreen from './Screens/SignupScreen';
import Feed from "./Components/Feed";
import ChatScreen from './Screens/ChatScreen';

export default function App() {

 /* LogBox.ignoreLogs([
    'Require cycle:'
  ]);*/

  return (
      //<WelcomeScreen/>
      //<LoginScreen/>
      //<SignupScreen/>
      //<NewListingScreen/>
      //<ProfileScreen/>
      //<FeedScreen/>
      <AuthNavigator/>
      //<ChatScreen listingName={"Aldi Please"}/>
      //<ChatListScreen/>
  );
}
