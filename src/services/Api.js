import axios from 'axios';
import store from '@/store/store';

export default () => {
    return axios.create({
        baseURL: `https://xz-webdev-final-backend.herokuapp.com`,
        headers: {
            Authorization: `Bearer ${store.state.token}`,
        },
    });
};
