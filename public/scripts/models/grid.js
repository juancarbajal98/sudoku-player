class Grid {
  constructor(){}

  static html(){
    let temp = new Grid
    let grid = `<!-- Board -->
    <div id="container">
      <div id="grid">`
    // draw 8 horizontal and vertical lines
    for(let i =1;i<9;i++){
      grid += temp.horizontal_line(i)
      grid += temp.vertical_line(i)
    }
    grid += `</div>`
    return grid
  }

  horizontal_line(i){
    return `<div class="line h" id="h${String(i)}" style="margin-top: ${String(i*3)}em;"></div>`
  }
  vertical_line(i){
    return `<div class="line v" id="v${String(i)}" style="margin-left: ${String(i*3)}em;"></div>`
  }
}