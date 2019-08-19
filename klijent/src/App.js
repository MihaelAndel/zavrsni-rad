import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Registracija from './moduli/registracija';
import Prijava from './moduli/prijava';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		var korisnik = Cookies.get('korisnik') ? Cookies.get('korisnik') : '';
		var tip = Cookies.get('tip') ? Cookies.get('tip') : '';
		console.log(korisnik + tip);
		this.state = {
			korisnickoIme: korisnik,
			tipKorisnika: tip
		};
	}
	render() {
		return (
			<div className="App">
				<Registracija />
				<Prijava />
			</div>
		);
	}
}

export default App;
