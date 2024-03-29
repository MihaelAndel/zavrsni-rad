import React from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Poruka from '../poruka';

class ObrazacNovaObjava extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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
			(this.state.odabraneEkipe.length !== 0 || this.state.odabraneOsobe.length !== 0)
				? ''
				: 'disabled';
		if (
			this.state.redirect ||
			!Cookies.get('korisnik') ||
			(Cookies.get('tip') !== '2' && Cookies.get('tip') !== '3')
		) {
			return <Redirect to="/" />;
		} else {
			return (
				<form className="grid grid-element">
					<Poruka poruka={this.state.poruka} />
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
						rows="13"
						cols="75"
						maxLength="1000"
						onChange={this.UnesiTekst}
						value={this.state.tekst}></textarea>
					<div className="grid grid-2stupca">
						<div className="grid">
							<h3>Osobe</h3>
							<select id="osobe" onChange={this.OznaciOdabrano} size="10" multiple>
								{this.state.osobe}
							</select>
						</div>
						<div className="grid">
							<h3>Ekipe</h3>
							<select onChange={this.OznaciOdabrano} id="ekipe" size="10" multiple>
								{this.state.ekipe}
							</select>
						</div>
					</div>
					<div className="grid grid-centar">
						<input
							className="grid-element-small"
							onClick={this.Objavi}
							type="submit"
							value="Objavi!"
							disabled={iskljucen}></input>
					</div>
				</form>
			);
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
				if (rezultat.data === 'error') {
					this.setState({ poruka: 'Dogodila se greška, pokušajte ponovno.' });
				} else {
					this.setState({ poruka: 'Uspješno objavljena objava!' }, () => {
						setTimeout(() => {
							this.setState({ poruka: '', redirect: true });
						}, 1500);
					});
				}
			});
	}
}

export default ObrazacNovaObjava;
