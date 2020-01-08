//@flow
let express = require("express");
let mysql = require("mysql");
let app = express();

let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: "g_scrum_4",
    password: "n3I9XuKP",
    database: "g_scrum_4",
    debug: false
});

const ArtistDao = require("./DAO/artistDao.js"); //
let artistDao = new ArtistDao(pool);

app.get("/artist", (req, res) => {
    console.log("/test: received get request from client");
    artistDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

let server = app.listen(8080);
