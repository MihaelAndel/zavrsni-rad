import React from 'react';
import Cookies from 'js-cookie';
import Prijava from './prijava';
import Registracija from './registracija';
import Pozdrav from './pozdrav';

function Zaglavlje() {
	var korisnik = Cookies.get('korisnik');
	console.log(korisnik);
	if (!korisnik) {
		return (
			<header>
				<Prijava />
				<Registracija />
				<Pozdrav />
			</header>
		);
	} else {
		return (
			<header>
				<Pozdrav korisnik={korisnik} />
			</header>
		);
	}
}

export default Zaglavlje;
