import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route } from 'react-router-dom';

import Ekipe from './pogledi/ekipe';
import StvoriModeratora from './komponente/stvori-moderatora';
import Zaglavlje from './komponente/zaglavlje';
import Prijava from './komponente/prijava';
import Registracija from './komponente/registracija';
import Naslovna from './pogledi/naslovna';
import Osobe from './pogledi/osobe';
import ObrazacNovaObjava from './komponente/obrazac-nova-objava';
import DodajStatistiku from './komponente/obrazac-dodaj-statistiku';
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
					<main>
						<Route exact path="/" component={Naslovna} />
						<Route path="/ekipe" component={Ekipe} />
						<Route path="/osobe" component={Osobe} />
						<Route exact path="/registracija" component={Registracija} />
						<Route
							exact
							path="/prijava"
							render={props => (
								<Prijava {...props} funkcija={this.PrijaviKorisnika} />
							)}
						/>
						<Route exact path="/nova-objava" component={ObrazacNovaObjava} />
						<Route exact path="/upravljanje-korisnicima" component={StvoriModeratora} />
						<Route exact path="/upisivanje-statistike" component={DodajStatistiku} />
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
