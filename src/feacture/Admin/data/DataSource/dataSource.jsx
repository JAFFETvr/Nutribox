import axios from 'axios';

export const fetchContenedores = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/v1/sensores/');
  return response.data;
};
