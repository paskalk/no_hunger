const express = require('express');
const path = require('path');
const app = express();
// var app = require('express')();
// const path = require('path');
var conn = require("./backend/db");
var bodyParser = require('body-parser');
var cors = require('cors')

const port = process.env.PORT || 3030;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
    // app.use(express.static(__dirname + '/build'));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Pull all notifications
app.get("/api/notifications/:userid", function(req, res){    
    var query = `select * from tbnotifications where read = false and notificationto = '${req.params.userid}' limit 4`;
    executePostsgresQuery(query, res);
});

//Mark notifications as read
app.post("/api/updateNotification", function(req, res){
    // console.log(req.body);
    var query = {
        text: 'Update tbnotifications set read = true, readon = $1  where notificationid =$2',
        values: [new Date(), req.body['notificationid']],
    }
    insertToDatabase(query, res);
});

app.get("/api/users", function(req, res){
    var query = "select userid,fullname,usergroup, email, mobilephone, trials, createdon, modifiedby, modifiedon, location, locationdescription,case  when (locked = true) then 'Yes' else 'No' end as locked,case  when (active = true) then 'Yes' else 'No' end as active from tbusers ";
    executePostsgresQuery(query, res);
});

//Update an existing user by admin or self
app.post("/api/updateUser", function(req, res){
    console.log(req.body);
    var query = {
        // text: 'Update tbusers set usergroup = $1, active =$2, locked = $3, trials = $4, modifiedby = $5 where userid = $6',
        // values: [req.body['usergroup'], req.body['active'], req.body['locked'], req.body['trials'], req.body['modifiedby'], req.body['userid']],
        text: 'Update tbusers set usergroup = $1, active =$2, locked = $3, trials = $4, modifiedby = $5, email = $6, mobilephone = $7 where userid = $8',
        values: [req.body['usergroup'], req.body['active'], req.body['locked'], req.body['trials'], req.body['modifiedby'], req.body['email'], req.body['mobilephone'], req.body['userid']],
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

//Get donations that are active and ready to be accepted
app.get("/api/getActiveDonations/:userid", function(req, res){  
    var query = `select donationid, foodtype, quantity, locationdescription, location, split_part(locationdescription, ',',1) as shortlocation, status, case  when (deleted = true) then 'Yes' else 'No' end as deleted, dateadded, datereceived, donatedby, receivedby, status as acceptreject  from tbdonations where status in ('Available','Reserved') and deleted = false and donatedby <> ${req.params.userid} `;// + filter;
    executePostsgresQuery(query, res);
});

//Handle accept or reject of a donated item
app.post("/api/updateAcceptReject", function(req, res){
    console.log(req.body);
    var query = {
        text: 'Update tbdonations set receivedby = $1, datereceived =$2, status = $3 where donationid = $4',
        values: [req.body['receivedby'], req.body['datereceived'], req.body['status'], req.body['donationid']],
    }
    insertToDatabase(query, res);
});

var insertToDatabase = function(req, res){
    console.log(req);
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
        console.log(req);
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

//Get chart data
app.get("/api/getChartData/:type/:usergroup/:userid/:datefrom/:dateto", function(req, res){
    console.log(req.params);
    var filter = '';
    var query = '';
    var groupBy = '';

    switch(req.params.type){
        case 'pie':
            query = ` select foodtype, sum(quantity) as Kgs from tbdonations where 1=1 `;
            groupBy = ' group by foodtype ';
            break;
        case 'line':
            query = `select substring((dateadded::text) from 0 for 11)  dateadded, sum(quantity) as Kgs from tbdonations where 1=1 `;
            groupBy = ' group by dateadded ';
            break;
        case 'radial':
            // filter = ` and receivedby = ${req.params.userid}`;
            break;
        default:
            break;
    };

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
    };

    filter = filter + ` and dateadded >= to_timestamp(${req.params.datefrom}/1000) and dateadded < to_timestamp(${req.params.dateto}/1000) `
    // var query = `select donationid, foodtype, quantity, locationdescription, location, status, case  when (deleted = true) then 'Yes' else 'No' end as deleted, dateadded, datereceived, donatedby, receivedby from tbdonations where 1= 1 ` + filter;
    var query = query + filter + groupBy;
    executePostsgresQuery(query, res);
});



// console.log( getDate());
// console.log( Date.parse('Sun Nov 03 2019 18:39:32 GMT+0100 (Central European Standard Time)'));

// console.log(sha3_256('1234'));

app.listen(port); 

