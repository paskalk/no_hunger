var app = require('express')();

var conn = require("../backend/db");



app.get("/user", function(req, res){
    var query = "select * from tbusers";
    executeQuery(query, res);
});

//1
app.get("/user/:userid/", function(req, res){
    var query = `select * from tbusers where UserID = '${req.params.userid}'`;
    executeQuery(query, res);
});

var executeQuery = function(req, res){             
    conn.connect().then(function () {

         conn.query(req).then(function (recordset) {
            
            conn.close();
            
            res.header("Access-Control-Allow-Origin", "*");
            return res.json(recordset.recordsets[0]);
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });
    })
    .catch(function (err) {
        console.log(err);
    });
}

app.listen('3000'); 

