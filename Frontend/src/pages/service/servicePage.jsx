import React from "react";
import Header from "../../components/Header";
import ServicesSection from "../../components/Service";
import AboutComponent from "../about/aboutContact";
import Footer from "../../components/Footer";
import AnimateName from "../../context/animateName";

const ServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-1">
        {/* Hero section */}
        <section
          className="relative bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/9588205/pexels-photo-9588205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2?height=600&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-blue-900 opacity-50" />
          <div className="relative container mx-auto py-20 text-center text-white">
            <AnimateName>
            <h2 className="text-4xl font-bold">Services</h2>
            <h3> We provide a wide range of IT Services and Solutions</h3>
            <p className="mt-4 text-sm">Our Consultants design and build IT solutions as per client business needs.</p>
            </AnimateName>
         
          </div>
        </section>

        <div className="px-4 md:px-8 lg:px-8" >
<ServicesSection />
</div>

<AboutComponent/>

     
      </main>
    
    </div>
  );
};

// Example ServiceCard component structure


export default ServicePage;
