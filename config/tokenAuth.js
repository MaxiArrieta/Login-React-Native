import clienteAxios from "./axios";
import AsycStorage from '@react-native-community/async-storage'

const tokenAuth = async() => {

    const token = await AsycStorage.getItem('token');

    if (token) {
        clienteAxios.defaults.headers.common['token'] = token;
    } else {
        delete clienteAxios.defaults.headers.common['token'];
    }
};

export default tokenAuth;