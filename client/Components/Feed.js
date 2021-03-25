import React, {useEffect, useState} from 'react';
import {Text, ScrollView,  View, FlatList, BackHandler} from 'react-native';
import Listing from './Listing';
import listingsApi from "../api/listingsApi";
import * as Location from "expo-location";
import { getDistanceBetween } from 'geolocation-distance-between';
import usersApi from "../api/usersApi";

export default function Feed({ filter, filterCats, ...props}){

    const [listings, setListings] = useState([]);
    const [location, setLocation] = React.useState({
        location: {},
    });

    const [allListings, setAllListings] = useState([]);
    const[refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadListings();
        getLocation();
    }, []);


    useEffect(() => {
        ultimateFilter();
    },[filterCats, filter])

    const ultimateFilter = () => {
        let lists = JSON.parse(JSON.stringify(allListings));

        let filteredListings = [];
        let vals = Object.values(filterCats)

        if (filter.includes(false) || vals.includes(false)) {
            for (let index = 0; index < lists.length; index++) {
                if (filter[lists[index].priceCategory.length -1] && filterCats[lists[index].category]) {
                    filteredListings.push(lists[index])
                }
            }
            setListings(filteredListings);
        } else {
            setListings(lists);
        }
           };


    const loadListings = async() => {
         await listingsApi.getListings().then(r => {
             setListings(r.data);
             setAllListings(r.data);
         })


    }


    const getLocation = async () => {
        const {granted} = await Location.requestPermissionsAsync();
        if (!granted) return;
        const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
        locationChange({lat1: latitude, lon1: longitude});
    };

    const locationChange = (input) => {
        setLocation({
            location: input,
        });
    };

    function distance(lat1, lng1, lat2, lng2) { // miles optional
        let coordinateOne = {latitude: lat1, longitude: lng1};
        let coordinateTwo = {latitude: lat2, longitude: lng2};

        let distanceBetween = getDistanceBetween(coordinateOne, coordinateTwo);

        return distanceBetween.toFixed(1);
    }

    function timeDifference(date1, date2){
        let diffMs = (date2 - Date.parse(date1));
        return Math.round(Math.floor(diffMs / 60000));
    }

    function getImage(category){
        if(category == 'food') return require('../Resources/Images/food.png')
        if(category == 'medicine') return require('../Resources/Images/medicine.png')
        if(category == 'bills') return require('../Resources/Images/bills.png')
        if(category == 'general') return require('../Resources/Images/general.png')
    }

    const listingRender = ({ item }) => (
        <Listing
            listing_id = {item.listing_id}
            title={item.title}
            category={item.category}
            image = {getImage(item.category)}
            // profilePicture={require('../Resources/Images/Michael.jpg')}
            profilePicture={item.profilePic == null ? require('../Resources/Images/defaultProfile.jpg') : item.profilePic}
            timeSincePosting={timeDifference(item.timeStamp, Date.now())}
            priceCategory={item.priceCategory}
            distance={distance(location.location.lat1, location.location.lon1, item.location.lat1, item.location.lon1)}
            user = {props.username}
            creator={item.user}
            refreshFunc={loadListings}
        />
    );

    return (
            <FlatList style = {{flex: 1}} showsVerticalScrollIndicator={false}
                data = {listings}
                keyExtractor = {item => item.listing_id.toString()}
                renderItem={listingRender}
                refreshing = {refreshing}
                onRefresh={() => loadListings()}
            />
    );
}
