import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Ucitavanje from '../ucitavanje';
import PopisOsoba from '../popis-osoba';
import { Route } from 'react-router-dom';
import OsobaDetaljno from '../osoba-detaljno';

class Ekipe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listaOsoba: [],
			osobePrikaz: []
		};

		this.DohvatiOsobe();

		this.PretraziOsobe = this.PretraziOsobe.bind(this);
	}

	render() {
		if (this.state.listaOsoba.length === 0) {
			return <Ucitavanje />;
		} else {
			return (
				<div>
					<div className="pretrazivanje">
						<input
							onChange={this.PretraziOsobe}
							type="text"
							id="pretrazi"
							placeholder="Pretraživanje"
						/>
					</div>
					<PopisOsoba lista={this.state.osobePrikaz} />
					<Route path="/osobe/:id" component={OsobaDetaljno} />
				</div>
			);
		}
	}

	DohvatiOsobe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		if (this.state.listaOsoba.length === 0) {
			axios.get(`/api/osobe/dohvati?korisnik=${korisnik}`).then(response => {
				var osobe = response.data;

				osobe.forEach(osoba => {
					osoba.pretrazi = osoba.ime + ' ' + osoba.prezime + ' ' + osoba.ekipa;
				});

				this.setState({
					listaOsoba: osobe,
					osobePrikaz: osobe
				});
			});
		}
	}

	PretraziOsobe(e) {
		var vrijednost = e.target.value.toUpperCase();
		var osobe = this.state.listaOsoba;
		var osobeZaPrikaz = [];

		if (vrijednost === '') {
			osobe.forEach(osoba => {
				osobeZaPrikaz.push(osoba);
			});
		} else {
			osobe.forEach(osoba => {
				if (osoba.pretrazi.toUpperCase().indexOf(vrijednost) !== -1) {
					osobeZaPrikaz.push(osoba);
				}
			});
		}

		this.setState({ osobePrikaz: osobeZaPrikaz });
	}
}

export default Ekipe;
