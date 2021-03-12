import React from 'react';
import {SafeAreaView, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, resizeMode} from 'react-native';

import CircleImage from '../Components/CircleImage';
import ColourPalette from '../Resources/ColourPalette';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileFeed from '../Components/ProfileFeed';
function ProfileScreen() {

    const message = () => {
        alert('Sorry This Profile Is Fixed For Testing');
    };

    return (
        <SafeAreaView style={styles.backing} >
                <View style={styles.top}>
                    <CircleImage  resizeMode={'cover'} size={110} image={require('../Resources/Images/Mark.png')} style={{borderRadius: 150,
                    backgroundColor: ColourPalette.yellow, borderWidth: 3,overflow: 'hidden'}}/>
                    <View>
                        <Text style={styles.writing}>Mark Dunlop</Text>
                        <Text style={styles.user}>@MarkD</Text>
                    </View>
                </View>
            <View style={styles.cent}>
                <Ionicons name='location-sharp' size={40} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>317 MobileApp Development Street</Text>
            </View>
            <View style={styles.cent}>
                <MaterialIcons name='location-city' size={40} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>Glasgow</Text>
            </View>
            <View style={styles.cent}>
                <MaterialCommunityIcons name='cellphone-basic' size={40} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>07317312317</Text>
            </View>
            <View style={styles.cent}>
                <MaterialCommunityIcons name='email' size={40} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>MarkD@Gmail.com</Text>
            </View>
            <View style={styles.bord}>
                <TouchableOpacity style={styles.alin} onPress={message}>
                    <Text style={{fontSize: 20, paddingTop:5,paddingBottom:3, color:'gray' }}>Edit profile</Text>
                </TouchableOpacity>
            </View>

            <ProfileFeed/>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'white',
        flex: 1,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    writing: {
        color: ColourPalette.yellow,
        fontWeight: 'bold',
        fontSize: 35,
        paddingTop: 10,
        paddingBottom:10,
        paddingLeft: 13,
    },
    fields: {
        fontSize: 20,
        paddingTop: 7,
        paddingLeft: 7,
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
    cent: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 4,
        paddingBottom: 4,
    },
    bord: {
        marginTop:1,
        borderBottomWidth: 3,
        borderColor:ColourPalette.yellow,
    },
});

export default ProfileScreen;
