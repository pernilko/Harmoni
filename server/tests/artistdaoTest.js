// @flow
let mysql = require("mysql");
const ArtistDao = require("../src/DAO/artistDao.js");
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

let artistDao = new ArtistDao(pool);

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

    expect(data.length).toBe(3);
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
    expect(data[0].artist_name).toBe("TIX");
    done();
  }

  artistDao.getOne(4, callback);
});

test("Get an artist", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.length).toBe(2);
    done();
  }

  artistDao.getEventArtists(1, callback);
});

test("Update an artist", done =>{
  function callback (status, data) {
    console.log(
      "Test callback: status =" + status + ", data =" + data + JSON.stringify(data)
    );

    expect(data.affectedRows).toBe(1);
    done();
  }

  artistDao.updateArtist(4, {artist_name: "Cool artist", riders: "fil", hospitality_riders: "File",
        artist_contract: "File", email: "a@a.a", phone: "123", image: "File"}, callback);
});
 