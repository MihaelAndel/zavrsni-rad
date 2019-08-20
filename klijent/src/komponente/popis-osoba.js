import React from 'react';
import Osoba from './osoba';

class PopisOsoba extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            lista: props.lista
        }
    }

    render(){
        return(
            <ul>
                {this.state.lista.map(osoba => (
                    <Osoba ime={osoba.ime} prezime={osoba.prezime} />
                ))}
            </ul>
        );
    }
}

export default PopisOsoba;