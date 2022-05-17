class Controls{
  constructor(){}
  
  static html(){
    return ` <!-- Controls --> 
    <div id="bruteForceControls">
      <button onclick="solver_bruteForce()">Return <i>Brute Force</i> Result</button>
      <button>Step Through <i>Brute Force</i></button>
    </div>
    
    <div id="eliminatePairsControls">
      <button onclick="solver_eliminatePairs()">Return <i>Eliminate Pairs</i> Result</button>
      <button>Step Through <i>Eliminate Pairs</i></button>
    </div>
    `
  }
}