// @flow
let mysql = require("mysql");
const EventDao = require("../src/DAO/eventDao.js");
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

let eventDao = new EventDao(pool);

beforeAll(done => {
  runsqlfile("create_tables.sql", pool, () => {
    runsqlfile("create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Retrieve all events", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(3);
    done();
  }

  eventDao.getAll(callback);
});


test("Get an event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].event_name).toBe("Konsert med Karpe");
    done();
  }

  eventDao.getEvent(1, callback);
});


test("Get events for one organization", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(2)
    done();
  }

  eventDao.getEventOrg(2, callback);
});

test("Get events for one user", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    done();
  }

  eventDao.getEventUser(1, callback);
});

test("Get event location", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].place).toBe("Kalveskinnet kantina");
    done();
  }

  eventDao.getEventLocation(1, callback);
});

test("Edit an event", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  eventDao.editEvent(1, {event_name: "Cool event", place: "Mysen", description: "Gutta", event_start: "", event_end: "", longitude: 1, latitude: 2, image: ""}, callback)
});

test("Test edit", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].event_name).toBe("Cool event");
    done();
  }

  eventDao.getEvent(1, callback);
});