var navigacija = [
	{
		id: 1,
		vrsteKorisnika: '1234',
		naziv: 'Naslovna',
		putanja: '/'
	},
	{
		id: 2,
		vrsteKorisnika: '1234',
		naziv: 'Ekipe',
		putanja: '/ekipe/'
	},
	{
		id: 3,
		vrsteKorisnika: '1234',
		naziv: 'Osobe',
		putanja: '/osobe/'
	},
	{
		id: 4,
		vrsteKorisnika: '23',
		naziv: 'Stvori objavu',
		putanja: '/nova-objava/'
	}
];

function GenerirajNavigaciju(tipKorisnika) {
	var rezultat = [];
	var tip = tipKorisnika === '' ? '4' : tipKorisnika.toString();
	navigacija.forEach(poveznica => {
		if (poveznica.vrsteKorisnika.indexOf(tip) !== -1) {
			rezultat.push(poveznica);
		}
	});

	return rezultat;
}

module.exports = {
	GenerirajNavigaciju
};
