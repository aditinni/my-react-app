import '../App.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='nav-flex'>
        <h1>THE STORY NOOK</h1>
        <div className='nav-links'>
          <Link to='/' className= 'link'>Home</Link>
          <Link to ='/about' className= 'link'>About the Author</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar