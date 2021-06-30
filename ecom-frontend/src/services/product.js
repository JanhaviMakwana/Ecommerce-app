import axios from '../axios';

const ProductService = {
    postCart: (data, userId) => {
        return axios.post(`/cart/${userId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    getCart: (id) => {
        return axios.get(`/cart/${id}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    deleteProductFromCart: (userId, prodId) => {
        return axios.post(`/cart-delete-item/${userId}`, prodId)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    placeOrder: (userId) => {
        return axios.post(`/order/${userId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    getOrders: (userId) => {
        return axios.get(`/order/${userId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
   getProducts: (query) => {
        return axios.get(`/get-products/${query}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    }
}

export default ProductService;