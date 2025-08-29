import { Category } from "../../models/category.model.js";

export const addCategoryService = async (req) => {
    try {
        const data = await Category.create(req.body);
        await data.save();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCategoryByIdService = async (req) => {
    try {
        const { id } = req.params;
        const data = await Category.findById(id);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editCategoryService = async (req) => {
    try {
        const { id } = req.params;
        const data = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteCategoryService = async (req) => {
    try {
        const { id } = req.params;
        const data = await Category.findByIdAndDelete(id);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllCategoryService = async (req) => {
    try {
        const data = await Category.find({});
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};