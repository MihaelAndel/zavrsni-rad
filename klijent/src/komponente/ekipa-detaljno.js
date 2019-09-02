import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EkipaDetaljno extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			redirect: false,
			sezone: [],
			statistika: [],
			odabranaSezona: ''
		};

		this.DohvatiPodatke(this.props.match.params.id);
		this.DohvatiSezone(this.props.match.params.id);
		this.VratiSe = this.VratiSe.bind(this);
		this.DohvatiStatistiku = this.DohvatiStatistiku.bind(this);
	}

	render() {
		if (!this.state.redirect) {
			return (
				<div>
					<div onClick={this.VratiSe} className="blok odbaci prozirno"></div>

					<div className="grid grid-detaljno detaljno obrub pozadina pozadina-neutral">
						<div className="grid-element grid grid-centar">
							<h3>
								{this.state.lokacija} {this.state.naziv}
							</h3>
						</div>

						<div className="grid grid-centar">
							<div>
								<h4>Sezone</h4>
							</div>
							<div className="blok grid-element">
								<select onChange={this.DohvatiStatistiku}>
									<option value="0">Odaberite sezonu</option>
									{this.state.sezone.map(sezona => (
										<option key={sezona.id} value={sezona.id}>
											{sezona.sezona}
										</option>
									))}
								</select>
							</div>
						</div>
						{this.state.odabranaSezona ? (
							<div className="grid-element">
								<h4>Sezonska statistika</h4>
								<div className="scrollable obrub pozadina-neutral-svjetlo padding-small">
									<ul>
										<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
										<li>
											Asistencije po utakmici -{' '}
											{this.state.statistika.asistencije}
										</li>
										<li>
											Skokovi po utakmici - {this.state.statistika.skokovi}
										</li>
										<li>
											Blokovi po utakmici - {this.state.statistika.blokovi}
										</li>
										<li>
											Ukradene lopte po utakmici -{' '}
											{this.state.statistika.ukradeneLopte}
										</li>
										<li>
											Postotak pogodaka -{' '}
											{this.state.statistika.postotakPogodaka}
										</li>
										<li>
											Postotak trica - {this.state.statistika.postotakTrica}
										</li>
										<li>
											Ocjena napada - {this.state.statistika.ocjenaNapada}
										</li>
										<li>
											Ocjena obrane - {this.state.statistika.ocjenaObrane}
										</li>
									</ul>
								</div>
							</div>
						) : (
							<div></div>
						)}

						{this.state.odabranaSezona ? (
							<div className="grid-element">
								<h4>Utakmice</h4>
								<div className="scrollable obrub pozadina-neutral-svjetlo padding-small">
									<ul>
										<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
										<li>
											Asistencije po utakmici -{' '}
											{this.state.statistika.asistencije}
										</li>
										<li>
											Skokovi po utakmici - {this.state.statistika.skokovi}
										</li>
										<li>
											Blokovi po utakmici - {this.state.statistika.blokovi}
										</li>
										<li>
											Ukradene lopte po utakmici -{' '}
											{this.state.statistika.ukradeneLopte}
										</li>
										<li>
											Postotak pogodaka -{' '}
											{this.state.statistika.postotakPogodaka}
										</li>
										<li>
											Postotak trica - {this.state.statistika.postotakTrica}
										</li>
										<li>
											Ocjena napada - {this.state.statistika.ocjenaNapada}
										</li>
										<li>
											Ocjena obrane - {this.state.statistika.ocjenaObrane}
										</li>
										<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
										<li>
											Asistencije po utakmici -{' '}
											{this.state.statistika.asistencije}
										</li>
										<li>
											Skokovi po utakmici - {this.state.statistika.skokovi}
										</li>
										<li>
											Blokovi po utakmici - {this.state.statistika.blokovi}
										</li>
										<li>
											Ukradene lopte po utakmici -{' '}
											{this.state.statistika.ukradeneLopte}
										</li>
										<li>
											Postotak pogodaka -{' '}
											{this.state.statistika.postotakPogodaka}
										</li>
										<li>
											Postotak trica - {this.state.statistika.postotakTrica}
										</li>
										<li>
											Ocjena napada - {this.state.statistika.ocjenaNapada}
										</li>
										<li>
											Ocjena obrane - {this.state.statistika.ocjenaObrane}
										</li>
										<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
										<li>
											Asistencije po utakmici -{' '}
											{this.state.statistika.asistencije}
										</li>
										<li>
											Skokovi po utakmici - {this.state.statistika.skokovi}
										</li>
										<li>
											Blokovi po utakmici - {this.state.statistika.blokovi}
										</li>
										<li>
											Ukradene lopte po utakmici -{' '}
											{this.state.statistika.ukradeneLopte}
										</li>
										<li>
											Postotak pogodaka -{' '}
											{this.state.statistika.postotakPogodaka}
										</li>
										<li>
											Postotak trica - {this.state.statistika.postotakTrica}
										</li>
										<li>
											Ocjena napada - {this.state.statistika.ocjenaNapada}
										</li>
										<li>
											Ocjena obrane - {this.state.statistika.ocjenaObrane}
										</li>
										<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
										<li>
											Asistencije po utakmici -{' '}
											{this.state.statistika.asistencije}
										</li>
										<li>
											Skokovi po utakmici - {this.state.statistika.skokovi}
										</li>
										<li>
											Blokovi po utakmici - {this.state.statistika.blokovi}
										</li>
										<li>
											Ukradene lopte po utakmici -{' '}
											{this.state.statistika.ukradeneLopte}
										</li>
										<li>
											Postotak pogodaka -{' '}
											{this.state.statistika.postotakPogodaka}
										</li>
										<li>
											Postotak trica - {this.state.statistika.postotakTrica}
										</li>
										<li>
											Ocjena napada - {this.state.statistika.ocjenaNapada}
										</li>
										<li>
											Ocjena obrane - {this.state.statistika.ocjenaObrane}
										</li>
									</ul>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>
			);
		} else {
			return <Redirect to="/ekipe" />;
		}
	}

	DohvatiSezone(id) {
		axios.get(`/api/statistika/ekipe/sezone?ekipa=${id}`).then(rezultat => {
			this.setState({
				sezone: rezultat.data
			});
		});
	}

	DohvatiStatistiku(e) {
		e.preventDefault();
		var statistika = e.target.value;

		if (statistika !== '0') {
			axios.get(`/api/statistika/dohvati?id=${statistika}`).then(rezultat => {
				console.log(rezultat);
				this.setState({
					statistika: rezultat.data,
					odabranaSezona: statistika
				});
			});
		} else {
			this.setState({
				statistika: [],
				odabranaSezona: ''
			});
		}
	}

	DohvatiPodatke(id) {
		axios.get(`/api/ekipe/detaljno?ekipa=${id}`).then(rezultat => {
			this.setState({
				naziv: rezultat.data.naziv,
				lokacija: rezultat.data.lokacija
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
