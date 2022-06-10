class SudokuPlayer extends Puzzle{
  constructor(){
    super()
    this.init()
  }

  init(){
    this.draw()
    .then(unused => { this.addListeners() })
  }

  async draw(){ this.body.innerHTML += this.content() }

  addListeners(){
    this.clickListener('bruteForceResultButton', () => {this.solver("BF")})
    this.clickListener('eliminatePairsResultButton', () => {this.solver("EP")})
    this.clickListener('uniqueCandidateResultButton', () => {this.solver("UC")})
    this.clickListener('pasteButton', () => {this.pasteToGrid()})
    this.clickListener('copyButton', () => {this.copyGrid()})
  }

  /* 
  Takes in 1d array that represents puzzle and draws it onto the grid.
  
  Note: the input array follows a very specific format in order for this to work:
  no spaces must exist, blanks must be represented by zeroes, and there 
  should not be any newlines
  */
  pasteToGrid(){
    console.log(`PASTE TO GRID CALLED`)
    if(this.vals.indexOf(0) === -1) new Puzzle()
    let input = document.getElementById('pasteText').value
    input = input.substring(1,input.length-1).split(',')
    this.assignPuzzleValues(input)
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