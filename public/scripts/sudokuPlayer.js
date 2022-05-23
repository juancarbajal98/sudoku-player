class SudokuPlayer extends Solver{
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
    document.getElementById('bruteForce1Button').addEventListener("click", () => {this.solver_bruteForce()})
    document.getElementById('eliminatePairs1Button').addEventListener("click", () => {this.solver_eliminatePairs()})
    document.getElementById('pasteButton').addEventListener("click", () => {this.pasteToGrid()})
  }

  // consider moving this to the puzzle paste class and importing
  /* 
  for now this is being treated as an initializer - the solvers
  are going on the assumption that blanks and vals were set 
  from this button switch 
  */
  pasteToGrid(){
    console.log(`PASTE TO GRID CALLED`)
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