class UniqueCandidate extends Method{
  constructor(puzzle){
    super(puzzle)
  }

  update(){
    let updated_vals = []
    this.scan_rows(updated_vals)
    this.scan_cols(updated_vals)
    this.scan_boxes(updated_vals)
    if(updated_vals.length) {
      this.puzzle.deleteBlank(updated_vals[0])
      this.puzzle.printValsToBoard()
      this.updateBoardCandidates_newValue(updated_vals[0], updated_vals)
      return this.update()
    }
    console.log('PROGRESS FROM UNIQUE CANDIDATE SEARCH')
    console.log(this.blanks)
    console.log(Object.keys(this.blanks).length)
    return true
  }

  scan_rows(updated_vals){ for(let i=0;i<9;i++) this.scan_row(i, updated_vals) }

  scan_row(rowNum, updated_vals){
    let row_vals = {}
    for(let i=0; i<9; i++){
      if(this.blanks[rowNum*9 + i]===undefined) continue
      for(let cand of this.blanks[rowNum*9 + i]){
        if(row_vals[cand]===undefined) row_vals[cand] = [rowNum*9 + i]
        else {row_vals[cand].push(rowNum*9 + i)}
      }
    }
    for(const [value, instances] of Object.entries(row_vals)) if(instances.length === 1 && updated_vals.indexOf(instances[0]) === -1) { 
      // update candidate to unique candidate
      this.blanks[instances[0]] = [parseInt(value)]
      updated_vals.push(instances[0])
      console.log(`UNIQUE CANDIDATE FOUND - INDEX ${instances[0]} HAS THE ONLY ${this.blanks[instances[0]]} IN ITS ROW`)
    }

    console.log(`ROW ${rowNum} HAS CANDIDATE VALUES ${JSON.stringify(row_vals)}`)
  }

  scan_cols(updated_vals){ for(let i=0;i<9;i++) this.scan_col(i, updated_vals) }

  scan_col(colNum, updated_vals){
    let col_vals = {}
    // outer loop represents col #
    for(let i=0; i <9;i++){
      if(this.blanks[i*9 + colNum]===undefined)continue
      for(let cand of this.blanks[i*9 + colNum]){
        if(col_vals[cand]===undefined) col_vals[cand] = [i*9 + colNum]
        else {col_vals[cand].push(i*9 + colNum)}
      }
    }
    for(const [value, instances] of Object.entries(col_vals)) if(instances.length === 1 && updated_vals.indexOf(instances[0]) === -1) { 
      this.blanks[instances[0]] = [parseInt(value)]
      updated_vals.push(instances[0])
      console.log(`UNIQUE CANDIDATE FOUND - INDEX ${instances[0]} HAS THE ONLY ${this.blanks[instances[0]]} IN ITS COL`)
    }

    console.log(`COL ${colNum} HAS CANDIDATE VALUES ${JSON.stringify(col_vals)}`)
  }
  scan_boxes(updated_vals){ for(let i=0;i<9;i++) this.scan_box(i, updated_vals) }

  scan_box(boxNum, updated_vals){
    let box_vals = {}
    let offset = Math.floor(boxNum/3)*2
    for(let i=offset; i<offset+3;i++){
      for(let j=0; j<3;j++){
        if(this.blanks[(boxNum*3) + (i*9) + j] === undefined) continue
        for(let cand of this.blanks[(boxNum*3) + (i*9) + j]){
          if(box_vals[cand]===undefined) box_vals[cand] = [(boxNum*3) + (i*9) + j]
          else {box_vals[cand].push((boxNum*3) + (i*9) + j)}
        }
      }
    }
    for(const [value, instances] of Object.entries(box_vals)) if(instances.length === 1 && updated_vals.indexOf(instances[0]) === -1) { 
      this.blanks[instances[0]] = [parseInt(value)]
      updated_vals.push(instances[0])
      console.log(`UNIQUE CANDIDATE FOUND - INDEX ${instances[0]} HAS THE ONLY ${this.blanks[instances[0]]} IN ITS BOX`)
    }

    console.log(`BOX ${boxNum} HAS CANDIDATE VALUES ${JSON.stringify(box_vals)}`)
  }
}