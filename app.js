const http = require('http');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express()
const hostname = '127.0.0.1';
const port = 3000;

// configuration 
app.use(express.json())
app.use(express.static('public'))

app.set('views', __dirname + '/public/views/');
app.engine('html', require('ejs').renderFile); 

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// methods
async function puzzleScraper(){
  const url = 'https://www.nytimes.com/puzzles/sudoku/easy';
  await axios(url).then((response) => {
    const html_data = response.data;
    console.log('DATA: ', html_data )
    const $ = cheerio.load(html_data);
  });
  const selectedElem = '#pz-game-root > div.su-app > div > div.su-app__play > div > div > div';

  $(selectedElem).each((parentIndex, parentElem) => {
    console.log()
  })
  return true
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
    const puzzle = await puzzleScraper()
    res.render('nyt.html')
    return res.status(200).json({
      result:puzzle
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString()
    })
  }
})