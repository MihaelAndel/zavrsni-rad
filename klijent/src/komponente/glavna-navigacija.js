import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class GlavnaNavigacija extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			poveznice: []
		};

		this.DohvatiPoveznice();
	}

	render() {
		return (
			<nav id="glavna-navigacija">
				{this.state.poveznice.map(poveznica => (
					<Link key={poveznica.id} to={poveznica.putanja}>
						{poveznica.naziv}
					</Link>
				))}
			</nav>
		);
	}

	DohvatiPoveznice() {
		var korisnik = Cookies.get('tip') ? Cookies.get('tip') : '';
		axios
			.get(`/api/navigacija/dohvati?korisnik=${korisnik}`)
			.then(response => {
				response.data.forEach(poveznica => {
					console.log(poveznica.naziv);
				});
				this.setState({
					poveznice: response.data
				});
			});
	}
}

export default GlavnaNavigacija;
