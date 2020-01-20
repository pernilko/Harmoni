// @flow

let mysql = require("mysql");
const UserEventDao = require("../src/DAO/userEventDao.js");
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

let userEventDao = new UserEventDao(pool);

beforeAll(done => {
  runsqlfile("create_tables.sql", pool, () => {
    runsqlfile("create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Add user event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBe(1);
    done();
  }

  userEventDao.addUserEvent({user_id: 4, event_id: 1, job_position: "Kul", accepted: 2}, callback);
});

test("Get one user event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(3);
    expect(data[0].user_name).toBe("Navn Navnesen")
    done();
  }

  userEventDao.getAllbyId(1, callback);
});

test("Delete user event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBe(1);
    done();
  }

  userEventDao.deleteUserEvent(1, 2, callback);
});

test("Update user event", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBe(1);
    done();
  }

  userEventDao.updateUserEvent(1, 3, {user_id: 1, job_position: "cool boy", accepted: 2}, callback);
});

