import React, {useEffect, useState} from 'react';
import {Text, ScrollView,  View, FlatList} from 'react-native';
import Listing from './Listing';
import listingsApi from "../api/listingsApi";
import * as Location from "expo-location";
import { getDistanceBetween } from 'geolocation-distance-between';

export default function Feed(){

    const [listings, setListings] = useState([]);
    const [date, setDate] = React.useState({
        date: {},
    });
    const [location, setLocation] = React.useState({
        location: {},
    });


    useEffect(() => {
        loadListings();
        getLocation();
        getDate()
    }, []);

    const loadListings = async() => {
        const r = await listingsApi.getListings();
        setListings(r.data);
    }

    const getLocation = async () => {
        const {granted} = await Location.requestPermissionsAsync();
        if (!granted) return;
        const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
        locationChange({lat1: latitude, lon1: longitude});
    };

    const getDate = async () => {
        let date = new Date();
        dateChange(date);
    };

    const locationChange = (input) => {
        setLocation({
            location: input,
        });
    };

    const dateChange = (input) => {
        setDate({
            date: input,
        });
    };

    function distance(lat1, lng1, lat2, lng2) { // miles optional
        let coordinateOne = {latitude: lat1, longitude: lng1};
        let coordinateTwo = {latitude: lat2, longitude: lng2};

        let distanceBetween = getDistanceBetween(coordinateOne, coordinateTwo);

        return distanceBetween.toFixed(1);
    }


    console.log(location);
    console.log(date.date);

    function timeDifference(date1, date2){
        let diffMs = (date2 - Date.parse(date1));
        return Math.floor((diffMs % 86400000) / 3600000);;
    }

    const listingRender = ({ item }) => (
        <Listing
            title={item.title}
            category={item.category}
            image = {require('../Resources/Images/Food.png')}
            profilePicture={require('../Resources/Images/Medicine.jpg')}
            timeSincePosting={timeDifference(item.timeStamp, Date.now())}
            priceCategory={item.priceCategory}
            distance={distance(location.location.lat1, location.location.lon1, item.location.lat1, item.location.lon1)}
        />
    );

    return (
            <FlatList style = {{flex: 1}}
                data = {listings}
                keyExtractor = {item => item.listing_id.toString()}
                renderItem={listingRender}
            />
    );
}
