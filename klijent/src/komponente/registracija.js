import React from 'react';
import axios from 'axios';
import Poruka from './poruka';
import '../App.css';
import { Redirect } from 'react-router-dom';

class Registracija extends React.Component {
	constructor(props) {
		super(props);
		this.RegistrirajKorisnika = this.RegistrirajKorisnika.bind(this);
		this.ProvjeriEmail = this.ProvjeriEmail.bind(this);
		this.ProvjeriKorisnickoIme = this.ProvjeriKorisnickoIme.bind(this);
		this.ProvjeriIme = this.ProvjeriIme.bind(this);
		this.ProvjeriPrezime = this.ProvjeriPrezime.bind(this);
		this.state = {
			vidljivo: false,
			korisnickoIme: '',
			email: '',
			ime: '',
			prezime: '',
			poruka: '',
			greskaEmail: true,
			greskaKorisnickoIme: true,
			redirect: false
		};
	}

	render() {
		var iskljucen =
			this.state.greskaEmail ||
			this.state.greskaKorisnickoIme ||
			this.state.ime === '' ||
			this.state.prezime === ''
				? 'disabled'
				: '';
		if (this.state.redirect) {
			return <Redirect to="/" />;
		} else {
			return (
				<div className="grid grid-centar">
					<Poruka poruka={this.state.poruka} />
					<div className="blok grid grid-centar obrazac obrub-zaobljeno obrub-tamno pozadina-neutral-srednje">
						<h2>Registracija</h2>
						<form autoComplete="off">
							<input
								className="blok margin-small"
								onInput={this.ProvjeriEmail}
								id="emailAdresa"
								type="text"
								placeholder="E-mail adresa"
							/>
							<input
								className="blok margin-small"
								onInput={this.ProvjeriKorisnickoIme}
								id="korisnickoIme"
								type="text"
								placeholder="Korisničko ime"
							/>
							<input
								className="blok margin-small"
								onInput={this.ProvjeriIme}
								id="ime"
								type="text"
								placeholder="Ime"
							/>
							<input
								className="blok margin-small"
								onInput={this.ProvjeriPrezime}
								id="prezime"
								type="text"
								placeholder="Prezime"
							/>
							<input
								className="blok margin-small"
								type="submit"
								onClick={this.RegistrirajKorisnika}
								disabled={iskljucen}
								value="Registriraj se!"
							/>
						</form>
					</div>
				</div>
			);
		}
	}

	RegistrirajKorisnika(e) {
		e.preventDefault();
		if (!this.state.greskaEmail && !this.state.greskaKorisnickoIme) {
			axios
				.post('/api/registriraj', {
					email: this.state.email,
					korisnickoIme: this.state.korisnickoIme,
					ime: this.state.ime,
					prezime: this.state.prezime
				})
				.then(poruka => {
					if (poruka === 'error') {
						this.setState({ poruka: 'Greška kod registracije!' }, function() {
							setTimeout(() => {
								this.setState({ poruka: '' });
							}, 2000);
						});
					} else {
						this.setState(
							{
								email: '',
								korisnickoIme: '',
								ime: '',
								prezime: '',
								poruka:
									'Poslana je poruka na vašu e-mail adresu s lozinkom za vaš novi račun!'
							},
							() => {
								this.render();
								setTimeout(() => {
									this.setState({ redirect: true });
								}, 3000);
							}
						);
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
			axios.get(`/api/provjeriKorisnika?korisnik=${korIme}`).then(response => {
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
		var regex = /^(.+)@(.+){2,}\.(.+){2,}$/;
		var tocno = regex.test(emailInput) && emailInput.length !== 0;

		if (tocno) {
			axios.get(`/api/provjeriEmail?email=${emailInput}`).then(response => {
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

	ProvjeriIme(e) {
		var ime = e.target.value;

		this.setState({
			ime: ime
		});
	}

	ProvjeriPrezime(e) {
		var prezime = e.target.value;

		this.setState({
			prezime: prezime
		});
	}
}

export default Registracija;
