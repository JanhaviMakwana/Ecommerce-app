import axios from '../axios';

const AdminService = {
    addProduct: (data, id) => {
        return axios.post(`/add-product/${id}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    deleteProduct: (id) => {
        return axios.post(`/${id}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    updateProduct: (id, data) => {
        return axios.post(`/product/${id}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    }

};

export default AdminService;