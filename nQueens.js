countNQueensSolutions = (n) => {
  //Keeps track of the # of valid solutions
  let count = 0;

  //Helps identify valid solutions (How may possible squares to visit?)
  const done = Math.pow(2,n) - 1;

  //Checks all possible board configurations
  innerRecursion = (leftDia, col, rightDia) => {
      
    console.log(`col: ${col}, leftDia: ${leftDia}, rightDia: ${rightDia}`);
      
    //Base condition
    //All columns are occupied,
    //so the solution must be complete
    if (col === done) {
      count++;
      console.log(`count: ${count}`)
      return;
    }

    //Gets a bit sequence with "1"s
    //whereever there is an open "slot"
    let poss = ~(leftDia | rightDia | col);
    console.log(`poss: ${poss}`);

    //Loops as long as there is a valid
    //place to put another queen.
    while ( poss & done ) {
      let bit = poss & -poss;
      console.log(`bit: ${bit}`);
      poss -= bit;
      innerRecursion((leftDia|bit)>>1, col|bit, (rightDia|bit)<<1);
    }
  };

  innerRecursion(0,0,0);

  return count;
};

const result  = countNQueensSolutions(10);
console.log(result);