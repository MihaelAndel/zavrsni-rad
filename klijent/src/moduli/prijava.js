import React from 'react';
import axios from 'axios';
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
			poruka: false
		};
	}

	render() {
		var klasa = this.state.vidljivo ? 'vidljivo' : 'nevidljivo';
		var ukljucen =
			this.state.greskaKorisnickoIme || this.state.greskaLozinka
				? 'disabled'
				: '';
		return (
			<div
				className="prijava"
				onMouseEnter={this.PodesiVidljivost}
				onMouseLeave={this.PodesiVidljivost}>
				<p>Prijava</p>
				<div className={klasa}>
					<form>
						<input
							type="text"
							placeholder="Korisničko ime"
							onChange={this.ProvjeriKorisnickoIme}
						/>
						<input
							type="password"
							placeholder="Lozinka"
							onChange={this.ProvjeriLozinku}
						/>
						<input
							type="submit"
							value="Prijava"
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
					Cookies.set('tip', response.data[0].tid);
					window.location.reload();
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
