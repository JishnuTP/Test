import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import TestList from "../../components/test/TestList";
import ResultList from "../../components/result/Result";


const Landingpage = () => {
  const [animateName, setAnimateName] = useState(false);
  const servicesRef = useRef(null);

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
          className="relative flex items-center justify-center min-h-[100vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2024/05/31/07/54/ai-generated-8800023_640.jpg')",
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
              Test 
            </h1>
            <p
              className={`font-bold tracking-tight sm:text-1xl ${
                animateName ? "animate-name" : ""
              }`}
            >
              project for test.
            </p>
            <div className="flex justify-center gap-4">
              <Link
              to="/login">
            
                            <button
               
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Get Started
              </button>
              </Link>

              <Link
              to="/test">
            
              <button
                onClick={scrollToSection}
                className="inline-flex items-center rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
               Start Test
              </button>
              </Link>
            </div>
          </div>
        </section>

        <div ref={servicesRef} className="px-4 md:px-8 lg:px-8">
        <ResultList/>
        </div>

   
       
       
      </main>

     
    </div>
  );
};

export default Landingpage;
