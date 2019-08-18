function Generiraj() {
	var lozinka = '';
	var znakovi =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 10; i++) {
		lozinka += znakovi[Math.floor(Math.random() * 62)];
	}
	return lozinka;
}

module.exports = { Generiraj };
