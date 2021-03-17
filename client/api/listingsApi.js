import client from './client'

const endpoint = '/listings';

const getListings = () => {
    return client.post("/getListings");
}

const addListing = (listingInfo) => {
    return client.post("/createListing", listingInfo);
}



export default { addListing, getListings }


