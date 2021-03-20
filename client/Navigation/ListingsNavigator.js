import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';

import FeedScreen from "../Screens/FeedScreen";
import NewListingScreen from "../Screens/NewListingScreen";
import PostedAnimationScreen from "../Screens/PostedAnimationScreen";
import FullListing from "../Screens/FullListing";
import ChatListScreen from '../Screens/ChatListScreen';

const Stack = createStackNavigator();

const ListingsNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="FeedScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='FeedScreen' component={FeedScreen}/>
            <Stack.Screen name='NewListingScreen' component={NewListingScreen}/>
            <Stack.Screen name='PostedAnimationScreen' component={PostedAnimationScreen}/>
            <Stack.Screen name='FeedScreen2' component={FeedScreen}/>
            <Stack.Screen name='FullListing' component={FullListing} initialParams={{ listID: 20 }}/>
            <Stack.Screen name='ChatListScreen' component={ChatListScreen}/>
        </Stack.Navigator>
    </NavigationContainer>

)

export default ListingsNavigator;
