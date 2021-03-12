import React from 'react';
import { createStackNavigator} from "@react-navigation/stack";
import FeedScreen from "../Screens/FeedScreen";

const Stack = createStackNavigator();

const Navigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='FeedScreen' component={FeedScreen}/>
    </Stack.Navigator>
)

export default Navigator;
