import '../App.css';

import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav aria-label="main navigation">
      <div className='nav-flex'>
        <h1 className='logo'>THE STORY NOOK</h1>

        <div className='nav-links'>
          <NavLink
            to='/home'
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='logout-btn'
          >
            <LogoutRoundedIcon
              sx={{
                fontSize: 18,
              }}
            />

            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;