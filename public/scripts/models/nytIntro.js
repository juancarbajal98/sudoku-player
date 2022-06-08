class NYTIntro {
  static html(puzzle_data){
    // TODO add calendar date somewhere
    return `
    <h1>Sudoku Player</h1>
    <h3>Play ${puzzle_data.easy.day_of_week}'s ${puzzle_data.easy.difficulty} NYT sudoku puzzle:</h3>`
  }
}