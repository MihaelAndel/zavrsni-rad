import React from 'react';
import Cookies from 'js-cookie';
import Pozdrav from './pozdrav';
import { Link } from 'react-router-dom';

function Zaglavlje(props) {
	var korisnik = Cookies.get('korisnik');
	if (!korisnik) {
		return (
			<header>
				<Link to="/prijava">
					<button>Prijava</button>
				</Link>
				<Link to="/registracija">
					<button>Registracija</button>
				</Link>
			</header>
		);
	} else {
		return (
			<header>
				<Pozdrav odjava={props.odjava} />
			</header>
		);
	}
}

export default Zaglavlje;
