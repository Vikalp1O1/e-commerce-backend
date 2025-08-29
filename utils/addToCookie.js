

 export const addToCookie =(res,refreshToken)=>{

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure: true, 
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    return res.cookie;

 };
