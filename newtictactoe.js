let board=[0,0,0,0,0,0,0,0,0];
let next =1;
let gState=0;




function i2c(i){
    return i==1 ? "x": i==-1 ? 'o' : 'b';

}
function p2c(i){
    return i==1 ? person1: i==-1 ? person2 : '' ;

}


function resetBoard(){
    board=[0,0,0,0,0,0,0,0,0];
    next =1;
    gState=0;
    updatePage();
}

function updatePage(){
    const e=document.getElementById("next");
    if(gState==0){
        e.innerHTML=`<h1> Next Move: ${p2c(next)} to play <img src='${i2c(next)}.png' /></h1>`;
    }
    else if(gState==1){
        //e.innerHTML=`<h1> Yayy! <img src='x.png'  /> won! </h1>`;
        e.innerHTML=`<h1> Yayy! ${person1} won! </h1>`;
        e.innerHTML+=`<button onclick='resetBoard();'>Play again? </button>`;
    }
    else if(gState==-1){
        //e.innerHTML=`<h1> Yayy! <img src='o.png'  /> won! </h1>`;
        e.innerHTML=`<h1> Yayy! ${person2} won! </h1>`;
        e.innerHTML+=`<button onclick='resetBoard();'>Play again? </button>`;
    }
    else {
        e.innerHTML=`<h1> That was a boring draw! </h1>`;
        e.innerHTML+=`<button onclick='resetBoard();'>Play again? </button>`;
    }
    for(const i in board){
        const e = document.getElementById("td"+i);
        e.innerHTML=`<img src='${i2c(board[i])}.png' onclick='updateEntry(${i});' />`;

    }

}

function checkState(){
    let patts=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (p of patts){
        const sum=p.reduce((a,i)=>a+board[i],0);
        if (sum==3){
            return 1;   //X won
        }else if(sum==-3){
            return -1    //O won
        }
    }
    for (i in board){
        if (board[i]==0) return 0;
    }
    return 2;
}

function updateEntry(x){
    if (gState==0 && board[x]==0){
        board[x]=next;
        next=-next;
        gState=checkState();
    }
    updatePage();

}
let person1 = prompt("Please enter the name for X: ");
let person2 = prompt("Please enter the name for O: ");



resetBoard();