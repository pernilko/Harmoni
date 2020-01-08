//@flow
let express = require("express");
let mysql = require("mysql");
let app = express();
let Base64 = require('js-base64').Base64;

type Request =express$Request;
type Response =express$Response;

let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: "g_scrum_4",
    password: "n3I9XuKP",
    database: "g_scrum_4",
    debug: false
});

const ArtistDao = require("./DAO/artistDao.js"); //
const OrganizationDAO=require("./DAO/organizationDao.js");

let artistDao = new ArtistDao(pool);
let organizationDAO= new OrganizationDAO(pool);

//Artist
app.get("/artist", (req, res) => {
    console.log("/test: received get request from client");
    artistDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

//Event

//Ticket

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

