import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {

  let currentPlayer = "X";
      if (gameTurns.length > 0 && gameTurns[0].player === 'X' ) {
        currentPlayer = 'O';
      }
  return currentPlayer;
}

function App() {
  
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
        // console.log(turn);
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
  }
  
  let winner = null;

  for (const combi of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combi[0].row][combi[0].column];
    const secondSquareSymbol = gameBoard[combi[1].row][combi[1].column];
    const thirdSquareSymbol = gameBoard[combi[2].row][combi[2].column];
    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
      
    }
  }
  console.log(winner);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X");

    setGameTurns((prevTurns) => {
      const currentPlayer = activePlayer;

      const updatedTurns = [
        {square: {row: rowIndex, col:colIndex}, player: currentPlayer},
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}></Player>
          <Player initialName="Player 2" symbol="0" isActive={activePlayer === "O"}></Player>
        </ol>
        
        <GameBoard onSelectSquares={handleSelectSquare} board={gameBoard}/>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
