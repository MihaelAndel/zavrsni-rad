import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Poruka from '../poruka';

class DodajEkipu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			naziv: '',
			lokacija: '',
			arena: '',
			poruka: ''
		};

		this.Dodaj = this.Dodaj.bind(this);
		this.ObradiUnos = this.ObradiUnos.bind(this);
	}

	render() {
		var iskljucen =
			this.state.naziv === '' || this.state.lokacija === '' || this.state.arena === ''
				? 'disabled'
				: '';
		if (this.state.redirect) {
			return <Redirect to="/ekipe" />;
		} else {
			return (
				<div className="grid">
					<h2>Dodavanje ekipe</h2>
					<Poruka poruka={this.state.poruka} />
					<form className="grid" autoComplete="off">
						<input
							id="naziv"
							onChange={this.ObradiUnos}
							type="text"
							value={this.state.naziv}
							placeholder="Naziv ekipe"></input>
						<input
							id="loc"
							onChange={this.ObradiUnos}
							type="text"
							value={this.state.lokacija}
							placeholder="Lokacija ekipe"></input>
						<input
							id="arena"
							onChange={this.ObradiUnos}
							type="text"
							value={this.state.arena}
							placeholder="Arena"></input>
						<input
							disabled={iskljucen}
							onClick={this.Dodaj}
							type="submit"
							value="Dodaj ekipu!"></input>
					</form>
				</div>
			);
		}
	}

	Dodaj(e) {
		e.preventDefault();

		axios
			.post('/api/ekipe/dodaj', {
				naziv: this.state.naziv,
				lokacija: this.state.lokacija,
				arena: this.state.arena
			})
			.then(rezultat => {
				if (rezultat.data === 'ok') {
					this.setState({
						redirect: true,
						naziv: '',
						lokacija: '',
						arena: ''
					});
				} else {
					this.setState({ poruka: 'Greška kod dodavanja ekipe!' }, () => {
						setTimeout(() => {
							this.setState({ poruka: '' });
						}, 2000);
					});
				}
			});
	}

	ObradiUnos(e) {
		var vrijednost = e.target.value;
		switch (e.target.id) {
			case 'naziv': {
				this.setState({ naziv: vrijednost });
				break;
			}
			case 'loc': {
				this.setState({ lokacija: vrijednost });
				break;
			}
			case 'arena': {
				this.setState({ arena: vrijednost });
				break;
			}
		}
	}
}

export default DodajEkipu;
