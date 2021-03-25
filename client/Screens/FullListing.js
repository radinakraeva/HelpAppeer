/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, Image, ScrollView, BackHandler} from 'react-native';

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
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import CircleIcon from '../Components/CircleIcon';
import CircleImage from '../Components/CircleImage';
import usersApi from '../api/usersApi';


const FullListing = (props) => {

    const navigation = useNavigation();

    const [listingData, setListingData] = useState({
        user: '',
        time: new Date(),
        profilePic: null,
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
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {getList()}, []);
    useEffect(() => {getYourLocation()},[]);

    const getList = async () => {
        await listingsApi.getListing({listingID: props.route.params.listID}).then( r => {
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

        await usersApi.getProfileImage({userN: listingData.user}).then( r =>{
            // console.log(r.data)
            if (r.data != null) {
                const data = r.data[0]
                // console.log("here")

                const photo = JSON.parse(data.Picture)

                // console.log(photo)

                setListingData({
                    ...listingData,
                    profilePic: photo
                })

            } else {
                setListingData({
                    ...listingData,
                    profilePic: null
                })
            }
        })
    }




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
        navigation.goBack();
    };

    const acceptListing = () => {
        navigation.navigate("ChatScreen", {listing_id: props.route.params.listID ,username: global.username, receiver: props.route.params.creator, nowPending: true});
    };

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

    const getPrice = () => {
        if (listingData.listing.price == 1) {
            return <Text style={styles.poundsStart}>£<Text style={styles.poundsEnd}>££</Text></Text>
        } else if (listingData.listing.price == 2) {
            return <Text style={styles.poundsStart}>££<Text style={styles.poundsEnd}>£</Text></Text>
        } else {
            return <Text style={styles.poundsStart}>£££</Text>

        }
    };

    const getCat = () => {
        if (listingData.listing.category === "food") {
            return <Text style={styles.catText}><Icon2 name='shoppingcart' size={20} color={ColourPalette.darkBlue}/>  groceries</Text>
        } else if (listingData.listing.category === "medicine") {
            return <Text style={styles.catText}><Icon2 name='medicinebox' size={20} color={ColourPalette.darkBlue}/>  medicine</Text>
        } else if (listingData.listing.category === "bills") {
            return <Text style={styles.catText}><Icon2 name='bulb1' size={20} color={ColourPalette.darkBlue}/>  bills</Text>
        } else {
            return <Text style={styles.catText}><Icon2 name='gift' size={20} color={ColourPalette.darkBlue}/>  general</Text>
        }
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

                   <View style={styles.topOfMiddle}>
                    <View style={styles.userInf}>
                        <CircleImage image={listingData.profilePic === null ? require('../Resources/Images/defaultProfile.jpg') : listingData.profilePic} size={50}/>
                        <Text style={styles.userInfTime}>{getTime()}</Text>
                    </View>
                       <View style={styles.descInf}>
                           <Text >
                               <Text style={styles.descLabel}>asking for:  </Text>
                               <Text style={styles.desc}>{listingData.listing.description}</Text>

                           </Text>
                       </View>
                   </View>

                   <View style={styles.priceAndCat}>
                       <Text style={styles.categoriesText}>{getCat()}</Text>
                       <Text style={styles.priceText}>{getPrice()}</Text>

                   </View>


                   <View style={styles.mapTopView}>
                        <Text style={styles.subtitle}>Location</Text>
                       <Text style = {styles.mapDistance}><Icon name="location" size={16} color={ColourPalette.darkBlue} />{getDistance()}km away</Text>
                   </View>
                       <View>
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
                   {global.username === listingData.user ? null :
                    <View style={styles.bottomSection}>
                        <Button title="Accept" onPress={acceptListing}/>
                    </View>
                   }


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
        marginTop:40,
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

    info:{
        flexDirection: 'row',
        // justifyContent: 'center',
        marginBottom: 5,
        flex: 3,
        width: '100%',
        justifyContent: 'space-between',

    },
    infoRight:{
        flexDirection: 'column',
        textAlign: 'right',
        flex: 1,
    },
    distAndTimeText:{
        color: ColourPalette.darkBlue,
        // paddingHorizontal: 50,
        fontSize: 17,
        opacity: 0.7
    },
    poundsStart: {
        color: ColourPalette.yellow,
        fontWeight: 'bold',
        fontSize: 22.5,
        letterSpacing: 2,

    },
    poundsEnd: {
        color: "rgba(0, 51, 102,0.75)",
        fontWeight: 'normal',
        fontSize: 22.5,

        letterSpacing: 2,
    },

    map:{
        height: 150,
        width:'100%',
    },
    uploadedImages: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: ColourPalette.white,
        // borderRadius: 20,
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

    topOfMiddle: {
        flex: 1,
        flexDirection: 'row',
    },
    userInf: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    userInfTime: {
        color: ColourPalette.darkBlue,
        opacity: 0.8,
        marginLeft: 5,
        fontStyle: 'italic'
    },
    descInf:{
        width: '75%',
        paddingLeft: 15,
        paddingTop: 10,
    },

    desc: {
        fontSize: 17,
        color: ColourPalette.darkBlue,

    },
    descLabel: {
        color: "rgba(0, 51, 102,0.75)",
        fontStyle: 'italic',
        fontSize: 17,

    },

    mapTopView: {
        flex: 1,
        flexDirection: 'row'
    },
    mapDistance: {
        flex: 1,
        color: ColourPalette.darkBlue,
        marginTop: 12,
        marginBottom: 10,
        fontSize: 15,
        position: 'absolute',
        right: 0,
    },
    priceAndCat:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,

    },
    categoriesText: {
        fontSize:20,
        // color: ColourPalette,
        fontStyle: 'italic',
        position: 'absolute',
        left: '15%',
        // paddingVertical: 10,
        // paddingHorizontal: 15,
        // borderRadius: 20,
        // backgroundColor: ColourPalette.white,


    },
    catText: {
        color: ColourPalette.darkBlue,


    },
    priceText: {
        // fontSize:20,
        position: 'absolute',
        right: '15%',
        fontStyle: 'italic',
        // paddingVertical: 10,
        // paddingHorizontal: 15,
        // // borderRadius: 20,
        // // backgroundColor: ColourPalette.white,


    },




});

export default FullListing;
