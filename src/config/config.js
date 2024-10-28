const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://api.grupo-ever-rmf.com/api/v1'
  : 'http://localhost:8000/api/v1';

console.log('URL da API:', apiUrl);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SUBDOMINIO:', process.env.NEXT_PUBLIC_SUBDOMINIO);
console.log('PORT:', process.env.PORT);

export default apiUrl;