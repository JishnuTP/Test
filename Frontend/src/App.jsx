import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/Routes';
import AdminRoutes from './routes/AdminRoutes';
import Sidebar from './components/adminComponent/Sidebar';
import AdminHeader from './components/adminComponent/AdminHeader';
import Login from './pages/Login';
import Register from './pages/Register';
import { mainContext } from './context/mainContex';
import AdminFooter from './components/adminComponent/AdminFooter';




function App() {

const {user}= useContext(mainContext)
  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
       
        <Routes>
          {/* Route for admin section */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
          <Route path="/admin/*" element={<AdminLayout />} />
          
          {/* Route for non-admin section */}
          <Route path="*" element={<DefaultLayout />} />

          
        </Routes>
      </div>
    </Router>
  );
}


// Layout for admin section 
function AdminLayout() {
  const { user } = useContext(mainContext);
  return (
    <>
     {user.role === 'admin' ? (
      
        
        <div className="flex flex-col w-full min-h-screen">
          {/* AdminHeader */}
          <AdminHeader/>

          {/* Admin Routes */}
          <div className="flex-1 p-4 overflow-auto ">
            <AdminRoutes />
          </div>

          <div className=" overflow-auto ">
         {/* Sidebar */}
         <AdminFooter />

        </div>
        
     </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}


// Layout for non-admin section (with header and footer)
function DefaultLayout() {
  const { user } = useContext(mainContext);

  return (
    <>
      {user.role !== 'admin' ? (
        <>
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/admin" />
      )}
    </>
  );
}


export default App;