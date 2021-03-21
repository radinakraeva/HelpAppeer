const express = require('express');
const formidable = require('express-formidable');

const mysql = require('mysql');

const app = express();
app.use(formidable());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jjb18169',
    password: 'shie4Ahcha2a',
    database: 'jjb18169',
    port: '3306',
});

app.listen(3001, function(){
    console.log('yay server running on port 3001');
})

connection.connect(function(error){
    if(error){
        console.log("couldn't connect" );
        console.log(error);
    }
    else{
        console.log('connected');
    }
});

app.post('/register', (req, res) => {
    console.log('received data');

    console.log(req.fields);

    const name = req.fields.name
    const username = req.fields.username
    const email = req.fields.email
    const password = req.fields.password
    const address = req.fields.address
    const city = req.fields.city
    const mobile = req.fields.mobile
    const token = req.fields.token
    const picture = req.fields.picture
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(address);
    console.log(city);
    console.log(mobile);
    console.log(token);
    console.log(picture);


    connection.query(
        "INSERT INTO Register (Name, Username, Email, Password, Address, City, Mobile, Picture, Token) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,?)",
        [name, username, email, password, address, city, mobile, picture, token],
        (err, result) => {
            if (err){
                throw err;
            }else{
                res.send('Values Inserted');
            }
            return result;
        });
})

app.post('/registers',(req, res) => {
    console.log("Getting the user data");

    const username = req.fields.userN;

    connection.query(
        "SELECT * FROM Register WHERE username = (?)", [username],
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(null);
            } else if (result) {
                if(result[0]){
                    res.send(result);
                }

            }
        }
    );
})

app.post('/verify', (req, res) => {
    console.log('received request');

    const username = req.fields.username
    const password = req.fields.password

    connection.query(
        "SELECT Password FROM Register where username = (?)", [username],
        function (error, result) {
            if (error) {
                console.log(error);
            } else if (result) {
                //check if result[0] is not falsy, if it's not, username is in the database
                if(result[0]){
                    const userPassword = result[0].Password;
                    if(userPassword == password){
                        res.send('AUTHORIZED');
                    }else{
                        res.send('INCORRECT');
                    }

                }else{
                    res.send('NO USER');
                }
            }
        });
})

app.post('/verifying', (req, res) => {
    console.log('received request');

    const username = req.fields.username
    console.log('received request');

    connection.query(
        "SELECT Username FROM Register where username = (?)", [username],
        function (error, result) {
            console.log("This Point")
            if (error) {
                console.log(error);
            } else if (result) {
                //check if result[0] is not falsy, if it's not, username is in the database
                if(result[0]){
                    console.log(result);
                    res.send('USER');
                }else{
                    res.send('NO USER');
                }
            }
        });
})

app.post('/createListing', (req, res) => {
    console.log('received data');
    console.log(req.fields);


    const listing = req.fields.listing;
    const time = req.fields.time;
    const username = req.fields.user;

    connection.query(
        "INSERT INTO Listings (listing_id, user, time, listing) VALUES (NULL, ?, ?, ?)",
        [username, time, listing],
        (err, result) => {
            if (err){
                throw err;
            }else{
                res.send('Values Inserted');
            }
            return result;
        });
})

app.post('/getAListing',(req, res) => {
    console.log("Getting the listing data");

    const listingID = req.fields.listingID;

    connection.query(
        "SELECT * FROM Listings WHERE listing_id = (?)", [listingID],
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(null);
            } else if (result) {
                if(result[0]){
                    // console.log(result);
                    res.send(result);
                }

            }
        }
    );
})


//make an array with all the listing and send it to the frontend
app.post('/getListings', (req, res) => {
    console.log('get Listings request');
    // console.log(req.fields);

    connection.query(
        "SELECT * FROM Listings",
        function (error, result) {
            if (error) {
                console.log(error);
            } else if (result) {
                // console.log(renderToListingsList(result));
                res.send(renderToListingsList(result));
            }
        });
})

app.post('/getOpenConvos',(req, res) =>{
    console.log('And I ran, I ran so far away....');
    connection.query(
        "SELECT * FROM `msgTable` WHERE `reci_user` = (?) OR `send_user` = (?)", [req.fields.username, req.fields.username],
        function (error, result){
            if (error) {
                console.log(error);
            }
            else if (result){
                let uniqueConvos = {};
                let openConvos = []
                for(let row of result){
                    uniqueConvos[row.listing_id] = row;
                }
                for(let row in uniqueConvos){
                    openConvos.push(uniqueConvos[row]);
                }
                res.send(openConvos);
            }
        }
    )
})

app.post('/getMessages',(req, res) =>{
    console.log('I just ran, I ran all night and day....');
    connection.query(
        "SELECT * FROM `msgTable` WHERE `listing_id` = (?)", [req.fields.listing_id],
        function (error, result){
            if (error) {
                console.log(error);
            }
            else if (result){
                let messages = []
                for(let row in result){
                    messages.push(result[row]);
                }
                res.send(messages);
            }
        }
    )
})

app.post('/sendMessage',(req, res) => {
    console.log('...couldnt get away...');
    connection.query(
        "INSERT INTO `msgTable` (`msg_id`, `listing_id`, `send_user`, `reci_user`, `msg_contents`, `time_sent`) VALUES (NULL, (?), (?), (?), (?), (?)) ",
        [req.fields.listing_id, req.fields.send_user, req.fields.reci_user, req.fields.msg_contents, req.fields.time_sent],
        function (error, result) {
            if (error) {
                console.log(error);
            } else if (result) {
                console.log(result);
                res.send(result);
            }
        }
    )
}
)

function renderToListingsList(listings){
    const listingsArray = []
    for (let i = listings.length - 1; i >= 0; i--){
        const listingData = JSON.parse(listings[i].listing)
        // console.log(listingData);
        const listing = {
            listing_id: listings[i].listing_id,
            title: listingData.title,
            category: listingData.category,
            // image: require('../Resources/Images/food.png'),
            timeStamp: listings[i].time,
            priceCategory: '£'.repeat(listingData.price),
            location: listingData.location
        }
        listingsArray.push(listing)
    }
    return listingsArray
}



// connection.end();
