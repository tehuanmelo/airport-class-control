import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <ul>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/form" ><button>ADD +</button></NavLink>
        </ul>
    </nav>
  )
}

export default Navbar