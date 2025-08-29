import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../../controllers/admin/products.controller.js';
import { validate } from '../../middlewares/validate.js';
import { productSchema } from '../../validators/product.validate.js';
import uploadMiddleware from '../../middlewares/multer.js';
import { addCategory, deleteCategory, editCategory, getAllCategory, getCategoryById } from '../../controllers/admin/category.controller.js';

const router = express.Router();

router.get('/products',getProducts);
router.get('/products/:id',getProductById);
router.post('/products/add', uploadMiddleware, validate(productSchema), addProduct);
router.put('/products/update/:id', uploadMiddleware, validate(productSchema), updateProduct);
router.delete('/products/delete/:id',deleteProduct);
router.post('/category/add',addCategory);
router.get('/category',getAllCategory);
router.put('/category/update/:id',editCategory);
router.delete('/category/delete/:id',deleteCategory);
router.get('/category/:id',getCategoryById);

export default router