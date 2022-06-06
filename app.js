// const http = require('http');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express()
const hostname = '127.0.0.1';
const port = 3000;

// configuration 
// app.use(express.json())
app.use(express.static('public'))

app.set('views', __dirname + '/public/views/');
// app.engine('html', require('ejs').renderFile); 

// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// methods
async function nytPuzzleScraper(){
  const puzzle_data = {}
  const url = 'https://www.nytimes.com/puzzles/sudoku';
  await axios(url).then((response) => {
    const $ = cheerio.load(response.data);
    var html_data = $('script', '#js-hook-game-wrapper').text()
    html_data = html_data.substring(html_data.indexOf('{'))
    for(const [key, value] of Object.entries(JSON.parse(html_data))){ puzzle_data[key] = value }
  });
  return puzzle_data
}


// endpoints
app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/solution-checker', (req, res) => {
  res.render('solutionChecker.html')
})

app.get('/nyt', async (req, res) => {
  try{
    const puzzle_data = await nytPuzzleScraper()
    // TODO: GET EJS TEMPLATING SET UP TO RENDER DYNAMIC PAGES
    res.render('nyt', {puzzle_data})
  } 
  catch (err) {
    return res.status(500).json({
      err: err.toString()
    })
  }
})