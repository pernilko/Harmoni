// @flow
let mysql = require("mysql");
const artistDao = require("../src/DAO/artistDao.js");
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

let artistDao = new artistDao(pool);

beforeAll(done => {
  runsqlfile("create_tables.sql", pool, () => {
    runsqlfile("create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});



test("Retrieve all artists", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    done();
  }

  artistDao.getAll(callback);
});

test("Get an artist", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(1);
    expect(data[0].artist_name).toBe("Artist name");
    done();
  }

  artistDao.getOne(1, callback);
});

test("Add an artist", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  artistDao.insertOne(
    { event_id: 1, artist_name: "Jostein Bieber", riders: "gitar", hospitality_riders: "øl",
      artist_contract: "kontrakt", email: "hei@gmail.com", phone: "22222222", image: "url.com"
    }, callback);
});
