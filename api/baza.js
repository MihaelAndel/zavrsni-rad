const mysql = require('mysql');

var connection = null;

connection = mysql.createConnection({
	host: 'remotemysql.com',
	user: 'HyAcazdIoN',
	password: 'H3DKGpv2vT',
	database: 'HyAcazdIoN'
});
connection.connect();

function Upit(sql, callback) {
	connection.query(sql, function(error, result, fields) {
		callback(result, error);
	});
}

module.exports = {
	Upit
};
