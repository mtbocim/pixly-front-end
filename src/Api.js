/**
 * PixlyApi class for making requests to the server
 */

import axios from "axios";

const BASE_API_URL = "http://localhost:3001";

class PixlyApi {
  /**
   * Makes a request to the server for all images data in the DB
   *
   * Returns an array of the images data
   */
  static async getImages() {
    const result = await axios.get(`${BASE_API_URL}/images`);
    return result.data;
  }

  /**
   * Accepts image and form data, submits to server
   *
   */
  static async uploadImage(fileData, formData) {
    const { title, imageUrl, uploadedBy, description } = formData;

    const result = axios.post(
      `${BASE_API_URL}/images`,
      {
        image: fileData,
        title: title,
        description: description,
        image_url: imageUrl,
        uploaded_by: uploadedBy,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("API upload result:", result);
  }

  static async deleteImage(url) {
    const filename = new URL(url).pathname.replace("/", "");
    //  console.log("api", url);
    const result = await axios.delete(`${BASE_API_URL}/images/${filename}`);
    return result.data;
  }
}

export default PixlyApi;
