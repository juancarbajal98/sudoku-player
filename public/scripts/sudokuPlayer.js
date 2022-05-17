class SudokuPlayer{
  constructor(){
    this.draw()
  }

  async draw(){
    let content = ''
    content += Grid.html()
    content += Inputs.html()
    content += PuzzlePaste.html()
    content += Controls.html()
    // TODO: understand why not able to wrap this in get method
    document.getElementsByTagName('body')[0].innerHTML += content
  }
}