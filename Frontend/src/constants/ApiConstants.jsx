// API base URL
export const API_BASE_URL = 'http://localhost:8080/api/';

// API endpoints for admin
export const ADMINENDPOINTS = {
  GETUSERS: `${API_BASE_URL}admin/getUsers`,
  ADDTEST: `${API_BASE_URL}admin/addTest`,
 
  // Add other endpoints here as needed
};


export const USERENDPOINTS = {
  GETTEST: `${API_BASE_URL}user/getTest`,
  GETTEST: `${API_BASE_URL}user/getTest`,
  SUBMITANSWERS: `${API_BASE_URL}user/submitAnswer`,
 
  // Add other endpoints here as needed
};