/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, ScrollView,Text} from 'react-native';

import Listing from './Components/Listing';
import Feed from './Components/Feed';


const App = () => {
  return (
      <ScrollView style = {{backgroundColor: '#fafdf3', padding: 20} }>

          <View style={styles.body}>
              <Feed/>
          </View>

      </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default App;
