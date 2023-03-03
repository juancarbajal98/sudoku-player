class NYTSudokuPlayer extends Puzzle{
  constructor(){
    super()
    this.init()
  }

  /* 
  We require puzzle data first to draw the dynamic nytIntro, defaulting to easy for now
  */
  init(){
    this.getPuzzleData()
    .then(unused => { 
      this.setPuzzleData('easy')
      this.drawTemplate('easy')
      this.printValsToBoard()
      this.addListeners()
    })
  }

  async getPuzzleData(){
    // scrape data from p tag and delete it
    this.puzzle_data = JSON.parse(document.getElementById('puzzle_data').innerHTML)
    document.getElementById('puzzle_data').remove()
  }

  drawTemplate(difficulty){ 
    // write template content to DOM
    this.body.innerHTML = this.content(difficulty) 
  }

  setPuzzleData(difficulty){
    // assign fetched values
    let puzzle = JSON.stringify(this.puzzle_data[`${difficulty}`].puzzle_data.puzzle)
    puzzle = puzzle.substring(1, puzzle.length-1).split(',')
    console.log(puzzle)
    this.assignPuzzleValues(puzzle)
  }

  addListeners(){ for(let diff of ['easy','medium', 'hard']) this.clickListener(`nytControls-${diff}`, () => {this.redraw(diff)}) }

  redraw(difficulty){
    this.setPuzzleData(difficulty)
    this.drawTemplate(difficulty)
    this.printValsToBoard()
    this.addListeners()
  }

  content(difficulty){
    let h = ``
    h += NYTIntro.html(this.puzzle_data, difficulty) // render dynamic intro
    h += Grid.html()
    h += Inputs.html()
    h += NYTControls.html()
    return h  
  }
}