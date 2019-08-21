import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PopisEkipa from '../komponente/popis-ekipa';
import { stat } from 'fs';

class Ekipe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listaEkipa: []
		};

		this.DohvatiEkipe();
	}

	render() {
		return (
			<div>
				<Link to="/">Natrag</Link>
				<PopisEkipa lista={this.state.listaEkipa} />;
			</div>
		);
	}

	DohvatiEkipe() {
		if (this.state.listaEkipa.length === 0) {
			axios.get('/api/dohvatiEkipe').then(response => {
				this.setState({
					listaEkipa: response.data
				});
			});
		}
	}
}

export default Ekipe;
