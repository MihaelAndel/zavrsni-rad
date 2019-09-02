import React from 'react';
import Cookies from 'js-cookie';
import Pozdrav from './pozdrav';
import { Link } from 'react-router-dom';
import GlavnaNavigacija from './glavna-navigacija';

function Navigacija(props) {
	var korisnik = Cookies.get('korisnik');
	if (!korisnik) {
		return (
			<div className="navigacija grid">
				<div></div>
				<header className="grid">
					<GlavnaNavigacija />
					<nav>
						<Link to="/prijava">
							<div className="gumb-navigacija">Prijava</div>
						</Link>
						<Link to="/registracija">
							<div className="gumb-navigacija">Registracija</div>
						</Link>
					</nav>
				</header>
			</div>
		);
	} else {
		return (
			<div className="navigacija grid">
				<div></div>
				<header>
					<GlavnaNavigacija />
					<nav>
						<Pozdrav odjava={props.odjava} />
					</nav>
				</header>
			</div>
		);
	}
}

export default Navigacija;
