const baza = require('./baza');

var sveObjave = [];

function DohvatiOsobePrati(korisnik, callback) {
	console.log('tu sam');
	console.log(sveObjave);
	sveObjave = [];
	var sqlPratiOsobe = `SELECT Osoba_id FROM PratiOsobu WHERE Korisnik_id = ${korisnik}`;
	baza.Upit(sqlPratiOsobe, (rezultat, error) => {
		if (!error) {
			callback(rezultat);
		}
	});
}

function DohvatiEkipePrati(korisnik, callback) {
	var sqlPratiEkipe = `SELECT Ekipa_id FROM PratiEkipu WHERE Korisnik_id = ${korisnik}`;
	baza.Upit(sqlPratiEkipe, (rezultat, error) => {
		if (!error) {
			callback(rezultat);
		}
	});
}

function DodajObjaveOsobe(osobe, callback) {
	var brojObjava = osobe.length;
	for (var i = 0; i < osobe.length; i++) {
		var sqlObjavaOsoba =
			`SELECT ob.id as id, k.ime as ime, k.prezime as prezime, ` +
			`ob.naslov as naslov, ob.tekst as tekst, ob.datum as datum ` +
			`FROM Objava ob, Korisnik k, OsobaUObjavi os ` +
			`WHERE os.Osoba_id = ${osobe[i].Osoba_id} AND ob.id = os.Objava_id AND ob.autor = k.id ` +
			`ORDER BY 6 DESC LIMIT 3`;

		baza.Upit(sqlObjavaOsoba, (rezultat, error) => {
			if (rezultat.length !== 0) {
				for (var i = 0; i < rezultat.length; i++) {
					var duplikat = false;
					for (var j = 0; j < sveObjave.length; j++) {
						if (rezultat[i].id === sveObjave[j].id) duplikat = true;
					}
					if (!duplikat) sveObjave.push(rezultat[i]);
				}
			}

			if (0 === --brojObjava) {
				callback();
			}
		});
	}
}

function DodajObjaveEkipe(ekipe, callback) {
	var brojObjava = ekipe.length;
	for (var i = 0; i < ekipe.length; i++) {
		var sqlObjava =
			`SELECT ob.id as id, k.ime as ime, k.prezime as prezime, ` +
			`ob.naslov as naslov, ob.tekst as tekst, ob.datum as datum ` +
			`FROM Objava ob, Korisnik k, OsobaUObjavi os ` +
			`WHERE os.Osoba_id = ${ekipe[i].Ekipa_id} AND ob.id = os.Objava_id AND ob.autor = k.id ` +
			`ORDER BY 6 DESC LIMIT 3`;

		baza.Upit(sqlObjava, (rezultat, error) => {
			if (rezultat.length !== 0) {
				for (var i = 0; i < rezultat.length; i++) {
					var duplikat = false;
					for (var j = 0; j < sveObjave.length; j++) {
						if (rezultat[i].id === sveObjave[j].id) duplikat = true;
					}
					if (!duplikat) sveObjave.push(rezultat[i]);
				}
			}

			if (0 === --brojObjava) {
				callback(sveObjave);
			}
		});
	}
}

module.exports = {
	DohvatiEkipePrati,
	DohvatiOsobePrati,
	DodajObjaveOsobe,
	DodajObjaveEkipe
};
