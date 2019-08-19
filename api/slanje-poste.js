const mail = require('nodemailer');

const transporter = mail.createTransport({
	service: 'gmail',
	auth: {
		user: 'zavrsni.rad.mandel@gmail.com',
		pass: 'zavrsni-rad-mandel'
	}
});

function PosaljiEmail(email, naslov, poruka) {
	var opcije = {
		from: 'zavrsni@gmail.com',
		to: email,
		subject: naslov,
		text: poruka
	};

	transporter.sendMail(opcije, (error, success) => {
		if (error) console.log(error);
	});
}

module.exports = { PosaljiEmail };
