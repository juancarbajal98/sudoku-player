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
    document.getElementById('bruteForceResultButton').addEventListener("click", () => {this.solver("BF")})
    document.getElementById('eliminatePairsResultButton').addEventListener("click", () => {this.solver("EP")})
    document.getElementById('uniqueCandidateResultButton').addEventListener("click", () => {this.solver("UC")})
    document.getElementById('pasteButton').addEventListener("click", () => {this.pasteToGrid()})
    document.getElementById('copyButton').addEventListener("click", () => {this.copyGrid()})
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
    this.processInput()
    this.printValsToBoard()
  }

  copyGrid(){
    console.log(`COPY GRID CALLED`)
    let puzzle_string = `[`
    for(let v of this.vals){
      puzzle_string += `'${v}',`
    }
    puzzle_string = puzzle_string.substring(0, puzzle_string.length -1)
    puzzle_string += `]`
    navigator.clipboard.writeText(puzzle_string)
  }

  content(){
    let h = ``
    h += Grid.html()
    h += Inputs.html()
    h += PuzzlePaste.html()
    h += Controls.html()
    return h
  }

}