const baza = require('./baza');
const generator = require('./generiranje-lozinke');
const md5 = require('md5');
const mail = require('./slanje-poste');

function ProvjeriEmail(email, callback) {
	baza.Upit(`SELECT * FROM Korisnik WHERE email = '${email}'`, (rezultat, error) => {
		var postoji = rezultat.length !== 0 ? '0' : '1';
		callback(postoji);
	});
}

function ProvjeriKorisnika(korisnik, callback) {
	baza.Upit(`SELECT * FROM Korisnik WHERE korisnickoIme = '${korisnik}'`, (rezultat, error) => {
		var postoji = rezultat.length !== 0 ? '0' : '1';
		callback(postoji);
	});
}

function RegistrirajKorisnika(korisnik, callback) {
	var lozinka = generator.Generiraj();
	var kriptiranaLozinka = md5(lozinka);
	var sqlUnos =
		`INSERT INTO Korisnik (tipKorisnika, korisnickoIme, email, ime, prezime, lozinka) ` +
		`VALUES(1, '${korisnik.korisnickoIme}', '${korisnik.email}', '${korisnik.ime}', '${korisnik.prezime}', '${kriptiranaLozinka}')`;
	baza.Upit(sqlUnos, (rezultat, error) => {
		var poruka = error ? 'error' : 'ok';
		if (!error) {
			var naslov = 'Vaša nova lozinka';
			var poruka = `Poštovani ${korisnik.ime} ${korisnik.prezime}, lozinka za Vaš novi račun je: ${lozinka}.`;
			mail.PosaljiEmail(korisnik.email, naslov, poruka);
		}
		callback(poruka);
	});
}

module.exports = { ProvjeriEmail, ProvjeriKorisnika, RegistrirajKorisnika };
