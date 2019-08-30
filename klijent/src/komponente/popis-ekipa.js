import React from 'react';
import Ekipa from './ekipa';

function PopisEkipa(props) {
	return (
		<div className="grid grid-repeat-red grid-4stupca">
			{props.lista.map(ekipa => (
				<Ekipa
					key={ekipa.id}
					id={ekipa.id}
					naziv={ekipa.naziv}
					lokacija={ekipa.lokacija}
					arena={ekipa.arena}
					prati={ekipa.prati}
				/>
			))}
		</div>
	);
}

export default PopisEkipa;
