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

/*
test("Get an event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].event_name).toBe("Event name");
    done();
  }

  eventDao.getEvent(1, callback);
});

test("Add an event", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  eventDao.addEvent(
    {event_name: "UKA", place: "Trondheim", event_start: "today", event_end: "tomorrow", longitude: "333", latitude: "555"
    }, callback);
});

test("Get an event location", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].location).toBe("location");
    done();
  }

  eventDao.getEventLocation(1, callback);
});

test("Get event time ", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].event_start).toBe("Event start");
    expect(data[0].event_end).toBe("Event end");
    done();
  }

  eventDao.getEventTime(1, callback);
});

test("Edit an event", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  eventDao.editEvent(1,
    { event_name: "hi", place: "hi top", event_start: "tomorrow",
      event_end: "day after", longitude: "44", latitude: "009", event_id:1},
    callback);
});

test("Delete an event", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  eventDao.deleteEvent(1, callback);
});
*/
