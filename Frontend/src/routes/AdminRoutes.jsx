import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { mainContext } from '../context/mainContex';

import Users from '../pages/list/UserList';
import Userprofile from '../pages/Userprofile';
import PageInProgres from '../pages/Progress';
import AdminAddTest from '../pages/admin/AddTest';
import AdminResultList from '../pages/list/ResultList';
import AdminLandingPage from '../pages/admin/landingPage';

const AdminRoutes = () => {


  return (
    <Routes>
      
      <Route path="/users" element={<Users />} />
      <Route path="/my-account" element={<Userprofile />} />
      <Route path="/test" element={<AdminAddTest />} />
      <Route path="/resultlist" element={<AdminResultList />} />
      <Route path="/" element={<AdminLandingPage />} />
     
      {/* Catch all unmatched routes */}
      <Route path="*" element={<PageInProgres />} />
    </Routes>
  );
};

export default AdminRoutes;
