import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import FeedScreen from "../Screens/FeedScreen";
import AnimationScreen from '../Screens/AnimationScreen';



const Stack = createStackNavigator();

const AuthNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AnimationScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name='AnimationScreen' component={AnimationScreen}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='SignupScreen' component={SignupScreen}/>
            <Stack.Screen name='FeedScreen' component={FeedScreen}/>
        </Stack.Navigator>
    </NavigationContainer>

)

export default AuthNavigator;
