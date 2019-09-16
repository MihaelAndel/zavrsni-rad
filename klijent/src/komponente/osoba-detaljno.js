import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries } from 'react-vis';

class OsobaDetaljno extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			id: this.props.match.params.id,
			sezone: [],
			statistika: [],
			nagrade: [],
			statistikaZaGraf: [],
			statistikaProsjek: [
				{ x: 'poeni', y: 11.4 },
				{ x: 'asistencije', y: 2.5 },
				{ x: 'skokovi', y: 8.2 },
				{ x: 'blokovi', y: 0.9 },
				{ x: 'ukradene lopte', y: 1.1 },
				{ x: '% koševi', y: 52.3 },
				{ x: '% trice', y: 31.2 }
			],
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
					<div className=" scrollable grid grid-detaljno detaljno obrub pozadina">
						<button className="izlaz" onClick={this.VratiSe}>
							Izlaz
						</button>
						<h3 className="tekst-center">
							{this.state.ime} {this.state.prezime}
						</h3>
						<div className="grid tekst-center">
							<h4>Sezone</h4>
							<select
								className="blok blok-small margin-auto"
								onChange={this.DohvatiStatistiku}>
								<option value="0">Odaberite sezonu</option>
								{this.state.sezone.map(sezona => (
									<option key={sezona.id} value={`${sezona.id}-${sezona.sezona}`}>
										{sezona.sezona}
									</option>
								))}
							</select>
						</div>
						{this.state.odabranaSezona ? (
							<div className="grid-elemenent margin-auto">
								<h4 className="tekst-center">Sezonska statistika</h4>
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
							<div className="grid-element margin-auto">
								<h4 className="tekst-center">Sezonske nagrade</h4>
								<ul className=" scrollable obrub pozadina-neutral-svjetlo padding-small">
									{this.state.nagrade.map(nagrada => (
										<li>{nagrada.naziv}</li>
									))}
								</ul>
							</div>
						) : (
							<div></div>
						)}
						{this.state.odabranaSezona ? (
							<div className="graf scrollable-x">
								<h3 className="tekst-center">Usporedba statistike</h3>
								<h4 className="tekst-center">
									prosjek = narančasta | igrač = zelena
								</h4>
								<XYPlot
									xType="ordinal"
									className="obrub pozadina-neutral-svjetlo padding-small"
									width={1000}
									height={400}>
									<YAxis tickTotal={5} tickPadding={0} />
									<XAxis />
									<VerticalBarSeries
										data={this.state.statistikaProsjek}
										color="orange"
									/>
									<VerticalBarSeries
										data={this.state.statistikaZaGraf}
										color="green"
									/>
								</XYPlot>
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
		var statistika = e.target.value.split('-')[0];
		var sezona = e.target.value.split('-')[1];

		this.setState({ odabranaSezona: '' });

		if (statistika !== '0') {
			axios.get(`/api/statistika/dohvati?id=${statistika}`).then(rezultat => {
				var statistikaGraf = [];
				statistikaGraf.push({ x: 'poeni', y: rezultat.data.poeni });
				statistikaGraf.push({ x: 'asistencije', y: rezultat.data.asistencije });
				statistikaGraf.push({ x: 'skokovi', y: rezultat.data.skokovi });
				statistikaGraf.push({ x: 'blokovi', y: rezultat.data.blokovi });
				statistikaGraf.push({ x: 'ukradene lopte', y: rezultat.data.ukradeneLopte });
				statistikaGraf.push({ x: '% koševi', y: rezultat.data.postotakPogodaka });
				statistikaGraf.push({ x: '% trice', y: rezultat.data.postotakTrica });

				this.setState({
					statistika: rezultat.data,
					odabranaSezona: statistika,
					statistikaZaGraf: statistikaGraf
				});
			});
			axios
				.get(`/api/nagrade/dohvati?sve=sve&igrac=${this.state.id}&sezona=${sezona}`)
				.then(rezultat => {
					if (rezultat.data === 'error') {
					} else {
						this.setState({ nagrade: rezultat.data });
					}
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
