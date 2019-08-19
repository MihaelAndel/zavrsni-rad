const baza = require('./baza');
const generator = require('./generiranje-lozinke');
const md5 = require('md5');
const mail = require('./slanje-poste');

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
	var lozinka = generator.Generiraj();
	var kriptiranaLozinka = md5(lozinka);
	baza.Upit(
		`INSERT INTO Korisnik (tipKorisnika, korisnickoIme, email, lozinka) VALUES(1, '${korisnik}', '${email}', '${kriptiranaLozinka}')`,
		(rezultat, error) => {
			var poruka = error ? 'error' : 'ok';
			if (!error) {
				var naslov = 'Vaša nova lozinka';
				var poruka = `Poštovani ${korisnik}, lozinka za Vaš novi račun je: ${lozinka}.`;
				mail.PosaljiEmail(email, naslov, poruka);
			}
			callback(poruka);
		}
	);
}

module.exports = { ProvjeriEmail, ProvjeriKorisnika, RegistrirajKorisnika };
