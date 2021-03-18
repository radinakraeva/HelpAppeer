import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';

import FeedScreen from "../Screens/FeedScreen";
import NewListingScreen from "../Screens/NewListingScreen";
import PostedAnimationScreen from "../Screens/PostedAnimationScreen";

const Stack = createStackNavigator();

const ListingsNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="FeedScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='FeedScreen' component={FeedScreen}/>
            <Stack.Screen name='NewListingScreen' component={NewListingScreen}/>
            <Stack.Screen name='PostedAnimationScreen' component={PostedAnimationScreen}/>
            <Stack.Screen name='FeedScreen2' component={FeedScreen}/>
        </Stack.Navigator>
    </NavigationContainer>

)

export default ListingsNavigator;
