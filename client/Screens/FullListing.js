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
import {getDistanceBetween} from 'geolocation-distance-between';
import {useNavigation} from "@react-navigation/native";


const FullListing = (props) => {

    const navigation = useNavigation();

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

    function distance(lat1, lng1, lat2, lng2) { // miles optional
        let coordinateOne = {latitude: lat1, longitude: lng1};
        let coordinateTwo = {latitude: lat2, longitude: lng2};

        let distanceBetween = getDistanceBetween(coordinateOne, coordinateTwo);

        return distanceBetween.toFixed(1);
    }

    const getDistance = () => {
        return distance(listingData.listing.location.lat1,
            listingData.listing.location.lon1,
            userLocation.lat2,
            userLocation.lon2)
    };

    function timeDifference(date1, date2){
        let diffMs = (date2 - Date.parse(date1));
        return Math.round(Math.floor(diffMs / 60000));

    }

    const getTime = () => {
        let diff = timeDifference(listingData.time, Date.now());
        if(diff > 60){
            let hours = Math.round(diff / 60);
            if(hours == 1) return '1 hour ago'
            return Math.round(diff / 60) + ' hours ago'
        }
        return diff + ' min ago'
    };

    const goBack = () => {
        navigation.navigate('FeedScreen')
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
        } else {
            switch (listingData.listing.category) {
                case "food":
                    cover = require('../Resources/Images/food.png');
                    break;
                case "medicine":
                    cover = require('../Resources/Images/medicine.png');
                    break;
                case "bills":
                    cover = require('../Resources/Images/bills.png');
                    break;
                default:
                    cover = require('../Resources/Images/general.png');
                    break;
            }
        }
        return (
            <View>
                <Image source={cover} style={styles.image}/>
            </View>
        );

    };

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const getList = () => {
        listingsApi.getListing({listingID: props.route.params.listID}).then( r => {
            // console.log(r.data);

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
                   <Text>{getDistance()} km away (not sure if works)</Text>
                   <Text>{getTime()}</Text>

                    <Text style={styles.text}> profile!!</Text>

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
        backgroundColor: ColourPalette.darkBlue,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        //"rgba(0,41,207,1)",

        // textShadowColor: ColourPalette.grey,
        // textShadowRadius: 15,
        flex:15,

        paddingHorizontal:35,
        paddingVertical: 15,
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
        height: 300,
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
        paddingTop: 10,
    },
    bottomSection:{
        marginTop: 20,
        alignItems: 'center',
        height: '8%',
        marginBottom: 40,

    },



});

export default FullListing;
