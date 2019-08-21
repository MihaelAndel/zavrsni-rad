import React from 'react';

class Ekipa extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prati: props.prati
		};
	}

	render() {
		return (
			<div className="blok ekipa" id={this.props.id}>
				<span>
					<label>Naziv:</label> {this.props.naziv}
				</span>
				<br />
				<span>
					<label>Lokacija:</label> {this.props.lokacija}
				</span>
				<br />
				<span>
					<label>Arena: </label>
					{this.props.arena}
				</span>
				<br />
				<span>
					<label>Prati: </label>
					{this.state.prati}
				</span>
			</div>
		);
	}
}

export default Ekipa;
