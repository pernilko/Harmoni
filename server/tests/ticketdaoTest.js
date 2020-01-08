// @flow
let mysql = require("mysql");
const ticketDao = require("../src/DAO/ticketDao.js");
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

let ticketDao = new ticketDao(pool);

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

    expect(data.length).toBe(1);
    done();
  }

  ticketDao.getAllTickets(callback);
});

test("Get a ticket", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].ticket_type).toBe("VIP");
    done();
  }

  ticketDao.getTicket(1, callback);
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
    {ticket_type: "VIP", amount: 2, description: "VIP ticket", price: 300, amount_sold: 0},
    callback);
});

test("Get remaining tickets", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].amount).toBe(2);
    done();
  }

  ticketDao.getNumberOfRemainingTickets(1, callback);
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

test("Delete ticket", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  ticketDao.deleteTicket(1, callback);
});



