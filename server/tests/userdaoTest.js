// @flow

let mysql = require("mysql");

const UserDao = require("../src/DAO/userDao.js");
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

let userdao = new UserDao(pool);

beforeAll(done => {
  runsqlfile("create_tables.sql", pool, () => {
    runsqlfile("create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});


test("Make a normal user an admin", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  
  userdao.setAdminPrivilegesId(3, callback); // user 3 har privileges 0 by default
}, 30000);

test("Make an admin user a normal user", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  
  userdao.setNormalPrivilegesId(1, callback); // user 1 har privileges 1 by default
}, 30000);

test("Make a normal user an admin", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  
  userdao.setAdminPrivilegesEmail("wallah@gmail.com", 2, callback); // user 3 har privileges 0 by default
}, 30000);

test("Make an admin user a normal user", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  
  userdao.setNormalPrivilegesEmail("hei@gmail.com", 1, callback); // user 1 har privileges 1 by default
}, 30000);