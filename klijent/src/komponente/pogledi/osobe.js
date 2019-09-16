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

		this.DohvatiOsobe = this.DohvatiOsobe.bind(this);

		this.PretraziOsobe = this.PretraziOsobe.bind(this);
		this.PrikaziSve = this.PrikaziSve.bind(this);
		this.PrikaziPratim = this.PrikaziPratim.bind(this);
		this.PrikaziNePratim = this.PrikaziNePratim.bind(this);

		this.DohvatiOsobe();
	}

	render() {
		var filtriranje = Cookies.get('korisnik') ? (
			<div>
				<button onClick={this.PrikaziSve}>Prikaži sve</button>
				<button onClick={this.PrikaziPratim}>Pratim</button>
				<button onClick={this.PrikaziNePratim}>Ne pratim</button>
			</div>
		) : null;
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
					{filtriranje}
					<PopisOsoba dohvati={this.DohvatiOsobe} lista={this.state.osobePrikaz} />
					<Route path="/osobe/:id" component={OsobaDetaljno} />
				</div>
			);
		}
	}

	DohvatiOsobe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		axios.get(`/api/osobe/dohvati?korisnik=${korisnik}`).then(response => {
			var osobe = response.data;

			osobe.forEach(osoba => {
				osoba.pretrazi = osoba.ime + ' ' + osoba.prezime + ' ' + osoba.ekipa;
			});

			this.setState(
				{
					listaOsoba: osobe
				},
				() => {
					if (this.state.osobePrikaz.length === 0) {
						this.setState({ osobePrikaz: osobe });
					}
				}
			);
		});
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

	PrikaziSve() {
		this.setState({ osobePrikaz: this.state.listaOsoba });
	}

	PrikaziPratim() {
		var prikaz = [];
		for (var i = 0; i < this.state.listaOsoba.length; i++) {
			if (this.state.listaOsoba[i].prati) {
				prikaz.push(this.state.listaOsoba[i]);
			}
		}

		this.setState({
			osobePrikaz: prikaz
		});
	}

	PrikaziNePratim() {
		var prikaz = [];
		for (var i = 0; i < this.state.listaOsoba.length; i++) {
			if (!this.state.listaOsoba[i].prati) {
				prikaz.push(this.state.listaOsoba[i]);
			}
		}

		this.setState({
			osobePrikaz: prikaz
		});
	}
}

export default Ekipe;
