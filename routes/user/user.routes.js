import express from 'express';
import { validate } from '../../middlewares/validate.js';
import { userSchema } from '../../validators/product.validate.js';
import { loginUser, logoutUser, registerUser } from '../../controllers/user/user.controller.js';
import { verifyToken } from '../../middlewares/admin/verifyToken.js';

const router = express.Router();

router.post('/register',validate(userSchema),registerUser);
router.post('/login',validate(userSchema),loginUser);
router.get('/logout',verifyToken,logoutUser);
export default router
