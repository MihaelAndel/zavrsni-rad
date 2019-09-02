const md5 = require('md5');
const baza = require('./baza');

function PrijaviKorisnika(korisnickoIme, lozinka, callback) {
	lozinka = md5(lozinka);
	baza.Upit(
		`SELECT k.id, k.korisnickoIme as kIme, t.id as tid FROM Korisnik k, TipKorisnika t ` +
			`WHERE k.korisnickoIme = '${korisnickoIme}' AND k.lozinka = '${lozinka}' ` +
			`AND t.id = k.tipKorisnika`,
		(rezultat, error) => {
			callback(rezultat);
		}
	);
}

module.exports = { PrijaviKorisnika };
