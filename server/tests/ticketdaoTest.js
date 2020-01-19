// @flow
let mysql = require("mysql");
const TicketDao = require("../src/DAO/ticketDao.js");
const runsqlfile = require("../src/DAO/runsqlfile.js");

let pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});

let ticketDao = new TicketDao(pool);

beforeAll(done => {
  runsqlfile("create_tables.sql", pool, () => {
    runsqlfile("create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Get all tickets", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(3);
    done();
  }

  ticketDao.getAllTickets(callback);
});

test("Get tickets from one event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(2);
    done();
  }

  ticketDao.getTicket(2, callback);
});

test("Add ticket", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  ticketDao.addTicket(
    {event_id: 3, ticket_type: "VIP", amount: 2, description: "VIP ticket", price: 300, amount_sold: 0},
    callback);
});

test("Test add ticket", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(4);
    done();
  }

  ticketDao.getAllTickets(callback);
});

test("Get remaining tickets", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].remaining).toBe(28);
    done();
  }

  ticketDao.getNumberOfRemainingTickets(3, callback);
});

test("Delete ticket", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  ticketDao.deleteTicket(4, callback);
});

test("Test delete ticket", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(3);
    done();
  }

  ticketDao.getAllTickets(callback);
});


test("Edit ticket", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  ticketDao.updateTicket(1,
    {ticket_type: "Regular", amount: 1, description: "normal ticket", price: 150, amount_sold: 1},
    callback);
});