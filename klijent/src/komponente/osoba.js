import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class Osoba extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prati: props.prati
		};
		this.PodesiPracenje = this.PodesiPracenje.bind(this);
	}

	render() {
		var iskljucen = Cookies.get('korisnik') ? '' : 'disabled';
		var tekstGumba = this.state.prati ? 'Prestani pratiti' : 'Počni pratiti';
		var stanje = this.state.prati ? 'Da' : 'Ne';
		return (
			<div className="blok blok-podaci obrub obrub-zaobljeno pozadina" id={this.props.id}>
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
				<span>
					<label>Pozicija: </label>
					{this.props.pozicija}
				</span>
				<br />
				<span>
					<label>Prati: </label>
					{stanje}
				</span>
				<br />
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
