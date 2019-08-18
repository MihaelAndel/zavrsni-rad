const baza = require('./baza');

function ProvjeriEmail(email, callback){
    baza.Spoji(() => {
        baza.Upit(`SELECT * FROM Korisnik WHERE email = ${email}`, (rezultat, error) => {
            var postoji = rezultat ? '0' : '1';
            callback(postoji);
        })
    })
}

function ProvjeriKorisnika(korisnik){

}

function RegistrirajKorisnika(email, korisnik){
    
}

module.exports = {ProvjeriEmail};
