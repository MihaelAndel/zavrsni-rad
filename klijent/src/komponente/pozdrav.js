import React from 'react';
import Cookies from 'js-cookie';

function Pozdrav(props) {
	var korisnik = Cookies.get('korisnik');
	var poruka = korisnik ? `Pozdrav, ${korisnik}!` : 'Pozdrav!';
	var odjava = korisnik ? <button onClick={props.odjava}>Odjava</button> : '';

	return (
		<div>
			<span>{poruka}</span>
			{odjava}
		</div>
	);
}

export default Pozdrav;
