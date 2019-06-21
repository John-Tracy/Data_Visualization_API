const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const Ajv = require('ajv');

const schemas = require('./lib/validationSchemas.js');

const services = require('./services/index');

try {
	const env = require('dotenv').config();
} catch (e) {
	console.log('production evn :: ', e);
}

app.use(bodyParser.json())

app.post('/create/visual/:visual', (req, res) => {
	console.log(req.body, req.params);
	const visualType = req.params.visual;

	if(!schemas[visualType]){
		return res.status(404).json({Status: 'Not Found', Message: 'The resource you are looking for does not exist'});
	}

	let ajv = new Ajv();
	let validate = ajv.compile(schemas[visualType]);
	let valid = validate(req.body);

	if (!valid) {
		return res.status(400).json({Status: 'Bad Request', Message: 'Invalid Request Body'})
	}

	if(typeof services[visualType] !== 'function'){
		return res.status(400).json({Status: 'Bad Request', Message: 'Invalid Request Body'});
	}

	// Creat a Data visualization
	let visualInstance = new services[visualType](req.body);
	let visualPromise = new Promise(visualInstance.init);
	visualPromise.then((success) => {
		console.log('success', success)
		return res.json(success);
	}, (error) => {
		console.log('handled error')
		return res.json(error)
	})

});


app.use((req, res) => {
	res.status(404).json({'Status': 'Not Found', 'Message': 'The resource you are requesting does not exist'})
})

if(process.env.LOCAL) {
	app.listen(3000)
}

module.exports = app