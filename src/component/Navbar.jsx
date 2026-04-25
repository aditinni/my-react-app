import '../App.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav aria-label="main navigation">
      <div className='nav-flex'>
        <h1 className='logo'>THE STORY NOOK</h1>

        <div className='nav-links'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'link active' : 'link'
            }
          >
            Home
          </NavLink>

          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive ? 'link active' : 'link'
            }
          >
            About the Author
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar