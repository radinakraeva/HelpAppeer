/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, ScrollView,Text} from 'react-native';

import FeedScreen from './Screens/FeedScreen';
import CircleIcon from './Components/CircleIcon';


const App = () => {
  return (
      <View style = {{backgroundColor: '#fafdf3', padding: 20}}>
              <FeedScreen/>
      </View>
  );
};

export default App;
