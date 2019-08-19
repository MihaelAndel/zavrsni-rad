import React from 'react';
import axios from 'axios';
import Poruka from './poruka';
import '../App.css';
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
			poruka: '',
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
		var poruka = this.state.greskaRegistracije
			? 'Dogodila se greška, pokušajte ponovo!'
			: '';
		return (
			<div
				className="registracija"
				onMouseEnter={this.PodesiVidljivost}
				onMouseLeave={this.PodesiVidljivost}>
				<Poruka poruka={poruka} />
				<p>Registracija</p>
				<div className={klasa}>
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

	PodesiVidljivost(e) {
		e.preventDefault();
		var stanje = !this.state.vidljivo;
		this.setState({
			vidljivo: stanje
		});
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
		var regex = /^\w+@\w+\.\w{2,3}$/;
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
