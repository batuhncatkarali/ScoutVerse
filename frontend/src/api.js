import axios from 'axios';
const API = axios.create({ baseURL: 'https://scoutverse-zkbd.onrender.com/api' });
export default API;