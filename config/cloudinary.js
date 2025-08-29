import { v2 as cloudinary } from 'cloudinary' 
import fs from 'fs'

// console.log(process.env.CLOUD_API_KEY,'cloudinary api key');
cloudinary.config({ 
  // cloud_name: process.env.CLOUD_NAME, 
  // api_key: process.env.CLOUD_API_KEY , 
  // api_secret: process.env.CLOUD_API_SECRET

    cloud_name: 'thatbat', 
  api_key: '168168875432628' , 
  api_secret: '5lS0Ac5Ih7j5sL-alacqwxQjCPs'
});

// upload on cloudinary
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      resource_type: 'auto',
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      // console.log('Image uploaded to Cloudinary:', result.secure_url);
      
      // Delete the local file after successful upload
      fs.unlinkSync(imagePath);
      
      return result;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      // Try to delete the local file even if upload failed
      try {
        fs.unlinkSync(imagePath);
      } catch (unlinkError) {
        console.error('Error deleting local file:', unlinkError);
      }
      throw error;
    }
};

export { uploadImage }