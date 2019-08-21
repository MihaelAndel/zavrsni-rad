import React from 'react';
import Cookies from 'js-cookie';

class Pozdrav extends React.Component {
	render() {
		var korisnik = Cookies.get('korisnik');
		var poruka = korisnik
			? `Pozdrav, ${Cookies.get('korisnik')}!`
			: 'Pozdrav!';
		var odjava = korisnik ? (
			<button onClick={this.OdjaviKorisnika}>Odjava</button>
		) : (
			''
		);

		return (
			<div>
				<span>{poruka}</span>
				{odjava}
			</div>
		);
	}

	OdjaviKorisnika() {
		Cookies.remove('korisnik');
		Cookies.remove('id');
		Cookies.remove('tip');

		window.location.reload();
	}
}

export default Pozdrav;
