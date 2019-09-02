import React from 'react';

class Poruka extends React.Component {
	render() {
		var poruka = this.props.poruka ? this.props.poruka : '';
		if (poruka === '') return <div />;
		else {
			return (
				<div className="obavijest obrub-donji">
					<p>{poruka}</p>
				</div>
			);
		}
	}
}

export default Poruka;
