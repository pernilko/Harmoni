// @flow

let mysql = require("mysql");

const UserDao = require("../src/DAO/userDao.js");
const runsqlfile = require("../keys/runsqlfile.js");

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
  runsqlfile("./src/keys/create_tables.sql", pool, () => {
    runsqlfile("./src/keys/create_testdata.sql", pool, done);
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
    expect(data.length).toBe(1);
    expect(data[0].privileges).toBe(1); // privileges 1 => admin user
    done();
  }
  
  userdao.setAdminPrivilegesId(3, callback); // user 3 har privileges 0 by default
}, 30000);

test("Make an admin user a normal user", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].privileges).toBe(0); // privileges 0 => normal user
    done();
  }
  
  userdao.setNormalPrivilegesId(1, callback); // user 1 har privileges 1 by default
}, 30000);

test("Make a normal user an admin", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].privileges).toBe(1); // privileges 1 => admin user
    done();
  }
  
  userdao.setAdminPrivilegesEmail("wallah@gmail.com", 2, callback); // user 3 har privileges 0 by default
}, 30000);

test("Make an admin user a normal user", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].privileges).toBe(0); // privileges 0 => normal user
    done();
  }
  
  userdao.setNormalPrivilegesEmail("hei@gmail.com", 1, callback); // user 1 har privileges 1 by default
}, 30000);