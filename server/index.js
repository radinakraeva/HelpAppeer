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
    console.log(JSON.stringify(req.fields));

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

// connection.end();
