const sql = require('mssql');
require('dotenv').config({ path: '../.env' });

const db = new sql.ConnectionPool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true 
    }
})


 // console.log(process.env.SQL_USER);

// function select(query)
// {
//     var conn = pool;
    
//     conn.connect().then(function () {

//         var req = new sql.Request(conn);
//         req.query(query).then(function (recordset) {
            
//             conn.close();
            
//             response.header("Access-Control-Allow-Origin", "*");
//             return response.json(recordset.recordsets[0]);
//         })
//             .catch(function (err) {
//                 console.log(err);
//                 conn.close();
//             });
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
// }

module.exports=db;