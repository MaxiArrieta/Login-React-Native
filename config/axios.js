import axios from "axios";

const clienteAxios = axios.create({
    baseURL: "https://ancient-hollows-47420.herokuapp.com",
});

export default clienteAxios;