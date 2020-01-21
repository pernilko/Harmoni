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
}, 30000);


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
}, 30000);


test("Get events for one organization", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(2);
    done();
  }

  eventDao.getEventOrg(2, callback);
}, 30000);

test("Get events for one user", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    done();
  }

  eventDao.getEventUser(1, callback);
}, 30000);

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
}, 30000);

test("Edit an event", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  eventDao.editEvent(1, {event_name: "Cool event", place: "Mysen", description: "Gutta", event_start: "2020-01-26", event_end: "2020-01-26", longitude: 1, latitude: 2, image: ""}, callback)
}, 30000);

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
}, 30000);

test("Test employees for an event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(2);
    done();
  }

  eventDao.getUsersForEvent(1, callback);
}, 30000);

test("Test user accepting an event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBe(1);
    done();
  }

  eventDao.setAccepted({user_id: 1, event_id: 1, accepted: 2}, callback);
}, 30000);

test("Test event search", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].event_name).toBe("Fotball-turnering");
    done();
  }

  eventDao.getEventbySearch("Fotball", 3, callback);
}, 30000);