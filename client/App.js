import React, {useEffect, useRef, useState} from 'react';
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
import * as Notifications from 'expo-notifications';
import * as Constants from 'expo';
import registerForPushNotificationsAsync from '../client/Resources/pushNotifications'
import pushNotifications from '../client/Resources/pushNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    pushNotifications.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  LogBox.ignoreLogs([
    'Require cycle:'
  ]);

  return (
      // <WelcomeScreen/>
      // <LoginScreen/>
      //<SignupScreen/>
      // <NewListingScreen/>
      //<ProfileScreen/>
      //<ChatScreen listing_id = {1} receiver = {"bob"} username = {"user"}/>
// <FullListing listID={73}/>
  <AuthNavigator/>
// <FeedScreen/>
// <ListingsNavigator/>
// <Image source = {require('Resources/Images/Alina.jpg')}/>
  );
}
