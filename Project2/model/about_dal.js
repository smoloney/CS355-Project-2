var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);
exports.GetAbout = function(callback) {
    connection.query( 'select cname from q;',
        function(err, result) {
            if (err){
                console.log(err);
                callback(true);
                return;
            }
            
            console.log(result);
            callback(false,result);
        }
    );
}