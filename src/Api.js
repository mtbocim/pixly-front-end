import axios from 'axios';

const BASE_API_URL = "http://localhost:3001";

class PixlyApi{
    static async getImages(){
        const result = await axios.get(`${BASE_API_URL}/images`);
        return result.data;
    }
}

export default PixlyApi;