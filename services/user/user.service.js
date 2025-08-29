import { User } from "../../models/user.model.js";
import { generateRefreshToken } from "../../utils/token.js";
import bcrypt,{genSalt} from 'bcryptjs'

export const userRegisterService = async(req) =>{
    try {
        const {email,password,role} = req.body;

        const existUser = await User.findOne({email});
        if(existUser){
            throw new Error('User already exists');
        }

        const salt = await genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // const hashPassword = await bcrypt.hash(password,10);

        const data = await User.create({
            email,
            password:hashPassword,
            role
            
        });

        const refreshToken = generateRefreshToken(data._id);

        data.refreshToken = refreshToken;

         const savedUser = await data.save();
        const user= savedUser.toObject();
        delete user.password;
        

        return {user,refreshToken};

    } catch (error) {
        throw new Error(error.message, "error while adding user")
    }
}


export const userLoginService =async(req)=>{
    try {
         const {email,password} = req.body;
                if(!email || !password){
                    throw new Error('Email and password are required');
                }
                const user = await User.findOne({email});
                if(!user){
                    throw new Error('User not found');
                }
        
                const isMatch = await bcrypt.compare(password,user.password);
                if(!isMatch){
                    throw new Error('Invalid credentials');
                }

                const refreshToken = generateRefreshToken(user._id);
        
                user.refreshToken = refreshToken;
                
                // save user with new refresh token
                await user.save();
        
                return {user,refreshToken};
        
    } catch (error) {
        throw new Error(error.message);
    }
}