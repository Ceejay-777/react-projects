import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  return list ? JSON.parse(list) : []
}

function App() {
  const [name,setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEdiID] = useState(null)
  const [alert, setAlert] = useState({show:false, type:'', msg:''})

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!name) {
      showAlert(true, 'danger', 'Please enter a value')
    } 
    
    else if(name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editID) { 
          return {...item, title:name}
        }
        return item
      }))
      setName('')
      setEdiID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Value changed')
    } 
    
    else {
      showAlert(true, 'success', 'Item added to the list')
      const newItem = {
        id : new Date().getTime().toString(),
        title : name
      }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', "Emptying list")
    setList([])
  }

  const removeItem = (id) => {
    const item = list.find((item) => item.id === id)
    showAlert(true, 'danger', `Item removed ${item.title}`)
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEdiID(id)
    setName(specificItem.title)
  }

  useEffect(()=> {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">

      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}

        <h3>Grocery bud</h3>

        <div className="form-control">
          <input 
          type="text"
          className='grocery'
          placeholder='e.g eggs'
          value={name}
          onChange={(event) => setName(event.target.value)} />

          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && 
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>

        <button className='clear-btn' onClick={clearList}>Clear items</button>
      </div>
      }
      
    </section>
  )
}

export default App
