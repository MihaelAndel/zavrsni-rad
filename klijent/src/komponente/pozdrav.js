import React from 'react';
import Cookies from 'js-cookie';

function Pozdrav(props) {
	var korisnik = Cookies.get('korisnik');
	var odjava = korisnik ? (
		<div className="gumb-navigacija" onClick={props.odjava}>
			Odjava
		</div>
	) : (
		''
	);

	return odjava;
}

export default Pozdrav;
