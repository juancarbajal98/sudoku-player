class Inputs{
  constructor(){}

  static html(){
    let temp = new Inputs
    let inputs = `<!-- Inputs -->
    <form>`
    // create 9 rows of nine input tags
    for (let i =1; i<10; i++){
      inputs += temp.row(i)
    }
    inputs +=`
    </form>  
    </div>`
    return inputs
  }

  row(i){
    let row = `<div class="row" id="r${i}">`
    for(let col =1; col < 10; col++){
      row += `<input type="text" class ="input" id ="num` 
      row += String((i-1)*9+col) 
      row += `" name="num` 
      row += String((i-1)*9+col) 
      row += `" maxlength="1">`
    }
    row += `</div>`
    return row
  }
}