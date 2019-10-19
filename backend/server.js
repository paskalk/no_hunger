var app = require('express')();
const sql = require('mssql');
require('dotenv').config({ path: '../.env' });

const port = process.env.PORT || 3030;

const pool = new sql.ConnectionPool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true 
    }
})
//console.log(port);


app.get('/user', function(request, response){
   
    var conn = pool;
    
    conn.connect().then(function () {

        var req = new sql.Request(conn);
         req.query("SELECT * FROM tbUsers").then(function (recordset) {
        
            conn.close();
            
            response.header("Access-Control-Allow-Origin", "*");
            return response.json(recordset.recordsets[0]);
        })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    })
    .catch(function (err) {
        console.log(err);
    });

});

app.get('*', function(request, response){
    //response.sendFile(__dirname +'/index_to_db.html');
    response.send('I exist');
});


app.listen(port); 

