var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

function sql(file) {
    var fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

module.exports = {
    queries : {
       selectUserPatients: sql('./sql/user_patients.sql')
    }
};

