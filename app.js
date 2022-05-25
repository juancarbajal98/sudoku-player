const http = require('http');
const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json())
app.use(express.static('public'))

app.set('views', __dirname + '/public/views/');
app.engine('html', require('ejs').renderFile); 

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/solution-checker', (req, res) => {
    res.render('solutionChecker.html')
})