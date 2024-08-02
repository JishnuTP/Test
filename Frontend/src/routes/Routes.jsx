import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from '../pages/landingPage/LandingPage';
import NotFound from '../pages/PageNotFound';
import TestDetai from '../components/test/TestDetails';
import TestList from '../components/test/TestList';
import { mainContext } from '../context/mainContex'; // Import context
import PublishedResultsPage from '../pages/Result/PublishedResult';

const AppRoutes = () => {
  const { user } = useContext(mainContext); // Get user from context

  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      
      {/* Conditionally render routes based on the presence of user */}
      {user.role && (
        <>
          <Route path="/test" element={<TestList />} />
          <Route path="/test/:id" element={<TestDetai />} />
          <Route path="/showresult" element={<PublishedResultsPage />} />
        </>
      )}
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
