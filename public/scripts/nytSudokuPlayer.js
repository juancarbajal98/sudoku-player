class NYTSudokuPlayer extends Puzzle{
  constructor(){
    super()
    this.init()
  }

  /* 
  We require puzzle data first to draw the dynamic nytIntro
  */
  init(){
    this.getPuzzleData()
    .then(unused => { this.draw()})
    .then(unused => { this.setPuzzleData()})
    .then(unused => { this.addListeners()})
  }

  async getPuzzleData(){
    // scrape data from p tag and delete it
    this.puzzle_data = JSON.parse(document.getElementById('puzzle_data').innerHTML)
    document.getElementById('puzzle_data').remove()
  }

  draw(){ 
    // write content to DOM
    this.body.innerHTML += this.content() 
  }

  setPuzzleData(difficulty=null){
    debugger
    // assign fetched values and print to board
    let temp = difficulty ? this.puzzle_data[`${difficulty}`].puzzle_data.puzzle : this.puzzle_data.easy.puzzle_data.puzzle
    let input = JSON.stringify(temp)
    input = input.substring(1, input.length-1).split(',')
    this.assignPuzzleValues(input)
    this.printValsToBoard()
  }

  addListeners(){
    // TODO: figure out how to update dynamic intro on click
    document.getElementById('nytControls-easy').addEventListener("click", () => {this.setPuzzleData('easy')}) 
    document.getElementById('nytControls-medium').addEventListener("click", () => {this.setPuzzleData('medium')}) 
    document.getElementById('nytControls-hard').addEventListener("click", () => {this.setPuzzleData('hard')}) 
  }

  content(){
    let h = ``
    h += NYTIntro.html(this.puzzle_data) // render dynamic intro
    h += Grid.html()
    h += Inputs.html()
    h += NYTControls.html()
    return h  
  }
}