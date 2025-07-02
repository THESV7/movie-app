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
  const isFirstRender = useRef(true); // 👈 new

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    setSearchInput(query || "");
  }, [location.search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const delayDebounce = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed) {
        navigate(`/search?q=${trimmed}`);
      } else if (location.pathname.startsWith("/search")) {
        navigate("/search"); // optional: navigate to blank search page
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, navigate, location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput.trim()}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black/50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"} className="flex items-center gap-2">
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
                    isActive && "text-neutral-100"
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
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit">
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
