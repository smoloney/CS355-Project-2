var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetByEmail = function (email, password, callback) {
    var query = 'Call login_info('+ email +',' + password +')';
    var query_data = [email, password];
    
    connection.query(query, query_data, function(err, result){
        if(err) {
            callback(err, null);
        }
        else if(result[0].length == 1){
            callback(err, result[0][0]);
        }
        
        else{
            callback(err, null);
        }
    });
};

exports.GetByID = function(user_id, callback) {
    console.log(user_id);
    var query = 'SELECT user_id FROM get_account_by_id WHERE user_id=' + user_id;
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



exports.GetAll = function (callback) {
    connection.query('SELECT * from accounts;',
        function(err, result){
            if(err){
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
}

exports.Insert = function(account_info, callback){
    console.log(account_info);

    var dynamic_query = 'INSERT INTO accounts (firstname, lastname, email, role, username, cname, password) VALUES (' +
        '\'' + account_info.firstname + '\', ' +
        '\'' + account_info.lastname + '\', ' +
        '\'' + account_info.email + '\', ' +
        '\'' + account_info.role + '\',' +
        '\'' + account_info.username + '\',' +
        '\'' + account_info.cname + '\',' +
        '\'' + account_info.password + '\'' +
        ');';

    console.log(dynamic_query);
    connection.query(dynamic_query, function(err,result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        
        callback(false, result);
    });
}

exports.Update = function(user_id, firstname, lastname, email, role, username, password,  callback) {
    console.log(user_id, firstname, lastname, email, role, username, password);
    var values = [firstname, lastname, username, role,  password, user_id];

    connection.query('UPDATE accounts SET firstname = ?, lastname = ?, email = ?, username = ?, role = ?, password = ? WHERE user_id = ?', values,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
            else {

                DeleteUser(user_id, function(err, result) {

                    AddUser(user_id, callback);
                });
            }
        });
}

var DeleteUser = function(user_id, callback) {
//function Delete(movie_id, callback) {
    var qry = 'DELETE FROM accounts WHERE user_id = ?';
    connection.query(qry, [user_id],
        function (err) {
            callback(err);
        });
}

exports.DeleteById = function(user_id, callback){
    var query = 'DELETE FROM accounts where user_id = ?';
    connection.query(query, user_id, function(err, result){
        callback(err, result);
    });

};
