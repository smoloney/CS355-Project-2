var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query ('SELECT * from characters;',
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetByID = function(char_id, callback) {
     console.log(char_id);

    var query = 'SELECT * FROM overal_data WHERE char_id = ' + char_id;

    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }

            callback(false, result);
        }
    );
}