import React from 'react';

class Osoba extends React.Component {

    constructor(props){
        super(props);
        this.setState = {
            ime: props.ime,
            prezime: props.prezime
        }
    }

    render(){
        return <div>{this.props.ime} {this.props.prezime}</div>;
    }
}

export default Osoba;