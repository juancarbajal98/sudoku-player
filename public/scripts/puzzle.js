class Puzzle{
  constructor(){
    this.vals = new Array(81).fill(0)
    this.blanks = {}
  }

  solver(method){
    this.solved = false
    console.log(`${method} STARTING - THERE ARE ${Object.keys(this.blanks).length} BLANKS TO BEGIN WITH`)
    while(!this.solved){
      switch(method){
        case 'BF':
          const bf_solver = new BruteForce(this)
          this.solved = bf_solver.update()
          break
        case 'EP':
            const ep_solver = new EliminatePairs(this)
            this.solved = ep_solver.update()
            break
        case 'UC':
            const uc_solver = new UniqueCandidate(this)
            this.solved = uc_solver.update()
            break
      }
    }
    // if(Object.keys(this.blanks).length !==0) this.solved = false
    this.printValsToBoard()
  }

  /*  
  helper functions 
  */

  // deletes a blank whose candidate has been reduced, updates val array
  deleteBlank(index){
      console.log(`INDEX ${index} HAS BEEN REDUCED TO SINGLE CANDIDATE '${this.blanks[index][0]}'`)
      this.vals[index] = this.blanks[index][0]
      delete this.blanks[index]
  }

  // returns box number given row and column (1-9 from top left-bottom right)
  static getBoxNum(row, col){
    switch(true){
      case ((row >= 0 && row <=2) && (col >= 0 && col <=2)):
          return 0
      case ((row >= 0 && row <=2) && (col >= 3 && col <=5)):
          return 1
      case ((row >= 0 && row <=2) && (col >= 6 && col <=8)):
          return 2
      case ((row >= 3 && row <=5) && (col >= 0 && col <=2)):
          return 3
      case ((row >= 3 && row <=5) && (col >= 3 && col <=5)):
          return 4
      case ((row >= 3 && row <=5) && (col >= 6 && col <=8)):
          return 5
      case ((row >= 6 && row <=8) && (col >= 0 && col <=2)):
          return 6
      case ((row >= 6 && row <=8) && (col >= 3 && col <=5)):
          return 7
      case ((row >= 6 && row <=8) && (col >= 6 && col <=8)):
          return 8
    }
  }

  // stores the index of a pair that has not been previously scanned
  newFoundPair(index, visited_pairs){
      if(visited_pairs.indexOf(index) !== -1) return false
      if(this.blanks[index].length !==2 ) return false
      visited_pairs.push(index)
      console.log(`NEWFOUND PAIR - VISITING INDEX ${index}`)
      return true
  }

  // gets values from input tag, assigns vals and blanks
  processInput(){
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
  }

  // update view with most up to date vals in this.vals
  printValsToBoard(){ for(let i=0; i<this.vals.length; i++) document.getElementById(`num${i+1}`).value = this.vals[i] }

  // return body tag
  get body(){ return document.getElementsByTagName('body')[0] }
}

breezyPuzzle = 
['8','','','','','4','7','1','','3','6','','5','1','7','2','','8','2','7','','8','9','','5','','3','7','','','','6','8','9','','4','5','4','6','','7','','8','3','1','9','','','','5','1','6','','2','1','2','','7','4','','3','','5','4','5','','6','8','3','1','','7','6','','','','','5','4','8','']

easyPuzzle = 
['','6','8','','4','','','','','5','','','9','','3','','','','7','','','1','','','','','','','5','7','','2','','','8','','2','','','4','','6','','','7','','1','','','7','','6','2','','','','','','','7','','','2','','','','6','','5','','','1','','','','','3','','9','5','']

mediumPuzzle = 
['2','','','','','','3','','7','','','','2','1','','','','','3','','9','7','8','','4','','','','','','4','','2','8','7','','','3','4','','','','9','2','','','2','8','6','','9','','','','','','1','','9','7','2','','3','','','','','6','8','','','','8','','3','','','','','','5']

hardPuzzle = 
['9','7','','4','','','','2','','3','','','','','1','','','8','','','5','','','8','','','','','','','','','','7','3','','','4','','','','','','','','2','','7','1','','','','','5','4','','','8','','','6','','','','6','','','9','','','','2','','','3','2','','','','5','1']