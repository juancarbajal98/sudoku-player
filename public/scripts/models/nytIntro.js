class NYTIntro {
  static html(puzzle_data, difficulty){
    // TODO add calendar date somewhere
    return `
    <h1>Sudoku Player</h1>
    <h3>Play ${puzzle_data[`${difficulty}`].day_of_week}'s ${puzzle_data[`${difficulty}`].difficulty} NYT sudoku puzzle:</h3>`
  }
}