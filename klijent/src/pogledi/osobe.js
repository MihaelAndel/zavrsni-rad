import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Ucitavanje from '../komponente/ucitavanje';
import PopisOsoba from '../komponente/popis-osoba';
import { Route } from 'react-router-dom';
import OsobaDetaljno from '../komponente/osoba-detaljno';

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
					<PopisOsoba lista={this.state.listaOsoba} />;
					<Route path="/osobe/:id" component={OsobaDetaljno} />
				</div>
			);
		}
	}

	DohvatiOsobe() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : '';
		if (this.state.listaOsoba.length === 0) {
			axios.get(`/api/osobe/dohvati?korisnik=${korisnik}`).then(response => {
				this.setState({
					listaOsoba: response.data
				});
			});
		}
	}
}

export default Ekipe;
