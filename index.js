const express = require('express');
const path = require('path');
const cors = require('cors');
const baza = require('./api/baza');
const registracija = require('./api/registracija');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'klijent/build')));

app.get('/api/nekaj', (request, response) => {
	baza.Spoji(() => {
		baza.Upit('SELECT * FROM TipOsobe', (result, error) => {
			response.json(result);
			baza.Prekini();
		});
	});
});

app.post('/api/registriraj', (request, response) => {
	console.log(request.body);
	response.send('ok');
});

app.get('/api/provjeriEmail', (request, response) => {
	var email = request.body.email;
	registracija.ProvjeriEmail(email, (postoji) => {
		response.send(postoji);
	})
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname + '/klijent/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);
