const express = require('express');
const path = require('path');
const cors = require('cors');
const baza = require('./api/baza');
const registracija = require('./api/registracija');
const prijava = require('./api/prijava');
const navigacija = require('./api/navigacija');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'klijent/build')));

app.post('/api/registriraj', (request, response) => {
	var korisnickoIme = request.body.korisnickoIme;
	var email = request.body.email;
	registracija.RegistrirajKorisnika(email, korisnickoIme, poruka => {
		response.json(poruka);
	});
});

app.get('/api/prijavi', (request, response) => {
	var korisnickoIme = request.query.korisnickoIme;
	var lozinka = request.query.lozinka;
	prijava.PrijaviKorisnika(korisnickoIme, lozinka, rezultat => {
		response.json(rezultat);
	});
});

app.get('/api/provjeriEmail', (request, response) => {
	var email = request.query.email;
	registracija.ProvjeriEmail(email, postoji => {
		response.send(postoji);
	});
});

app.get('/api/provjeriKorisnika', (request, response) => {
	var korisnik = request.query.korisnik;
	registracija.ProvjeriKorisnika(korisnik, postoji => {
		response.send(postoji);
	});
});

app.get('/api/ekipe/dohvati', (request, response) => {
	if (request.query.korisnik) {
		var korisnikID = request.query.korisnik;
		var sqlNePrati =
			`SELECT * FROM Ekipa e WHERE NOT EXISTS ` +
			`(SELECT * FROM PratiEkipu p WHERE e.id = p.Ekipa_id AND '${korisnikID}' = p.Korisnik_id)`;
		var sqlPrati =
			`SELECT e.id as id, e.naziv as naziv, e.lokacija as lokacija, e.arena as arena ` +
			`FROM Ekipa e, PratiEkipu p WHERE p.Ekipa_id = e.id AND p.Korisnik_id = ${korisnikID}`;
		baza.Upit(sqlNePrati, (rezultatNePrati, error) => {
			rezultatNePrati.forEach(ekipa => {
				ekipa.prati = false;
			});
			baza.Upit(sqlPrati, (rezultatPrati, errorPrati) => {
				rezultatPrati.forEach(ekipa => {
					ekipa.prati = true;
				});
				var rezultat = rezultatPrati.concat(rezultatNePrati);
				var rezultat = rezultat.sort((a, b) => (a.id > b.id ? 1 : -1));
				response.json(rezultat);
			});
		});
	} else {
		var sql = 'SELECT * FROM Ekipa';
		baza.Upit(sql, (rezultat, error) => {
			rezultat.forEach(ekipa => {
				ekipa.prati = false;
			});
			response.json(rezultat);
		});
	}
});

app.get('/api/ekipe/detaljno', (request, response) => {
	var sql = `SELECT naziv FROM Ekipa WHERE id=${request.query.ekipa}`;
	baza.Upit(sql, (rezultat, error) => {
		response.json(rezultat[0]);
	});
});

app.post('/api/ekipe/podesiPracenje', (request, response) => {
	var korisnik = request.body.korisnik;
	var ekipa = request.body.ekipa;
	var sql = request.body.prati
		? `INSERT INTO PratiEkipu VALUES(${ekipa}, ${korisnik})`
		: `DELETE FROM PratiEkipu WHERE Korisnik_id = ${korisnik} AND Ekipa_id = ${ekipa}`;
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('/api/osobe/dohvati', (request, response) => {
	if (request.query.korisnik) {
		console.log('prijavljen');
		var korisnikID = request.query.korisnik;
		var sqlNePrati =
			`SELECT o.id as id, t.naziv as tip, o.pozicija as pozicija, o.ime as ime, o.prezime as prezime, o.broj as broj, e.naziv as ekipa ` +
			`FROM Osoba o, Ekipa e, TipOsobe t WHERE NOT EXISTS ` +
			`(SELECT * FROM PratiOsobu p WHERE o.id = p.Osoba_id AND ${korisnikID} = p.Korisnik_id) AND e.id = o.ekipa AND t.id = o.tipOsobe`;

		var sqlPrati =
			`SELECT o.id as id, t.naziv as tip, o.pozicija as pozicija, o.ime as ime, o.prezime as prezime, o.broj as broj, e.naziv as ekipa ` +
			`FROM Osoba o, PratiOsobu p, Ekipa e, TipOsobe t ` +
			`WHERE p.Osoba_id = o.id AND p.Korisnik_id = ${korisnikID} AND e.id = o.ekipa AND t.id = o.tipOsobe`;

		baza.Upit(sqlNePrati, (rezultatNePrati, error) => {
			rezultatNePrati.forEach(osoba => {
				osoba.prati = false;
			});
			baza.Upit(sqlPrati, (rezultatPrati, errorPrati) => {
				rezultatPrati.forEach(osoba => {
					osoba.prati = true;
				});
				var rezultat = rezultatPrati.concat(rezultatNePrati);
				var rezultat = rezultat.sort((a, b) => (a.id > b.id ? 1 : -1));
				response.json(rezultat);
			});
		});
	} else {
		console.log('neprijavljen');
		var sql =
			'SELECT o.id as id, t.naziv as tip, o.pozicija as pozicija, o.ime as ime, o.prezime as prezime, o.broj as broj, e.naziv as ekipa ' +
			'FROM Osoba o, Ekipa e, TipOsobe t ' +
			'WHERE e.id = o.ekipa AND t.id = o.tipOsobe';
		baza.Upit(sql, (rezultat, error) => {
			rezultat.forEach(osoba => {
				osoba.prati = false;
			});
			response.json(rezultat);
		});
	}
});

app.post('/api/osobe/podesiPracenje', (request, response) => {
	var korisnik = request.body.korisnik;
	var osoba = request.body.osoba;
	var sql = request.body.prati
		? `INSERT INTO PratiOsobu VALUES(${korisnik}, ${osoba})`
		: `DELETE FROM PratiOsobu WHERE Korisnik_id = ${korisnik} AND Osoba_id = ${osoba}`;

	// var sql = request.body.prati
	// 	? `INSERT INTO PratiEkipu VALUES(${ekipa}, ${korisnik})`
	// 	: `DELETE FROM PratiEkipu WHERE Korisnik_id = ${korisnik} AND Ekipa_id = ${ekipa}`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('/api/navigacija/dohvati', (request, response) => {
	var korisnik = request.query.korisnik;
	response.json(navigacija.GenerirajNavigaciju(korisnik));
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname + '/klijent/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);
