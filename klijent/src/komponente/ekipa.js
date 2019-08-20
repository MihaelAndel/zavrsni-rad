import React from 'react';

class Ekipa extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            naziv: props.naziv,
            lokacija: props.lokacija,
            arena: props.arena,
            prati: props.prati
        }
    }

    render(){
        return(<div></div>)
    }
}