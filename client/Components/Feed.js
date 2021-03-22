import React, {useEffect, useState} from 'react';
import {Text, ScrollView,  View, FlatList} from 'react-native';
import Listing from './Listing';
import listingsApi from "../api/listingsApi";
import * as Location from "expo-location";
import { getDistanceBetween } from 'geolocation-distance-between';
import usersApi from "../api/usersApi";

export default function Feed({sort, filter, ...props}){

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
        filterListings();

    },[filter]);

    useEffect(()=> {
        sortListings();
    },[sort])

    const filterListings = () => {
        let lists = JSON.parse(JSON.stringify(allListings));

        let filteredListings = [];
        console.log(filter);
        if (filter.includes(false)) {
            for (let index = 0; index < lists.length; index++) {
                if (filter[lists[index].priceCategory.length -1]) {
                    filteredListings.push(lists[index])
                }
            }
            console.log(filteredListings);
            setListings(filteredListings);
        } else {
            setListings(lists);
        }


    };

    const sortListings = () => {
        let lists = JSON.parse(JSON.stringify(allListings));

        if (sort === "distance") {
            console.log("sorting by distance")
            //TODO: sort by distance

        } else {
            console.log("sorting by time")
            setListings(lists);
        }
    };

    const loadListings = async() => {
        const r = await listingsApi.getListings();
        setListings(r.data);
        setAllListings(r.data);

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

    getProfileImage("username???")

    function getProfileImage(username){
        usersApi.getProfileImage({username: username}).then(r => {
            if(r.data != null){
                const data = r.data[0]
                const photo = JSON.parse(data.Picture)
                console.log(photo.pic);
                return photo.pic
            }
        })
    }

    const listingRender = ({ item }) => (
        <Listing
            listing_id = {item.listing_id}
            title={item.title}
            category={item.category}
            image = {getImage(item.category)}
            profilePicture={require('../Resources/Images/Michael.jpg')}
            //profilePicture={getProfileImage("username???")}
            timeSincePosting={timeDifference(item.timeStamp, Date.now())}
            priceCategory={item.priceCategory}
            distance={distance(location.location.lat1, location.location.lon1, item.location.lat1, item.location.lon1)}
            user = {props.username}
            creator={item.user}
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
