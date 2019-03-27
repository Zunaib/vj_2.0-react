import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-1cd39.firebaseio.com/'
});

export default instance;