/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,View,TextInput,StyleSheet,Dimensions,TouchableOpacity,Text} from 'react-native';
import CircleImage from '../Components/CircleImage';
import ColourPalette from '../Resources/ColourPalette';

function ProfileScreen() {
    return (
        <SafeAreaView style={styles.backing} >
                <View style={styles.top}>
                    <CircleImage size={150} image={require('../Resources/Images/Mark.png')}/>
                    <View>
                        <Text style={styles.writing}>Mark Dunlop</Text>
                        <Text style={styles.user}>@MarkD</Text>
                    </View>
                </View>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'lightskyblue',
        flex: 1,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    writing: {
        fontWeight: 'bold',
        fontSize: 35,
        paddingTop: 30,
        paddingBottom:10,
        paddingLeft: 13,
    },
    user: {
        paddingLeft: 13,
        fontSize: 25,
        color: 'gray',
    },
    top: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 10,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        height: 50,
        borderRadius: 20,
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 3,
        fontSize: 15,
        borderColor: ColourPalette.yellow,
    },
});

export default ProfileScreen;
