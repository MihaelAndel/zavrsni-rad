import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class StvoriModeratora extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			korisnici: [],
			moderatori: [],
			odabraniKorisik: '',
			odabraniModerator: ''
		};
		this.DohvatiPodatke();
		this.OdaberiKorisnika = this.OdaberiKorisnika.bind(this);
		this.OdaberiModeratora = this.OdaberiModeratora.bind(this);
		this.KorisnikUModerator = this.KorisnikUModerator.bind(this);
		this.ModeratorUKorisnik = this.ModeratorUKorisnik.bind(this);
	}

	render() {
		if (Cookies.get('tip') !== '3') return <Redirect to="/" />;
		return (
			<div className="grid grid-2stupca grid-centar">
				<form className="grid obrazac obrub-zaobljeno obrub-tamno pozadina-neutral-srednje padding-bottom-small">
					<h3>Obični korisnici</h3>
					<select onChange={this.OdaberiKorisnika}>
						<option value=""></option>
						{this.state.korisnici.map(korisnik => (
							<option value={korisnik.id}>
								{korisnik.ime} {korisnik.prezime} - {korisnik.korisnickoIme}
							</option>
						))}
					</select>
					<input
						type="submit"
						onClick={this.KorisnikUModerator}
						value="Pretvori korisnika u moderatora"
					/>
				</form>
				<form className="grid obrazac obrub-zaobljeno obrub-tamno pozadina-neutral-srednje padding-bottom-small">
					<h3>Moderatori</h3>
					<select onChange={this.OdaberiModeratora}>
						<option value=""></option>
						{this.state.moderatori.map(moderator => (
							<option value={moderator.id}>
								{moderator.ime} {moderator.prezime} - {moderator.korisnickoIme}
							</option>
						))}
					</select>
					<input
						type="submit"
						onClick={this.ModeratorUKorisnik}
						value="Pretvori moderatora u korisnika"
					/>
				</form>
			</div>
		);
	}

	DohvatiPodatke() {
		axios.get('/api/korisnici/dohvati/moderatori').then(rezultat => {
			this.setState({ moderatori: rezultat.data });
		});
		axios.get('/api/korisnici/dohvati/obicni').then(rezultat => {
			this.setState({ korisnici: rezultat.data });
		});
	}

	OdaberiKorisnika(e) {
		this.setState({ odabraniKorisik: e.target.value });
	}

	OdaberiModeratora(e) {
		this.setState({ odabraniModerator: e.target.value });
	}

	KorisnikUModerator(e) {
		e.preventDefault();
		if (this.state.odabraniKorisik !== '') {
			axios
				.post('/api/korisnici/pretvori', {
					korisnikID: this.state.odabraniKorisik
				})
				.then(rezultat => {
					if (rezultat.data === 'ok') {
						this.DohvatiPodatke();
					}
				});
		}
	}

	ModeratorUKorisnik(e) {
		e.preventDefault();
		if (this.state.odabraniModerator !== '') {
			axios
				.post('/api/korisnici/moderatori/pretvori', {
					korisnikID: this.state.odabraniModerator
				})
				.then(rezultat => {
					if (rezultat.data === 'ok') {
						this.DohvatiPodatke();
					}
				});
		}
	}
}

export default StvoriModeratora;
