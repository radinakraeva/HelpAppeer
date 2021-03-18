import client from './client'

const endpoint = '/listings';

const getListing = (listingID) => {
    return client.post("/getAListing", listingID);
};

const getListings = () => {
    return client.post("/getListings");
}

const addListing = (listingInfo) => {
    return client.post("/createListing", listingInfo);
}



export default { addListing, getListings, getListing }


