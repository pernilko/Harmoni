var express = require("express");
var mysql = require("mysql");
var app = express();

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: "g_scrum_4",
    password: "n3I9XuKP",
    database: "g_scrum_4",
    debug: false
});

app.get("/test", (req: express$Request, res: express$Response) => {
    console.log("/test: received get request from client");
});

