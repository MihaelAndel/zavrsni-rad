import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class GlavnaNavigacija extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			poveznice: []
		};

		this.DohvatiPoveznice();
		setInterval(() => {
			if (this.state.poveznice.length > 0) this.SrediPoveznice();
		}, 500);
	}

	render() {
		return (
			<nav id="glavna-navigacija">
				{this.state.poveznice.map(poveznica => (
					<div>
						<Link
							hidden={poveznica.prikazi ? '' : 'hidden'}
							key={poveznica.id}
							to={poveznica.putanja}>
							<div className="gumb-navigacija">{poveznica.naziv}</div>
						</Link>
						<br></br>
					</div>
				))}
			</nav>
		);
	}

	DohvatiPoveznice() {
		var korisnik = Cookies.get('tip') ? Cookies.get('tip') : 4;
		korisnik = korisnik.toString();
		axios.get(`/api/navigacija/dohvati`).then(response => {
			for (var i = 0; i < response.data.length; i++) {
				if (response.data[i].vrsteKorisnika.indexOf(korisnik) !== -1) {
					response.data[i].prikazi = true;
				} else {
					response.data[i].prikazi = false;
				}
			}
			this.setState({ poveznice: response.data });
		});
	}

	SrediPoveznice() {
		var polje = this.state.poveznice;
		var korisnik = Cookies.get('tip') ? Cookies.get('tip') : 4;
		korisnik = korisnik.toString();
		for (var i = 0; i < polje.length; i++) {
			if (polje[i].vrsteKorisnika.indexOf(korisnik) !== -1) {
				polje[i].prikazi = true;
			} else {
				polje[i].prikazi = false;
			}
		}
		this.setState({ poveznice: polje });
	}
}

export default GlavnaNavigacija;
