import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { mainContext } from "../../context/mainContex";

const Landingpage = () => {
  const [animateName, setAnimateName] = useState(false);
  const servicesRef = useRef(null);
  const { user } = useContext(mainContext); // Context to get user info

  useEffect(() => {
    // Trigger animation after a short delay when component mounts
    const timer = setTimeout(() => {
      setAnimateName(true);
    }, 500); // Adjust delay as needed

    // Clean up timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = () => {
    // Scroll to the top of Services section when button is clicked
    servicesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section
          className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://a.storyblok.com/f/120497/2400x1254/bb7255f9dc/testportal.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 space-y-6 px-4 text-center text-white sm:px-6 lg:px-8">
            {/* Apply animation class based on animateName state */}
            <h1
              className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${
                animateName ? "animate-name" : ""
              }`}
            >
              Welcome to Test Portal
            </h1>
            <p
              className={`font-bold tracking-tight sm:text-lg lg:text-xl ${
                animateName ? "animate-name" : ""
              }`}
            >
              Discover and take various tests to challenge yourself!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              {/* Conditionally show the "Get Started" button if there is no user */}
              {!user || !user.role ? (
                <Link to="/login">
                  <button
                    className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Get Started
                  </button>
                </Link>
              ) : (
                <Link to="/test">
                  <button
                    className="inline-flex items-center mt-4 sm:mt-0 rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    Start Test
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>

        
      </main>
    </div>
  );
};

export default Landingpage;
