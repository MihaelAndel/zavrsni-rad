import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Registracija from './komponente/registracija';
import Prijava from './komponente/prijava';
import PopisOsoba from './komponente/popis-osoba';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		var korisnik = Cookies.get('korisnik') ? Cookies.get('korisnik') : null;
		var tip = Cookies.get('tip') ? Cookies.get('tip') : null;
		console.log(korisnik + tip);
		this.state = {
			korisnickoIme: korisnik,
			tipKorisnika: tip
		};
	}
	render() {
		axios.get('/api/test/')
		var lista = [{ime: 'Marko', prezime: 'Markovic'}, 'test2', 'test3'];
		return (
			<div className="App">
				<Registracija />
				<Prijava />
				<PopisOsoba lista={lista} />
			</div>
		);
	}
}

export default App;
