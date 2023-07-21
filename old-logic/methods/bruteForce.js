class BruteForce extends Method{
  constructor(puzzle){
    super(puzzle)
  }

  update(){
    let init_num_of_blanks = Object.keys(this.blanks).length
    // for every given blank index and dimension, we check its row, col or box to remove any found candidates
    for(const [index, candidates] of Object.entries(this.blanks)){
      this.scan_row(index)
      this.scan_col(index)
      this.scan_box(index)
      // after brute force scans, check for deduce candidates
      if(this.blanks[index].length === 1){
        this.puzzle.deleteBlank(index)
        this.puzzle.printValsToBoard()
        if(Object.keys(this.blanks).length === 0) return true
        break
      }
    }

    if(init_num_of_blanks === Object.keys(this.blanks).length){
      console.log('PUZZLE NOT SOLVABLE - RETURNING WHAT WAS FOUND')
      console.log(this.blanks)
      console.log(Object.keys(this.blanks).length)
      return true
    }

    console.log(`RECURSIVE CALL - THERE ARE ${Object.keys(this.blanks).length} BLANKS GOING INTO THE NEXT ITERATION`)
    return this.update()
  }

  scan_row(index){
    let x = index % 9
    let start = index - x
    for(let i=start;i<start+9;i++){ if(this.blanks[index].indexOf(this.vals[i]) !== -1) this.blanks[index].splice(this.blanks[index].indexOf(this.vals[i]), 1) }
  }
  
  scan_col(index){
    let x = index % 9
    for(let i=0;i<9;i++){ if(this.blanks[index].indexOf(this.vals[9*i + x]) !== -1) this.blanks[index].splice(this.blanks[index].indexOf(this.vals[9*i + x]), 1) }
  }
  
  scan_box(index){
    let x = index % 9
    let y = Math.floor(index/9)
    let boxNum = Puzzle.getBoxNum(y, x) // static method gets called with class name
    let offset = Math.floor(boxNum/3)*2
    for(let i=offset; i<offset+3;i++){
      for(let j=0; j<3;j++){
          if(this.blanks[index].indexOf(this.vals[(boxNum*3) + (i*9) + j]) !== -1) this.blanks[index].splice(this.blanks[index].indexOf(this.vals[(boxNum*3) + (i*9) + j]), 1)
      }
    }
  }
}