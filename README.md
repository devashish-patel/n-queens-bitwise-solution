# n-queens-bitwise-solution
This repo is made for the subject CSEN5336: Analysis of Algorithm project solution. The main reference is taken from the blog post of ***Greg Trowbridge***  ( *Software Engineer* from *Uber* ) on N-queens problem solution.

**Project Title**: *A Project On Optimized N-Queens Counting Algorithm And Implementation In Javascript*


### Some overview on N-Queens Problem:
- N-queens is very well-known problem in the community of the computer science in which we need to find how can we fix N-queens on the N X N chess board without any of them attacking other.
- As you might think this problem gets even more harder with the increase of N, especially when you want to find all possible solutions rather than just finding possible solution.
- No one has find possible solution for more than N=27. It’s a world record.
- Now we’ll go through the implementation of this algorithm in Javascript which is more efficient because it is using bitwise operators.
- Prerequisite: **Basics of Bitwise Operators**

### Algorithm Explanation:
- In the game of the chess, a queen can attack in and direction and any steps. So, there can only be one queen in each row and column in addition at most one in each diagonal.
- Now we know we can only place one queen in each row so we’ll start from the first raw then second row to Nth row until...
a)	We get a valid solution
b)	We reach at dead end (i.e. we can’t place queens safely)
- We are putting one queen in one row so don’t need to worry about horizontal attack because in every case there will be only one queen in each row.
- Now we need to check only three more conditions…
a) Column doesn’t have more than one queen
b) Left diagonal doesn’t have more than one queen
c) Right diagonal doesn’t have more than one queen
- Now if all the above conditions are fulfilled then that square is safe to put the queen so we’ll increase the counter or we’ll give up and try next possible situation.

### Program Explaination:
- Basically, this is a recursive function and let’s directly come on the main logic of the program `innerRecursion`, which takes three arguments `col` means column, `leftDia` means left diagonal, `rightDia` means right diagonal. These arguments are basically integers but our algorithm takes advantage of their bit representation.
- For example…
For N=4, `col` having a value of `0010` would mean that the 3rd column is already occupied by a queen

#####  **THE DONE VARIEBLE** _(Line: 6)_
 - The "done" variable simply allows me to not worry about any bits beyond the Nth. Most computers are either 32 bits or 64 bits, so in reality, all integers are stored with that many bits. done simply has a bit sequence with 1 for every entry up to the Nth. For example, when N=5, done will equal `11111`.

#####  **INNER RECURSION FUNCTION** _(Line: 9)_
 - First of all I’m calling innerRecursion(0, 0, 0), that means I’m calling function with all arguments from position 0. If N=4, we can say all arguments being equal to `0000`. Means we haven’t placed any queens yet.

#####  **THE FIRST IF STATEMENT** _(Line: 13)_
 - This is a base condition for the function which checks whether the solution is found or not!!
 - It checks it whether all the columns are occupied or not in each calling of function.
 - Our algorithm never places queens wrong so we can check if all columns are filled then we have a valid solution.
 
#####  **CONST POSS** _(Line: 20)_
 - The poss variable shows the columns in the current row which are not under attack of any queen.
 - Suppose after some iterations we have `leftDia` = `0001`, `rightDia` = `0101`, col = `1001` and we are doing OR operation on them so we’ll get `1101` and at last by adding `~` we are flipping the bits so we’ll get `0010`.

#####  **FIRST TWO STATEMENTS IN THE WHILE LOOP** _(Lines: 25 & 26)_
 - First statement `let bit = poss & -poss` stores the first available position means first non-zero position from the poss and stores it in `bit`.
 - So we are placing our queen on that available position, so the next statement `poss -= bit` will mark that position as occupied and change the bit as ‘1’.

#####  **LAST STATEMENT IN THE WHILE LOOP** _(Line: 27)_
 - ` innerRecursion( (leftDia | bit) >> 1, col | bit, ( rightDia | bit) << 1)` as a my point of view this last statement is most difficult to be understood in this entire function so let’s first break it to understand.
 - `>>1` and `<<1` are the right shift and left shift operators respectively which moves a bit to right or left. `(rightDia | bit) >> 1` means combine `rightDia` and `bit` apply OR operation and then left shift by 1 bit.
 - More specifically, if `rightDia` is `0001` (meaning that the top-right-to-bottom-left diagonal through column 4 of the current row is occupied), and `bit` is `0100` (meaning that we are planning to place a queen in column 2 of the current row), `(rd|bit)` results in `0101` (meaning that after we place a queen in column 2 of the current row, the second and the fourth top-right-to-bottom-left diagonals will be occupied).
 - Now, if add in the `<<` operator, we get `(rd|bit)<<1`, which takes the `0101` we worked out in our previous bullet point, and moves everything to the left by one. The result, therefore, is `1010`.
 - *Now important question is why we are shifting all these values?*
 - The answer is when we put a queen on a square we move down to the different rows at that time we need our left and right diagonals to be up to date.

### Results:
| N  | # of Solution  | Estimated Timing  |
| ------------ | ------------ | ------------ |
| 4  | 2  | < 1/2 ms  |
| 5  |  10 | < 1/2 ms  |
| 6  | 4  |  < 1/2 ms |
| 7 |  40 | < 1/2 ms  |
| 8|   92|  < 1/2 ms |
| 9| 352  | 1/2 ms  |
| 10|724   | 1 ms  |
| 11|2680   |  6 ms |
| 12|14200   | 24 ms  |
| 13|73712   |  114 ms |
| 14|365596   |  667 ms |
| 15| 2279184  | 4077 ms  |

### Conclusion:
...and that's pretty much it! The code loops through, recursively trying out different valid positions and quickly eliminating invalid solutions.

Because invalid solutions are ignored so quickly (because the while loop will end), and because we use bitwise operators for nearly all calculations, the result is a very fast, very efficient algorithm for counting the number of solutions to the N queens problem!