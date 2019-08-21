import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class Ekipa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prati: props.prati
		};
		this.PodesiPracenje = this.PodesiPracenje.bind(this);
	}

	render() {
		var iskljucen = Cookies.get('korisnik') ? '' : 'disabled';
		var tekstGumba = this.state.prati
			? 'Prestani pratiti'
			: 'Počni pratiti';
		var stanje = this.state.prati ? 'Da' : 'Ne';
		return (
			<div className="blok ekipa" id={this.props.id}>
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
		var ekipaID = this.props.id;

		axios
			.post('/api/ekipe/podesiPracenje', {
				korisnik: korisnikID,
				ekipa: ekipaID,
				prati: !this.state.prati
			})
			.then(response => {
				if (response.data === 'ok') {
					this.setState({
						prati: !this.state.prati
					});
				}
			});
	}
}

export default Ekipa;
