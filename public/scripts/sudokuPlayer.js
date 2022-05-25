class SudokuPlayer extends Puzzle{
  constructor(){
    super()
    this.init()
  }

  init(){
    // await for drawing to be done to add listeners
    this.draw()
    .then(unused => {
      this.addListeners()
    })
  }

  async draw(){
    this.body.innerHTML += this.content()
  }

  addListeners(){
    document.getElementById('bruteForce1Button').addEventListener("click", () => {this.solver("BF")})
    document.getElementById('eliminatePairs1Button').addEventListener("click", () => {this.solver("EP")})
    document.getElementById('pasteButton').addEventListener("click", () => {this.pasteToGrid()})
  }

/* 
Takes in 1d array that represents puzzle and draws it onto the grid.

Note: the input array follows a very specific format in order for this to work:
no spaces must exist, blanks must be represented by two single quotes, and there 
should not be any newlines
*/  /* 
  for now this is being treated as an initializer - the solvers
  are going on the assumption that blanks and vals were set 
  from this button switch 
  */
  pasteToGrid(){
    console.log(`PASTE TO GRID CALLED`)
    if(this.vals.indexOf(0) === -1) new Puzzle()
    // input from line gathered
    let input = document.getElementById('pasteText').value
    input = input.substring(1,input.length-1).split(',')
    for(let i = 0; i <81;i++){
      if(input[i]==="''"){
        this.vals[i] = ''
        this.blanks[i] = [1,2,3,4,5,6,7,8,9]
        continue
      }
      this.vals[i] = parseInt(input[i].substring(1,2))
    }
    this.printValsToBoard()
  }

  content(){
    let h = ``
    h += Grid.html()
    h += Inputs.html()
    h += PuzzlePaste.html()
    h += Controls.html()
    return h
  }

  get body(){
    return document.getElementsByTagName('body')[0]
  }
}