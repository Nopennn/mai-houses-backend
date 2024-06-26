const express = require('express'),
morgan = require('morgan')
cors = require('cors')

const app = express(),
	port = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', require('./routes'))
app.use('/houses', require('./routes/ad'))
app.use('/user', require('./routes/user'))

app.listen(port, () => {
	console.log('server started on http://localhost:' + port)
})