class Controls{
  constructor(){}
  
  static html(){
    return ` <!-- Controls --> 
    <div class ="methodControls" id="bruteForceControls">
      <button id="bruteForceResultButton">Return <i>Brute Force</i> Result</button>
      <button>Step Through <i>Brute Force</i></button>
    </div>
    
    <div class ="methodControls" id="eliminatePairsControls">
      <button id="eliminatePairsResultButton">Return <i>Eliminate Pairs</i> Result</button>
      <button>Step Through <i>Eliminate Pairs</i></button>
    </div>

    <div class ="methodControls" id="uniqueCandidateControls">
      <button id="uniqueCandidateResultButton">Return <i>Unique Candidates</i> Result</button>
      <button>Step Through <i>Unique Candidates</i></button>
    </div>
    `
  }
}