import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Ucitavanje from './ucitavanje';

class EkipaDetaljno extends React.Component {
	constructor(props) {
		super(props);
		this.DohvatiPodatke(this.props.match.params.id);
		this.VratiSe = this.VratiSe.bind(this);

		this.state = {
			podaci: null,
			id: this.props.match.params.id,
			redirect: false
		};
	}

	render() {
		var korisnik = Cookies.get('id') ? Cookies.get('id') : null;
		var iskljucen = korisnik === null ? 'disabled' : '';
		if (!this.state.redirect) {
			return (
				<div>
					<div onClick={this.VratiSe} className="blok odbaci prozirno"></div>

					<div className="blok blok-ekipa detaljno obrub pozadina pozadina-neutral">
						{this.state.podaci === null ? (
							<Ucitavanje />
						) : (
							<ul>
								<li>{this.state.naziv}</li>
								<li>{this.state.lokacija}</li>
							</ul>
						)}
					</div>
				</div>
			);
		} else {
			return <Redirect to="/ekipe" />;
		}
	}

	DohvatiPodatke(id) {
		axios.get(`/api/ekipe/detaljno?ekipa=${id}`).then(rezultat => {
			this.setState({
				naziv: rezultat.data.naziv,
				lokacija: rezultat.data.lokacija,
				podaci: 'postoji'
			});
		});
	}

	VratiSe() {
		this.setState({
			redirect: true
		});
	}
}

export default EkipaDetaljno;
