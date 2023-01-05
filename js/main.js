const board = [];

let rows, cols, mineCount, flagEnabled, tilesClicked, gameOver

let mineLocation = [];

const winResultEl = document.querySelector("h2")
const resetBtnEl = document.getElementById("reset")
const flagBtnEl = document.getElementById("flag-button")
const mineTotal = document.getElementById("mine-count")

resetBtnEl.addEventListener("click", handleResetClick)

flagBtnEl.addEventListener("click", setFlag)

function startGame() {                                                                    
    rows = 10;
    cols = 10;
    mineCount = 10;
    flagEnabled = false;
    tilesClicked = 0;
    gameOver = false;

    setMines();

    for (let x = 0; x < rows; x++) {                                            
        let row = [];
        for (let y = 0; y < cols; y++) {                                            
            const tile = document.createElement("div");                            
            tile.id = x.toString() + "-" + y.toString();                           
            tile.addEventListener("click", clickTile);                             
            document.getElementById("board").append(tile);                          
            row.push(tile);                                                         
        }
        board.push(row);                                                            
    }
    render();
}

function setFlag () {                                                              
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    } else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function handleResetClick () {
    window.location.reload();
    startGame();
}

function clickTile () {                                                            
    if(gameOver || this.classList.contains("tile-clicked")) {
        return;
    }
    let tile = this;                                                              
    if (flagEnabled) {
        if (!tile.classList.contains("flag")) {
            tile.classList.add("flag");
            tile.innerHTML = "🚩";
            mineCount--;
        } else {
            tile.classList.remove("flag");
            tile.innerHTML = "";
            mineCount++;
        }
        render();
        checkWin();
        return;
    }
    if (mineLocation.includes(tile.id)) {                                         
        winResultEl.innerText = "Game Over";
        document.getElementById("mine-count").innerText = "😔";
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-");                        
    let x = parseInt(coords[0]);     
    let y = parseInt(coords[1]);
    checkMine(x, y);
}

function setMines () {          
    let mineLeft = mineCount;
    while (mineLeft > 0) {                          
        let x = Math.floor(Math.random() * rows)    
        let y = Math.floor(Math.random() * cols)   
        let id = x.toString() + "-" + y.toString(); 

        if (!mineLocation.includes(id)) {           
            mineLocation.push (id)                  
            mineLeft -= 1;                          
        }
    }
}

function checkMine (x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) {   
        return;
    }

    if ((board[x][y].classList.contains("tile-clicked") || board[x][y].classList.contains("flag"))) {  
        return;
    }

    board[x][y].classList.add("tile-clicked");     
    tilesClicked += 1;

    let minesFound = 0;

    minesFound += checkTile(x-1, y-1);  
    minesFound += checkTile(x-1, y);    
    minesFound += checkTile(x-1, y+1);  

    minesFound += checkTile(x, y-1);     
    minesFound += checkTile(x, y+1);      

    minesFound += checkTile(x+1, y-1);   
    minesFound += checkTile(x+1, y);    
    minesFound += checkTile(x+1, y+1);  

    if (minesFound > 0) {                   
        board[x][y].innerText = minesFound  
        board[x][y].classList.add("m" + minesFound.toString());
    }
    else {
        checkMine(x-1, y-1);
        checkMine(x-1, y);
        checkMine(x-1, y+1);

        checkMine(x, y-1);
        checkMine(x, y+1);

        checkMine(x+1, y-1);
        checkMine(x+1, y);
        checkMine(x+1, y+1);
    }
    checkWin()
}

function checkTile (x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) { 
        return 0;
    }
    
    if (mineLocation.includes(x.toString() + "-" + y.toString())) {
        return 1;
    }
    return 0;
}

function revealMines() {
    for (let x = 0; x < rows; x++) {       
        for (let y = 0; y < cols; y++) {
            let tile = board[x][y]        
            if (mineLocation.includes(tile.id)) {  
                tile.innerText = "💣"      
                tile.style.backgroundColor = "red"
            }
        }
    }    
}

function checkWin() {
    if ((tilesClicked === 90 || tilesClicked === rows * cols - mineCount)) {
        document.getElementById("mine-count").innerText = "😊"
        winResultEl.innerText = "You Win!";
        gameOver = true;
    }
}

startGame()

function render() {
    mineTotal.innerText = mineCount
}