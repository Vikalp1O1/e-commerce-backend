import { sendResponse } from "../../helper/resSender.js";
import { addProductsService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../../services/admin/products.service.js";


export const getProducts = async (req, res) => {
  try {
    const data = await getProductsService(req);
    if (!data) {

      throw new Error("Products not found");
    }
       sendResponse(res,200, true, "Products fetched successfully", data);
      
    
    
  } catch (error) {
     sendResponse(res,500, false, error.message);
    //  error
  }
};

export const addProduct = async (req,res) => {
  try {
    // Remove excessive logging
    const data = await addProductsService(req);
    
    if (!data) {
      throw new Error("Failed to add product");
    }
    
    sendResponse(res,200, true, "Product added successfully", data);
    
  } catch (error) {
     sendResponse(res,500, false, error.message);
  }
};

export const getProductById = async (req,res) => {
try {
    const data = await getProductByIdService(req);
    if(!data){
      throw new Error("Product not found while editing");
         
    }
    sendResponse(res,200, true, "Product fetched successfully", data);
    
} catch (error) {
     sendResponse(res,500, false, error.message);
}
};

export const updateProduct = async(req,res) => {
  try {
    const data = await updateProductService(req);
    if(!data){
         throw new Error("Product not found while updating");
    }
    
    sendResponse(res,200, true, "Product updated successfully", data);
  } catch (error) {
    sendResponse(res,500, false, error.message); 
  }
};

export const deleteProduct = async(req,res)=>{
  try {
    const data = await deleteProductService(req);
    if(!data){
         throw new Error("Product not found while deleting");
    }
    
    sendResponse(res,200, true, "Product deleted successfully", data);
  } catch (error) {
     sendResponse(res,500, false, error.message);
  }
}