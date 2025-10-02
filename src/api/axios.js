import axios from 'axios';
//TMDB API
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/tv/',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  }
})
//TMDB 장르
const apiCate = axios.create({
  baseURL: 'https://api.themoviedb.org/3/genre/tv/list',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'ko-KR',
    sort_by: 'popularity.desc'
  }
})


//챗봇 API용 (Flask 백엔드)
const chatApi = axios.create({
  baseURL: 'https://backend-75wa.onrender.com',
  // baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})
export { chatApi,apiCate };
export default api;