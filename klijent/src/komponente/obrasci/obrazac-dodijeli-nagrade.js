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
			redirect: false,
			poruka: '',
			mvp: false,
			dpoy: false,
			roty: false,
			mip: false,
			man6: false,
			allStar: false
		};

		this.DohvatiIgrace();

		this.OdaberiIgraca = this.OdaberiIgraca.bind(this);
		this.ObradiUnos = this.ObradiUnos.bind(this);
		this.OdaberiSezonu = this.OdaberiSezonu.bind(this);
		this.DodajNagradu = this.DodajNagradu.bind(this);
	}
	render() {
		console.log(this.state);
		if (Cookies.get('tip') !== '3' || this.state.redirect) return <Redirect to="/" />;
		var iskljucen =
			this.state.sezona === '' ||
			this.state.igracID === '0' ||
			(this.state.mvp === false &&
				this.state.dpoy === false &&
				this.state.roty === false &&
				this.state.mip === false &&
				this.state.man6 === false &&
				this.state.allStar === false)
				? 'disabled'
				: '';
		return (
			<div className="grid grid-centar">
				<Poruka poruka={this.state.poruka} />
				<h2>Dodijela nagrada</h2>
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
					{this.state.listaNagrada.length > 0
						? this.state.listaNagrada.map(nagrada => (
								<div key={nagrada.id}>
									<label>{nagrada.naziv}</label>
									<input
										type="checkbox"
										id={nagrada.id}
										onChange={this.ObradiUnos}
									/>
								</div>
						  ))
						: null}
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

	DodajNagradu(e) {
		e.preventDefault();
		var odabraneNagrade = [];
		if (this.state.mvp) odabraneNagrade.push(1);
		if (this.state.dpoy) odabraneNagrade.push(2);
		if (this.state.roty) odabraneNagrade.push(3);
		if (this.state.mip) odabraneNagrade.push(4);
		if (this.state.man6) odabraneNagrade.push(5);
		if (this.state.allStar) odabraneNagrade.push(6);

		axios
			.post('/api/nagrade/dodaj', {
				nagrade: odabraneNagrade,
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
					this.setState({ poruka: 'Uspješno dodjeljena nagrada!', igracID: '0' }, () => {
						setTimeout(() => {
							this.setState({ poruka: '', redirect: true });
						}, 2000);
					});
				}
			});
	}

	ObradiUnos(e) {
		console.log('tu sam');
		var id = e.target.id;
		console.log(id);
		switch (id) {
			case '1':
				this.setState({ mvp: !this.state.mvp });
				break;

			case '2':
				this.setState({ dpoy: !this.state.dpoy });
				break;

			case '3':
				this.setState({ roty: !this.state.roty });
				break;

			case '4':
				this.setState({ mip: !this.state.mip });
				break;

			case '5':
				this.setState({ man6: !this.state.man6 });
				break;

			case '6':
				this.setState({ allStar: !this.state.allStar });
				break;

			default:
				return;
		}
	}
}

export default DodijeliNagrade;
