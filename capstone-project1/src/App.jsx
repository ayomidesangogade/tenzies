import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

function App() {
  const [dice, setDice] = React.useState(generateAllNewDice())

  function generateAllNewDice() {
    const newDiceArray = []
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.floor(Math.random() * 6) + 1)
    }
    diceArray.map((randNumber) => newDiceArray.push(
      {
        value: randNumber, 
        isHeld: false,
        id: nanoid()
      }
    ))
    return newDiceArray
  }

  function rollDice() {
    setDice(prev => prev.map(element => (element.isHeld === false) ? {...element, value: Math.ceil(Math.random() * 6)} : element))
  }

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

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App