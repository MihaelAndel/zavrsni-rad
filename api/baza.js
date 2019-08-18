const mysql = require('mysql');

var connection = null;

function Spoji(callback) {
	connection = mysql.createConnection({
		host: 'remotemysql.com',
		user: 'HyAcazdIoN',
		password: 'H3DKGpv2vT',
		database: 'HyAcazdIoN'
	});
	connection.connect(callback);
}

function Prekini(callback) {
	connection.end(callback);
}

function Upit(sql, callback) {
	connection.query(sql, function(error, result, fields) {
		if (!error) {
			callback(result);
		} else {
			callback(null, error);
		}
	});
}

module.exports = {
	Spoji,
	Prekini,
	Upit
};
