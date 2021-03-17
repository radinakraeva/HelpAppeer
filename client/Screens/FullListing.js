/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, Image, ScrollView} from 'react-native';

import Screen from '../Components/Screen';
import ColourPalette from '../Resources/ColourPalette';

import listingsApi from '../api/listingsApi';
import IconButton from '../Components/IconButton';
import Button from '../Components/Button';
import MapView, {Circle} from 'react-native-maps';
import ImagePreview from '../Components/ImagePreview';
import * as Location from 'expo-location';


const FullListing = ({listID, ...props}) => {

    const [listingData, setListingData] = useState({
        user: '',
        time: new Date(),
        listing: {
            title: '',
            category: '',
            description: '',
            price: -1,
            photo1: {},
            photo2: {},
            photo3: {},
            location: {lat1: 0.0, lon1: 0.0},
            addInfo: ''
        }

    });
    const [userLocation, setUserLocation] = useState({lat2: 0, lon2: 0});

    useEffect(() => getList(), []);
    useEffect(()=> {getYourLocation()},[]);

    const getYourLocation = async () => {
        const {granted} = await Location.requestPermissionsAsync();
        if (!granted) return;
        const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
        setUserLocation({lat2: latitude, lon2:longitude});

    };

    const calculateDistance1 = () => {
        const lat = (listingData.listing.location.lat1 - userLocation.lat2);
        const lon = (listingData.listing.location.lon1 - userLocation.lon2);
        const distance = Math.pow(lat*lat + lon)

    };


    //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    const calculateDistance = () => {
        const lat1 = listingData.listing.location.lat1;
        const lon1 = listingData.listing.location.lon1;
        const lat2 = userLocation.lat2;
        const lon2 = userLocation.lon2;

        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

        return 12742* 100 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }


    //TODO: rewrite this to just take u back
    const goBack = () => {
        const msg = "Are you sure you want to go back?\nAll your progress will be lost.";
        Alert.alert("Exit", msg,
            [{
                text: 'Cancel',
                onPress: () => console.log('shantay, you stay'),
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: () => console.log('sashay, away'),
            }],
            {cancelable: true}
        );
    };

    //TODO: fill this function
    const acceptListing = () => {};

    const getPhotos = () => {
        return (
            <View>
                {!isEmpty(listingData.listing.photo1) ? <Text style={styles.subtitle}>Pictures</Text> : null}

                <View style={styles.uploadedImages}>
                    {!isEmpty(listingData.listing.photo1) ? <ImagePreview filePath={listingData.listing.photo1}/> : null}
                    {!isEmpty(listingData.listing.photo2) ? <ImagePreview filePath={listingData.listing.photo2}/> : null}
                    {!isEmpty(listingData.listing.photo3) ? <ImagePreview filePath={listingData.listing.photo3}/> : null}
                </View>
            </View>

        );
    };

    const getPostingDate = () => {
        const date =
            listingData.time.getDate() + "/" +
            listingData.time.getMonth() + "/" +
            listingData.time.getFullYear() + " " +
            formatTime(listingData.time.getHours()) + ":" +
            formatTime(listingData.time.getMinutes());
        return date;
    };

    const formatTime = (value) => {
        if (value < 10) {
            return "0"+value;
        } else return value;
    };

    const getCoverPhoto = () => {
        let cover;
        if (!isEmpty(listingData.listing.photo1)) {
            cover = listingData.listing.photo1;
            return (
                <View>
                    <Image source={cover} style={styles.image}/>
                </View>);
        } else {
            switch (listingData.listing.category) {
                case "food":
                    cover = require('../Resources/Images/Food.png');
                    break;
                case "medicine":
                    cover = require('../Resources/Images/Medicine.jpg');
                    break;
                case "bills":
                    cover = require('../Resources/Images/Food.png');
                    break;
                case "general":
                    cover = require('../Resources/Images/Food.png');
                    break;
            }
            return (
                <View>
                    <Image source={cover}/>
                </View>
            );
        }


    };

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const getList = () => {
        listingsApi.getListing({listingID: '1'}).then( r => {

            console.log("hello");

            if (r.data != null) {
                const data = r.data[0];
                const listingInfo = JSON.parse(data.listing);
                const user = data.user;
                const postingTime = data.time;

                setListingData({
                    user: user,
                    time: new Date(postingTime),
                    listing: listingInfo
                });

            }
        });
    }

    //TODO: get user!!

        return (
            <ScrollView style={styles.screen}>
                <View>
                    <View style={styles.coverPhoto}>
                        {getCoverPhoto()}

                    <View style={styles.top}>

                        <Text style={styles.title}>{listingData.listing.title}</Text>
                    </View>
                        <View style={styles.backButton}>
                            <IconButton iconName={'close'} onPress={goBack} iconBgColor={ColourPalette.darkBlue} size={35}/>
                        </View>

                    </View>
                </View>
               <View style={styles.middlePart}>
                    {/*TODO: all of these!*/}
                   <Text>{getPostingDate()}</Text>
                   <Text>{calculateDistance()}</Text>
                    <Text style={styles.text}>distance would be nice as well, probs?</Text>
                    <Text style={styles.text}>and profile!!</Text>

                    <Text style={styles.subtitle}>Category</Text>
                    {/*TODO: show category*/}

                    <Text style={styles.subtitle}>Price</Text>
                    {/*TODO: show price; perhaps in the same line as cat?*/}

                    <Text style={styles.subtitle}>Description</Text>
                    <Text style={styles.text}>{listingData.listing.description}</Text>
                    <Text style={styles.text}>{listingData.listing.addInfo}</Text>

                    <Text style={styles.subtitle}>Location</Text>
                    <View >
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: listingData.listing.location.lat1,
                                longitude: listingData.listing.location.lon1,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.015,
                            }}
                            provider={'google'}>
                            <Circle
                                center={{
                                    latitude: listingData.listing.location.lat1,
                                    longitude: listingData.listing.location.lon1
                                }}
                                radius={350}
                                strokeWidth={1.3}
                                strokeColor={ColourPalette.yellow}
                                fillColor="rgba(253,197,0,0.5)"
                            />
                        </MapView>

                    {getPhotos()}
               </View>
                    <View style={styles.bottomSection}>
                        <Button title="Accept" onPress={acceptListing}/>
                    </View>


                </View>
            </ScrollView>

            );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
    },

    title: {
        fontSize: 35,
        fontFamily: "Roboto",
        fontWeight: "bold",
        // marginBottom: 20,
        color: ColourPalette.yellow,
        backgroundColor: "rgba(0,41,207,0.4)",
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,

        // textShadowColor: ColourPalette.grey,
        // textShadowRadius: 15,
        flex:15,

        paddingHorizontal:35,
        paddingBottom: 5,
    },
    subtitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "normal",
        color: ColourPalette.darkBlue,
    },
    text: {
        fontSize: 15,
    },
    top:{
        flexDirection: 'row',
        flex:17,
        position: 'absolute',
        bottom:0,
    },
    backButton: {
        flex:2,
        marginTop:20,
        marginRight:20,
        position: 'absolute',
        top:0,
        right:0
    },
    coverPhoto: {
        width: '100%',
        height: 250,
        zIndex: -1,
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 250,

    },

    map:{
        height: 150,
        width:'100%',
    },
    uploadedImages: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: ColourPalette.white,
        borderRadius: 20,
        justifyContent: 'center',

    },
    middlePart: {
        padding: 20,
    },
    bottomSection:{
        marginTop: 20,
        alignItems: 'center',
        height: '8%',
        marginBottom: 40,

    },



});

export default FullListing;
