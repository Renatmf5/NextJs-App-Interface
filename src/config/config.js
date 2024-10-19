// config/config.js
const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://' + process.env.SUBDOMINIO + '/api/v1'// Será obtido do Parameter Store
  : 'http://localhost:8000/api/v1';

export default apiUrl;