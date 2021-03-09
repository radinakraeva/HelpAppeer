/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import FeedScreen from './Screens/FeedScreen';
import ProfileScreen from './Screens/ProfileScreen';
import WelcomeScreen from './Screens/WelcomeScreen';

const Stack = createStackNavigator();

function App() {
    return (
        //<ProfileScreen/>
        /*<View style = {{backgroundColor: '#fafdf3', padding: 20}}>
             <FeedScreen/>
     </View>*/
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="loginScreen">
                <Stack.Screen name="loginScreen"component={LoginScreen} />
                <Stack.Screen name="feedScreen" component={FeedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
