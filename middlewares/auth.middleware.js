import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const protect = async(req,res,next)=>{

    // console.log(req.headers.authorization);
    try {
        
        let token;

        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer')){
            token = authHeader.split(' ')[1];
        }
        // console.log(token);

        if(!token){

            return res.status(401).json({message:'Not Authorized'})
        }
        // console.log(token);     
        
        //  console.log(process.env.JWT_ACCESS_SECRET,'secret');
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET|| 'That@Bat');
       
        // console.log(decoded,'decoded token');

        req.user = {id: decoded.id}

        next();

    } catch (error) {
        res.status(500).json({message:'error in authorization',error:error})
    }
}