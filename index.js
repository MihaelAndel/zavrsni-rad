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
	var korisnik = {
		korisnickoIme: request.body.korisnickoIme,
		email: request.body.email,
		ime: request.body.ime,
		prezime: request.body.prezime
	};

	registracija.RegistrirajKorisnika(korisnik, poruka => {
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
	if (request.query.gost && request.query.domacin) {
		console.log('tu sam');
		var domacin = request.query.domacin;
		var gost = request.query.gost;

		var sqlDomacin = `SELECT * FROM Ekipa WHERE id = ${domacin}`;
		var sqlGost = `SELECT * FROM Ekipa WHERE id = ${gost}`;

		var odgovor = [];

		baza.Upit(sqlDomacin, (rezutlatDomacin, error) => {
			if (!error) {
				odgovor.push(rezutlatDomacin);
				baza.Upit(sqlGost, (rezultatGost, error) => {
					if (!error) {
						odgovor.push(rezultatGost);
						response.json(odgovor);
					}
				});
			}
		});
	} else if (request.query.sve) {
		var sqlSve = 'SELECT id, naziv, lokacija FROM Ekipa ORDER BY 2';
		baza.Upit(sqlSve, (rezultat, error) => {
			response.json(rezultat);
		});
	} else {
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
	}
});

app.get('/api/ekipe/bezUtakmice', (request, response) => {
	var datum = request.query.datum;

	var sql =
		`SELECT * FROM Ekipa e WHERE NOT EXISTS ` +
		`(SELECT * FROM Utakmica u WHERE (e.id = u.domacin OR e.id = u.gost) AND u.datum = '${datum}')`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.post('/api/ekipe/dodaj', (request, response) => {
	var naziv = request.body.naziv;
	var lokacija = request.body.lokacija;
	var arena = request.body.arena;

	var sql = `INSERT INTO Ekipa (naziv, lokacija, arena) VALUE('${naziv}', '${lokacija}', '${arena}')`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('/api/ekipe/detaljno', (request, response) => {
	var sql = `SELECT * FROM Ekipa WHERE id=${request.query.ekipa}`;
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
	if (request.query.sve) {
		var sqlSvi =
			'SELECT o.id as id, o.ime as ime, o.prezime as prezime, e.naziv as ekipa ' +
			'FROM Osoba o, Ekipa e ' +
			'WHERE o.ekipa = e.id ORDER BY 3';
		baza.Upit(sqlSvi, (rezultat, error) => {
			response.json(rezultat);
		});
	} else {
		if (request.query.korisnik) {
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
	}
});

app.post('/api/osobe/dodaj', (request, response) => {
	var tip = request.body.tip;
	var ime = request.body.ime;
	var prezime = request.body.prezime;
	var ekipa = request.body.ekipa;
	var broj = request.body.broj;
	var pozicija = request.body.pozicija ? request.body.pozicija : null;

	var sql =
		pozicija === '0'
			? `INSERT INTO Osoba (ime, prezime, tipOsobe, pozicija, ekipa, broj) ` +
			  `VALUES('${ime}', '${prezime}', ${tip}, NULL, ${ekipa}, ${broj})`
			: `INSERT INTO Osoba (ime, prezime, tipOsobe, pozicija, ekipa, broj) ` +
			  `VALUES('${ime}', '${prezime}', ${tip}, '${pozicija}', ${ekipa}, ${broj})`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('/api/osobe/tipovi/dohvati', (request, response) => {
	var sql = 'SELECT * FROM TipOsobe';

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.get('/api/osobe/pozicije/dohvati', (request, response) => {
	var sql = 'SELECT * FROM Pozicija';

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.get('/api/osobe/detaljno', (request, response) => {
	var sql = `SELECT * FROM Osoba WHERE id=${request.query.osoba}`;
	baza.Upit(sql, (rezultat, error) => {
		response.json(rezultat[0]);
	});
});

app.post('/api/osobe/podesiPracenje', (request, response) => {
	var korisnik = request.body.korisnik;
	var osoba = request.body.osoba;
	var sql = request.body.prati
		? `INSERT INTO PratiOsobu VALUES(${korisnik}, ${osoba})`
		: `DELETE FROM PratiOsobu WHERE Korisnik_id = ${korisnik} AND Osoba_id = ${osoba}`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('/api/navigacija/dohvati', (request, response) => {
	response.json(navigacija.poljeNavigacije);
});

app.get('/api/objave/dohvati', (request, response, next) => {
	var korisnik = request.query.korisnik;
	if (korisnik) {
		var sveObjave = [];
		var sqlOsobe =
			`SELECT o.datum, o.tekst as tekst, o.naslov as naslov, k.ime as ime, k.prezime as prezime ` +
			`FROM Objava o, Korisnik k ` +
			`WHERE o.autor = k.id ` +
			`AND EXISTS (SELECT * FROM OsobaUObjavi, PratiOsobu WHERE o.id = OsobaUObjavi.Objava_id ` +
			`AND ${korisnik} = PratiOsobu.Korisnik_id) ` +
			`ORDER BY 1 DESC LIMIT 25`;

		var sqlEkipe =
			`SELECT o.datum, o.tekst as tekst, o.naslov as naslov, k.ime as ime, k.prezime as prezime ` +
			`FROM Objava o, Korisnik k ` +
			`WHERE o.autor = k.id ` +
			`AND EXISTS (SELECT * FROM EkipaUObjavi, PratiEkipu WHERE o.id = EkipaUObjavi.Objava_id ` +
			`AND ${korisnik} = PratiEkipu.Korisnik_id) ` +
			`ORDER BY 1 DESC LIMIT 25`;

		baza.Upit(sqlOsobe, (rezultatOsobe, error) => {
			if (!error) {
				baza.Upit(sqlEkipe, (rezultatEkipe, error) => {
					if (!error) {
						if (rezultatEkipe.length !== 0 || rezultatOsobe.length !== 0) {
							sveObjave = sveObjave.concat(rezultatOsobe);
							for (var i = 0; i < rezultatEkipe.length; i++) {
								var duplikat = false;

								for (var j = 0; j < sveObjave.length; j++) {
									if (sveObjave[j].id === rezultatEkipe[i].id) duplikat = true;
								}

								if (!duplikat) {
									sveObjave.push(rezultatEkipe[i]);
								}
							}
							response.json(sveObjave);
						} else {
							var sqlSveObjave =
								'SELECT o.datum, o.tekst as tekst, o.naslov as naslov, k.ime as ime, k.prezime as prezime ' +
								'FROM Objava o, Korisnik k ' +
								'WHERE k.id = o.autor ' +
								'LIMIT 50';
							baza.Upit(sqlSveObjave, (rezultat, error) => {
								if (!error) {
									response.json(rezultat);
								}
							});
						}
					}
				});
			}
		});
	} else {
		var sqlSveObjave =
			'SELECT o.datum, o.tekst as tekst, o.naslov as naslov, k.ime as ime, k.prezime as prezime ' +
			'FROM Objava o, Korisnik k ' +
			'WHERE k.id = o.autor ' +
			'ORDER BY 1 DESC ' +
			'LIMIT 50';
		baza.Upit(sqlSveObjave, (rezultat, error) => {
			if (!error) {
				response.json(rezultat);
			}
		});
	}
});

app.post('/api/objave/objavi', (request, response) => {
	var korisnik = request.body.korisnik;
	var naslov = request.body.naslov;
	var tekst = request.body.tekst;
	var osobe = request.body.osobe;
	var ekipe = request.body.ekipe;

	var sqlObjava = `INSERT INTO Objava (autor, naslov, tekst, datum) VALUES(${korisnik}, '${naslov}', '${tekst}', NOW())`;
	baza.Upit(sqlObjava, (rezultat, error) => {
		if (!error) {
			var objavaID = rezultat.insertId;
			if (osobe.length !== 0) {
				for (var i = 0; i < osobe.length; i++) {
					var sqlOsoba = `INSERT INTO OsobaUObjavi VALUES(${osobe[i]}, ${objavaID})`;
					baza.Upit(sqlOsoba, (rezultat, error) => {
						if (error) {
							response.json('error');
						}
					});
				}
			}
			if (ekipe.length !== 0) {
				for (var i = 0; i < ekipe.length; i++) {
					var sqlEkipa = `INSERT INTO EkipaUObjavi VALUES(${ekipe[i]}, ${objavaID})`;
					baza.Upit(sqlEkipa, (rezultat, error) => {
						if (error) {
							response.json('error');
						}
					});
				}
			}
		} else {
			response.json('error');
		}
	});
});

app.get('/api/korisnici/dohvati/moderatori', (request, response) => {
	var sql = 'SELECT korisnickoIme, id, ime, prezime FROM Korisnik WHERE tipKorisnika = 2';
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.get('/api/korisnici/dohvati/obicni', (request, response) => {
	var sql = 'SELECT korisnickoIme, id, ime, prezime FROM Korisnik WHERE tipKorisnika = 1';
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.post('/api/korisnici/pretvori', (request, response) => {
	var korisnik = request.body.korisnikID;
	var sql = `UPDATE Korisnik SET tipKorisnika = 2 WHERE id=${korisnik}`;
	baza.Upit(sql, (rezultat, error) => {
		console.log(error);
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.post('/api/korisnici/moderatori/pretvori', (request, response) => {
	var korisnik = request.body.korisnikID;
	var sql = `UPDATE Korisnik SET tipKorisnika = 1 WHERE id=${korisnik}`;
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('/api/statistika/osobe/postojanje', (request, response) => {
	var osoba = request.query.osoba;
	var sezona = request.query.sezona;
	var sql = `SELECT * FROM Statistika WHERE igrac = ${osoba} AND sezona = ${sezona}`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			if (rezultat.length > 0) {
				response.json('no');
			} else {
				response.json('ok');
			}
		}
	});
});

app.post('/api/statistika/osobe/upisi', (request, response) => {
	var osoba = request.body.osoba;
	var sezona = request.body.sezona;
	var ppg = request.body.ppg;
	var apg = request.body.apg;
	var rpg = request.body.rpg;
	var bpg = request.body.bpg;
	var spg = request.body.spg;
	var fg = request.body.fg;
	var p3 = request.body.p3;
	var ortg = request.body.ortg;
	var drtg = request.body.drtg;

	var sql =
		`INSERT INTO Statistika ` +
		`(igrac, ekipa, sezona, poeni, asistencije, skokovi, blokovi, ` +
		`ukradeneLopte, postotakPogodaka, postotakTrica, ocjenaNapada, ocjenaObrane) ` +
		`VALUES(${osoba}, NULL, ${sezona}, ${ppg}, ${apg}, ${rpg}, ${bpg}, ${spg}, ${fg}, ${p3}, ${ortg}, ${drtg})`;

	baza.Upit(sql, (rezultat, error) => {
		response.json('ok');
	});
});

app.post('/api/statistika/ekipe/upisi', (request, response) => {
	var ekipa = request.body.ekipa;
	var sezona = request.body.sezona;
	var ppg = request.body.ppg;
	var apg = request.body.apg;
	var rpg = request.body.rpg;
	var bpg = request.body.bpg;
	var spg = request.body.spg;
	var fg = request.body.fg;
	var p3 = request.body.p3;
	var ortg = request.body.ortg;
	var drtg = request.body.drtg;

	var sql =
		`INSERT INTO Statistika ` +
		`(igrac, ekipa, sezona, poeni, asistencije, skokovi, blokovi, ` +
		`ukradeneLopte, postotakPogodaka, postotakTrica, ocjenaNapada, ocjenaObrane) ` +
		`VALUES(NULL, ${ekipa}, ${sezona}, ${ppg}, ${apg}, ${rpg}, ${bpg}, ${spg}, ${fg}, ${p3}, ${ortg}, ${drtg})`;

	baza.Upit(sql, (rezultat, error) => {
		response.json('ok');
	});
});

app.get('/api/statistika/ekipe/postojanje', (request, response) => {
	var ekipa = request.query.ekipa;
	var sezona = request.query.sezona;
	var sql = `SELECT * FROM Statistika WHERE ekipa = ${ekipa} AND sezona = ${sezona}`;

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			if (rezultat.length > 0) {
				response.json('no');
			} else {
				response.json('ok');
			}
		}
	});
});

app.get('/api/statistika/ekipe/sezone', (request, response) => {
	var id = request.query.ekipa;
	var sql = `SELECT id, sezona FROM Statistika WHERE ekipa=${id}`;
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.get('/api/statistika/dohvati', (request, response) => {
	var id = request.query.id;
	var sql = `SELECT * FROM Statistika WHERE id=${id}`;
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat[0]);
		}
	});
});

app.get('/api/statistika/osobe/sezone', (request, response) => {
	var id = request.query.ekipa;
	var sql = `SELECT id, sezona FROM Statistika WHERE igrac=${id}`;
	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json(rezultat);
		}
	});
});

app.post('/api/utakmice/dodaj', (request, response) => {
	var domacin = request.body.domacin;
	var gost = request.body.gost;
	var pobjednik = request.body.pobjednik;
	var sezona = request.body.sezona;
	var datum = request.body.datum;
	var poeniDomacin = request.body.poeniD;
	var poeniGost = request.body.poeniG;

	var sql =
		`INSERT INTO Utakmica (domacin, gost, pobjednik, sezona, datum, poeniDomacin, poeniGost) ` +
		`VALUES(${domacin}, ${gost}, ${pobjednik}, ${sezona}, '${datum}', ${poeniDomacin}, ${poeniGost})`;

	console.log(sql);

	baza.Upit(sql, (rezultat, error) => {
		if (!error) {
			response.json('ok');
		} else {
			response.json('error');
		}
	});
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname + '/klijent/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);
