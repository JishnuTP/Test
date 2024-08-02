import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYGUrblz2z111vSt6ys96d97hXVrvYfLY1Q&s"
           
            alt="Trimahtech Logo"
            className="h-9 w-auto"
          />
          {/* <span className="ml-2 text-lg font-bold">Trimahtech</span> */}
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/service" className="text-sm font-medium hover:underline">
            Services
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline">
            Contact
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
