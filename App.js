/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View } from 'react-native';

import NewListingScreen from "./Screens/NewListingScreen"

const App: () => React$Node = () => {
  return <NewListingScreen />;
};


import FeedScreen from './Screens/FeedScreen';

//
// const App = () => {
//   return (
//       <View style = {{backgroundColor: '#fafdf3', padding: 20}}>
//         <FeedScreen/>
//       </View>
//   );
// };



export default App;
