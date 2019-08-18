const baza = require('./baza');
const generator = require('./generiranje-lozinke');
const md5 = require('md5');

function ProvjeriEmail(email, callback) {
	baza.Upit(
		`SELECT * FROM Korisnik WHERE email = '${email}'`,
		(rezultat, error) => {
			var postoji = rezultat.length !== 0 ? '0' : '1';
			callback(postoji);
		}
	);
}

function ProvjeriKorisnika(korisnik, callback) {
	baza.Upit(
		`SELECT * FROM Korisnik WHERE korisnickoIme = '${korisnik}'`,
		(rezultat, error) => {
			var postoji = rezultat.length !== 0 ? '0' : '1';
			callback(postoji);
		}
	);
}

function RegistrirajKorisnika(email, korisnik, callback) {
	var lozinka = md5(generator.Generiraj());
	baza.Upit(
		`INSERT INTO Korisnik (tipKorisnika, korisnickoIme, email, lozinka) VALUES(1, '${korisnik}', '${email}', '${lozinka}')`,
		(rezultat, error) => {
			var poruka = error ? 'error' : 'ok';
			callback(poruka);
		}
	);
}

module.exports = { ProvjeriEmail, ProvjeriKorisnika, RegistrirajKorisnika };
