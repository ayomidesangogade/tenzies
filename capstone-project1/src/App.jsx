import React from "react"
import Die from "./components/Die"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { nanoid } from "nanoid"

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice())

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    if (!gameWon)
      setDice(prev => prev.map(element => (element.isHeld === false) ? {...element, value: Math.ceil(Math.random() * 6)} : element))
    else
      setDice(generateAllNewDice())
  }

  const refSection = React.useRef(null)

  React.useEffect(() => {
    if (gameWon) {
      refSection.current.focus()
    }
  }, [gameWon])

  function hold(id) {
    setDice(prev => prev.map(element => (element.id === id) ? {...element, isHeld: !element.isHeld} : element))
  }
  
  const diceElements = dice.map((element, index) => 
    <Die 
      key={index}
      id={element.id} 
      num={element.value} 
      isHeld={element.isHeld}
      hold={hold}
    />)
  const { width, height } = useWindowSize()
  return (
    <main>
      {gameWon && <Confetti 
        width={width}
        height={height}
      />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice} ref={refSection}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App