import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PopisEkipa from '../komponente/popis-ekipa';

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
			return <p>Loading...</p>;
		} else {
			return (
				<div>
					<PopisEkipa lista={this.state.listaEkipa} />;
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
