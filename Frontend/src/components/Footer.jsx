import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-8">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src="https://a.storyblok.com/f/120497/2400x1254/bb7255f9dc/testportal.png"
           
            alt="Trimahtech Logo"
            className="h-9 w-auto"
          />
          {/* <span className="ml-2 text-lg font-bold">Trimahtech</span> */}
        </div>
        <nav className="flex gap-4 ">
          <Link to="/" className="text-sm text-white font-medium hover:underline">
            Home
          </Link>
        
          
        </nav>
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Jishnutp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
