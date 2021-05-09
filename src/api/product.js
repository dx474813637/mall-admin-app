import axios from '@/axios'
export default {
    productsAll(params) {
        return axios.get('/products/all', {params})
    },
    productEdit(params) {
        return axios.put('/products/edit', params)
    },
    productDelete(id) {
        return axios.delete('/products/' + id)
    }
}