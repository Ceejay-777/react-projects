import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
  const [color, setColor] = useState('#063251')
  const [error, setError] = useState(false)
  const [length, setLength] = useState(10)
  const [list, setList] = useState(new Values('#063251').all(10))
  const listLength = list.length

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      let colors = new Values(color).all(length)
      setList(colors)
      setError(false)
    } catch (error) {
      console.log('This is an error')
      setError(true)
    }
  }

  return (
    <>
      <section className="container">
        <h3>generate colors instantly</h3>

        <form onSubmit={handleSubmit}>

          <input 
          type="text" 
          value={color} 
          onChange={(event) => setColor(event.target.value)} 
          className={`${error ? 'error' : null}`}/>

          <input 
          type="number" 
          name="length" 
          id="length" 
          value={length}
          min={1}
          max={50}
          onChange={(event) => setLength(parseInt(event.target.value))} />

          <button type="submit" className="btn">Submit</button>
        </form>
      </section>

      <section className="colors">
       {list.map((color, index) => {
        return (
          <SingleColor 
          key={index} 
          {...color} 
          index={index} 
          hexColor={color.hex}
          length = {listLength} />
        )
       })}
      </section>
    </>
  )
}

export default App
