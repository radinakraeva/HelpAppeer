import React, {useEffect} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Text,} from 'react-native';

import CircleImage from '../Components/CircleImage';
import ColourPalette from '../Resources/ColourPalette';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileFeed from '../Components/ProfileFeed';
import usersApi from '../api/usersApi';

const ProfileScreen = (props) => {

    const [userData, setUserData] = React.useState({
        name:  '',
        username: '',
        address: '',
        city: '',
        mobile: '',
        email: '',
        password: '',
        passwordConfirm: '',
        pic: {},
        token: 't',
        secureTextEntry: true,
    });

    useEffect(() => getData(), []);

    const getData = () => {
        usersApi.getUser({userN: props.route.params.user}).then( r => {

            if (r.data != null) {
                const data = r.data[0];
                const n = data["Name"];
                const c = data["City"];
                const a = data["Address"];
                const m = data["Mobile"];
                const e = data["Email"];
                const u = props.route.params.user;
                /*const p = data["Picture"];*/
                const p = JSON.parse(data["Picture"]);


               setUserData({
                   name:  n,
                   username: u,
                   address: a,
                   city: c,
                   mobile: m,
                   email: e,
                   pic: p,
                });

                console.log("p is " + p);
                console.log("userData.pic is " + userData.pic);

            }
        });
    }

    const message = () => {
        alert('Sorry This Profile Is Fixed For Testing');
    };

    return (
        <SafeAreaView style={styles.backing} >
                <View style={styles.top}>
                    <CircleImage  resizeMode={'cover'} size={110} image={require('../Resources/Images/Mark.png')} style={{borderRadius: 150,
                    backgroundColor: ColourPalette.yellow, borderWidth: 3,overflow: 'hidden'}}/>
                    <View>
                        <Text style={styles.writing}>{userData.name}</Text>
                        <Text style={styles.user}>{userData.username}</Text>
                    </View>
                </View>
            <View style={styles.cent}>
                <Ionicons name='location-sharp' size={30} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>{userData.address}</Text>
            </View>
            <View style={styles.cent}>
                <MaterialIcons name='location-city' size={30} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>{userData.city}</Text>
            </View>
            <View style={styles.cent}>
                <MaterialCommunityIcons name='cellphone-basic' size={30} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>{userData.mobile}</Text>
            </View>
            <View style={styles.cent}>
                <MaterialCommunityIcons name='email' size={30} style={{color:ColourPalette.yellow}}/>
                <Text style={styles.fields}>{userData.email}</Text>
            </View>
            <View style={styles.bord}>
                <TouchableOpacity style={styles.alin} onPress={message}>
                    <Text style={{fontSize: 20, paddingTop:5,paddingBottom:3, color:'gray' }}>Edit profile</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:1, borderBottomWidth: 3, borderColor:ColourPalette.yellow,alignItems: 'center',}}>
                <Text style={{fontSize: 25, paddingTop: 7, paddingBottom: 7,color: ColourPalette.yellow,
                    fontWeight: 'bold',}} >Your Current Orders</Text>
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
        fontSize: 15,
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
