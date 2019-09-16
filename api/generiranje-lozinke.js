function Generiraj() {
	var lozinka = '';
	var znakovi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?*-_$%&/';
	for (let i = 0; i < 10; i++) {
		lozinka += znakovi[Math.floor(Math.random() * 71)];
	}
	return lozinka;
}

module.exports = { Generiraj };
