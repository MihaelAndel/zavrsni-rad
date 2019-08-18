import React from 'react';
import axios from 'axios';
import Registracija from './registracija';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nekaj: null
		};
	}

	componentDidMount() {
		DohvatiNekaj(response => {
			this.setState({
				nekaj: response.data
			});
		});
	}

	render() {
		var vrste = this.state.nekaj;
		return (
			<div className="App">
				<Registracija />
				<Popis lista={vrste} />
			</div>
		);
	}
}

class Popis extends React.Component {
	render() {
		var lista = this.props.lista;
		if (lista) {
			return (
				<ol>
					{lista.map(element => (
						<li key={element.id}> {element.naziv} </li>
					))}
				</ol>
			);
		} else {
			return <h2>Nema nicega.</h2>;
		}
	}
}

function DohvatiNekaj(callback) {
	axios.get('http://localhost:5000/api/nekaj').then(response => {
		callback(response);
	});
}

export default App;
