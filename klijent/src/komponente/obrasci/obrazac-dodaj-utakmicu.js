import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import PopisEkipa from '../popis-ekipa';
import axios from 'axios';
import Ekipa from '../ekipa';
import Poruka from '../poruka';

class DodajUtakmicu extends React.Component {
	constructor(props) {
		super(props);

		console.log('konstruktor');

		this.state = {
			datum: '',
			sezona: '',
			domacinID: '',
			domacin: null,
			gostID: '',
			gost: null,
			pobjednikID: '',
			poeniDomacin: '',
			poeniGost: '',
			popisEkipa: [],
			redirect: false,
			poruka: ''
		};

		this.ObradiDatum = this.ObradiDatum.bind(this);
		this.ObradiDomacina = this.ObradiDomacina.bind(this);
		this.ObradiGosta = this.ObradiGosta.bind(this);

		this.UnosDatuma = this.UnosDatuma.bind(this);
		this.Zavrsetak = this.Zavrsetak.bind(this);
		this.OdabirDomacina = this.OdabirDomacina.bind(this);
		this.OdabirGosta = this.OdabirGosta.bind(this);

		this.ObradiPoeneDomacina = this.ObradiPoeneDomacina.bind(this);
		this.ObradiPoeneGosta = this.ObradiPoeneGosta.bind(this);

		this.DodajUtakmicu = this.DodajUtakmicu.bind(this);

		this.DohvatiDomacinaIGosta = this.DohvatiDomacinaIGosta.bind(this);
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="" />;
		}
		return (
			<div>
				<Poruka poruka={this.state.poruka} />
				<Route exact path="/dodavanje-utakmice" component={this.UnosDatuma} />
				<Route
					exact
					path="/dodavanje-utakmice/odabir-domacina"
					component={this.OdabirDomacina}
				/>
				<Route exact path="/dodavanje-utakmice/odabir-gosta" component={this.OdabirGosta} />
				<Route exact path="/dodavanje-utakmice/zavrsetak" component={this.Zavrsetak} />
			</div>
		);
	}

	UnosDatuma() {
		var iskljucen = this.state.datum ? '' : 'disabled';
		return (
			<form className="grid grid-2stupca grid-center">
				<h2>Kada se održala utakmica?</h2>
				<div></div>
				<input
					id="datum"
					className="grid-element-small"
					onChange={this.ObradiDatum}
					type="date"></input>
				<Link to="/dodavanje-utakmice/odabir-domacina">
					<input
						disabled={iskljucen}
						className="grid-element-small"
						type="submit"
						value="Dalje"
					/>
				</Link>
			</form>
		);
	}

	OdabirDomacina() {
		if (!this.state.datum) {
			return <Redirect to="/dodavanje-utakmice" />;
		}
		if (this.state.popisEkipa.length === 0) {
			this.DohvatiEkipe();
		}
		if (this.state.popisEkipa.length !== 0) {
			var iskljucen = !this.state.domacinID ? 'disabled' : '';
			return (
				<div>
					<h2>Tko je bio domaćin?</h2>
					<Link to="/dodavanje-utakmice/odabir-gosta">
						<input disabled={iskljucen} value="Dalje" type="submit"></input>
					</Link>
					<PopisEkipa
						odabir="odabir"
						utakmica="utakmica"
						ObradiUnos={this.ObradiDomacina}
						lista={this.state.popisEkipa}></PopisEkipa>
				</div>
			);
		} else {
			return null;
		}
	}

	OdabirGosta() {
		if (!this.state.domacinID) {
			return <Redirect to="/dodavanje-utakmice/odabir-domacina" />;
		} else {
			var iskljucen = !this.state.gostID ? 'disabled' : '';
			return (
				<div>
					<h2>Tko je bio gost?</h2>
					<Link to="/dodavanje-utakmice/zavrsetak">
						<input disabled={iskljucen} value="Dalje" type="submit"></input>
					</Link>
					<PopisEkipa
						odabir="odabir"
						domacin={this.state.domacinID}
						utakmica="utakmica"
						ObradiUnos={this.ObradiGosta}
						lista={this.state.popisEkipa}></PopisEkipa>
				</div>
			);
		}
	}

	Zavrsetak() {
		if (!this.state.gostID) {
			return <Redirect to="/dodavanje-utakmice/odabir-gosta" />;
		} else {
			if (this.state.gost === null || this.state.domacin === null) {
				this.DohvatiDomacinaIGosta();
				return <div></div>;
			} else {
				var iskljucen =
					this.state.poeniDomacin !== 0 &&
					this.state.poeniGost !== 0 &&
					this.state.poeniDomacin !== this.state.poeniGost
						? ''
						: 'disabled';
				return (
					<div className="grid grid-2stupca">
						<form className="grid">
							<h2>Domaćin</h2>
							<Ekipa
								id={this.state.domacin[0].id}
								naziv={this.state.domacin[0].naziv}
								lokacija={this.state.domacin[0].lokacija}
								arena={this.state.domacin[0].arena}
								utakmica="utakmica"
							/>
							<input
								value={this.state.poeniDomacin}
								onChange={this.ObradiPoeneDomacina}
								className="grid-element-small"
								type="number"
								min="0"
								placeholder="Poeni domaćina"></input>
						</form>
						<form className="grid">
							<h2>Gost</h2>
							<Ekipa
								id={this.state.gost[0].id}
								naziv={this.state.gost[0].naziv}
								lokacija={this.state.gost[0].lokacija}
								arena={this.state.gost[0].arena}
								utakmica="utakmica"
							/>
							<input
								value={this.state.poeniGost}
								onChange={this.ObradiPoeneGosta}
								className="grid-element-small"
								type="number"
								min="0"
								placeholder="Poeni gosta"></input>
						</form>
						<input
							className="grid"
							onClick={this.DodajUtakmicu}
							className="grid-element-small"
							disabled={iskljucen}
							type="submit"
							value="Dodaj utakmicu!"></input>
					</div>
				);
			}
		}
	}

	ObradiDatum(e) {
		e.preventDefault();
		var datum = e.target.value;
		var sezona = e.target.value.split('-')[0];
		this.setState({
			datum: datum,
			sezona: sezona
		});
	}

	ObradiDomacina(id) {
		this.setState({ domacinID: id });
	}

	ObradiGosta(id) {
		this.setState({ gostID: id });
	}

	ObradiPoeneDomacina(e) {
		e.preventDefault();
		if (e.target.value >= 0) {
			this.setState({
				poeniDomacin: e.target.value
			});
		}
	}

	ObradiPoeneGosta(e) {
		e.preventDefault();
		if (e.target.value >= 0) {
			this.setState({
				poeniGost: e.target.value
			});
		}
	}

	DohvatiEkipe() {
		axios.get(`/api/ekipe/bezUtakmice?datum=${this.state.datum}`).then(rezultat => {
			this.setState({
				popisEkipa: rezultat.data
			});
		});
	}

	DohvatiDomacinaIGosta() {
		var domacinID = this.state.domacinID;
		var gostID = this.state.gostID;
		console.log(domacinID);
		console.log(gostID);
		axios.get(`/api/ekipe/dohvati?domacin=${domacinID}&gost=${gostID}`).then(rezultat => {
			this.setState({
				domacin: rezultat.data[0],
				gost: rezultat.data[1]
			});
		});
	}

	DodajUtakmicu(e) {
		console.log(this.state.poeniGost);
		var pobjednikID =
			this.state.poeniDomacin > this.state.poeniGost
				? this.state.domacinID
				: this.state.gostID;
		e.preventDefault();
		axios
			.post('/api/utakmice/dodaj', {
				domacin: this.state.domacinID,
				gost: this.state.gostID,
				pobjednik: pobjednikID,
				sezona: this.state.sezona,
				datum: this.state.datum,
				poeniD: this.state.poeniDomacin,
				poeniG: this.state.poeniGost
			})
			.then(rezultat => {
				if (rezultat.data === 'ok') {
					this.setState(
						{
							poruka: 'Uspješno stvorena utakmica!'
						},
						() => {
							setTimeout(() => {
								this.setState({ redirect: true });
							}, 2000);
						}
					);
				} else {
					this.setState({ poruka: 'Greška kod stvaranj utakmice!' }, () => {
						setTimeout(() => {
							this.setState({ poruka: '' });
						}, 2000);
					});
				}
			});
	}
}

export default DodajUtakmicu;
