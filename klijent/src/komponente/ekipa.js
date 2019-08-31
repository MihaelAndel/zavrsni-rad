import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

class Ekipa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prati: props.prati,
			id: props.id
		};

		this.PodesiPracenje = this.PodesiPracenje.bind(this);
	}

	render() {
		var tekstGumb = this.state.prati ? 'Prestani pratiti' : 'Počni pratiti';
		var iskljucen = Cookies.get('korisnik') ? '' : 'disabled';
		return (
			<div className="blok blok-podaci obrub-tamno obrub-zaobljeno pozadina">
				<Link to={`/ekipe/${this.props.id}/${this.state.prati}`} key={this.props.id}>
					<div id={this.props.id}>
						<span>
							<label>Naziv:</label> {this.props.naziv}
						</span>
						<br />
						<span>
							<label>Lokacija:</label> {this.props.lokacija}
						</span>
						<br />
						<span>
							<label>Arena: </label>
							{this.props.arena}
						</span>
						<br />
					</div>
				</Link>
				<button disabled={iskljucen} onClick={this.PodesiPracenje}>
					{tekstGumb}
				</button>
			</div>
		);
	}

	PodesiPracenje() {
		var korisnikID = Cookies.get('id');
		var ekipaID = this.state.id;
		axios
			.post('/api/ekipe/podesiPracenje', {
				korisnik: korisnikID,
				ekipa: ekipaID,
				prati: !this.state.prati
			})
			.then(response => {
				if (response.data === 'ok') {
					this.setState({ prati: !this.state.prati });
				}
			});
	}
}

export default Ekipa;
