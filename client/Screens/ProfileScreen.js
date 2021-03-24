import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Text,} from 'react-native';

import CircleImage from '../Components/CircleImage';
import ColourPalette from '../Resources/ColourPalette';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileFeed from '../Components/ProfileFeed';
import usersApi from '../api/usersApi';
import Feed from '../Components/Feed';
import IconButton from '../Components/IconButton';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = (props) => {

    const navigation = useNavigation();

    const userN = props.route.params.user;
    console.log("userN is "+userN);

    const [userData, setUserData] = React.useState({
        name:  '',
        username: '',
        address: '',
        city: '',
        mobile: '',
        email: '',
        token: 't',
        secureTextEntry: true,
    });

    const [userPic, setPicData] = React.useState({
        pic: {},
    });


    useEffect(() => getData(), []);


    const getData = () => {
        usersApi.getUser({userN: props.route.params.user}).then( r => {
            console.log("r.data is " + r.data);

            if (r.data != null) {
                const data = r.data[0];
                const n = data["Name"];
                const c = data["City"];
                const a = data["Address"];
                const m = data["Mobile"];
                const e = data["Email"];
                const u = props.route.params.user;

                setUserData({
                    name: n,
                    username: u,
                    address: a,
                    city: c,
                    mobile: m,
                    email: e,
                });
            }
        });
                usersApi.getProfileImage({userN: props.route.params.user}).then(t => {
                    console.log("t.data is for image is " + t.data);

                    if (t.data != null) {
                        const dataT = t.data[0];
                        console.log("pic dataT" + dataT);
                        const p = JSON.parse(dataT.Picture);
                        console.log("p is " + p);

                        setPicData({
                            pic: {p},
                        });

                    }
                });
        }

    const message = () => {
        alert('Sorry This Profile Is Fixed For Testing');
    };

    const goBack = () => {
        navigation.navigate("DrawerNavigation", {screen: "Feed", params: {username: props.route.params.username}} );
    };

    return (
        <SafeAreaView style={styles.backing} >
                <View style={styles.top}>
                    <CircleImage  resizeMode={'cover'} size={100} image={userPic.pic.p === null ? require('../Resources/Images/defaultProfile.jpg') : userPic.pic.p} style={{borderRadius: 150,
                    backgroundColor: ColourPalette.yellow, borderWidth: 3,overflow: 'hidden'}}/>
                    <View>
                        <Text style={styles.writing}>{userData.name}</Text>
                        <View style={styles.backButton}>
                            <IconButton iconName={'back'} onPress={goBack} iconBgColor={ColourPalette.darkBlue} size={35}/>
                        </View>
                        <Text style={styles.user}>{userData.username}</Text>
                    </View>
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
                    fontWeight: 'bold',}} >Your Current Postings</Text>
            </View>

            <ProfileFeed style = {styles.feed} user={userN}/>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    backing: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop:30,
        padding:10
    },
    feed: {
        position: 'absolute',
        zIndex: 0,
    },
    alin: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    writing: {
        color: ColourPalette.yellow,
        fontWeight: 'bold',
        fontSize: 30,
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
    backButton: {
        flex:2,
        marginTop:40,
        marginLeft:10,
        position: 'absolute',
        bottom:70,
        left:200
    },
});

export default ProfileScreen;
