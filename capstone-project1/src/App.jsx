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
        isHeld: true,
        id: nanoid()
      }
    ))
    return newDiceArray
  }

  function hold(id) {
    // setDice(prev => [...prev, ])
    //setDice(prev => [...prev, prev.map(element => element.id === id ? {...element, isHeld: !element.isHeld } : prev))
    // element.id === id ? [...prev, {...element, isHeld: !element.isHeld }] : prev
  }
  
  const diceElements = dice.map((element) => 
    <Die 
      key={element.id}
      id={element.id} 
      num={element.value} 
      isHeld={element.isHeld}
      hold={hold}
    />)

  return (
    <main>
      <div className="dice-container">
          {diceElements}
      </div>
      <button className="roll-dice" onClick={() => setDice(generateAllNewDice())}>Roll</button>
    </main>
  )
}

export default App