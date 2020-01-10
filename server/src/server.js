//@flow
let express = require("express");
let mysql = require("mysql");
let bcrypt = require("bcryptjs");
const privateKEY = require('./keys/private.json');
const publicKEY = require('./keys/public.json');
let config: {username: string, pwd: string} = require("./config");
let jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.json());

type Request = express$Request;
type Response = express$Response;

let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: config.username,
    password: config.pwd,
    database: config.username,
    debug: false
});

const ArtistDao = require("./DAO/artistDao.js");
const EventDao = require("./DAO/eventDao.js");
const TicketDao = require("./DAO/ticketDao.js");
const OrganizationDAO = require("./DAO/organizationDao.js");
const UserDao = require("./DAO/userDao.js");

let artistDao = new ArtistDao(pool);
let eventDao = new EventDao(pool);
let ticketDao = new TicketDao(pool);
let userDao = new UserDao(pool);
let organizationDAO= new OrganizationDAO(pool);


app.use(function (req, res, next: function) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, OPTIONS");
    next();
});

app.post("/login", (req, res) => {
    console.log(config.username);
    console.log(req.body);
    userDao.getUser(req.body, (status, data) => {
        res.status(status);
        if (data[0]) {
            console.log(data[0].password);
            bcrypt.compare(req.body.password, data[0].password, function (err, resp) {
                if (resp) {
                    console.log("user_id: " + data[0].user_id);
                    let token: string = jwt.sign({ user_id: data[0].user_id }, privateKEY.key, {
                        expiresIn: 3600
                    });
                    console.log("password matched");
                    res.status(status);
                    console.log("user_id: " + data[0].user_id)
                    res.json({ jwt: token , "user_id": data[0].user_id});
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

/*
app.get("/artist", (req, res) => {
    console.log("/test: received get request from client");
}
*/
//Artist
//tested
app.get("/artist/all", (req : Request, res: Response) => {
    console.log("/artists/all: received get request from client");
    artistDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artist/event/:id", (req : Request, res: Response) => {
    console.log("/artist/event: received get request from client");
    artistDao.getEventArtists((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/token", (req, res) => {
    let token: string = req.headers["x-access-token"];
    jwt.verify(token, privateKEY.key, (err, decoded) => {
        if (err) {
            res.status(401);
            res.json({error: "Not Authorized"});
        } else {
            console.log("Token refreshed.");
            token = jwt.sign({email: decoded.email}, privateKEY.key, {
                expiresIn: 3600
            });
            res.json({jwt: token, "email": decoded.email});
        }
    });
});

//tested
app.get("/artist/:id", (req : Request, res: Response) => {
    console.log("/artist/:id: received get request from client");
    artistDao.getOne(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.post("/artist/add", (req : Request, res: Response) => {
    console.log("/artist/add: received post request from client");
    artistDao.insertOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.delete("/artist/delete/:id", (req : Request, res: Response) => {
    console.log("/artist/:id: received delete request from client");
    artistDao.deleteArtist(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Event
//tested
app.get("/event/all", (req : Request, res: Response) => {
    console.log("/event/all: received get request from client");
    eventDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.get("/event/:id", (req : Request, res: Response) => {
    console.log("/event/:id: received get request from client");
    eventDao.getEvent(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/event/add", (req : Request, res: Response) => {
    pool.getConnection((err, connection: function) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved oppkobling til databasen");
            res.json({ error: "feil ved oppkobling"});
        } else {
            connection.query(
                "INSERT INTO event (org_id, event_name, place, event_start, event_end, longitude, latitude) VALUES (?,?,?,?,?,?,?)",
                [req.body.org_id, req.body.event_name, req.body.place, req.body.event_start, req.body.event_end, req.body.longitude, req.body.latitude],
                err => {
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        connection.query(
                            "SELECT LAST_INSERT_ID()",
                            (err, rows) => {
                                connection.release();
                                if (err) {
                                    console.log(err);
                                    res.json({ error: "error querying" });
                                } else {
                                    console.log(rows);
                                    res.json(rows);
                                }
                            }
                        )
                    }
                }
            )
        }
    });
});

app.put("/event/edit/:id", (req : Request, res: Response) => {
    console.log("/event/edit/:id: received put request from client");
    eventDao.editEvent(req.params.id, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/event/delete/:id", (req : Request, res: Response) => {
    console.log("/event/delete/:id: received delete request from client");
    pool.getConnection((err, connection: function) => {
          console.log("Connected to database");
          if (err) {
              console.log("Feil ved kobling til databasen");
              res.json({ error: "feil ved oppkobling" });
          } else {
              connection.query(
  				          "DELETE FROM artist WHERE event_id=?",
  				          [req.params.id],
  				          (err, rows) => {
  					               //connection.release();
  					               if (err) {
  						                     console.log(err);
  						                     res.json({ error: "error querying" });
  					               } else {
                             connection.query(
                 				          "DELETE FROM ticket WHERE event_id=?",
                 				          [req.params.id],
                 				          (err, rows) => {
                 					               connection.release();
                 					               if (err) {
                 						                     console.log(err);
                 						                     res.json({ error: "error querying" });
                 					               } else {
                                           eventDao.deleteEvent(req.params.id, (status, data) => {
                                                    res.status(status);
                                                    res.json(data);
                                           });
  					                             }
  				                        }
  			                    );
                          }
                    }
            );
        }
      });
});

//User
//not tested
app.put("/user/admin/:id", (req: Request, res: Response) => {
    console.log("/user/:id received put request from client");
    userDao.setAdminPrivilegesId(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//not tester
app.put("/user/normal/:id", (req: Request, res: Response) => {
    console.log("/user/:id received put request from client");
    userDao.setNormalPrivilegesId(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/user/:id", (req: Request, res: Response)=>{
    console.log("/user received get request from client");
    userDao.getUserById(req.params.id, (status, data)=>{
        res.status(status);
        res.json(data);
    });
});


//Ticket
//tested
app.get("/ticket/all", (req : Request, res: Response) => {
    console.log("/ticket/all: received get request from client");
    ticketDao.getAllTickets((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.get("/ticket/:id", (req : Request, res: Response) => {
    console.log("/ticket/:id: received get request from client");
    ticketDao.getTicket(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.get("/ticket/remaining/:id", (req : Request, res: Response) => {
    console.log("/ticket/remaining/:id: received get request from client");
    ticketDao.getNumberOfRemainingTickets(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.post("/ticket/add", (req : Request, res: Response) => {
    console.log("/ticket/add: received get request from client");
    ticketDao.addTicket(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.put("/ticket/edit/:id", (req : Request, res: Response) => {
    console.log("/ticket/edit/:id: received put request from client");
    ticketDao.updateTicket(req.body, req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.delete("/ticket/delete/:id", (req : Request, res: Response) => {
    console.log("/ticket/delete/:id: received delete request from client");
    ticketDao.deleteTicket(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Organization
app.get("/organization/mail/:mail",(req:Request,res:Response)=>{
    console.log("/test: received get request from client for organization by ID");
    organizationDAO.getOrgByEmail(req.params.mail, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/organization/id/:id",(req:Request,res:Response)=>{
    console.log("/test: received get request from client for organization by ID");
    organizationDAO.getOrganization(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//tested
app.get("/organization",(req : Request, res : Response) => {
    console.log("/test: received get request from client for all organizations");
    organizationDAO.getAllOrganizations((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/organization", (req : Request, res : Response) => {
    pool.getConnection((err, connection: function) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved oppkobling til databasen");
            res.json({ error: "feil ved oppkobling"});
        } else {
            connection.query(
                "INSERT INTO organization(org_name, phone, email) VALUES (?,?,?)",
                [req.body.org_name, req.body.phone, req.body.email],
                err => {
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        connection.query(
                            "SELECT LAST_INSERT_ID() AS org_id",
                            (err, rows) => {
                                connection.release();
                                if (err) {
                                    console.log(err);
                                    res.json({ error: "error querying" });
                                } else {
                                    console.log(rows);
                                    res.json(rows);
                                }
                            }
                        )
                    }
                }
            )
        }
    });
});

app.delete("/organization/:id", (req : Request, res : Response) => {
    console.log("/test: received delete request from user to delete an organization");
    organizationDAO.deleteOrganization(req.params.id, (status, data) => {
        res.status(status);
    });
});

app.put("/organization/:id", (req : Request, res : Response) => {
    console.log("/test:received update request from user to update organization");
    organizationDAO.updateOrganization(req.params.id, (status, data) => {
        res.status(status);
    });
});

let server = app.listen(8080);