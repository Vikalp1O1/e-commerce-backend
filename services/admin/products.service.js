import { Product } from "../../models/products.model.js";
 // Import the uploadImage function from cloudinary config
 const { uploadImage } = await import('../../config/cloudinary.js');

export const getProductsService = async (req) => {
  try {
    const data = await Product.find().populate('category');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProductsService = async (req) => {
  try {
    const {name, description, price, category} = req.body;
    let imageUrl = '';
    
    // Check if file was uploaded
    if (req.file) {
     
      
      // Upload the image to cloudinary
      const result = await uploadImage(req.file.path);
      
      // Get the image URL from cloudinary response
      if (result && result.secure_url) {
        imageUrl = result.secure_url;
      }
    }

    // Create product with image URL if available
    const data = await Product.create({ 
      name, 
      description, 
      price, 
      category,
      image: imageUrl || ''
    });
    
    return data;
  } catch (error) {
    console.error("Error while adding product:", error);
    throw new Error(error.message);
  }
};

export const getProductByIdService = async (req) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id).populate('category');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductService = async (req) => {
  try {
    const { id } = req.params;
    const body = req.body;
    let updateData = { ...body };
    
    // Check if file was uploaded
    if (req.file) {
      // Import the uploadImage function from cloudinary config
      const { uploadImage } = await import('../../config/cloudinary.js');
      
      // Upload the image to cloudinary
      const result = await uploadImage(req.file.path);
      
      // Get the image URL from cloudinary response
      if (result && result.secure_url) {
        updateData.image = result.secure_url;
      }
    }
    
    const data = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProductService = async (req) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);
    // console.log(data,"deleteData")
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};