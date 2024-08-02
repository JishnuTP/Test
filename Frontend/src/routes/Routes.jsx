// src/Routes.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from '../pages/landingPage/LandingPage';

import NotFound from '../pages/PageNotFound';


const AppRoutes = () => {
  // const {user} = useContext(mainContext)
  return (
    <>
    {/* {user.id && <test />} */}
    <Routes>
      <Route path="/" element={<Landingpage />} />
    
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);
};

export default AppRoutes;
