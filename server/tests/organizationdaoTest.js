// @flow
let mysql = require("mysql");
const OrganizationDao = require("../src/DAO/organizationDao.js");
const runsqlfile = require("../src/runsqlfile.js");

let pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});

let organizationDao = new OrganizationDao(pool);

beforeAll(done => {
  runsqlfile("./src/create_tables.sql", pool, () => {
    runsqlfile("./src/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Get all organizations", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    done();
  }

  organizationDao.getAllOrganizations(callback);
});

test("Get an organization", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].org_name).toBe("Organization name");
    done();
  }

  organizationDao.getOrganization(1, callback);
});

test("Get org by email", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].email).toBe("email");
    done();
  }

  organizationDao.getOrgByEmail(1, callback);
});

test("Add an organization", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  organizationDao.addOrganization(
    {org_name: "Sukkerhuset", phone: "222 222", email: "hallo@gmail.com"
    }, callback);
});

test("Edit an organization", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  organizationDao.updateOrganization(1,
    {org_name: "Samfundet", phone: "333 333", email: "cola@gmail.com"},
    callback);
});

test("Delete an organization", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  organizationDao.deleteOrganization(1, callback);
});



