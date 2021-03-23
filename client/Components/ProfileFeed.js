import React, {useEffect, useState} from 'react';
import {Text, ScrollView,  View, FlatList} from 'react-native';
import ProfileListing from './ProfileListing';
import listingsApi from "../api/listingsApi";
import * as Location from "expo-location";
import { getDistanceBetween } from 'geolocation-distance-between';

export default function ProfileFeed({sort, filter, ...props}){

    const listingsArray = []
    const [listings, setListings] = useState([]);
    const [listingsFinal, setListingsFinal] = useState([]);


    const [location, setLocation] = React.useState({
        location: {},
    });


    const[refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadListings();
        getLocation();
    }, []);

    const loadListings = async() => {
        const r = await listingsApi.getSpecificListings({userN: props.user});
        setListings(r.data);
        console.log("listings =" + listings);
        for (let i = 0; i< listings.length; i++) {
            console.log("listings[i].user " + listings[i].user );
            if (listings[i].user === props.user) {
                listingsArray.push(listings[i]);
                console.log("final listings"+listingsFinal);
            }
        }
        setListingsFinal(listingsArray);
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

    function getImage(category){
        if(category == 'food') return require('../Resources/Images/food.png')
        if(category == 'medicine') return require('../Resources/Images/medicine.png')
        if(category == 'bills') return require('../Resources/Images/bills.png')
        if(category == 'general') return require('../Resources/Images/general.png')
    }

    const listingRender = ({ item }) => (
        <ProfileListing
            listing_id = {item.listing_id}
            title={item.title}
            category={item.category}
            image = {getImage(item.category)}
            profilePicture={require('../Resources/Images/Alina.jpg')}
            priceCategory={item.priceCategory}
        />
    );

    return (
        <FlatList style = {{flex: 1}} showsVerticalScrollIndicator={false}
                  data = {listingsFinal}
                  keyExtractor = {item => item.listing_id.toString()}
                  renderItem={listingRender}
                  refreshing = {refreshing}
                  onRefresh={() => loadListings()}
        />
    );
}
