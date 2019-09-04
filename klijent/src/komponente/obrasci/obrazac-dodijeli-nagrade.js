import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Poruka from '../poruka';

class DodijeliNagrade extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sezona: '2019',
			listaIgraca: [],
			igracID: '0',
			listaNagrada: [],
			nagradaID: '0',
			redirect: false,
			poruka: ''
		};

		this.DohvatiIgrace();

		this.OdaberiIgraca = this.OdaberiIgraca.bind(this);
		this.OdaberiNagradu = this.OdaberiNagradu.bind(this);
		this.OdaberiSezonu = this.OdaberiSezonu.bind(this);
		this.DodajNagradu = this.DodajNagradu.bind(this);
	}
	render() {
		if (Cookies.get('tip') !== '3' || this.state.redirect) return <Redirect to="/" />;
		var iskljucen =
			this.state.sezona === '' || this.state.igracID === '0' || this.state.nagradaID === '0'
				? 'disabled'
				: '';
		return (
			<div className="grid grid-centar">
				<Poruka poruka={this.state.poruka} />
				<form className="grid grid-element-small">
					<select onChange={this.OdaberiIgraca}>
						<option key="0" value="0">
							Odaberite igrača
						</option>
						{this.state.listaIgraca.map(igrac => (
							<option key={igrac.id} value={igrac.id}>
								{igrac.ime} {igrac.prezime} - {igrac.ekipa}
							</option>
						))}
					</select>
					<input
						onChange={this.OdaberiSezonu}
						value={this.state.sezona}
						type="number"
						min="2000"
					/>
					{this.state.listaNagrada.length > 0 ? (
						<select onChange={this.OdaberiNagradu}>
							<option key="0" value="0">
								Odaberite nagradu
							</option>
							{this.state.listaNagrada.map(nagrada => (
								<option key={nagrada.id} value={nagrada.id}>
									{nagrada.naziv}
								</option>
							))}
						</select>
					) : null}
					<input
						onClick={this.DodajNagradu}
						disabled={iskljucen}
						type="submit"
						value="Dodijelite nagradu!"
					/>
				</form>
			</div>
		);
	}

	DohvatiIgrace() {
		axios.get('/api/osobe/igraci/dohvati').then(rezultat => {
			this.setState({
				listaIgraca: rezultat.data
			});
		});
	}

	DohvatiNagrade() {
		if (this.state.sezona !== '' && this.state.igracID !== '0') {
			axios
				.get(`/api/nagrade/dohvati?igrac=${this.state.igracID}&sezona=${this.state.sezona}`)
				.then(rezultat => {
					this.setState({
						listaNagrada: rezultat.data
					});
				});
		}
	}

	OdaberiIgraca(e) {
		this.setState({ nagradaID: '0' });
		e.preventDefault();
		this.setState(
			{
				igracID: e.target.value
			},
			() => {
				this.DohvatiNagrade();
			}
		);
	}

	OdaberiSezonu(e) {
		this.setState({ nagradaID: '0' });
		e.preventDefault();
		var vrijednost = e.target.value;

		if (vrijednost >= '2000') {
			this.setState({ sezona: vrijednost }, () => {
				this.DohvatiNagrade();
			});
		}
	}

	OdaberiNagradu(e) {
		e.preventDefault();
		this.setState({
			nagradaID: e.target.value
		});
	}

	DodajNagradu(e) {
		e.preventDefault();

		axios
			.post('/api/nagrade/dodaj', {
				nagrada: this.state.nagradaID,
				igrac: this.state.igracID,
				sezona: this.state.sezona
			})
			.then(rezultat => {
				if (rezultat.data === 'error') {
					this.setState(
						{ poruka: 'Greška kod unosa podataka, pokušajte ponovo!' },
						() => {
							setTimeout(() => {
								this.setState({ poruka: '' });
							}, 2000);
						}
					);
				} else {
					this.setState({ poruka: 'Uspješno dodjeljena nagrada!' }, () => {
						setTimeout(() => {
							this.setState({ poruka: '', redirect: true });
						}, 2000);
					});
				}
			});
	}
}

export default DodijeliNagrade;
