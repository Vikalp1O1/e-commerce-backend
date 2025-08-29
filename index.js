import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import { connectToDB } from './database/dbConnection.js';
import adminProductRoutes from './routes/admin/product.routes.js';
import userRouter from './routes/user/user.routes.js';
import productRouter from './routes/user/products.routes.js';
import cartRouter from './routes/user/cart.routes.js';
import cookieParser from 'cookie-parser';
import { isAdmin } from './middlewares/admin/isAdmin.middleware.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_ADMIN],
        // origin:process.env.FRONTEND_URL,
        credentials: true, 
    }
));
app.use(cookieParser());
 
app.use('/api/admin',adminProductRoutes);
app.use('/api',userRouter);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);

const PORT = process.env.PORT || 4040;

connectToDB()
.then(()=>{
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error,'error in connecting to db');
})