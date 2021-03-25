import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CircleImage from '../Components/CircleImage';
import ColourPalette from '../Resources/ColourPalette';
import ProfileFeed from '../Components/ProfileFeed';
import usersApi from '../api/usersApi';
import IconButton from '../Components/IconButton';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {

    const navigation = useNavigation();
    const userN = global.username;

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
        usersApi.getUser({userN: userN}).then( r => {

            if (r.data != null) {
                const data = r.data[0];
                let n = data["Name"];
                if (n.length >= 11){
                    n = n.slice(0,10) + "...";
                }
                const c = data["City"];
                const a = data["Address"];
                const m = data["Mobile"];
                const e = data["Email"];
                const u = userN;

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
                usersApi.getProfileImage({userN: userN}).then(t => {

                    if (t.data != null) {
                        const dataT = t.data[0];
                        const p = JSON.parse(dataT.Picture);

                        setPicData({
                            pic: {p},
                        });
                    }
                });
        }

    const openSideMenu = () => {
        navigation.openDrawer();
    };

    const cropUsername = () =>{
        let name = userData.name
        if (name.length>=12) {
             return name.slice(0,11) + "..."
        }
        return name
    }

    return (
        <SafeAreaView style={styles.backing} >
                <View style={styles.top}>
                    <View style={styles.sideMenuButton}>
                        <IconButton iconName='bars' iconBgColor={ColourPalette.darkBlue} onPress={openSideMenu} size={50}/>
                    </View>
                    <View style={styles.profilePart}>
                        <View>
                            <Text style={styles.writing}>{cropUsername()}</Text>
                            <Text style={styles.user}>{userData.username}</Text>
                        </View>
                        <View style={{width: 100}}>
                            <CircleImage  resizeMode={'cover'} size={100} image={userPic.pic.p === null ? require('../Resources/Images/defaultProfile.jpg') : userPic.pic.p} style={{borderRadius: 150,
                            backgroundColor: ColourPalette.yellow, borderWidth: 3,overflow: 'hidden'}}/>
                        </View>
                    </View>
                </View>

            <View style={styles.bord}>
            </View>
            <View style={{marginTop:1, borderBottomWidth: 3, borderColor:ColourPalette.yellow,alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize: 25, paddingTop: 7, paddingBottom: 7,color: ColourPalette.yellow,
                    fontWeight: 'bold',}} >Your Current Postings</Text>
            </View>
            <ProfileFeed style = {styles.feed} />
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
        margin: 5,
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
        marginBottom: 30,
        height: 97.5,
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
    profilePart: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        paddingRight: 15,
    },
    sideMenuButton: {
        paddingTop: 10,
        paddingRight: 15,

    },
});

export default ProfileScreen;
