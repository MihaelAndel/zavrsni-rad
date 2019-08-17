const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'klijent/build')));

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname + '/klijent/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);
