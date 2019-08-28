import React from 'react';
import Osoba from './osoba';

function PopisOsoba(props) {
	return (
		<ul>
			{props.lista.map(osoba => (
				<Osoba
					id={osoba.id}
					key={osoba.id}
					ime={osoba.ime}
					prezime={osoba.prezime}
					ekipa={osoba.ekipa}
					broj={osoba.broj}
					pozicija={osoba.pozicija}
					prati={osoba.prati}></Osoba>
			))}
		</ul>
	);
}

export default PopisOsoba;
