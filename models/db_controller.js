var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospitalDB'
});

con.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log('You are connected to the Database');
    }
});

module.exports.signup = function(username, email, password, status, callback) {
    con.query('SELECT email FROM users WHERE email = ?', [email], function(err, result) {
        if (err) return callback(err);
        if (result.length === 0) {
            var query = "INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)";
            con.query(query, [username, email, password, status], callback);
        } else {
            callback(new Error('Email already exists'));
        }
    });
};
