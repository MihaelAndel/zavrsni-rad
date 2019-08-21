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
		if (this.state.listaEkipa.length === 0) {
			return <p>Loading...</p>;
		} else {
			return (
				<div>
					<Link to="/">
						<img
							height="50px"
							src="https://www.searchpng.com/wp-content/uploads/2019/02/Back-Arrow-Icon-PNG-715x715.png"
						/>
					</Link>
					<PopisEkipa lista={this.state.listaEkipa} />;
				</div>
			);
		}
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
