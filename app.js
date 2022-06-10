// const http = require('http');
const express = require('express');
const nytRouter = require('./public/scripts/routers/nytRouter')
const app = express()
const hostname = '127.0.0.1';
const port = 3000;

/* 
configuration  
*/
// app.use(express.json())
app.use(express.static('public'))
app.set('views', __dirname + '/public/views/');
// app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'ejs');
app.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });


/* 
endpoints 
*/
app.get('/', (req, res) => { res.render('index') })
app.get('/solution-checker', (req, res) => { res.render('solutionChecker') })

/* 
custom routers 
*/
app.use('/nyt', nytRouter) 