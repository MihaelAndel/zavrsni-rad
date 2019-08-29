import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class Naslovna extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			objave: []
		};

		this.DohvatiObjave();
	}

	render() {
		return (
			<div>
				{this.state.objave.map(objava => (
					<div>{objava.naslov}</div>
				))}
			</div>
		);
	}

	DohvatiObjave() {
		axios.get(`/api/objave/dohvati?korisnik=${Cookies.get('id')}`).then(rezultat => {
			this.setState({
				objave: rezultat.data
			});
		});
	}
}

export default Naslovna;
