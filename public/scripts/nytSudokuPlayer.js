class NYTSudokuPlayer extends Puzzle{
  constructor(){
    const puppeteer = require('puppeteer');
    super()
    this.init()
  }

  init(){
    this.draw()
    .then(unused => {
      this.addListeners()
    })
  }

  async draw(){ 
    debugger
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
  
    await page.goto('https://www.nytimes.com/puzzles/sudoku/easy')
    var element = await page.waitFor('#pz-game-root > div.su-app > div > div.su-app__play > div > div > div')
    var text = await page.evaluate(element => element.textContent, element)
    console.log(text)
    browser.close()
    this.body.innerHTML += this.content() }

  addListeners(){}

  content(){
    let h = ``
    h += Grid.html()
    h += Inputs.html()
    return h  
  }
}