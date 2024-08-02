import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'; // Import WorkRoundedIcon for Career
import { mainContext } from "../context/mainContex";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setToken, signOut } = useContext(mainContext); // Include signOut for logout
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMenuFocused(true); // Focus on menu when it opens
  };

  const handleMenuBlur = () => {
    if (isMenuOpen) {
      setMenuFocused(false); // Blur menu when it's open
    }
  };

  const handleLogout = () => {
    signOut();
    setToken(""); // Clear the token
    navigate('/login'); // Redirect to login page after logout
  };
  
  console.log("header", user);

  // Check if user is logged in
  const isLoggedIn = Boolean(user.username);

  return (
    <header className="fixed z-50 top-0 left-0 w-full bg-transparent text-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYGUrblz2z111vSt6ys96d97hXVrvYfLY1Q&s"
            alt="Test Logo"
            className="h-15 w-20"
          />
        </Link>
        
        {/* Menu icon for mobile and tablet view */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white"
          aria-label="Toggle navigation menu"
        >
          <MenuIcon />
        </button>
        
        {/* Navigation Links for desktop view */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="relative flex items-center text-white hover:text-blue-300 transition-colors duration-300"
            onClick={handleMenuBlur}
          >
            <HomeRoundedIcon className="mr-2" />
            Home
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300"></span>
          </Link>
          
          
          
          {/* Additional links for logged-in users */}
          {isLoggedIn && (
            <Link
              to="/test"
              className="relative flex items-center text-white hover:text-blue-300 transition-colors duration-300"
              onClick={handleMenuBlur}
            >
              <WorkRoundedIcon className="mr-2" />
              Test
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300"></span>
            </Link>
          )}
        </nav>
      </div>
      
      {/* Line under header for visual separation */}
      <div className="border-t border-gray-700 mt-2"></div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-full bg-black shadow-lg z-50 lg:hidden">
            <div className="flex flex-col py-2 px-4">
              <Link
                to="/"
                className="block py-2 font-medium text-white hover:bg-gray-700 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              
             
              {/* Additional links for logged-in users in mobile menu */}
              {isLoggedIn && (
                <Link
                  to="/test"
                  className="block py-2 font-medium text-white hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Test
                </Link>
              )}
            </div>
          </div>
          {/* Transparent backdrop for mobile menu */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleMenuBlur}
          ></div>
        </>
      )}

      {/* User or Authentication Buttons */}
      <div className="flex items-center justify-end space-x-4 mt-2">
        {isLoggedIn ? (
          <>
            <span className="text-white">Welcome {user.username}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:underline"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
