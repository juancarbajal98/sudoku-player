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
        if(pair[1]==='') blanks[`${pair[0]-1}`] = ['1','2','3','4','5','6','7','8','9']
        vals.push(pair[1])
    }
    
    // update candidates until problem is solved
    while(!solved){
        solved = updateCandidates(blanks, vals, Object.keys(blanks).length)
    }

    // put values back into HTML
    for(let i=0; i<vals.length; i++){
        document.getElementById(`num${i+1}`).innerHTML = vals[i]
    }
    return true

    // // put all values into puzzle
    // for(let i=0; i <9; i++){
    //     for(let j=0; j <9; j++) {
    //         puzzle[i][j] = vals[count]
    //         count++
    //     }
    // }

    // return puzzle
}

// returns true when puzzle is solved or when looping no longer solves anything else
function updateCandidates(blanks, vals, num_of_blanks){
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
        return true
    }
    return updateCandidates(blanks, vals, Object.keys(blanks).length)
}

function furtherReduce(blanks, vals){
    // check rows for pairs- if found remove any other appearances of pair values in row

    // check cols for pairs- if found remove any other appearances of pair values in col

    // check boxes for pairs- if found remove any other appearances of pair values in box

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

breezyPuzzle = [
    ['8', '.', '.', '.', '.', '4', '7', '1', '.'],
    ['3', '6', '.', '5', '1', '7', '2', '.', '8'],
    ['2', '7', '.', '8', '9', '.', '5', '.', '3'],
    ['7', '.', '.', '.', '6', '8', '9', '.', '4'],
    ['5', '4', '6', '.', '7', '.', '8', '3', '1'],
    ['9', '.', '.', '.', '5', '1', '6', '.', '2'],
    ['1', '2', '.', '7', '4', '.', '3', '.', '5'],
    ['4', '5', '.', '6', '8', '3', '1', '.', '7'],
    ['6', '.', '.', '.', '.', '5', '4', '8', '.'],
]

easyPuzzle = [
    ['.', '6', '8', '.', '4', '.', '.', '.', '.'],
    ['5', '.', '.', '9', '.', '3', '.', '.', '.'],
    ['7', '.', '.', '1', '.', '.', '.', '.', '.'],
    ['.', '5', '7', '.', '2', '.', '.', '8', '.'],
    ['2', '.', '.', '4', '.', '6', '.', '.', '7'],
    ['.', '1', '.', '.', '7', '.', '6', '2', '.'],
    ['.', '.', '.', '.', '.', '7', '.', '.', '2'],
    ['.', '.', '.', '6', '.', '5', '.', '.', '1'],
    ['.', '.', '.', '.', '3', '.', '9', '5', '.'],
]

mediumPuzzle = [
    ['2', '.', '.', '.', '.', '.', '3', '.', '7'],
    ['.', '.', '.', '2', '1', '.', '.', '.', '.'],
    ['3', '.', '9', '7', '8', '.', '4', '.', '.'],
    ['.', '.', '.', '4', '.', '2', '8', '7', '.'],
    ['.', '3', '4', '.', '.', '.', '9', '2', '.'],
    ['.', '2', '8', '6', '.', '9', '.', '.', '.'],
    ['.', '.', '1', '.', '9', '7', '2', '.', '3'],
    ['.', '.', '.', '.', '6', '8', '.', '.', '.'],
    ['8', '.', '3', '.', '.', '.', '.', '.', '5'],
]

hardPuzzle = [
    ['9', '7', '.', '4', '.', '.', '.', '2', '.'],
    ['3', '.', '.', '.', '.', '1', '.', '.', '8'],
    ['.', '.', '5', '.', '.', '8', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '7', '3', '.'],
    ['.', '4', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '7', '1', '.', '.', '.', '.', '5'],
    ['4', '.', '.', '8', '.', '.', '6', '.', '.'],
    ['.', '6', '.', '.', '9', '.', '.', '.', '2'],
    ['.', '.', '3', '2', '.', '.', '.', '5', '1'],
]

// console.log(solver_bruteForce(breezyPuzzle)) // PASSED
// console.log(solver_bruteForce(easyPuzzle)) // PASSED

// // ATM does not solve, gets stuck in while loop
// console.log(solver_bruteForce(mediumPuzzle)) 
// console.log(solver_bruteForce(hardPuzzle))