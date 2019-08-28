import React from 'react';
import axios from 'axios';
import Poruka from './poruka';
import '../App.css';
import { CLIENT_RENEG_LIMIT } from 'tls';

class Registracija extends React.Component {
	constructor(props) {
		super(props);
		this.RegistrirajKorisnika = this.RegistrirajKorisnika.bind(this);
		this.ProvjeriEmail = this.ProvjeriEmail.bind(this);
		this.ProvjeriKorisnickoIme = this.ProvjeriKorisnickoIme.bind(this);
		this.state = {
			vidljivo: false,
			korisnickoIme: '',
			email: '',
			poruka: '',
			greskaEmail: true,
			greskaKorisnickoIme: true
		};
	}

	render() {
		var iskljucen =
			this.state.greskaEmail || this.state.greskaKorisnickoIme
				? 'disabled'
				: '';
		var poruka = this.state.greskaRegistracije
			? 'Dogodila se greška, pokušajte ponovo!'
			: '';
		return (
			<div className="registracija">
				<Poruka poruka={poruka} />
				<p>Registracija</p>
				<div>
					<form autoComplete="off" id="form-registracija">
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
			axios
				.post('/api/registriraj', {
					email: this.state.email,
					korisnickoIme: this.state.korisnickoIme
				})
				.then(poruka => {
					if (poruka === 'error') {
						this.setState(
							{ poruka: 'Greška kod registracije!' },
							function() {
								setInterval(() => {
									this.setState({ poruka: '' });
								}, 2000);
							}
						);
					} else {
						var forma = document.getElementById(
							'form-registracija'
						);
						forma.reset();
						this.setState({ email: ' ', korisnickoIme: ' ' });
					}
				});
		}
	}

	ProvjeriKorisnickoIme(e) {
		this.setState({
			greskaKorisnickoIme: true
		});
		var korIme = e.target.value;
		var tocno = korIme.length > 3 && korIme.length < 11;

		if (tocno) {
			axios
				.get(`/api/provjeriKorisnika?korisnik=${korIme}`)
				.then(response => {
					tocno = response.data ? true : false;
					this.setState({
						korisnickoIme: korIme,
						greskaKorisnickoIme: !tocno
					});
				});
		} else {
			this.setState({
				korisnickoIme: korIme,
				greskaKorisnickoIme: !tocno
			});
		}
	}

	ProvjeriEmail(e) {
		this.setState({
			greskaEmail: true
		});
		var emailInput = e.target.value;
		var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		var tocno = regex.test(emailInput) && emailInput.length !== 0;

		if (tocno) {
			axios
				.get(`/api/provjeriEmail?email=${emailInput}`)
				.then(response => {
					tocno = response.data ? true : false;
					this.setState({
						email: emailInput,
						greskaEmail: !tocno
					});
				});
		} else {
			this.setState({
				email: emailInput,
				greskaEmail: !tocno
			});
		}
	}
}

export default Registracija;
