import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/user.png';
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { navigation } from '../constants/navigation';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    setSearchInput(query || "");
  }, [location.search]);

  // ✅ Debounce navigate
 useEffect(() => {
    const delayDebounce = setTimeout(() => {
      navigate(`/search?q=${searchInput.trim()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput.trim()}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black/50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className='hidden lg:flex items-center gap-1 ml-5'>
          {navigation.map((nav, index) => (
            <div key={nav.label + "navigation" + index}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${isActive && 'text-neutral-100'}`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Search here...'
              className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block text-white'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit">
              <IoSearchOutline className='text-2xl text-white cursor-pointer' />
            </button>
          </form>

          <div>
            <img
              src={userIcon}
              alt="user"
              className='size-8 rounded-full cursor-pointer active:scale-50 transition-all'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
