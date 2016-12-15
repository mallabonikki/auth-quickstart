var db = require('./db');
var sql = require('./sql').queries;

module.exports = {

    getUserPatient: function (username) {
        return db.any(sql.selectUserPatients, username);
    }
}; 