import React from 'react';
import axios from 'axios';

class DodajStatistiku extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			osobe: [],
			ekipe: [],
			osobaID: '',
			osobaSezona: '',
			osobaPostoji: true,
			osobaPPG: '',
			osobaAPG: '',
			osobaRPG: '',
			osobaSPG: '',
			osobaBPG: '',
			osobaFG: '',
			osoba3P: '',
			osobaORTG: '',
			osobaDRTG: '',
			ekipaID: '',
			ekipaSezona: '',
			ekipaPostoji: true,
			ekipaPPG: '',
			ekipaAPG: '',
			ekipaRPG: '',
			ekipaSPG: '',
			ekipaBPG: '',
			ekipaFG: '',
			ekipa3P: '',
			ekipaORTG: '',
			ekipaDRTG: ''
		};

		this.DohvatiEkipe();
		this.DohvatiOsobe();

		this.ObradiUnos = this.ObradiUnos.bind(this);
		this.UpisiEkipa = this.UpisiEkipa.bind(this);
		this.UpisiOsoba = this.UpisiOsoba.bind(this);
	}

	render() {
		var osobaIskljucen = this.ProvjeriUnosOsoba() ? '' : 'disabled';
		var ekipaIskljucen = this.ProvjeriUnosEkipa() ? '' : 'disabled';
		return (
			<div className="grid grid-2stupca">
				<form className="grid grid-2stupca-2reda obrub-zaobljeno obrub-tamno pozadina-neutral-srednje padding-bottom-medium">
					<h3>Osobe</h3>
					<select id="oID" onChange={this.ObradiUnos}>
						<option key="0" value=""></option>
						{this.state.osobe.map(osoba => (
							<option key={osoba.id} id={osoba.id} value={osoba.id}>
								{osoba.ime} {osoba.prezime} - {osoba.ekipa}
							</option>
						))}
					</select>
					<label>Sezona:</label>
					<input
						value={this.state.osobaSezona}
						onChange={this.ObradiUnos}
						id="oSezona"
						type="number"
						placeholder="2019"
						min="2000"
					/>
					<label>Poeni po utakmici</label>
					<input
						value={this.state.osobaPPG}
						onChange={this.ObradiUnos}
						id="oPPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Asistencije po utakmici</label>
					<input
						value={this.state.osobaAPG}
						onChange={this.ObradiUnos}
						id="oAPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Skokovi po utakmici</label>
					<input
						value={this.state.osobaRPG}
						onChange={this.ObradiUnos}
						id="oRPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Blokovi po utakmici</label>
					<input
						value={this.state.osobaBPG}
						onChange={this.ObradiUnos}
						id="oBPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Ukradene lopte po utakmici</label>
					<input
						value={this.state.osobaSPG}
						onChange={this.ObradiUnos}
						id="oSPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Postotak pogodaka</label>
					<input
						value={this.state.osobaFG}
						onChange={this.ObradiUnos}
						id="oFG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Postotak trica</label>
					<input
						value={this.state.osoba3P}
						onChange={this.ObradiUnos}
						id="o3P"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Ocjena napada</label>
					<input
						value={this.state.osobaORTG}
						onChange={this.ObradiUnos}
						id="oORTG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Ocjena obrane</label>
					<input
						value={this.state.osobaDRTG}
						onChange={this.ObradiUnos}
						id="oDRTG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<div></div>
					<input
						onClick={this.UpisiOsoba}
						disabled={osobaIskljucen}
						type="submit"
						value="Dodaj"
					/>
				</form>
				<form className="grid grid-2stupca obrub-zaobljeno obrub-tamno pozadina-neutral-srednje padding-bottom-medium">
					<h3>Ekipe</h3>
					<select onChange={this.ObradiUnos} id="eID">
						<option key="0" value=""></option>
						{this.state.ekipe.map(ekipa => (
							<option key={ekipa.id} id={ekipa.id} value={ekipa.id}>
								{ekipa.lokacija} {ekipa.naziv}
							</option>
						))}
					</select>
					<label>Sezona:</label>
					<input
						value={this.state.ekipaSezona}
						onChange={this.ObradiUnos}
						id="eSezona"
						type="number"
						placeholder="2019"
						min="2000"
					/>
					<label>Poeni po utakmici</label>
					<input
						value={this.state.ekipaPPG}
						onChange={this.ObradiUnos}
						id="ePPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Asistencije po utakmici</label>
					<input
						value={this.state.ekipaAPG}
						onChange={this.ObradiUnos}
						id="eAPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Skokovi po utakmici</label>
					<input
						value={this.state.ekipaRPG}
						onChange={this.ObradiUnos}
						id="eRPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Blokovi po utakmici</label>
					<input
						value={this.state.ekipaBPG}
						onChange={this.ObradiUnos}
						id="eBPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Ukradene lopte po utakmici</label>
					<input
						value={this.state.ekipaSPG}
						onChange={this.ObradiUnos}
						id="eSPG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Postotak pogodaka</label>
					<input
						value={this.state.ekipaFG}
						onChange={this.ObradiUnos}
						id="eFG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Postotak trica</label>
					<input
						value={this.state.ekipa3P}
						onChange={this.ObradiUnos}
						id="e3P"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Ocjena napada</label>
					<input
						value={this.state.ekipaORTG}
						onChange={this.ObradiUnos}
						id="eORTG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<label>Ocjena obrane</label>
					<input
						value={this.state.ekipaDRTG}
						onChange={this.ObradiUnos}
						id="eDRTG"
						type="number"
						step="0.01"
						min="0"
						max="100.00"
					/>
					<div></div>
					<input
						onClick={this.UpisiEkipa}
						disabled={ekipaIskljucen}
						type="submit"
						value="Dodaj"
					/>
				</form>
			</div>
		);
	}

	DohvatiOsobe() {
		axios.get('/api/osobe/dohvati?sve=sve').then(rezultat => {
			this.setState({ osobe: rezultat.data });
		});
	}

	DohvatiEkipe() {
		axios.get('/api/ekipe/dohvati?sve=sve').then(rezultat => {
			this.setState({ ekipe: rezultat.data });
		});
	}

	ObradiUnos(e) {
		var vrijednost = e.target.value;
		switch (e.target.id) {
			case 'oID':
				this.setState({ osobaID: vrijednost }, () => {
					this.ProvjeriPostojanjeOsoba();
				});
				break;
			case 'oSezona':
				this.setState({ osobaSezona: vrijednost }, () => {
					this.ProvjeriPostojanjeOsoba();
				});
				break;
			case 'oPPG':
				this.setState({ osobaPPG: vrijednost });
				break;
			case 'oAPG':
				this.setState({ osobaAPG: vrijednost });
				break;
			case 'oRPG':
				this.setState({ osobaRPG: vrijednost });
				break;
			case 'oBPG':
				this.setState({ osobaBPG: vrijednost });
				break;
			case 'oSPG':
				this.setState({ osobaSPG: vrijednost });
				break;
			case 'oFG':
				this.setState({ osobaFG: vrijednost });
				break;
			case 'o3P':
				this.setState({ osoba3P: vrijednost });
				break;
			case 'oORTG':
				this.setState({ osobaORTG: vrijednost });
				break;
			case 'oDRTG':
				this.setState({ osobaDRTG: vrijednost });
				break;
			case 'eID':
				this.setState({ ekipaID: vrijednost }, () => {
					this.ProvjeriPostojanjeEkipa();
				});
				break;
			case 'eSezona':
				this.setState({ ekipaSezona: vrijednost }, () => {
					this.ProvjeriPostojanjeEkipa();
				});
				break;
			case 'ePPG':
				this.setState({ ekipaPPG: vrijednost });
				break;
			case 'eAPG':
				this.setState({ ekipaAPG: vrijednost });
				break;
			case 'eRPG':
				this.setState({ ekipaRPG: vrijednost });
				break;
			case 'eBPG':
				this.setState({ ekipaBPG: vrijednost });
				break;
			case 'eSPG':
				this.setState({ ekipaSPG: vrijednost });
				break;
			case 'eFG':
				this.setState({ ekipaFG: vrijednost });
				break;
			case 'e3P':
				this.setState({ ekipa3P: vrijednost });
				break;
			case 'eORTG':
				this.setState({ ekipaORTG: vrijednost });
				break;
			case 'eDRTG':
				this.setState({ ekipaDRTG: vrijednost });
				break;
		}
	}

	ProvjeriUnosOsoba() {
		if (
			this.state.osobaID !== '' &&
			this.state.osobaSezona !== '' &&
			this.state.osobaPPG !== '' &&
			this.state.osobaAPG !== '' &&
			this.state.osobaRPG !== '' &&
			this.state.osobaBPG !== '' &&
			this.state.osobaSPG !== '' &&
			this.state.osobaFG !== '' &&
			this.state.osoba3P !== '' &&
			this.state.osobaORTG !== '' &&
			this.state.osobaDRTG !== '' &&
			this.state.osobaPostoji !== true
		) {
			return true;
		} else {
			return false;
		}
	}

	ProvjeriUnosEkipa() {
		if (
			this.state.ekipaID !== '' &&
			this.state.ekipaSezona !== '' &&
			this.state.ekipaPPG !== '' &&
			this.state.ekipaAPG !== '' &&
			this.state.ekipaRPG !== '' &&
			this.state.ekipaBPG !== '' &&
			this.state.ekipaSPG !== '' &&
			this.state.ekipaFG !== '' &&
			this.state.ekipa3P !== '' &&
			this.state.ekipaORTG !== '' &&
			this.state.ekipaDRTG !== '' &&
			this.state.ekipaPostoji !== true
		) {
			return true;
		} else {
			return false;
		}
	}

	ProvjeriPostojanjeOsoba() {
		axios
			.get(
				`/api/statistika/osobe/postojanje?osoba=${this.state.osobaID}&sezona=${this.state.osobaSezona}`
			)
			.then(rezultat => {
				if (rezultat.data === 'ok') {
					this.setState({ osobaPostoji: false });
				} else if (rezultat.data === 'no') {
					this.setState({ osobaPostoji: true });
				}
			});
	}

	ProvjeriPostojanjeEkipa() {
		axios
			.get(
				`/api/statistika/ekipe/postojanje?ekipa=${this.state.ekipaID}&sezona=${this.state.ekipaSezona}`
			)
			.then(rezultat => {
				if (rezultat.data === 'ok') {
					this.setState({ ekipaPostoji: false });
				} else if (rezultat.data === 'no') {
					this.setState({ ekipaPostoji: true });
				}
			});
	}

	UpisiOsoba(e) {
		e.preventDefault();
		axios
			.post('/api/statistika/osobe/upisi', {
				osoba: this.state.osobaID,
				sezona: this.state.osobaSezona,
				ppg: this.state.osobaPPG,
				apg: this.state.osobaAPG,
				rpg: this.state.osobaRPG,
				bpg: this.state.osobaBPG,
				spg: this.state.osobaSPG,
				fg: this.state.osobaFG,
				p3: this.state.osoba3P,
				ortg: this.state.osobaORTG,
				drtg: this.state.osobaDRTG
			})
			.then(() => {
				this.setState({
					osobaID: '',
					osobaSezona: '',
					osobaPPG: '',
					osobaAPG: '',
					osobaRPG: '',
					osobaBPG: '',
					osobaSPG: '',
					osobaFG: '',
					osoba3P: '',
					osobaORTG: '',
					osobaDRTG: ''
				});
			});
	}

	UpisiEkipa(e) {
		e.preventDefault();
		axios
			.post('/api/statistika/ekipe/upisi', {
				ekipa: this.state.ekipaID,
				sezona: this.state.ekipaSezona,
				ppg: this.state.ekipaPPG,
				apg: this.state.ekipaAPG,
				rpg: this.state.ekipaRPG,
				bpg: this.state.ekipaBPG,
				spg: this.state.ekipaSPG,
				fg: this.state.ekipaFG,
				p3: this.state.ekipa3P,
				ortg: this.state.ekipaORTG,
				drtg: this.state.ekipaDRTG
			})
			.then(() => {
				this.setState({
					ekipaID: '',
					ekipaSezona: '',
					ekipaPPG: '',
					ekipaAPG: '',
					ekipaRPG: '',
					ekipaBPG: '',
					ekipaSPG: '',
					ekipaFG: '',
					ekipa3P: '',
					ekipaORTG: '',
					ekipaDRTG: ''
				});
			});
	}
}

export default DodajStatistiku;
