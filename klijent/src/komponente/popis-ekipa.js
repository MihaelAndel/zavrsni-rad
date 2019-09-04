import React from 'react';
import Ekipa from './ekipa';

class PopisEkipa extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			odabranaEkipa: 0
		};

		this.OdaberiEkipu = this.OdaberiEkipu.bind(this);
	}

	render() {
		if (this.props.utakmica) {
			return (
				<div>
					<div className="grid grid-repeat-red grid-4stupca">
						{this.props.lista.map(ekipa =>
							ekipa.id.toString() === this.props.domacin ? null : (
								<Ekipa
									klasa={
										this.state.odabranaEkipa === ekipa.id.toString()
											? 'odabran'
											: ''
									}
									Odaberi={this.OdaberiEkipu}
									vrsta={this.props.vrsta}
									key={ekipa.id}
									id={ekipa.id}
									naziv={ekipa.naziv}
									lokacija={ekipa.lokacija}
									arena={ekipa.arena}
									utakmica="utakmica"
								/>
							)
						)}
					</div>
				</div>
			);
		} else {
			return (
				<div className="grid grid-repeat-red grid-4stupca">
					{this.props.lista.map(ekipa => (
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
	}

	OdaberiEkipu(e) {
		this.setState({ odabranaEkipa: e.target.id });
		this.props.ObradiUnos(e.target.id);
	}
}

export default PopisEkipa;
