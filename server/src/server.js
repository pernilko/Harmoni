//@flow
let express = require("express");
let mysql = require("mysql");
let app = express();
var Base64 = require('js-base64').Base64;

type Request = express$Request;
type Response = express$Response;

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: "g_scrum_4",
    password: "n3I9XuKP",
    database: "g_scrum_4",
    debug: false
});

const ArtistDao = require("./DAO/artistDao.js");
const EventDao = require("./DAO/eventDao.js");
const TicketDao = require("./DAO/ticketDao.js");
const OrganizationDAO=require("./DAO/organizationDao.js");

let artistDao = new ArtistDao(pool);
let eventDao = new EventDao(pool);
let ticketDao = new TicketDao(pool);
let organizationDAO= new OrganizationDAO(pool);

//Artist
app.get("/artist/all", (req : Request, res: Response) => {
    console.log("/artists/all: received get request from client");
    artistDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artist/:id", (req : Request, res: Response) => {
    console.log("/artist/:id: received get request from client");
    artistDao.getOne(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/artist/add", (req : Request, res: Response) => {
    console.log("/artist/add: received get request from client");
    req.body.content = Base64.encode(req.body.content);
    artistDao.insertOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Event
app.get("/event/all", (req : Request, res: Response) => {
    console.log("/event/all: received get request from client");
    eventDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/event/:id", (req : Request, res: Response) => {
    console.log("/event/:id: received get request from client");
    eventDao.getEvent(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/event/add", (req : Request, res: Response) => {
    console.log("/event/add: received post request from client");
    req.body.content = Base64.encode(req.body.content);
    eventDao.addEvent(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/event/edit/:id", (req : Request, res: Response) => {
    console.log("/event/edit/:id: received put request from client");
    req.body.content = Base64.encode(req.body.content);
    eventDao.editEvent(req.body, req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/event/delete/:id", (req : Request, res: Response) => {
    console.log("/event/delete/:id: received delete request from client");
    eventDao.deleteEvent(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//User


//Ticket
app.get("/ticket/all", (req : Request, res: Response) => {
    console.log("/ticket/all: received get request from client");
    ticketDao.getAllTickets((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/ticket/:id", (req : Request, res: Response) => {
    console.log("/ticket/:id: received get request from client");
    ticketDao.getTicket(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/ticket/remaining/:id", (req : Request, res: Response) => {
    console.log("/ticket/remaining/:id: received get request from client");
    ticketDao.getNumberOfRemainingTickets(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/ticket/add", (req : Request, res: Response) => {
    console.log("/ticket/add: received get request from client");
    req.body.content = Base64.encode(req.body.content);
    ticketDao.addTicket(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/ticket/edit/:id", (req : Request, res: Response) => {
    console.log("/ticket/edit/:id: received put request from client");
    req.body.content = Base64.encode(req.body.content);
    ticketDao.updateTicket(req.body, req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/ticket/delete/:id", (req : Request, res: Response) => {
    console.log("/ticket/delete/:id: received delete request from client");
    ticketDao.deleteTicket(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Organization
app.get("/organization/:mail",(req:Request,res:Response)=>{
    console.log("/test: received get request from client for organization by ID");
    organizationDAO.getOrgByEmail(req.params.mail,(status,data)=>{
        res.status(status);
        res.json(data);
    });
});

app.get("/organization/:id",(req:Request,res:Response)=>{
    console.log("/test: received get request from client for organization by ID");
    organizationDAO.getOrganization(req.params.id, (status,data)=>{
        res.status(status);
        res.json(data);
    });
});

app.get("/organization",(req:Request,res:Response)=>{
    console.log("/test: received get request from client for all organizations");
    organizationDAO.getAllOrganizations((status,data)=>{
        res.status(status);
        res.json(data);
    });
});

app.post("/organization",(req:Request,res:Response)=>{
    console.log("/test: received post request for adding an organization");
    req.body.content=Base64.encode(req.body.content);
    organizationDAO.addOrganization(req.body.content, (status, data)=>{
        res.status(status);
    });

});

app.delete("/organization/:id",(req:Request,res:Response)=>{
    console.log("/test: received delete request from user to delete an organization");
    organizationDAO.deleteOrganization(req.params.id,(status,data)=>{
        res.status(status);
    });
});

app.put("/organization/:id", (req:Request,res:Response)=>{
    console.log("/test:received update request from user to update organization");
    organizationDAO.updateOrganization(req.params.id,(status,data)=>{
        res.status(status);
    });
});

let server = app.listen(8080);
