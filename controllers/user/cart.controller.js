import { sendResponse } from "../../helper/resSender.js";
import { addToCartService, getAllInCartService, removeFromCartService } from "../../services/user/cart.service.js";
import { AppError } from "../../utils/AppError.js";

export const addToCart = async (req, res) => {

    try {
        const data = await addToCartService(req);
        if (!data) {
            throw new AppError("Failed to add to cart",405);
        }
        sendResponse(res, 200, true, "Product added to cart successfully", data);
    } catch (error) {
        const status = error.statusCode || 500;
        // console.log(error);
        sendResponse(res,status, false, error.message);
    }

};

export const getAllInCart = async (req, res) => {
    try {
        const data = await getAllInCartService(req);
        // console.log(data,'data of cart item')
        if (!data) {
            throw new AppError("Failed to get cart items",404);
        }
        sendResponse(res, 200, true, "Cart items fetched successfully", data);
    } catch (error) {
        const status = error.statusCode || 500;
        sendResponse(res,status, false, error.message); 
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const data = await removeFromCartService(req);
        if (!data) {
            throw new AppError("Failed to remove from cart",404);
        }
        sendResponse(res, 200, true, "Product removed from cart successfully", data);
    } catch (error) {
        const status = error.statusCode || 500;
        sendResponse(res,status, false, error.message);
    }
};