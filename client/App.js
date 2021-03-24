import React from 'react';
import 'react-native-gesture-handler';
import AuthNavigator from './Navigation/AuthNavigator';
import {LogBox} from 'react-native';

import LoginScreen from "./Screens/LoginScreen";
import FeedScreen from "./Screens/FeedScreen";
import ChatListScreen from "./Screens/ChatListScreen";
import ChatScreen from "./Screens/ChatScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import NewListingScreen from "./Screens/NewListingScreen";
import SignupScreen from './Screens/SignupScreen';
import Feed from "./Components/Feed";
import FullListing from "./Screens/FullListing";
import {Image} from "react-native-web";
import CardPaymentScreen from './Screens/CardPaymentScreen';

export default function App() {

  LogBox.ignoreLogs([
    'Require cycle:'
  ]);

  return (
       //<WelcomeScreen/>
      // <LoginScreen/>
      //<SignupScreen/>
      //<NewListingScreen/>
    //  <ProfileScreen/>
      //<ChatScreen listing_id = {1} receiver = {"bob"} username = {"user"}/>
// <FullListing listID={73}/>
 <AuthNavigator/>
//       <CardPaymentScreen/>
//<FeedScreen/>
// <ListingsNavigator/>
// <Image source = {require('Resources/Images/Alina.jpg')}/>
  );
}
