//@flow
let express = require("express");
let mysql = require("mysql");
let bcrypt = require("bcryptjs");
const privateKEY = require('./keys/private.json');
const publicKEY = require('./keys/public.json');
let jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");

let app = express();

let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: "g_scrum_4",
    password: "n3I9XuKP",
    database: "g_scrum_4",
    debug: false
});

const ArtistDao = require("./DAO/artistDao.js");
const UserDao = require("./DAO/userDao.js");
let userDao = new UserDao(pool);
let artistDao = new ArtistDao(pool);

app.use(bodyParser.json()); // for å tolke JSON

app.use(function (req, res, next: function) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/login", (req, res) => {
    console.log(req.body);
    userDao.getUser(req.body, (status, data) => {
        res.status(status);
        if (data[0]) {
            console.log(data[0].password);
            bcrypt.compare(req.body.password, data[0].password, function (err, resp) {
                if (resp) {
                    let token: string = jwt.sign({ email: req.body.email }, privateKEY.key, {
                        expiresIn: 3600
                    });
                    console.log("password matched");
                    res.status(status);
                    res.json({ jwt: token });
                } else {
                    console.log("password didnt match");
                    res.status(401);
                    res.json({ error: "not authorized" });
                }
            });
        } else {
            res.status(401);
            res.json({ error: "user does not exist" });
        }
    });
});

app.post("/register", (req, res) => {
    console.log(req.body);
    userDao.addUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/artist", (req, res) => {
    console.log("/test: received get request from client");
    artistDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

let server = app.listen(8080);
