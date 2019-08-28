import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../App.css';
import Ucitavanje from './ucitavanje';

class EkipaDetaljno extends React.Component {
	constructor(props) {
		super(props);
		this.DohvatiPodatke(this.props.match.params.id);

		this.VratiSe = this.VratiSe.bind(this);

		this.state = {
			podaci: null,
			redirect: false
		};
	}

	render() {
		if (!this.state.redirect) {
			return (
				<div>
					<div
						onClick={this.VratiSe}
						className="blok odbaci prozirno"></div>

					<div className="blok blok-ekipa detaljno obrub pozadina pozadina-neutral">
						{this.state.podaci === null ? (
							<Ucitavanje />
						) : (
							this.state.podaci.naziv
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
			this.setState({ podaci: rezultat.data });
		});
	}

	VratiSe() {
		this.setState({
			redirect: true
		});
	}
}

export default EkipaDetaljno;
