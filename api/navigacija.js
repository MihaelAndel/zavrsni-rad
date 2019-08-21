var navigacija = [
	{
		id: 1,
		vrsteKorisnika: '1234',
		naziv: 'Ekipe',
		putanja: '/ekipe/'
	},
	{
		id: 2,
		vrsteKorisnika: '1234',
		naziv: 'Igrači',
		putanja: '/igraci/'
	}
];

function GenerirajNavigaciju(tipKorisnika) {
	var rezultat = [];
	var tip = tipKorisnika.toString();
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
