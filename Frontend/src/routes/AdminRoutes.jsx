import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { mainContext } from '../context/mainContex';

import Users from '../pages/list/UserList';
import Userprofile from '../pages/Userprofile';
import PageInProgres from '../pages/Progress';

const AdminRoutes = () => {


  return (
    <Routes>
      
      <Route path="/users" element={<Users />} />
      <Route path="/my-account" element={<Userprofile />} />
     
      {/* Catch all unmatched routes */}
      <Route path="*" element={<PageInProgres />} />
    </Routes>
  );
};

export default AdminRoutes;
