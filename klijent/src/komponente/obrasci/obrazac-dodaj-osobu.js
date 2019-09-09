import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Poruka from '../poruka';
import { Redirect } from 'react-router-dom';

class DodajOsobu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tip: '0',
			ime: '',
			prezime: '',
			pozicija: '0',
			broj: '',
			ekipa: '0',
			tipovi: [],
			pozicije: [],
			ekipe: [],
			redirect: false,
			poruka: ''
		};

		this.ObradiUnos = this.ObradiUnos.bind(this);
		this.Dodaj = this.Dodaj.bind(this);

		this.DohvatiEkipe();
		this.DohvatiTipove();
		this.DohvatiPozicije();
	}

	render() {
		if (this.state.redirect || Cookies.get('tip') !== '3') {
			return <Redirect to="/osobe" />;
		}
		var iskljucen =
			(this.state.tip === '1' && this.state.pozicija === '0') ||
			this.state.tip === '0' ||
			this.state.ime === '' ||
			this.state.prezime === '' ||
			this.state.ekipa === '0' ||
			this.state.broj === '' ||
			this.state.tip === '0'
				? 'disabled'
				: '';
		var pozicija =
			this.state.tip === '1' ? (
				<select onChange={this.ObradiUnos} id="pozicija">
					<option value="0">Odaberite poziciju</option>
					{this.state.pozicije.map(pozicija => (
						<option value={pozicija.id}>{pozicija.naziv}</option>
					))}
				</select>
			) : null;

		return (
			<div className="grid">
				<Poruka poruka={this.state.poruka} />
				<form autoComplete="off" className="grid">
					<h2>Dodavanje osobe</h2>
					<select onChange={this.ObradiUnos} id="tip">
						<option value="0" selected>
							Odaberite tip osobe
						</option>
						{this.state.tipovi.map(tip => (
							<option value={tip.id}>{tip.naziv}</option>
						))}
					</select>
					<select onChange={this.ObradiUnos} id="ekipa">
						<option value="0" selected>
							Odaberite ekipu
						</option>
						{this.state.ekipe.map(ekipa => (
							<option value={ekipa.id}>
								{ekipa.lokacija} {ekipa.naziv}
							</option>
						))}
					</select>
					{pozicija}
					<input onChange={this.ObradiUnos} id="ime" placeholder="Ime"></input>
					<input onChange={this.ObradiUnos} id="prezime" placeholder="Prezime"></input>
					<input
						onChange={this.ObradiUnos}
						id="broj"
						type="number"
						placeholder="Broj"
						min="0"
						max="99"></input>
					<input
						onClick={this.Dodaj}
						disabled={iskljucen}
						type="submit"
						value="Dodaj osobu!"></input>
				</form>
			</div>
		);
	}

	ObradiUnos(e) {
		e.preventDefault();

		var vrijednost = e.target.value;
		switch (e.target.id) {
			case 'ime': {
				this.setState({ ime: vrijednost });
				break;
			}
			case 'prezime': {
				this.setState({ prezime: vrijednost });
				break;
			}
			case 'ekipa': {
				this.setState({ ekipa: vrijednost });
				break;
			}
			case 'tip': {
				this.setState({ tip: vrijednost });
				break;
			}
			case 'pozicija': {
				this.setState({ pozicija: vrijednost });
				break;
			}
			case 'broj': {
				this.setState({ broj: vrijednost });
				break;
			}
			default: {
				return;
			}
		}
	}

	DohvatiTipove() {
		axios.get('/api/osobe/tipovi/dohvati').then(rezultat => {
			this.setState({ tipovi: rezultat.data });
		});
	}

	DohvatiEkipe() {
		axios.get('/api/ekipe/dohvati?sve=sve').then(rezultat => {
			this.setState({ ekipe: rezultat.data });
		});
	}

	DohvatiPozicije() {
		axios.get('/api/osobe/pozicije/dohvati').then(rezultat => {
			this.setState({ pozicije: rezultat.data });
		});
	}

	Dodaj(e) {
		e.preventDefault();
		axios
			.post('/api/osobe/dodaj', {
				tip: this.state.tip,
				ime: this.state.ime,
				prezime: this.state.prezime,
				ekipa: this.state.ekipa,
				pozicija: this.state.pozicija,
				broj: this.state.broj
			})
			.then(rezultat => {
				if (rezultat.data === 'error') {
					this.setState({ poruka: 'Greška kod unosa osobe!' }, () => {
						setTimeout(() => {
							this.setState({
								poruka: ''
							});
						}, 2000);
					});
				} else {
					this.setState({ redirect: true });
				}
			});
	}
}

export default DodajOsobu;
