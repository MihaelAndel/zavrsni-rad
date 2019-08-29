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
				<div>
					{this.state.objave.map(objava => (
						<div>
							{objava.naslov} <br />
							{objava.datum} - {objava.vrijeme}
						</div>
					))}
				</div>
			);
		}
	}

	DohvatiObjave() {
		axios.get(`/api/objave/dohvati?korisnik=${Cookies.get('id')}`).then(rezultat => {
			this.setState({
				objave: rezultat.data
			});
			this.SrediDatume();
		});
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
