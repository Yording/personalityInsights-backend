// Depedencias
var sql = require('mssql')

module.exports = function executeQuery(res, query){
    // crear un objecto request
    var request = new sql.Request();
    // query
    request.query(query, function(err, data) {
        if (err) {
            console.log("Error while querying database :- " + err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data.recordset);
        }
    });
}