var app = require('express')();
var conn = require("../backend/db");
var bodyParser = require('body-parser');
var cors = require('cors')


const port = process.env.PORT || 3030;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/user", function(req, res){
    var query = "select * from tbusers";
    executePostsgresQuery(query, res);
});

//Get Users Info on succesful validation, else return "Failed"
app.get("/api/user/:email/:password", function(req, res){
    var query = `select * from tbusers where email = '${req.params.email}' and password = '${req.params.password}' `;
    executePostsgresQuery(query, res);
});

app.post("/api/userCreate", cors(), function(req, res){
    // app.options('/the/resource/you/request',);
    // const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
    
    // const values = ['brianc', 'brian.m.carlson@gmail.com']

    // console.log(req);
    // console.log( req.body);
    // console.log( req.body.name);

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");


    var query = {
        text: 'Insert into tbusers (username,email,password) VALUES($1, $2, $3)',
        values: ['ninja','user', 'user@email.com'],
    }
    insertToDatabase(query, res);
    //  res.header("Access-Control-Allow-Origin","*");
    console.log(res);
});

var insertToDatabase = function(req, res){

    // promise
    // res.header("Access-Control-Allow-Origin", "*");
    conn.query(req['text'], req['values'])
    .then(results => {
        // console.log(res);
        console.log('RES--------------------------');
        // console.log(res.rowCount);
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        
        // return results.rowCount;
        res.header("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(results));
    })
    .catch(e => console.error(e.stack))

    // 
    // console.log(res);
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

