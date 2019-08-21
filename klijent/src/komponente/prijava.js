import React from 'react';
import axios from 'axios';
import Poruka from './poruka';
import Cookies from 'js-cookie';
import '../App.css';
import { runInThisContext } from 'vm';

class Prijava extends React.Component {
	constructor(props) {
		super(props);
		this.PodesiVidljivost = this.PodesiVidljivost.bind(this);
		this.PrijaviKorisnika = this.PrijaviKorisnika.bind(this);
		this.ProvjeriKorisnickoIme = this.ProvjeriKorisnickoIme.bind(this);
		this.ProvjeriLozinku = this.ProvjeriLozinku.bind(this);
		this.state = {
			vidljivo: false,
			korisnickoIme: '',
			lozinka: '',
			greskaKorisnickoIme: true,
			greskaLozinka: true,
			poruka: ''
		};
	}

	render() {
		var klasa = this.state.vidljivo ? 'vidljivo' : 'nevidljivo';
		var ukljucen =
			this.state.greskaKorisnickoIme || this.state.greskaLozinka
				? 'disabled'
				: '';
		var poruka = this.state.poruka;
		return (
			<div
				className="prijava"
				onMouseEnter={this.PodesiVidljivost}
				onMouseLeave={this.PodesiVidljivost}>
				<Poruka poruka={poruka} />
				<p>Prijava</p>
				<div className={klasa}>
					<form>
						<input
							type="text"
							placeholder="Korisničko ime"
							onChange={this.ProvjeriKorisnickoIme}
							value={this.state.korisnickoIme}
						/>
						<input
							type="password"
							placeholder="Lozinka"
							onChange={this.ProvjeriLozinku}
							value={this.state.lozinka}
						/>
						<input
							type="submit"
							value="Prijavi se"
							onClick={this.PrijaviKorisnika}
							disabled={ukljucen}
						/>
					</form>
				</div>
			</div>
		);
	}

	PodesiVidljivost(e) {
		e.preventDefault();
		var stanje = !this.state.vidljivo;
		this.setState({
			vidljivo: stanje
		});
	}

	PrijaviKorisnika(e) {
		e.preventDefault();
		axios
			.get(
				`/api/prijavi?korisnickoIme=${
					this.state.korisnickoIme
				}&lozinka=${this.state.lozinka}`
			)
			.then(response => {
				if (response.data.length !== 0) {
					Cookies.set('korisnik', response.data[0].kIme);
					Cookies.set('id', response.data[0].id);
					Cookies.set('tip', response.data[0].tid);
					console.log(Cookies.get('id'));
					window.location.reload();
				} else {
					this.setState({ poruka: 'Neispravan unos!' }, function() {
						setInterval(() => {
							this.setState({ poruka: '' });
						}, 2000);
					});
				}
			});
	}

	ProvjeriKorisnickoIme(e) {
		e.preventDefault();
		this.setState({ greskaKorisnickoIme: true });
		var korisnickoImeInput = e.target.value;
		var tocno = korisnickoImeInput.length > 3 ? true : false;
		this.setState({
			greskaKorisnickoIme: !tocno,
			korisnickoIme: korisnickoImeInput
		});
	}

	ProvjeriLozinku(e) {
		e.preventDefault();
		this.setState({ greskaLozinka: true });
		var lozinkaInput = e.target.value;
		var tocno = lozinkaInput.length === 10 ? true : false;
		this.setState({
			greskaLozinka: !tocno,
			lozinka: lozinkaInput
		});
	}
}

export default Prijava;
