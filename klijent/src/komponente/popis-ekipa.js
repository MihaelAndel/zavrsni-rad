import React from 'react';
import Ekipa from './ekipa';
import { Link } from 'react-router-dom';

function PopisEkipa(props) {
	return (
		<ul>
			{props.lista.map(ekipa => (
				<Link to={`/ekipe/${ekipa.id}`} key={ekipa.id}>
					<Ekipa
						id={ekipa.id}
						naziv={ekipa.naziv}
						lokacija={ekipa.lokacija}
						arena={ekipa.arena}
						prati={ekipa.prati}
					/>
				</Link>
			))}
		</ul>
	);
}

export default PopisEkipa;
