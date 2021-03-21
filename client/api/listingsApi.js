import client from './client'

const getListing = (listingID) => {
    return client.post("/getAListing", listingID);
};

const getSpecificListings = (userName) => {
    return client.post("/getSpecificListing", userName);
};

const getListings = () => {
    return client.post("/getListings");
}

const addListing = (listingInfo) => {
    return client.post("/createListing", listingInfo);
}



export default { addListing, getListings, getListing, getSpecificListings }


