const express = require('express');
const morgan = require('morgan');
const ExpressError = require('./express-error');
const axios = require('axios');
const app = express();

app.use(morgan('dev'));

app.post('/', function (req, res, next) {
	try {
		let results = req.body.developers.map(async d => {
			return await axios.get(`https://api.github.com/users/${d}`);
		});
		console.log(results)
		let out = results.map(r => ({
			name: r.data.name,
			bio: r.data.bio
		}));

		return res.send(JSON.stringify(out));
	} catch (err) {
		next(err);
	}
});

/**
|--------------------------------------------------
| i give up.  i don't for the life of me know what is wrong with this code and i'm done.  how can i know what to fix if i don't even really know what i'm doing yet?  
|--------------------------------------------------
*/

app.use((req, res, next) => {
	const e = new ExpressError('page not found', 404);
	next(e);
});

app.use((e, req, res, next) => {
	let status = e.status || 500;
	let msg = e.msg;
	res.status(status).json({
		error: {
			msg,
			status
		}
	});
});

module.exports = app;