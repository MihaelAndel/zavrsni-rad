const express = require('express');
const path = require('path');
const cors = require('cors');
const baza = require('./api/baza');
const registracija = require('./api/registracija');
const prijava = require('./api/prijava');
const mail = require('./api/slanje-poste');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'klijent/build')));

app.get('/api/nekaj', (request, response) => {
	baza.Upit('SELECT * FROM TipOsobe', (result, error) => {
		response.json(result);
	});
});

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

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname + '/klijent/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);
