import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Ekipe from './pogledi/ekipe';
import GlavnaNavigacija from './komponente/glavna-navigacija';
import Zaglavlje from './komponente/zaglavlje';
import Prijava from './komponente/prijava';
import Registracija from './komponente/registracija';
import Naslovna from './komponente/naslovna';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.PrijaviKorisnika = this.PrijaviKorisnika.bind(this);
		this.OdjaviKorisnika = this.OdjaviKorisnika.bind(this);

		this.state = {
			prijavljen: Cookies.get('korisnik') ? true : false
		};
	}
	render() {
		return (
			<BrowserRouter>
				<div className="aplikacija">
					<Zaglavlje odjava={this.OdjaviKorisnika} />
					<GlavnaNavigacija />
					<Route
						exact
						path="/prijava/"
						render={props => (
							<Prijava
								{...props}
								funkcija={this.PrijaviKorisnika}
							/>
						)}
					/>
					<main>
						<Route exact path="/" component={Naslovna} />
						<Route exact path="/ekipe/" component={Ekipe} />

						<Route
							exact
							path="/registracija/"
							component={Registracija}
						/>
					</main>
				</div>
			</BrowserRouter>
		);
	}

	PrijaviKorisnika() {
		this.setState({
			prijavljen: true
		});
	}

	OdjaviKorisnika() {
		Cookies.remove('korisnik');
		Cookies.remove('id');
		Cookies.remove('tip');
		this.setState({
			prijavljen: false
		});
	}
}

export default App;
