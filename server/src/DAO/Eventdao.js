const Dao = require("./dao.js");

module.exports = class arrDao extends  Dao{
    getAll(callback: function ){
        super.query("SELECT * FROM Arrangement", [], callback);
}

}