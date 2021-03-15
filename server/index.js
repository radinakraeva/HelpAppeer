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
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);

    connection.query(
        "INSERT INTO Register (Name, Username, Email, Password) VALUES (? ,? ,? ,?)",
        [name, username, email, password],
        (err, result) => {
            if (err){
                throw err;
            }else{
                res.send('Values Inserted');
            }
            return result;
        });
})

app.post('/verify', (req, res) => {
    console.log('received request');

    const username = req.fields.username
    const password = req.fields.password

    connection.query(
        "SELECT Password FROM Register where name = (?)", [username],
        function (error, result) {
            if (error) {
                console.log(error);
            } else if (result) {
                //check if result[0] is not falsy, if it's not, username is in the database
                if(result[0]){
                    const userPassword = result[0].Password;
                    console.log(result);
                    console.log(userPassword);
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

// connection.end();
