import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PopisEkipa from '../popis-ekipa';
import { Route } from 'react-router-dom';
import EkipaDetaljno from '../ekipa-detaljno';
import Ucitavanje from '../ucitavanje';

class Ekipe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listaEkipa: [],
			ekipePrikaz: []
		};

		this.DohvatiEkipe = this.DohvatiEkipe.bind(this);
		this.PretraziEkipe = this.PretraziEkipe.bind(this);
		this.PrikaziSve = this.PrikaziSve.bind(this);
		this.PrikaziPratim = this.PrikaziPratim.bind(this);
		this.PrikaziNePratim = this.PrikaziNePratim.bind(this);

		this.DohvatiEkipe();
	}

	render() {
		var filtriranje = Cookies.get('korisnik') ? (
			<div>
				<button onClick={this.PrikaziSve}>Prikaži sve</button>
				<button onClick={this.PrikaziPratim}>Pratim</button>
				<button onClick={this.PrikaziNePratim}>Ne pratim</button>
			</div>
		) : null;
		if (this.state.listaEkipa.length === 0) {
			return <Ucitavanje />;
		} else {
			return (
				<div>
					<div className="pretrazivanje">
						<input
							onChange={this.PretraziEkipe}
							type="text"
							id="pretrazi"
							placeholder="Pretraživanje"
						/>
					</div>
					{filtriranje}
					<PopisEkipa
						dohvati={this.DohvatiEkipe}
						putanja={this.props.match.url}
						lista={this.state.ekipePrikaz}
					/>
					<Route path="/ekipe/:id" component={EkipaDetaljno} />
				</div>
			);
		}
	}

	DohvatiEkipe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		axios.get(`/api/ekipe/dohvati?korisnik=${korisnik}`).then(response => {
			var ekipe = response.data;
			ekipe.forEach(ekipa => {
				ekipa.pretrazi = `${ekipa.naziv} ${ekipa.lokacija} ${ekipa.arena}`;
			});
			this.setState(
				{
					listaEkipa: ekipe
				},
				() => {
					if (this.state.ekipePrikaz.length === 0) {
						this.setState({
							ekipePrikaz: ekipe
						});
					}
				}
			);
		});
	}

	PretraziEkipe(e) {
		var vrijednost = e.target.value.toUpperCase();
		var ekipe = this.state.listaEkipa;
		var ekipeZaPrikaz = [];

		if (vrijednost === '') {
			ekipe.forEach(ekipa => {
				ekipeZaPrikaz.push(ekipa);
			});
		} else {
			ekipe.forEach(ekipa => {
				if (ekipa.pretrazi.toUpperCase().indexOf(vrijednost) !== -1) {
					ekipeZaPrikaz.push(ekipa);
				}
			});
		}

		this.setState({ ekipePrikaz: ekipeZaPrikaz });
	}

	PrikaziSve() {
		this.setState({ ekipePrikaz: this.state.listaEkipa });
	}

	PrikaziPratim() {
		var prikaz = [];
		for (var i = 0; i < this.state.listaEkipa.length; i++) {
			if (this.state.listaEkipa[i].prati) {
				prikaz.push(this.state.listaEkipa[i]);
			}
		}

		this.setState({
			ekipePrikaz: prikaz
		});
	}

	PrikaziNePratim() {
		var prikaz = [];
		for (var i = 0; i < this.state.listaEkipa.length; i++) {
			if (!this.state.listaEkipa[i].prati) {
				prikaz.push(this.state.listaEkipa[i]);
			}
		}

		this.setState({
			ekipePrikaz: prikaz
		});
	}
}

export default Ekipe;
