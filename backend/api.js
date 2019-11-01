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


app.get("/api/users", function(req, res){
    var query = "select userid,fullname,usergroup, email, mobilephone, trials, createdon, modifiedby, modifiedon, location, locationdescription,case  when (locked = true) then 'Yes' else 'No' end as locked,case  when (active = true) then 'Yes' else 'No' end as active from tbusers ";
    executePostsgresQuery(query, res);
});

//Update an existing user by admin
app.post("/api/updateUser", function(req, res){
    console.log(req.body);
    var query = {
        text: 'Update tbusers set usergroup = $1, active =$2, locked = $3, trials = $4, modifiedby = $5 where userid = $6',
        values: [req.body['usergroup'], req.body['active'], req.body['locked'], req.body['trials'], req.body['modifiedby'], req.body['userid']],
    }
    insertToDatabase(query, res);
});

//Get Users Info on succesful validation, else return "Failed"
app.get("/api/user/:email/:password", function(req, res){
    var query = `select * from tbusers where email = '${req.params.email}' and password = '${req.params.password}' `;
    executePostsgresQuery(query, res);
});

//Add a new user to the database
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

//Add a donation entry item to the database
app.post("/api/addDonation", function(req, res){
    var query = {
        text: 'Insert into tbdonations (foodtype,quantity,location,locationdescription,donatedby,status) VALUES($1, $2, $3, $4, $5, $6)',
        values: [  req.body['foodtype'], req.body['quantity'],  req.body['location'], req.body['locationdescription'], req.body['donatedby'], 'Available'],
    }
    insertToDatabase(query, res);
});

//Update an existing donation entry eg if someone accepts the donation
app.post("/api/updateDonation", function(req, res){
    console.log(req.body);
    var query = {
        text: 'Update tbdonations set deleted = $1, foodtype =$2, status = $3 where donationid = $4',
        values: [req.body['deleted'], req.body['foodtype'], req.body['status'], req.body['donationid']],
    }
    insertToDatabase(query, res);
});

//Get all the donations registered in the database
app.get("/api/getDonations/:usergroup/:userid", function(req, res){
    console.log(req.params);
    var filter = '';
    switch(req.params.usergroup){
        case 'admin':
        case 'super':
            
            break;
        case 'donor':
            filter = ` and donatedby = ${req.params.userid}`;
            break;
        case 'organization':
            filter = ` and receivedby = ${req.params.userid}`;
            break;
        default:
            break;
    }
    var query = `select donationid, foodtype, quantity, locationdescription, location, status, case  when (deleted = true) then 'Yes' else 'No' end as deleted, dateadded, datereceived, donatedby, receivedby from tbdonations where 1= 1 ` + filter;
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
        // console.log(results.rows);
        return res.json(results.rows);
    })
}

// function cleanData(jsonString){
//     JSON.parse(jsonString);
//     // jsonString = jsonString.replace(`"donationid":`,'');
//     // jsonString = jsonString.replace(`"foodtype":`,'');
//     // jsonString = jsonString.replace(`"quantity":`,'');
//     // jsonString = jsonString.replace(`"location":`,'');
//     // jsonString = jsonString.replace(`"status":`,'');
//     // jsonString = jsonString.replace(`"deleted":`,'');
//     // jsonString = jsonString.replace(`"dateadded":`,'');
//     // jsonString = jsonString.replace(`"datereceived":`,'');
//     // jsonString = jsonString.replace(`"donatedby":`,'');
//     // jsonString = jsonString.replace(`"receivedby":`,'');
//     // jsonString = jsonString.replace(`"locationdescription":`,'');

//     // jsonString = jsonString.replace('{','[');
//     // jsonString = jsonString.replace('}',']');

//     return jsonString;
// }

app.listen(port); 

