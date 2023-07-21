class EliminatePairs extends Method{
  constructor(puzzle){
    super(puzzle)
  }
  
  update(visited_pairs = []){
    let init_num_of_blanks = Object.keys(this.blanks).length
    for(const [index, candidates] of Object.entries(this.blanks)){
      if(!this.puzzle.newFoundPair(index, visited_pairs)) continue
      this.scan_row(index, visited_pairs)
      this.scan_col(index, visited_pairs)
      this.scan_box(index, visited_pairs)
      if(init_num_of_blanks !== Object.keys(this.blanks).length) return this.update(visited_pairs)
    }
    console.log('PROGRESS FROM OBSERVING PAIRS')
    console.log(this.blanks)
    console.log(Object.keys(this.blanks).length)
    return true
  }

  scan_row(index, visited_pairs){
    let pair = false
    let offset = index % 9
    let temp = {}
    let start = index - offset

    for(let i =start; i<start+9;i++){
      if(this.blanks[i] === undefined || String(i)===index) continue
      this.removePairCandidates(temp, index, i, [...this.blanks[i]])
      if(this.blanks[i].length !== 2) continue
      if(this.blanks[i][0] !== this.blanks[index][0] || this.blanks[i][1] !== this.blanks[index][1]) continue

      console.log(`PAIR FOUND - INDICES ${i} & ${index} ARE PAIRS : [${this.blanks[i][0]},${this.blanks[i][1]}]`)
      pair = true
      visited_pairs.push(String(i)) // push corresponding pair index
      delete temp[`${i}`] // its empty array is not needed in temp object
    }

    if(pair && Object.keys(temp).length !== 0) this.pairImplications(temp)
  }
  
  scan_col(index, visited_pairs){
    let pair = false
    let offset = index % 9
    let temp = {}
    for(let i =0; i<9;i++){
      if(this.blanks[9*i + offset] === undefined || String(9*i + offset)===index) continue
      this.removePairCandidates(temp, index, 9*i + offset, [...this.blanks[9*i + offset]])
      if(this.blanks[9*i + offset].length !== 2) continue
      if(this.blanks[9*i + offset][0] !== this.blanks[index][0] || this.blanks[9*i + offset][1] !== this.blanks[index][1]) continue

      console.log(`PAIR FOUND - INDICES ${9*i + offset} & ${index} ARE PAIRS : [${this.blanks[9*i + offset][0]},${this.blanks[9*i + offset][1]}]`)
      pair = true
      visited_pairs.push(String(9*i + offset))
      delete temp[`${9*i + offset}`]
    }
    if(pair && Object.keys(temp).length !== 0) this.pairImplications(temp)
  }
  
  scan_box(index, visited_pairs){
    let pair = false
    let offset = index%9
    let boxNum = Puzzle.getBoxNum(Math.floor(index/9), offset)
    let start = Math.floor(boxNum/3)*2
    let temp = {}
    for(let i =start; i<start+3;i++){
      for(let j=0; j< 3;j++){
          if(this.blanks[(boxNum*3) + (i*9) + j] === undefined || String((boxNum*3) + (i*9) + j)===index) continue
          this.removePairCandidates(temp, index, (boxNum*3) + (i*9) + j, [...this.blanks[(boxNum*3) + (i*9) + j]])
          if(this.blanks[(boxNum*3) + (i*9) + j].length !== 2) continue
          if(this.blanks[(boxNum*3) + (i*9) + j][0] !== this.blanks[index][0] || this.blanks[(boxNum*3) + (i*9) + j][1] !== this.blanks[index][1]) continue

          console.log(`PAIR FOUND - INDICES ${(boxNum*3) + (i*9) + j} & ${index} ARE PAIRS : [${this.blanks[(boxNum*3) + (i*9) + j][0]},${this.blanks[(boxNum*3) + (i*9) + j][1]}]`)
          pair = true
          visited_pairs.push(String((boxNum*3) + (i*9) + j))
          delete temp[`${(boxNum*3) + (i*9) + j}`]
      }
    }
    if(pair && Object.keys(temp).length !== 0) this.pairImplications(temp)
  }
  
  removePairCandidates(temp, pair_index,removing_index, temp_vals){
    let temp_length =  this.blanks[removing_index].length
    if(temp_vals.indexOf(this.blanks[pair_index][0]) !== -1){temp_vals.splice(temp_vals.indexOf(this.blanks[pair_index][0]),1)}
    if(temp_vals.indexOf(this.blanks[pair_index][1]) !== -1){temp_vals.splice(temp_vals.indexOf(this.blanks[pair_index][1]),1)}
    if(temp_vals.length === temp_length) return false
    temp[`${removing_index}`] = temp_vals
  }

  pairImplications(temp){
    for(const [index, candidates] of Object.entries(temp)){
      console.log(`PAIR IMPLICATIONS - INDEX ${index} HAS ITS CANDIDATES UPDATED FROM ${JSON.stringify(this.blanks[index])} TO ${JSON.stringify(temp[index])}`)
        this.blanks[index] = temp[index]
        if(this.blanks[index].length === 1){
          this.puzzle.deleteBlank(index)
          this.puzzle.printValsToBoard()
          this.updateBoardCandidates_newValue(index)
          if(Object.keys(this.blanks).length === 0) return true
        }
    }
  }
}