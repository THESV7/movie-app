import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo_text from "../assets/logo_text.png";
import logo from "../assets/loggo.png";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../constants/navigation";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const isFirstRender = useRef(true);

  // Update search input from URL when route changes
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q") || "";
    setSearchInput(query);
  }, [location.search]);

  // Debounced search (for desktop only)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const debounce = setTimeout(() => {
      if (window.innerWidth >= 1024 && searchInput.trim()) {
        navigate(`/search?q=${searchInput}`);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchInput]);

  // Form submit handler (works for Enter and mobile)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black/50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-[40px]" src={logo} alt="logo" />
          <img className="w-[120px] h-fit" src={logo_text} alt="logo-text" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => (
            <div key={nav.label + "navigation" + index}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive ? "text-neutral-100" : "text-neutral-400"
                  }`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (window.innerWidth < 1024 && searchInput.trim()) {
                  navigate(`/search?q=${searchInput}`);
                }
              }}
            >
              <IoSearchOutline className="text-2xl text-white cursor-pointer" />
            </button>
          </form>

          <div>
            <img
              src={userIcon}
              alt="user"
              className="size-8 rounded-full cursor-pointer active:scale-50 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
