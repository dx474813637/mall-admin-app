
import axios from '@/axios'
export default {
    category(params) {
        return axios.get('/category/all', {params})
    }
}