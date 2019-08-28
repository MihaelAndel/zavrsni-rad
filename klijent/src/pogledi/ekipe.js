import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PopisEkipa from '../komponente/popis-ekipa';
import { Route, Link } from 'react-router-dom';
import EkipaDetaljno from '../komponente/ekipa-detaljno';
import Ucitavanje from '../komponente/ucitavanje';

class Ekipe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listaEkipa: []
		};

		this.DohvatiEkipe();
	}

	render() {
		if (this.state.listaEkipa.length === 0) {
			return <Ucitavanje />;
		} else {
			return (
				<div>
					<PopisEkipa
						putanja={this.props.match.url}
						lista={this.state.listaEkipa}
					/>
					<Route path="/ekipe/:id" component={EkipaDetaljno} />
				</div>
			);
		}
	}

	DohvatiEkipe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		if (this.state.listaEkipa.length === 0) {
			axios
				.get(`/api/ekipe/dohvati?korisnik=${korisnik}`)
				.then(response => {
					this.setState({
						listaEkipa: response.data
					});
				});
		}
	}
}

export default Ekipe;
