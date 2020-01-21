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

test("Get user by id", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].user_name).toBe("Navn Navnesen");
    done();
  }

  userdao.getUserById(1, callback);
}, 30000);

test("Get user by email and org_id", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].email).toBe("ha_det@gmail.com");
    done();
  }

  userdao.getUser({email: "ha_det@gmail.com", org_id: 2}, callback);
}, 30000);

test("Add user", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  userdao.addUser({email: "test@test.com", org_id: 2, privileges: -1, user_name: "test", password: "12345678", address: "testveien 12", phone: "11111111", image: "test.jpg"}, callback);
}, 30000);

test("Get all users by org_id", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data).toBeArray();
    done();
  }

  userdao.getAllUsersByOrgId(2, callback);
}, 30000);

test("Get admin by org_id", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].user_name).toBe("person Personesen");
    done();
  }

  userdao.getAdminByOrgId(2, callback);
}, 30000);

test("Update user email", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  userdao.updateUserEmail(2, {email: "nyemail@mail.com"}, callback);
}, 30000);

test("Update password", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  userdao.updateUserPass(2, {user_name: "Person Personesen", password: "87654321"}, callback);
}, 30000);

