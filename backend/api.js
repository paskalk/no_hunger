var app = require('express')();
var conn = require("../backend/db");
var bodyParser = require('body-parser');
var cors = require('cors')


const port = process.env.PORT || 3030;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

// app.get("*", function(req, res){
//     // res.header("Access-Control-Allow-Headers", '*');
//     // res.header("Access-Control-Allow-Methods", "*");
//     // res.header("Access-Control-Allow-Origin", "*");
//     // console.log('????????????');
// });


app.get("/user", function(req, res){
    var query = "select * from tbusers";
    executePostsgresQuery(query, res);
});

//Get Users Info on succesful validation, else return "Failed"
app.get("/api/user/:email/:password", function(req, res){
    var query = `select * from tbusers where email = '${req.params.email}' and password = '${req.params.password}' `;
    executePostsgresQuery(query, res);
});

app.post("/api/userCreate", function(req, res){
    var query = {
        text: 'Insert into tbusers (email,password,fullname,trials,locked,active) VALUES($1, $2, $3, $4, $5, $6)',
        values: [
            req.body['email'], 
            req.body['password'], 
            req.body['name'],
            // req.body['location'],
            // req.body['locationdescription'],
            // req.body['mobilephone'],
            0,
            0,
            1
        ],
    }
    // console.log(query);
    insertToDatabase(query, res);
});

//New donation entry to database
app.post("/api/addDonation", function(req, res){
    var query = {
        text: 'Insert into tbdonations (foodtype,quantity,location,locationdescription,donatedby) VALUES($1, $2, $3, $4, $5)',
        values: [  req.body['foodtype'], req.body['quantity'],  req.body['location'], req.body['locationdescription'], req.body['donatedby']],
    }
    insertToDatabase(query, res);
});

//Update an existing donation eg if someone accepts the donation
app.post("/api/updateDonation", function(req, res){

});

app.get("/api/getDonations/:foodtype", function(req, res){
    var query = `select * from tbdonations `;
    executePostsgresQuery(query, res);
});

var insertToDatabase = function(req, res){
    conn.query(req['text'], req['values'])
    .then(results => {
        res.end(JSON.stringify(results.rowCount));
    })
    .catch(e => {
        console.error(e.stack);
        res.end();
        // res.end(JSON.stringify(e.detail));
    })
}

var executePostsgresQuery  = function(req, res){
    conn.query(req, (error, results) => {
        if (error) {
            console.log(error);
        }
        res.header("Access-Control-Allow-Origin", "*");
        return res.json(results.rows);
    })
}

app.listen(port); 

