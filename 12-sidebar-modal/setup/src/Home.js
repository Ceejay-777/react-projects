import React, { useContext } from 'react'
import { FaBars } from 'react-icons/fa'
import { useAppContext } from './context'


const Home = () => {
  const data = useAppContext()
  console.log(data);

  return (
    <main>
      <button className='sidebar-toggle'>
        <FaBars />
      </button>

      <button className="btn">
        Show modal
      </button>
    </main>
  )
}

export default Home
