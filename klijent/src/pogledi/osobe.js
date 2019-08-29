import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PopisOsoba from '../komponente/popis-osoba';

class Ekipe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listaOsoba: []
		};

		this.DohvatiOsobe();
	}

	render() {
		if (this.state.listaOsoba.length === 0) {
			return <p>Loading...</p>;
		} else {
			return (
				<div>
					<PopisOsoba lista={this.state.listaOsoba} />;
				</div>
			);
		}
	}

	DohvatiOsobe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		if (this.state.listaOsoba.length === 0) {
			axios
				.get(`/api/osobe/dohvati?korisnik=${korisnik}`)
				.then(response => {
					this.setState({
						listaOsoba: response.data
					});
				});
		}
	}
}

export default Ekipe;