import { sendResponse } from "../../helper/resSender.js";
import { addCategoryService, deleteCategoryService, editCategoryService, getAllCategoryService, getCategoryByIdService } from "../../services/admin/category.service.js";

export const addCategory =async(req,res)=>{
    try {
        const data = await addCategoryService(req);
        if(!data){
           throw new Error("Failed to add category"); 
        }
        
        sendResponse(res,200, true, "Category added successfully", data);
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};

export const getCategoryById =async(req,res)=>{
    try {
        const data = await getCategoryByIdService(req);
        if(!data){
              throw new Error("Failed to edit category");
        }
        sendResponse(res,200, true, "Category Fetched successfully", data);
      
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};

export const editCategory =async(req,res)=>{
    try {
        const data = await editCategoryService(req);
        if(!data){
              throw new Error("Failed to edit category");
        }
        sendResponse(res,200, true, "Category edited successfully", data);
      
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};

export const deleteCategory =async(req,res)=>{
    try {
        const data = await deleteCategoryService(req);
        if(!data){
            throw new Error("Failed to delete category");
        }
        sendResponse(res,200, true, "Category deleted successfully", data);
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};

export const getAllCategory = async(req,res)=>{
    try {
        const data = await getAllCategoryService(req);
        if(!data){
            throw new Error("Failed to get categories");
        }
        sendResponse(res,200, true, "All Categories fetched successfully", data);
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};