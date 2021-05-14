import axios from '@/axios'
export default {
    productsAll(params) {
        return axios.get('/products/all', {params})
    },
    productEdit(params) {
        return axios.put('/products/edit', params)
    },
    productDetail(id) {
        return axios.get('/products/' + id)
    },
    productDelete(id) {
        return axios.delete('/products/' + id)
    },
    productAdd(data) {
        return axios.post('/products/add', data)
    }
}