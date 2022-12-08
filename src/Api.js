import axios from 'axios';

const BASE_API_URL = "http://localhost:3001";

class PixlyApi {
   static async getImages() {
      const result = await axios.get(`${BASE_API_URL}/images`);
      return result.data;
   }

   static async uploadImage(fileData, formData) {
      const { title, imageUrl, uploadedBy, description } = formData;
      
      const result = axios.post(`${BASE_API_URL}/images`,
         {
            image: fileData,
            title: title,
            description: description,
            image_url: imageUrl,
            uploaded_by: uploadedBy
         },
         {
            headers: {
               "Content-Type": "multipart/form-data"
            }
         }
      );
      console.log("API upload result:", result);
   }
}

export default PixlyApi;