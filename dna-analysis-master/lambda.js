'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const { connectDB } = require('./src/mongoose');
let connection = null;
const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]

exports.handler = async (event, context) => {
	context.callbackWaitsForEmptyEventLoop = false;
	if (connection === null ){
		// Start the MongoDB connection before initializing app
		return await connectDB()
			.then((conn) => {
				connection = conn;
				// initialize app
				const app = require('./src/app');
				const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
				return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
			})
			.catch((error) => {
				console.error(error);
			})
	} else {  
		const app = require('./src/app');
		const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
		return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
	}	
};

/* 'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./src/app')
const binaryMimeTypes = [
  'application/octet-stream',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml'
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
exports.handler = async (event, context) => awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
 */