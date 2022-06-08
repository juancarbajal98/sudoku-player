class SolutionChecker extends Puzzle{
  constructor(){
    super()
    this.init()
  }

  init(){
    this.draw()
    .then(unused =>{
      this.addListeners()
    })
  }

  async draw(){
    this.body.innerHTML += this.content()
  }

  addListeners(){
    document.getElementById('pasteButton').addEventListener("click", () => {this.checkPuzzle()})
    // add checker button event listener
  }

  checkPuzzle(){
    // process values
    console.log(`CHECK PUZZLE CALLED`)
    if(this.vals.indexOf(0) === -1) new Puzzle()
    this.assignPuzzleValues()
    this.printValsToBoard()
    // check for validity 
    

    // add to DOM the result
  }

  content(){
    let h = ``
    h += PuzzlePaste.html()
    h += Grid.html()
    h += Inputs.html()
    return h
  }
}

let check = new SolutionChecker()