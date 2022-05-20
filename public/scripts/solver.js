/* 
Takes in 1d array that represents puzzle and draws it onto the grid.

Note: the input array follows a very specific format in order for this to work:
no spaces must exist, blanks must be represented by two single quotes, and there 
should not be any newlines
*/
function pasteToGrid(){
  let input = document.getElementById('pasteText').value
  let vals = []
  input = input.substring(1,input.length-1).split(',')
  for(let i = 0; i <81;i++){
    if(input[i]==="''"){
      vals.push('')
      continue
    }
    vals.push(input[i].substring(1,2))
  }
  for(let i=0; i<vals.length; i++){
    document.getElementById(`num${i+1}`).value = vals[i]
  }
}
/* 
TODO: Write a solver class that has the different solving methods as its methods 
and the button click triggers a function call that creates an instance of the 
Solver class and specifies the method as a param (so things like the code for
capturing form data can be generalized to class structure)
*/
function solver_bruteForce(){
    // capture submitted puzzle
    const formData = new FormData(document.querySelector('form'))

    // set solved to false
    solved = false

    // store values in 1D
    let vals = []
    // store indices where blanks occur in 1D as key, its candidates as value
    let blanks = {}
    for (var pair of formData.entries()) {
        if(pair[1]==='') blanks[`${parseInt(pair[0].substring(3))-1}`] = ['1','2','3','4','5','6','7','8','9']
        vals.push(pair[1])
    }
    // update candidates until problem is solved
    while(!solved){
        solved = updateCandidates(blanks, vals, Object.keys(blanks).length)
    }
    // put values back into HTML
    for(let i=0; i<vals.length; i++){
      document.getElementById(`num${i+1}`).value = vals[i]
    }
    // return true
    setTimeout(()=> {
        solver_eliminatePairs(vals, blanks)
    }, "2000")
}

// returns true when puzzle is solved or when looping no longer solves anything else
function updateCandidates(blanks, vals, num_of_blanks){
    // update every blank's respective candidate array by checking its associated row, col, box
    for(const [index, candidates] of Object.entries(blanks)){
        blanks[index] = checkRow(index, vals, blanks[index])
        blanks[index] = checkCol(index, vals, blanks[index])
        blanks[index] = checkBox(index, vals, blanks[index])
        if(blanks[index].length === 1){
            // values are updated
            vals[index] = blanks[index][0]
            // index deleted from list of blanks
            delete blanks[index]
            // once last key is deleted return true
            if(Object.keys(blanks).length === 0) return true
            // exit for loop as soon as new val is deduced
            break
        }
    }
    // if nothing was removed then no new values were discovered and further iterating is pointless
    if(num_of_blanks === Object.keys(blanks).length) {
        /* 
        TODO: at this point I need to detect if the puzzle can be helped along
        with some sort of exclusion logic. In the medium puzzle it is obvious
        that index 41 is meant to be a 1 since all the other blanks in that box 
        cannot be a 1. But because it still has the possibility of being a 5 
        and doesn't know about thes candidates of those in its box, it remains
        unsolved.

        If two blanks in the same row, col or box share the same 2-length candidates array
        then all other appearances in the shared dimension of any of those numbers can be
        safely removed. 
        return furtherReduce(blanks, vals)
        */
        console.log('PUZZLE NOT SOLVABLE - RETURNING WHAT WAS FOUND')
        console.log(blanks)
        console.log(Object.keys(blanks).length)

        return true
    }
    // in the case that blanks still exist after we just removed a value, recursive call
    return updateCandidates(blanks, vals, Object.keys(blanks).length)
}

// TODO: Figure how to get these params provided from brute force calling (maybe global variables, maybe creating event listener when first button is clicked)
function solver_eliminatePairs(vals, blanks){
    // // capture submitted puzzle - ideally wont have to do once params issue is solved
    // const formData = new FormData(document.querySelector('form'))

    // set solved to false
    solved = false

    // // store values in 1D
    // let vals = []
    // // store indices where blanks occur in 1D as key, its candidates as value
    // let blanks = {}
    // for (var pair of formData.entries()) {
    //     if(pair[1]==='') blanks[`${parseInt(pair[0].substring(3))-1}`] = ['1','2','3','4','5','6','7','8','9']
    //     vals.push(pair[1])
    // }
    
    while(!solved){
        solved = deduceFromPairs(blanks, vals)
    }

    // put values back into HTML
    for(let i=0; i<vals.length; i++){
        document.getElementById(`num${i+1}`).value = vals[i]
    }
    return true
}

