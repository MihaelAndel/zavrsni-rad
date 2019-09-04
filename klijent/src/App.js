import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route } from 'react-router-dom';

import Ekipe from './komponente/pogledi/ekipe';
import StvoriModeratora from './komponente/obrasci/obrazac-stvori-moderatora';
import Navigacija from './komponente/navigacija';
import Prijava from './komponente/prijava';
import Registracija from './komponente/registracija';
import Naslovna from './komponente/pogledi/naslovna';
import Osobe from './komponente/pogledi/osobe';
import ObrazacNovaObjava from './komponente/obrasci/obrazac-nova-objava';
import DodajStatistiku from './komponente/obrasci/obrazac-dodaj-statistiku';
import DodajEkipu from './komponente/obrasci/obrazac-dodaj-ekipu';
import DodajOsobu from './komponente/obrasci/obrazac-dodaj-osobu';
import DodajUtakmicu from './komponente/obrasci/obrazac-dodaj-utakmicu';
import './App.css';
import DodijeliNagrade from './komponente/obrasci/obrazac-dodijeli-nagrade';

class App extends React.Component {
	constructor(props) {
		super(props);

		document.title = 'Sportske novosti';

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
					<Navigacija odjava={this.OdjaviKorisnika} />
					<main className="sadrzaj">
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
						<Route exact path="/dodavanje-ekipe" component={DodajEkipu} />
						<Route exact path="/dodavanje-osobe" component={DodajOsobu} />
						<Route path="/dodavanje-utakmice" component={DodajUtakmicu} />
						<Route exact path="/dodijela-nagrada" component={DodijeliNagrade} />
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
