class Method{
  constructor(puzzle){
    /* 
    TODO: see if all the helper methods that get 
    called with this can be turned into static 
    methods so we can avoid passing this entirely
    */
    this.puzzle = puzzle
    this.vals = puzzle.vals
    this.blanks = puzzle.blanks
  }

  /* 
  handles candidate update - if more single candidates are found they are 
  deleted and recursive calls are handled 
  */
  updateBoard_newValue(index, new_vals=[index]){
    let checked_vals = []
    this.updateBoard_row(index, new_vals, checked_vals)
    this.updateBoard_col(index, new_vals, checked_vals)
    this.updateBoard_box(index, new_vals, checked_vals)
    new_vals.shift()
    console.log(`UPDATE COMPLETE - ROW, COL AND BOX FOR ${index} HAVE BEEN CHECKED AND UPDATED ACCORDINGLY`)

    console.log(`UPDATES REMAINING - THERE ARE ${new_vals.length} VALUES LEFT TO UPDATE`)
    if(new_vals.length !== 0){
      // recursive call
      this.puzzle.deleteBlank(new_vals[0])
      return this.updateBoard_newValue(new_vals[0], new_vals)
    }
  }

  updateBoard_row(index, new_vals, checked_vals){
    let offset = index%9
    let start = index - offset
    for(let i=start; i<start+9;i++){
      if(this.blanks[i] === undefined) continue
      checked_vals.push(i)
      // if the new value does not exist in the list of candidates for this index continue
      if(this.blanks[i].indexOf(this.vals[index]) === -1) continue
      // at this point the current index has a candidate array that needs to be updated
      let temp_print = [...this.blanks[i]]
      this.blanks[i].splice(this.blanks[i].indexOf(this.vals[index]), 1)        
      console.log(`UPDATE FOUND - INDEX ${i} GOES FROM ${temp_print} TO ${this.blanks[i]}`)
      
      // if its length is now one we store for recursive call as this is now new info
      if(this.blanks[i].length === 1) {
        console.log(`PAIR DEDUCTION - INDEX ${i} HAS BEEN REDUCED TO SINGLE CANDIDATE '${this.blanks[i][0]}'. IT IS NUMBER ${new_vals.length} IN LINE TO BE UDATED.`)
        new_vals.push(i)
      }
    }
  }

  updateBoard_col(index, new_vals, checked_vals){
    let offset = index%9
    let start = index - offset
    for(let i=0; i<9;i++){
      // this skips all written in values, including the new index 
      if(this.blanks[9*i + offset] === undefined) continue
      // if this index is a pair we visited we do not need to consider a third value as a possibility for this index representing a pair
      // if(visited_pairs.indexOf(String(9*i + offset)) !== -1) continue
      // at this point it is a value we are going to check
      checked_vals.push(9*i + offset)
      // if the new value does not exist in the list of candidates for this index continue
      if(this.blanks[9*i + offset].indexOf(this.vals[index]) === -1) continue

      // at this point the current index has a candidate array that needs to be updated
      let temp_print = [...this.blanks[9*i + offset]]
      this.blanks[9*i + offset].splice(this.blanks[9*i + offset].indexOf(this.vals[index]), 1)        
      console.log(`UPDATE FOUND - INDEX ${9*i + offset} GOES FROM ${temp_print} TO ${this.blanks[9*i + offset]}`)

      // if its length is now one we store for recursive call as this is now new info
      if(this.blanks[9*i + offset].length === 1) {
        console.log(`PAIR DEDUCTION - INDEX ${9*i + offset} HAS BEEN REDUCED TO SINGLE CANDIDATE '${this.blanks[9*i + offset][0]}'. IT IS NUMBER ${new_vals.length} IN LINE TO BE UDATED.`)
        new_vals.push(9*i + offset)
      }
    }
  }
  updateBoard_box(index, new_vals, checked_vals){
    let offset = index%9
    let boxNum = Puzzle.getBoxNum(Math.floor(index/9), offset)
    let start = Math.floor(boxNum/3)*2
    for(let i =start; i<start+3;i++){
      for(let j=0; j< 3;j++){
        // this skips all written in values, including the new index 
        if(this.blanks[(boxNum*3) + (i*9) + j] === undefined) continue
        
        // skip all row and col values in box we've already checked
        if(checked_vals.indexOf((boxNum*3) + (i*9) + j) !== -1) continue
        checked_vals.push((boxNum*3) + (i*9) + j)
        // if the new value does not exist in the list of candidates for this index continue
        if(this.blanks[(boxNum*3) + (i*9) + j].indexOf(this.vals[index]) === -1) continue

        // at this point the current index has a candidate array that needs to be updated
        let temp_print = [...this.blanks[(boxNum*3) + (i*9) + j]]
        this.blanks[(boxNum*3) + (i*9) + j].splice(this.blanks[(boxNum*3) + (i*9) + j].indexOf(this.vals[index]), 1)        
        console.log(`UPDATE FOUND - INDEX ${(boxNum*3) + (i*9) + j} GOES FROM ${temp_print} TO ${this.blanks[(boxNum*3) + (i*9) + j]}`)            

        // if its length is now one we store for recursive call as this is now new info
        if(this.blanks[(boxNum*3) + (i*9) + j].length === 1) {
          console.log(`PAIR DEDUCTION - INDEX ${(boxNum*3) + (i*9) + j} HAS BEEN REDUCED TO SINGLE CANDIDATE '${this.blanks[(boxNum*3) + (i*9) + j][0]}'. IT IS NUMBER ${new_vals.length} IN LINE TO BE UDATED.`)
          new_vals.push((boxNum*3) + (i*9) + j)
        }
      }
    }
  }
}