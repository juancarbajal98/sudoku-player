class PuzzlePaste{
  constructor(){}
  static html(){
    return `<!-- Puzzle Paste -->
    <div class="paste">
      <input type="text" id="pasteText">
      <button id="pasteButton" onclick="pasteToGrid()">Apply</button>
    </div>`
  }
}