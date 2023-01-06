# minesweeper-clone
Start the game with a 10x10 board with randomly dispersed mines(10 cops).
A flame button (when clicked) allows you to place a flame on a tile (the tile you think are cops).
A reset button that reloads the game. ![8CF2714F-4394-4CD3-B809-AA0A03354E40](https://user-images.githubusercontent.com/113068944/211084631-d8ddcf79-4446-4aa3-87f3-8eda96d22e48.jpeg)

The first click starts the game.
If you click an empty tile - it opens up all adjacent squares (8) until it reveals the numbered tiles.
If you click a numbered tile (1-8) - The number represents the num of cops that tile is touching - adjacent tiles(8)
The first cick should not reveal a cop (still working on this logic) 
![91D0A22F-24B1-4110-86C4-3CA3655CF547](https://user-images.githubusercontent.com/113068944/211085797-9f044c42-fbe2-464d-ac5e-863aedfb4816.jpeg)

Clicking the flame button allows you to place flames on the tiles you believe are cops. (the button becomes Orange when active)
The goal is to place flames on all the tiles you believe are cops.
![A9F57B65-5464-443E-8BCB-0415DC8DEF9E](https://user-images.githubusercontent.com/113068944/211086308-7d7b43d5-c81b-4350-88e7-53ad25ab4d83.jpeg)

The game is over if you reveal a cop. 
A game over message is rendered + the number of cops changes to cop cars. 
![2D744467-03FA-4631-90D9-E2D59FBA5DA8](https://user-images.githubusercontent.com/113068944/211087137-38e28fce-37a2-4a62-bd32-a6bab09878ce.jpeg)
I have not been able to successfully win the game myself -  but a win message is rendered with rainbow emoji's. 

Technologies Used: HTML, CSS, JavaScript. 

Next Steps: Upgrade some styling (make the border rotate with the first click) - Add a timer that starts with the first click. 
Add logic so the first click cannot reveal a cop. (if your first click is above a cop, the cop is moved to the top left corner. If this corner already contains a mine, the next available square to the right is used.)
