import axios from 'axios';
import { BASE_URL } from '../constants';

export const getArticles = () => axios.get(BASE_URL);
