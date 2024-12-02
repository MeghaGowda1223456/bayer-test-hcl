var express = require("express");
var app = express();
var dbcon = require("./dbcon/db");
var user = require("./model/userHandler");
var feature = require("./model/featureHandler");
var dbconn = require("./dbcon/db");


app.get("/feature", (req, res, next) => 
{   
    let sql = "select id,name,description from hosp_feature";
    dbconn.query(sql,(err,rows) =>
    {
        if(err) throw err;

        res.send(rows);
 
    });
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});