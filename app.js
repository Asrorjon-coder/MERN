const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port');


async function start() {
				try {
								await mongoose.connect(config.get('mongoUrl'), {
												useNewUrlParser: true,
												useUnifiedTopology: true,
												useCreateIndex: true
								})
								app.listen(PORT, () => console.log(`App has been started on port: ${PORT}`))
				} catch (e) {
								console.log('Server Error', e.message);
								process.exit(1);
				}
}

start();