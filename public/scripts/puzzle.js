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

  // adds event to button with id, using given function 
  clickListener(id, callback){ document.getElementById(id).addEventListener("click", () => {callback()}) }

  // stores the index of a pair that has not been previously scanned
  newFoundPair(index, visited_pairs){
      if(visited_pairs.indexOf(index) !== -1) return false
      if(this.blanks[index].length !==2 ) return false
      visited_pairs.push(index)
      console.log(`NEWFOUND PAIR - VISITING INDEX ${index}`)
      return true
  }

  // gets values from input tag, assigns vals and blanks
  assignPuzzleValues(vals){
     for(let i = 0; i <81;i++){
       if(vals[i]==="0"){
         this.vals[i] = ''
         this.blanks[i] = [1,2,3,4,5,6,7,8,9]
         continue
       }
       this.vals[i] = parseInt(vals[i])
     }
  }

  // update view with most up to date vals in this.vals
  printValsToBoard(){ for(let i=0; i<this.vals.length; i++) document.getElementById(`num${i+1}`).value = this.vals[i] }

  // update view with most up to date candidates in this.blanks
  printCandidatesToBoard(){
    for(const [index, candidates] of Object.entries(this.blanks)){
      let box_tag = document.querySelector(`#box${parseInt(index)+1}`)
      box_tag.classList.add("candidate")
      let candidate_box = ``
      candidate_box += `<div class="container">`
      candidate_box += JSON.stringify(candidates)
      candidate_box += `</div>`
      box_tag.innerHTML = candidate_box
    }
  }

  // return body tag
  get body(){ return document.getElementsByTagName('body')[0] }
}

breezyPuzzle = 
[8,0,0,0,0,4,7,1,0,3,6,0,5,1,7,2,0,8,2,7,0,8,9,0,5,0,3,7,0,0,0,6,8,9,0,4,5,4,6,0,7,0,8,3,1,9,0,0,0,5,1,6,0,2,1,2,0,7,4,0,3,0,5,4,5,0,6,8,3,1,0,7,6,0,0,0,0,5,4,8,0]

easyPuzzle = 
[0,6,8,0,4,0,0,0,0,5,0,0,9,0,3,0,0,0,7,0,0,1,0,0,0,0,0,0,5,7,0,2,0,0,8,0,2,0,0,4,0,6,0,0,7,0,1,0,0,7,0,6,2,0,0,0,0,0,0,7,0,0,2,0,0,0,6,0,5,0,0,1,0,0,0,0,3,0,9,5,0]

mediumPuzzle = 
[2,0,0,0,0,0,3,0,7,0,0,0,2,1,0,0,0,0,3,0,9,7,8,0,4,0,0,0,0,0,4,0,2,8,7,0,0,3,4,0,0,0,9,2,0,0,2,8,6,0,9,0,0,0,0,0,1,0,9,7,2,0,3,0,0,0,0,6,8,0,0,0,8,0,3,0,0,0,0,0,5]

hardPuzzle = 
[9,7,0,4,0,0,0,2,0,3,0,0,0,0,1,0,0,8,0,0,5,0,0,8,0,0,0,0,0,0,0,0,0,7,3,0,0,4,0,0,0,0,0,0,0,2,0,7,1,0,0,0,0,5,4,0,0,8,0,0,6,0,0,0,6,0,0,9,0,0,0,2,0,0,3,2,0,0,0,5,1]