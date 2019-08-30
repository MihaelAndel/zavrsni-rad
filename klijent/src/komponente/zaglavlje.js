import React from 'react';
import Cookies from 'js-cookie';
import Pozdrav from './pozdrav';
import { Link } from 'react-router-dom';
import GlavnaNavigacija from './glavna-navigacija';

function Zaglavlje(props) {
	var korisnik = Cookies.get('korisnik');
	if (!korisnik) {
		return (
			<header className="zaglavlje blok grid grid-2stupca-ulijevo pozadina obrub-donji">
				<GlavnaNavigacija />
				<div>
					<Link to="/prijava">
						<button>Prijava</button>
					</Link>
					<Link to="/registracija">
						<button>Registracija</button>
					</Link>
				</div>
			</header>
		);
	} else {
		return (
			<header className="zaglavlje blok grid grid-2stupca-ulijevo pozadina obrub-donji">
				<GlavnaNavigacija />
				<Pozdrav odjava={props.odjava} />
			</header>
		);
	}
}

export default Zaglavlje;
