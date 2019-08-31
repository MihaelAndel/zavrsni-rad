import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Ucitavanje from '../komponente/ucitavanje';

class Naslovna extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			objave: []
		};

		this.DohvatiObjave();
	}

	render() {
		if (this.state.objave.length === 0) {
			return <Ucitavanje></Ucitavanje>;
		} else {
			return (
				<div className="grid grid-4stupca">
					{this.state.objave.map(objava => (
						<div
							key={objava.id}
							id={objava.id}
							className="blok blok-podaci obrub-tamno obrub-zaobljeno pozadina">
							{objava.naslov} ({objava.prezime},{objava.ime})<br />
							Napisano: {objava.datum} - {objava.vrijeme}
							<p>{objava.tekst}</p>
						</div>
					))}
				</div>
			);
		}
	}

	DohvatiObjave() {
		var korisnik = Cookies.get('id');
		if (korisnik) {
			axios.get(`/api/objave/dohvati?korisnik=${korisnik}`).then(rezultat => {
				console.log(rezultat.data);
				this.setState({
					objave: rezultat.data
				});
				this.SrediDatume();
			});
		} else {
			axios.get(`/api/objave/dohvati`).then(rezultat => {
				this.setState({
					objave: rezultat.data
				});
				this.SrediDatume();
			});
		}
	}

	SrediDatume() {
		var objave = this.state.objave;

		for (var i = 0; i < objave.length; i++) {
			var datum = objave[i].datum;
			datum = datum.slice(0, -5);
			datum = datum.split('T');
			objave[i].datum = datum[0];
			objave[i].vrijeme = datum[1];
		}

		this.setState({
			objave: objave
		});
	}
}

export default Naslovna;
