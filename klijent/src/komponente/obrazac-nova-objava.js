import React from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ObrazacNovaObjava extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stvorena: false,
			id: null,
			naslov: '',
			tekst: '',
			osobe: [],
			ekipe: [],
			odabraneOsobe: [],
			odabraneEkipe: [],
			iskljucen: 'disabled',
			redirect: false
		};

		this.OznaciOdabrano = this.OznaciOdabrano.bind(this);
		this.UnesiTekst = this.UnesiTekst.bind(this);
		this.Objavi = this.Objavi.bind(this);

		this.DohvatiSveOsobe();
		this.DohvatiSveEkipe();
	}

	render() {
		var iskljucen =
			this.state.naslov &&
			this.state.tekst &&
			(this.state.odabraneEkipe.length !== 0 ||
				this.state.odabraneOsobe.length !== 0)
				? ''
				: 'disabled';
		if (!Cookies.get('korisnik') || Cookies.get('tip') === 1) {
			return <Redirect to="/" />;
		} else {
			if (this.state.stvorena && this.state.id !== null) {
				return <Redirect to={`/objave/${this.state.id}`} />;
			} else {
				return (
					<form>
						<input
							type="text"
							id="naslov"
							placeholder="Naslov objave"
							maxLength="80"
							size="90"
							value={this.state.naslov}
							onChange={this.UnesiTekst}></input>
						<textarea
							placeholder="Tekst objave (do 1000 znakova)"
							id="tekst"
							rows="10"
							cols="100"
							maxLength="1000"
							onChange={this.UnesiTekst}
							value={this.state.tekst}></textarea>
						<select
							id="osobe"
							onChange={this.OznaciOdabrano}
							size="10"
							multiple>
							{this.state.osobe}
						</select>

						<select
							onChange={this.OznaciOdabrano}
							id="ekipe"
							size="10"
							multiple>
							{this.state.ekipe}
						</select>
						<input
							onClick={this.Objavi}
							type="submit"
							value="Objavi!"
							disabled={iskljucen}></input>
					</form>
				);
			}
		}
	}

	DohvatiSveOsobe() {
		axios.get('/api/osobe/dohvati?sve=sve').then(rezultat => {
			var poljeOsoba = [];
			rezultat.data.forEach(osoba => {
				poljeOsoba.push(
					<option key={osoba.id} value={osoba.id}>
						{osoba.ime} {osoba.prezime} - {osoba.ekipa}
					</option>
				);
			});
			this.setState({ osobe: poljeOsoba });
		});
	}

	DohvatiSveEkipe() {
		axios.get('/api/ekipe/dohvati?sve=sve').then(rezultat => {
			var poljeEkipa = [];
			rezultat.data.forEach(ekipa => {
				poljeEkipa.push(
					<option key={ekipa.id} value={ekipa.id}>
						{ekipa.lokacija} {ekipa.naziv}
					</option>
				);
			});
			this.setState({ ekipe: poljeEkipa });
		});
	}

	OznaciOdabrano(e) {
		var opcije = e.target.options;
		var ekipe = e.target.id === 'ekipe' ? true : false;
		var oznaceneOpcije = [];
		for (var i = 0; i < opcije.length; i++) {
			if (opcije[i].selected) {
				oznaceneOpcije.push(opcije[i].value);
			}
		}
		if (ekipe) {
			this.setState({
				odabraneEkipe: oznaceneOpcije
			});
		} else {
			this.setState({
				odabraneOsobe: oznaceneOpcije
			});
		}
	}

	UnesiTekst(e) {
		var id = e.target.id;
		var value = e.target.value;
		if (id === 'naslov') {
			this.setState({
				naslov: value
			});
		} else if (id === 'tekst') {
			this.setState({
				tekst: value
			});
		}
	}

	Objavi(e) {
		e.preventDefault();
		axios
			.post('/api/objave/objavi', {
				korisnik: Cookies.get('id'),
				naslov: this.state.naslov,
				tekst: this.state.tekst,
				osobe: this.state.odabraneOsobe,
				ekipe: this.state.odabraneEkipe
			})
			.then(rezultat => {
				console.log(rezultat.data);
				if (rezultat.data === 'error') {
					return;
				} else {
					this.setState({ redirect: true });
				}
			});
	}
}

export default ObrazacNovaObjava;
