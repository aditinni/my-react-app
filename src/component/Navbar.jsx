import '../App.css';

import { NavLink, useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav aria-label="main navigation">
      <div className="nav-flex">

        {/* Logo */}
        <div className="logo-group">
          <div className="logo-icon">
            <AutoStoriesIcon sx={{ fontSize: 16, color: 'white' }} />
          </div>
          <span className="logo">THE STORY NOOK</span>
        </div>

        {/* Links */}
        <div className="nav-links">
          <NavLink
            to="/home"
            className={({ isActive }) => isActive ? 'link active' : 'link'}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'link active' : 'link'}
          >
            About the Author
          </NavLink>

          {/* Logout */}
          <button onClick={handleLogout} className="logout-btn">
            <LogoutRoundedIcon sx={{ fontSize: 15 }} />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;