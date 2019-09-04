import React from 'react';
import axios from 'axios';
import Poruka from './poruka';
import Cookies from 'js-cookie';
import '../App.css';
import { Redirect } from 'react-router-dom';

class Prijava extends React.Component {
	constructor(props) {
		super(props);
		this.PrijaviKorisnika = this.PrijaviKorisnika.bind(this);
		this.ProvjeriKorisnickoIme = this.ProvjeriKorisnickoIme.bind(this);
		this.ProvjeriLozinku = this.ProvjeriLozinku.bind(this);
		this.state = {
			vidljivo: false,
			korisnickoIme: '',
			lozinka: '',
			greskaKorisnickoIme: true,
			greskaLozinka: true,
			poruka: '',
			redirect: false
		};
	}

	render() {
		var ukljucen = this.state.greskaKorisnickoIme || this.state.greskaLozinka ? 'disabled' : '';
		if (this.state.redirect) {
			return <Redirect to="/" />;
		} else {
			return (
				<div className="grid grid-centar">
					<Poruka className="obavijest" poruka={this.state.poruka} />
					<div
						className="blok grid grid-centar obrazac obrub-zaobljeno obrub-tamno pozadina-neutral-srednje"
						onMouseEnter={this.PodesiVidljivost}
						onMouseLeave={this.PodesiVidljivost}>
						<h2>Prijava</h2>
						<form>
							<input
								className="blok margin-small"
								type="text"
								placeholder="Korisničko ime"
								onChange={this.ProvjeriKorisnickoIme}
								value={this.state.korisnickoIme}
							/>
							<input
								className="blok margin-small"
								type="password"
								placeholder="Lozinka"
								onChange={this.ProvjeriLozinku}
								value={this.state.lozinka}
							/>
							<input
								className="blok margin-small"
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
	}

	PrijaviKorisnika(e) {
		e.preventDefault();
		axios
			.get(
				`/api/prijavi?korisnickoIme=${this.state.korisnickoIme}&lozinka=${this.state.lozinka}`
			)
			.then(response => {
				if (response.data.length !== 0) {
					Cookies.set('korisnik', response.data[0].kIme);
					Cookies.set('id', response.data[0].id);
					Cookies.set('tip', response.data[0].tid);
					console.log(Cookies.get('id'));
					this.props.funkcija();
					this.setState({ redirect: true });
				} else {
					this.setState({ poruka: 'Neispravan unos!' }, function() {
						setTimeout(() => {
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
