function apiResponse(res, status, body, msg){
    res.send({
        status: status,
        body  : body,
        messege: msg
    });
}

async function checkWin(board, rows, cols, currR, currY, value){
    let  len = 4;
           i = (currR - (len - 1) >= 0)? currR - (len - 1) : 0,
       end_i = (currR + (len - 1) <= rows -1)? currR + (len - 1) : rows -1,
           j = (currY - (len - 1) >= 0)? currY - (len - 1) : 0,
       end_j = (currY + (len - 1) <= cols -1)? currY + (len - 1) : cols -1;
   
   //check horzontal
   let is_completed = false;
   let count = 0;
   for(let k = i; k <=end_i; k++){
       for(let l = j; l <=end_j; l++){
           if(board[k][l] === value){
               await count++;
               if(count === len){
                   is_completed = true;
                   break;
               }
           }else{
               count = 0;
           }
       }
       if(is_completed){
           break;
       }
   }
   if(is_completed){
       return is_completed;
   }

    //check vertical
   is_completed = false;
   count = 0;
   for(let k = j; k <=end_j; k++){
       for(let l = i; l <=end_i; l++){
           if(board[l][k] === value){
               await count++;
               if(count === len){
                   is_completed = true;
                   break;
               }
           }else{
               count = 0;
           }
       }
       if(is_completed){
           break;
       }
   }
   if(is_completed){
       return is_completed;
   }

   //check diagonally
   is_completed = false;
   for(let k = i; k <=end_i; k++){
       for(let l = j; l <=end_j; l++){
        if((end_i - k >= len -1) && (end_j - l >= len -1)){
            //forword check
            if(board[k][l] === value && board[k+1][l+1] === value && board[k+2][l+2] === value && board[k+3][l+3] === value){
                is_completed = true;
                break;
            }
            if(board[k][l+3] === value && board[k+1][l+2] === value && board[k+2][l+1] === value && board[k+3][l] === value){
                is_completed = true;
                break;
            }
        }
       }
       if(is_completed){
           break;
       }
   }
   if(is_completed){
       return is_completed;
   }   
   //finally
   return is_completed;
}

function findInsertion(array){
    return array.filter(function(value){
        return value === 0;
    }).length
}

async function updateBoard(instance, col, current_move){
    let pos = findInsertion(instance.board[col-1]);
    if(pos > 0){
        let char_to_insert = (current_move == 'red')? 1 : -1;
        instance.board[col-1][pos-1] = char_to_insert;
        instance.moves[current_move].push(col);   
        return checkWin(instance.board, 6, 7, col-1, pos-1, char_to_insert).then( is => {
            if(is){
                instance.winner = current_move;
            }
            return instance;
        });
    }else{
        return null;
    }
}

function checkCurrentMove(moves){
    if(moves['red'].length <= moves['yellow'].length){
        return 'red';
    }else{
        return 'yellow';
    }
}

function initInstance(){
    return {
        board: Array(7).fill(null).map(()=>Array(6).fill(0)), // array 7 * 6
        winner: null,
        moves : {
            red : [],  
            yellow: [] 
        },
        first_move : 'red',
        current_move: null,
        created_at: new Date()
    }
}

module.exports = { 
    apiResponse: apiResponse,
    checkWin: checkWin,
    findInsertion: findInsertion,
    updateBoard: updateBoard,
    checkCurrentMove: checkCurrentMove,
    initInstance: initInstance
};
