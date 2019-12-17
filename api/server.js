const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
	//session storage options
	name             : 'choclatechip', //default would be sid
	secret           : 'keep it secret, keep it safe', //used for encryption (must be an environment variable)
	saveUnintialized : true, //has implications with GDPR laws
	resave           : false,

	//cookie options
	cookie           : {
		maxAge   : 1000 * 60 * 10, //10 mins in milliseconds
		secure   : false, //if false the cooke is sent over http, if true only sent over https
		httpOnly : true, //if true JS cannot access the cookie
	},
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfiguration)); //with add a req.session object

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.json({ api: 'up' });
});

module.exports = server;
