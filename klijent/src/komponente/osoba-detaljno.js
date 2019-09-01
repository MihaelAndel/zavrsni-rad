import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class OsobaDetaljno extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			id: this.props.match.params.id,
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
		if (this.state.redirect) {
			return <Redirect to="/osobe/" />;
		} else {
			return (
				<div>
					<div onClick={this.VratiSe} className="blok odbaci prozirno"></div>
					<div className="grid grid-detaljno detaljno obrub pozadina pozadina-neutral">
						<h3>
							{this.state.ime} {this.state.prezime}
						</h3>
						<div>
							<h4>Sezone</h4>
							<select onChange={this.DohvatiStatistiku}>
								<option value="0">Odaberite sezonu</option>
								{this.state.sezone.map(sezona => (
									<option key={sezona.id} value={sezona.id}>
										{sezona.sezona}
									</option>
								))}
							</select>
						</div>
						{this.state.odabranaSezona ? (
							<div className=" scrollable obrub pozadina-neutral-svjetlo padding-small">
								<ul>
									<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
									<li>
										Asistencije po utakmici -{' '}
										{this.state.statistika.asistencije}
									</li>
									<li>Skokovi po utakmici - {this.state.statistika.skokovi}</li>
									<li>Blokovi po utakmici - {this.state.statistika.blokovi}</li>
									<li>
										Ukradene lopte po utakmici -{' '}
										{this.state.statistika.ukradeneLopte}
									</li>
									<li>
										Postotak pogodaka - {this.state.statistika.postotakPogodaka}
									</li>
									<li>Postotak trica - {this.state.statistika.postotakTrica}</li>
									<li>Ocjena napada - {this.state.statistika.ocjenaNapada}</li>
									<li>Ocjena obrane - {this.state.statistika.ocjenaObrane}</li>
								</ul>
							</div>
						) : (
							<div></div>
						)}

						{this.state.odabranaSezona ? (
							<div className=" scrollable obrub pozadina-neutral-svjetlo padding-small">
								<ul>
									<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
									<li>
										Asistencije po utakmici -{' '}
										{this.state.statistika.asistencije}
									</li>
									<li>Skokovi po utakmici - {this.state.statistika.skokovi}</li>
									<li>Blokovi po utakmici - {this.state.statistika.blokovi}</li>
									<li>
										Ukradene lopte po utakmici -{' '}
										{this.state.statistika.ukradeneLopte}
									</li>
									<li>
										Postotak pogodaka - {this.state.statistika.postotakPogodaka}
									</li>
									<li>Postotak trica - {this.state.statistika.postotakTrica}</li>
									<li>Ocjena napada - {this.state.statistika.ocjenaNapada}</li>
									<li>Ocjena obrane - {this.state.statistika.ocjenaObrane}</li>
								</ul>
								<ul>
									<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
									<li>
										Asistencije po utakmici -{' '}
										{this.state.statistika.asistencije}
									</li>
									<li>Skokovi po utakmici - {this.state.statistika.skokovi}</li>
									<li>Blokovi po utakmici - {this.state.statistika.blokovi}</li>
									<li>
										Ukradene lopte po utakmici -{' '}
										{this.state.statistika.ukradeneLopte}
									</li>
									<li>
										Postotak pogodaka - {this.state.statistika.postotakPogodaka}
									</li>
									<li>Postotak trica - {this.state.statistika.postotakTrica}</li>
									<li>Ocjena napada - {this.state.statistika.ocjenaNapada}</li>
									<li>Ocjena obrane - {this.state.statistika.ocjenaObrane}</li>
								</ul>
								<ul>
									<li>Poeni po utakmici - {this.state.statistika.poeni}</li>
									<li>
										Asistencije po utakmici -{' '}
										{this.state.statistika.asistencije}
									</li>
									<li>Skokovi po utakmici - {this.state.statistika.skokovi}</li>
									<li>Blokovi po utakmici - {this.state.statistika.blokovi}</li>
									<li>
										Ukradene lopte po utakmici -{' '}
										{this.state.statistika.ukradeneLopte}
									</li>
									<li>
										Postotak pogodaka - {this.state.statistika.postotakPogodaka}
									</li>
									<li>Postotak trica - {this.state.statistika.postotakTrica}</li>
									<li>Ocjena napada - {this.state.statistika.ocjenaNapada}</li>
									<li>Ocjena obrane - {this.state.statistika.ocjenaObrane}</li>
								</ul>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>
			);
		}
	}

	VratiSe() {
		this.setState({ redirect: true });
	}

	DohvatiPodatke(id) {
		axios.get(`/api/osobe/detaljno?osoba=${id}`).then(rezultat => {
			this.setState({
				ime: rezultat.data.ime,
				prezime: rezultat.data.prezime
			});
		});
	}

	DohvatiSezone(id) {
		axios.get(`/api/statistika/osobe/sezone?ekipa=${id}`).then(rezultat => {
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
}

export default OsobaDetaljno;
