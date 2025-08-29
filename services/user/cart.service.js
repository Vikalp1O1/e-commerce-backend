import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/products.model.js";
import { AppError } from "../../utils/AppError.js";

export const addToCartService = async (req) => {
    // console.log(req.user,'userId');
    try {
        const userId = req.user.id;
        // console.log(userId,'userId');
        const { productId } = req.body;
        // console.log(req.body,'productId');
        const product = await Product.findById(productId);

        if (!product) {
            throw new AppError("Product not found",404);
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = await Cart.create({ userId, products: [{ productId, quantity: 1 }] });
            return newCart;
        } else {
            const existingProduct = cart.products.find((item) => item.productId.toString() === productId);
            if (existingProduct) {
                throw new AppError("Product already in cart",209);
            } else {
                cart.products.push({ productId, quantity: 1 });
            }
            await cart.save();
            return cart;
        }

    } catch (error) {
        throw (error);
    }
};


export const getAllInCartService = async (req) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        return cart;
    } catch (error) {
        throw (error);
    }
};


export const removeFromCartService = async (req) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        // console.log(id,'productId');
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            throw new AppError("Cart not found",404);
        }
        const productIndex = cart.products.findIndex((item) => item.productId.toString() === id);
        // console.log(productIndex,'productIndex');
        if (productIndex === -1) {
            throw new AppError("Product not found in cart",404);
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
    } catch (error) {
        throw (error);
    }
};
