import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Osoba extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prati: props.prati,
			id: props.id
		};
		this.PodesiPracenje = this.PodesiPracenje.bind(this);
	}

	render() {
		var iskljucen = Cookies.get('korisnik') ? '' : 'disabled';
		var tekstGumba = this.state.prati ? 'Prestani pratiti' : 'Počni pratiti';
		var pozicija =
			this.props.tip === 'Igrač' ? (
				<span>
					<label>Pozicija: </label>
					{this.props.pozicija}
				</span>
			) : (
				<span></span>
			);

		var stanje = this.state.prati ? 'Da' : 'Ne';
		return (
			<div>
				<Link to={`/osobe/${this.props.id}`}>
					<div
						className="blok blok-podaci obrub-tamno obrub-zaobljeno pozadina"
						id={this.props.id}>
						<span>
							<label>Ime:</label> {this.props.ime}
						</span>
						<br />
						<span>
							<label>Prezime:</label> {this.props.prezime}
						</span>
						<br />
						<span>
							<label>Ekipa: </label>
							{this.props.ekipa}
						</span>
						<br />
						<span>
							<label>Broj: </label>
							{this.props.broj}
						</span>
						<br />
						{pozicija}
					</div>
				</Link>
				<button disabled={iskljucen} onClick={this.PodesiPracenje}>
					{tekstGumba}
				</button>
			</div>
		);
	}

	PodesiPracenje() {
		var korisnikID = Cookies.get('id');
		var osobaID = this.props.id;

		axios
			.post('/api/osobe/podesiPracenje', {
				korisnik: korisnikID,
				osoba: osobaID,
				prati: !this.state.prati
			})
			.then(response => {
				console.log(response);
				if (response.data === 'ok') {
					this.setState({
						prati: !this.state.prati
					});
				}
			});
	}
}

export default Osoba;
