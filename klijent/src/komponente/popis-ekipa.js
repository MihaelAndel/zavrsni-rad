import React from 'react';
import Ekipa from './ekipa';

function PopisEkipa(props) {
	return (
		<ul>
			{props.lista.map(ekipa => (
				<Ekipa
					key={ekipa.id}
					naziv={ekipa.naziv}
					lokacija={ekipa.lokacija}
					arena={ekipa.arena}
					prati={ekipa.prati === true ? 'Da' : 'Ne'}
				/>
			))}
		</ul>
	);
}

export default PopisEkipa;