// should return true once puzzle is solved OR all pairs have been visited
function deduceFromPairs(blanks, vals, visited_pairs = []){
    /* 
    for every blank we check first if its candidate length is 2 
    if it isn't we continue
    if it is we check its row to look for a pair - if one is found
    we then scan all other blanks in that row to remove any other
    instances of the pair
    we do the same for the col
    we do the same for the box

    same logic follows from before where if we reduce a candidate array 
    to length 1 then we update vals array and call recursively unless 
    we've solved
    */

    let temp_length = Object.keys(blanks).length

    // iterate over blanks from left to right
    for(const [index, candidates] of Object.entries(blanks)){
        // if current blank is a pair we've already looked at, we continue
        if(visited_pairs.indexOf(index) !== -1) continue
        // if current blank is not two index, we continue
        if(blanks[index].length !== 2) continue

        // mark down this new pair we are visiting
        visited_pairs.push(index)


        // not sure what params are exactly required for two funcs below
        // if change in blanks length is detected after any 3 of these then trigger recursive call
        scanRow(index, vals, blanks, visited_pairs)
        if(temp_length !== Object.keys(blanks).length) return deduceFromPairs(blanks, vals, visited_pairs)
        // scanCol(index, vals, blanks)
        // if(temp_length !== Object.keys(blanks).length) return deduceFromPairs(blanks, vals, visited_pairs)
        // scanBox(index, vals, blanks)
        // if(temp_length !== Object.keys(blanks).length) return deduceFromPairs(blanks, vals, visited_pairs)
    }
    console.log('PROGRESS FROM OBSERVING PAIRS (in rows for now)')
    console.log(blanks)
    console.log(Object.keys(blanks).length)
    return true
}

function scanRow(index, vals, blanks, visited_pairs){
    // iterate over all other blanks in the same row as index
    // if candidate array differs but one or two nums appears, store a temp version with it removed
    // if none have the same candidate array as index return
    // otherwise mark pair as true => sub in temp values
    let pair = false
    let offset = index%9
    let start = index- offset
    let temp = {}
    // iterate over row
    for(let i =start; i<start+9;i++){
        // skip self or if this space is not blank continue
        if(blanks[i] === undefined || String(i)===index) continue
        /* 
        Once we've reduced that given i is not index and is indeed a blank, we can store a temporary
        version of its candidates that has any instances of the pair values removed. If we end up
        finding a pair we use those values to sub into blanks, otherwise we delete the temp vals array
        */
        // if either or both of the index values are found, remove from temp_vals
        let temp_vals = [...blanks[i]]
        let temp_length =  blanks[i].length
        let has_first = temp_vals.indexOf(blanks[index][0])
        if(has_first !== -1){temp_vals.splice(has_first,1)}
        let has_second = temp_vals.indexOf(blanks[index][1])
        if(has_second !== -1){temp_vals.splice(has_second,1)}
        // if at least one was found, add to temp
        if(temp_vals.length !== temp_length) temp[`${i}`] = temp_vals

        // if this space does not have exactly two indices continue
        if(blanks[i].length !== 2) continue
        // if indices don't exactly match continue
        if(blanks[i][0] !== blanks[index][0] || blanks[i][1] !== blanks[index][1]) continue

        // at this one point we know we've found a pair
        pair = true
        // add to list of visited pairs
        visited_pairs.push(String(i))

        delete temp[`${i}`]
    }

    /* 
    If a pair was found in the row and there exists temp values
    then we sub those ALL in. If that sub caused one or more 
    blanks to be dropped, we recursively call
    */
    if(pair && Object.keys(temp).length !== 0){
        for(const [index, candidates] of Object.entries(temp)){
            blanks[index] = temp[index]
            if(blanks[index].length === 1){
                vals[index] = blanks[index][0]
                delete blanks[index]
                // helper function to remove any instances of the newly added val in its row, col, box
                updateBoard(index, vals, blanks, visited_pairs)
                if(Object.keys(blanks).length === 0) return true
            }
        }
    }
    return true
}

// TODO: move these last functions into a separate file for helper funcs then import here

