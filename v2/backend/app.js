const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio')
const app = express();
app.get('/', (req, res) => {
    res.send('Sudoku Player Express Server 🧩')
})

app.get('/nyt', (req, res) => {
  let nytURL = 'https://www.nytimes.com/puzzles/sudoku'
  axios(nytURL)
    .then((response) => {
    // read response
    const $ = cheerio.load(response.data)
    let puzzleData = {}
    let htmlData = $('script', '#js-hook-game-wrapper').text()

    // parse response
    htmlData = htmlData.substring(htmlData.indexOf('{'))
    for(const [key, value] of Object.entries(JSON.parse(htmlData))){ puzzleData[key] = value }

    // send response to frontend, setting header to handle cors
    res.set('Access-Control-Allow-Origin', '*');
    res.send(puzzleData);
  })
  .catch(err => next(err))
})

app.listen(3001, () => {
    console.log('listening on port 3001')
})