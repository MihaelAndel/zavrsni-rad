import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Ekipe from './pogledi/ekipe';
import GlavnaNavigacija from './komponente/glavna-navigacija';
import Zaglavlje from './komponente/zaglavlje';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		var korisnik = Cookies.get('korisnik') ? Cookies.get('korisnik') : null;
		var tip = Cookies.get('tip') ? Cookies.get('tip') : null;
		console.log(korisnik + tip);
		console.log(Cookies.get('id'));
		this.state = {
			korisnickoIme: korisnik,
			tipKorisnika: tip,
			lista: []
		};
	}
	render() {
		if (this.state.lista.length === 0) {
			axios.get('/api/test/').then(response => {
				this.setState({ lista: response.data });
			});
		}
		return (
			<BrowserRouter>
				<div className="aplikacija">
					<Zaglavlje />
					<GlavnaNavigacija />
					<main>
						<Route exact path="/ekipe/" component={Ekipe} />
					</main>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
