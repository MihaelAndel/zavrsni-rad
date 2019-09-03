import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PopisEkipa from '../popis-ekipa';
import { Route, Link } from 'react-router-dom';
import EkipaDetaljno from '../ekipa-detaljno';
import Ucitavanje from '../ucitavanje';

class Ekipe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listaEkipa: [],
			ekipePrikaz: []
		};

		this.DohvatiEkipe();

		this.PretraziEkipe = this.PretraziEkipe.bind(this);
	}

	render() {
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
					<PopisEkipa putanja={this.props.match.url} lista={this.state.ekipePrikaz} />
					<Route path="/ekipe/:id/:prati" component={EkipaDetaljno} />
				</div>
			);
		}
	}

	DohvatiEkipe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		if (this.state.listaEkipa.length === 0) {
			axios.get(`/api/ekipe/dohvati?korisnik=${korisnik}`).then(response => {
				var ekipe = response.data;
				ekipe.forEach(ekipa => {
					ekipa.pretrazi = `${ekipa.naziv} ${ekipa.lokacija} ${ekipa.arena}`;
				});
				this.setState({
					listaEkipa: ekipe,
					ekipePrikaz: ekipe
				});
			});
		}
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
}

export default Ekipe;
