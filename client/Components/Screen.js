import React from 'react';
import {StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView} from 'react-native';


const Screen = ({children}) => {
    return (
        <ScrollView style={styles.screen}>
        <SafeAreaView >
            {children}
        </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
    }
});

export default Screen;
