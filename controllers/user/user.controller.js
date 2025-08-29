import { sendResponse } from "../../helper/resSender.js";
import { userLoginService, userRegisterService } from "../../services/user/user.service.js";
import { addToCookie } from "../../utils/addToCookie.js";

export const registerUser =async(req,res)=>{
try {
    const {user,refreshToken} = await userRegisterService(req);
    if(!user){
        throw new Error("User not found");
    }
    
    // Add refresh token to cookie
    addToCookie(res,refreshToken);
    
    sendResponse(res, 200, true, "User registered successfully");

} catch (error) {
    sendResponse(res,500, false, error.message);
}
};


export const loginUser =async(req,res)=>{
    try {
        const {user,refreshToken} = await userLoginService(req);
        if(!user){
            throw new Error("User not found");
        }
        
        // Add refresh token to cookie
      addToCookie(res,refreshToken);
        // console.log(cokiieeee,'addtocookieeeeeee');
        
        sendResponse(res, 200, true, "User logged in successfully",refreshToken);
        
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};

export const logoutUser =async(req,res)=>{
    try {
        res.clearCookie('refreshToken');
        sendResponse(res,200, true, "User logged out successfully");
    } catch (error) {
        sendResponse(res,500, false, error.message);
    }
};

