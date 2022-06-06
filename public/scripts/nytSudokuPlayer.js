class NYTSudokuPlayer extends Puzzle{
  constructor(){
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
    // scrape data from p tag and delete it
    let puzzle_data = JSON.parse(document.getElementById('puzzle_data').innerHTML)
    document.getElementById('puzzle_data').remove()

    // draw content 
    this.body.innerHTML += this.content() 
  }

  addListeners(){}

  content(){
    let h = ``
    h += Grid.html()
    h += Inputs.html()
    return h  
  }
}