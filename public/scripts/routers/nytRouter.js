const nyt = require('express').Router()
const axios = require('axios');
const cheerio = require('cheerio');

/* 
methods 
*/
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


/* 
endpoints
TODO: add easy, med, hard endpoints / stop defaulting on easy
good resource: https://gist.github.com/zcaceres/f38b208a492e4dcd45f487638eff716c
*/
nyt.get('/', async (req, res) => {
  try{
    const puzzle_data = await nytPuzzleScraper()
    res.render('nyt', {puzzle_data})
  } 
  catch (err) {
    return res.status(500).json({
      err: err.toString()
    })
  }
})

module.exports = nyt