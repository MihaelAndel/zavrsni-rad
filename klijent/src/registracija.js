import React from 'react';
import axios from 'axios';
import './App.css';
import { CLIENT_RENEG_LIMIT } from 'tls';

class Registracija extends React.Component {
	constructor(props) {
		super(props);
		this.RegistrirajKorisnika = this.RegistrirajKorisnika.bind(this);
		this.PodesiVidljivost = this.PodesiVidljivost.bind(this);
		this.ProvjeriEmail = this.ProvjeriEmail.bind(this);
		this.ProvjeriKorisnickoIme = this.ProvjeriKorisnickoIme.bind(this);
		this.state = {
			vidljivo: false,
			korisnickoIme: '',
			email: '',
			greskaEmail: true,
			greskaKorisnickoIme: true
		};
	}

	render() {
		var klasa = this.state.vidljivo ? 'vidljivo' : 'nevidljivo';
		var iskljucen =
			this.state.greskaEmail || this.state.greskaKorisnickoIme
				? 'disabled'
				: '';
		return (
			<div
				className="registracija"
				onMouseEnter={this.PodesiVidljivost}
				onMouseLeave={this.PodesiVidljivost}>
				<p>Registracija</p>
				<div className={klasa}>
					<form autoComplete="off">
						<input
							onInput={this.ProvjeriEmail}
							id="emailAdresa"
							type="text"
							placeholder="E-mail adresa"
						/>
						<input
							onInput={this.ProvjeriKorisnickoIme}
							id="korisnickoIme"
							type="text"
							placeholder="Korisničko ime"
						/>
						<button
							onClick={this.RegistrirajKorisnika}
							disabled={iskljucen}>
							Registrirajte se!
						</button>
					</form>
				</div>
			</div>
		);
	}

	RegistrirajKorisnika(e) {
		e.preventDefault();
		if (!this.state.greskaEmail && !this.state.greskaKorisnickoIme) {
			axios.post('/api/registriraj', {
				email: this.state.email,
				korisnickoIme: this.state.korisnickoIme
			});
		}
	}

	PodesiVidljivost(e) {
		e.preventDefault();
		var stanje = !this.state.vidljivo;
		this.setState({
			vidljivo: stanje
		});
	}

	ProvjeriKorisnickoIme(e) {
		var korIme = e.target.value;
		var tocno = korIme.length > 3 && korIme.length < 11;

		this.setState({
			korisnickoIme: tocno ? korIme : '',
			greskaKorisnickoIme: !tocno
		});
	}

	ProvjeriEmail(e) {
		var emailInput = e.target.value;
		var regex = /^\w+@\w+.$/;
		var tocno = regex.test(emailInput) && emailInput.length !== 0;
		if(tocno){
			axios.get(`/api/provjeriEmail?email=${emailInput}`).then((response) => {
				tocno = response ? true : false;
				this.setState({
					email: tocno ? emailInput : '',
					greskaEmail: !tocno
				});
			});
		}
	}
}

export default Registracija;
