const board = [];

let rows, cols, copsCount, flameEnabled, tilesClicked, gameOver

let copsLocation = [];

const winResultEl = document.querySelector("h2")
const resetBtnEl = document.getElementById("reset")
const flameBtnEl = document.getElementById("flame-button")
const copsTotal = document.getElementById("cop-count")

resetBtnEl.addEventListener("click", handleResetClick)

flameBtnEl.addEventListener("click", setFlame)

function startGame() {                                                                    
    rows = 10;
    cols = 10;
    copsCount = 10;
    flameEnabled = false;
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

function setFlame () {                                                              
    if (flameEnabled) {
        flameEnabled = false;
        document.getElementById("flame-button").style.backgroundColor = "lightgray";
    } else {
        flameEnabled = true;
        document.getElementById("flame-button").style.backgroundColor = "orange";
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
    if (flameEnabled) {
        if (!tile.classList.contains("flame")) {
            tile.classList.add("flame");
            tile.innerHTML = "🔥";
            copsCount--;
        } else {
            tile.classList.remove("flame");
            tile.innerHTML = "";
            copsCount++;
        }
        render();
        checkWin();
        return;
    }
    if (copsLocation.includes(tile.id)) {                                         
        winResultEl.innerText = "Game Over";
        winResultEl.style.color = 'red'
        document.getElementById("cop-count").innerText = "🚔 🚔 🚔";
        gameOver = true;
        revealCops();
        return;
    }

    let coords = tile.id.split("-");                        
    let x = parseInt(coords[0]);     
    let y = parseInt(coords[1]);
    checkCop(x, y);
}

function setMines () {          
    let mineLeft = copsCount;
    while (mineLeft > 0) {                          
        let x = Math.floor(Math.random() * rows)    
        let y = Math.floor(Math.random() * cols)   
        let id = x.toString() + "-" + y.toString(); 

        if (!copsLocation.includes(id)) {           
            copsLocation.push (id)                  
            mineLeft -= 1;                          
        }
    }
}

function checkCop (x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) {   
        return;
    }

    if ((board[x][y].classList.contains("tile-clicked") || board[x][y].classList.contains("flame"))) {  
        return;
    }

    board[x][y].classList.add("tile-clicked");     
    tilesClicked += 1;

    let copsFound = 0;

    copsFound += checkTile(x-1, y-1);  
    copsFound += checkTile(x-1, y);    
    copsFound += checkTile(x-1, y+1);  

    copsFound += checkTile(x, y-1);     
    copsFound += checkTile(x, y+1);      

    copsFound += checkTile(x+1, y-1);   
    copsFound += checkTile(x+1, y);    
    copsFound += checkTile(x+1, y+1);  

    if (copsFound > 0) {                   
        board[x][y].innerText = copsFound  
        board[x][y].classList.add("m" + copsFound.toString());
    }
    else {
        checkCop(x-1, y-1);
        checkCop(x-1, y);
        checkCop(x-1, y+1);

        checkCop(x, y-1);
        checkCop(x, y+1);

        checkCop(x+1, y-1);
        checkCop(x+1, y);
        checkCop(x+1, y+1);
    }
    checkWin()
}

function checkTile (x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) { 
        return 0;
    }
    
    if (copsLocation.includes(x.toString() + "-" + y.toString())) {
        return 1;
    }
    return 0;
}

function revealCops() {
    for (let x = 0; x < rows; x++) {       
        for (let y = 0; y < cols; y++) {
            let tile = board[x][y]        
            if (copsLocation.includes(tile.id)) {  
                tile.innerText = "👮"      
                tile.style.backgroundColor = "red"
            }
        }
    }    
}

function checkWin() {
    if ((tilesClicked === 90 || tilesClicked === rows * cols - copsCount)) {
        document.getElementById("cop-count").innerText = "🌈🌈🌈"
        winResultEl.innerText = "You Win 🥳 ";
        gameOver = true;
    }
}

startGame()

function render() {
    copsTotal.innerText = copsCount
}