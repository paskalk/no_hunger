var app = require('express')();
//var db = require('conn');
//const sql = require('mssql');

//const conn = require('../backend/conn.js');
const helper = new require('../backend/Helper')();

    
app.get('/getUserInfo', function(request, response){

    let x =  helper.runSelect('Select 1');
    return x;
   
    // conn.connect().then(function () {

    //     conn.query("SELECT 1").then(function (recordset) {
            
    //         conn.close();
            
    //         response.header("Access-Control-Allow-Origin", "*");
    //         return response.json(recordset.recordsets[0]);
    //     })
    //         .catch(function (err) {
    //             console.log(err);
    //             conn.close();
    //         });
    // })
    // .catch(function (err) {
    //     console.log(err);
    // });


    

});

app.listen('3000'); 