function updateBoard(new_value_index, vals, blanks, visited_pairs, new_vals=[new_value_index]){
    /* 
    - given that new value has just been added, we must scan its row, col, box for any redundancies.
    - any redundancies must be removed.
    - removed redundancies resulting in candidate arrays of length 1 will have their indices temporarily 
      stored for recursive calls at the end of the loop
    */
   let checked_vals = []

    // row
    let offset = new_value_index%9
    let start = new_value_index - offset
    for(let i=start; i<start+9;i++){
        // this skips all written in values, including the new index 
        if(blanks[i] === undefined) continue
        // if this index is a pair we visited we do not need to consider a third value as a possibility for this index representing a pair
        if(visited_pairs.indexOf(String(i)) !== -1) continue
        // at this point it is a value we are going to check
        checked_vals.push(i)
        // if the new value does not exist in the list of candidates for this index continue
        if(blanks[i].indexOf(vals[new_value_index]) === -1) continue

        // at this point the current index has a candidate array that needs to be updated
        blanks[i].splice(blanks[i].indexOf(vals[new_value_index]), 1)

        // if its length is now one we store for recursive call as this is now new info
        if(blanks[i].length === 1) new_vals.push(i)
    }

    // col
    for(i=0; i<9;i++){
        // this skips all written in values, including the new index 
        if(blanks[9*i + offset] === undefined) continue
        // if this index is a pair we visited we do not need to consider a third value as a possibility for this index representing a pair
        if(visited_pairs.indexOf(String(9*i + offset)) !== -1) continue
        // at this point it is a value we are going to check
        checked_vals.push(9*i + offset)
        // if the new value does not exist in the list of candidates for this index continue
        if(blanks[9*i + offset].indexOf(vals[new_value_index]) === -1) continue

        // at this point the current index has a candidate array that needs to be updated
        blanks[9*i + offset].splice(blanks[9*i + offset].indexOf(vals[new_value_index]), 1)

        // if its length is now one we store for recursive call as this is now new info
        if(blanks[9*i + offset].length === 1) new_vals.push(9*i + offset)
    }

    // box - skip all row and col values you've already checked
    let row = Math.floor(new_value_index/9)
    let boxNum = getBoxNum(row, offset)
    start = Math.floor(boxNum/3)*2
    for(let i =start; i<start+3;i++){
        for(let j=0; j< 3;j++){
            // this skips all written in values, including the new index 
            if(blanks[(boxNum*3) + (i*9) + j] === undefined) continue
            // if this index is a pair we visited we do not need to consider a third value as a possibility for this index representing a pair
            if(visited_pairs.indexOf(String((boxNum*3) + (i*9) + j)) !== -1) continue
            // skip all row and col values in box we've already checked
            if(checked_vals.indexOf((boxNum*3) + (i*9) + j) !== -1) continue

            checked_vals.push((boxNum*3) + (i*9) + j)
            // if the new value does not exist in the list of candidates for this index continue
            if(blanks[(boxNum*3) + (i*9) + j].indexOf(vals[new_value_index]) === -1) continue
    
            // at this point the current index has a candidate array that needs to be updated
            blanks[(boxNum*3) + (i*9) + j].splice(blanks[(boxNum*3) + (i*9) + j].indexOf(vals[new_value_index]), 1)
    
            // if its length is now one we store for recursive call as this is now new info
            if(blanks[(boxNum*3) + (i*9) + j].length === 1) new_vals.push((boxNum*3) + (i*9) + j)
        }
    }

    // remove first index from new_vals once it has been checked for in its row, col, box (which is the code above)
    new_vals.shift()
    if(new_vals.length !== 0){
        // update vals for upcoming element in new vals
        vals[new_vals[0]] = blanks[new_vals[0]][0]
        delete blanks[new_vals[0]]
        // recursive call
        return updateBoard(new_vals[0], vals, blanks, visited_pairs, new_vals)
    }
    return true
}

// given an index and its current candidates, iterate through its row to remove values
function checkRow(index, vals, candidates){
    let offset = index%9
    let start = index- offset
    for(let i=start; i<start+9;i++){
        if(candidates.indexOf(vals[i]) !== -1) candidates.splice(candidates.indexOf(vals[i]), 1)
    }
    return candidates
}

// given an index and its current candidates, iterate through its column to remove values
function checkCol(index, vals, candidates){
    let offset = index%9
    for(let i=0; i<9; i++){
        if(candidates.indexOf(vals[9*i + offset]) !== -1) candidates.splice(candidates.indexOf(vals[9*i + offset]), 1)
    }
    return candidates
}

// given an index and its current candidates, iterate through its box to remove values
function checkBox(index, vals, candidates){
    let row = Math.floor(index/9)
    let col = index % 9
    let boxNum = getBoxNum(row, col)
    let offset = Math.floor(boxNum/3)*2
    for(let i=offset; i<offset+3;i++){
        for(let j=0; j<3;j++){
            if(candidates.indexOf(vals[(boxNum*3) + (i*9) + j]) !== -1) candidates.splice(candidates.indexOf(vals[(boxNum*3) + (i*9) + j]), 1)
        }
    }
    return candidates
}

function getBoxNum(row, col){
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

breezyPuzzle = 
['8','','','','','4','7','1','','3','6','','5','1','7','2','','8','2','7','','8','9','','5','','3','7','','','','6','8','9','','4','5','4','6','','7','','8','3','1','9','','','','5','1','6','','2','1','2','','7','4','','3','','5','4','5','','6','8','3','1','','7','6','','','','','5','4','8','']

easyPuzzle = 
['','6','8','','4','','','','','5','','','9','','3','','','','7','','','1','','','','','','','5','7','','2','','','8','','2','','','4','','6','','','7','','1','','','7','','6','2','','','','','','','7','','','2','','','','6','','5','','','1','','','','','3','','9','5','']

mediumPuzzle = 
['2','','','','','','3','','7','','','','2','1','','','','','3','','9','7','8','','4','','','','','','4','','2','8','7','','','3','4','','','','9','2','','','2','8','6','','9','','','','','','1','','9','7','2','','3','','','','','6','8','','','','8','','3','','','','','','5']

hardPuzzle = 
['9','7','','4','','','','2','','3','','','','','1','','','8','','','5','','','8','','','','','','','','','','7','3','','','4','','','','','','','','2','','7','1','','','','','5','4','','','8','','','6','','','','6','','','9','','','','2','','','3','2','','','','5','1']