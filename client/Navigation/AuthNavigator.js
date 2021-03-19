import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import FeedScreen from "../Screens/FeedScreen";
import AnimationScreen from '../Screens/AnimationScreen';
import NewListingScreen from '../Screens/NewListingScreen';
import ChatScreen from '../Screens/ChatScreen';
import ChatListScreen from '../Screens/ChatListScreen';

import ListingsNavigator from "./ListingsNavigator";
import FullListing from "../Screens/FullListing";
import PostedAnimationScreen from "../Screens/PostedAnimationScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AnimationScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='AnimationScreen' component={AnimationScreen}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='SignupScreen' component={SignupScreen}/>
            <Stack.Screen name='FeedScreen' component={FeedScreen}/>
            <Stack.Screen name='NewListingScreen' component={NewListingScreen}/>
            <Stack.Screen name='ChatListScreen' component={ChatListScreen}/>
            <Stack.Screen name='FeedScreen2' component={FeedScreen}/>
            <Stack.Screen name='FullListing' component={FullListing} initialParams={{ listID: 20 }}/>
            <Stack.Screen name='PostedAnimationScreen' component={PostedAnimationScreen}/>
            <Stack.Screen name='ChatScreen' component={ChatScreen}/>
        </Stack.Navigator>
    </NavigationContainer>

)

export default AuthNavigator;
