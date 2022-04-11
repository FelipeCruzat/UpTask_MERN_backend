import  jwt  from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req,res,next) => {
    let token;
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
        ) {
           try {
               token = req.headers.authorization.split(' ')[1]
               console.log(token);

               
               const decoded =  await jwt.verify(token,process.env.JWT_SECRET)
               //const decoded = jwt.verify(token,process.env.JWT_SECRET )
               console.log(decoded);

               req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
               //req.usuario = await Usuario.findById({"_id":decoded.id}).select("-password -confirmado -token -createdAt -updatedAt -__v")
               console.log(req.usuario);
               return next()

           } catch (error) {
               return res.status(404).json({msg:"hubo error"})
           } 
    }
    if(!token) {
        const error = new Error('Token no valido')
        return res.status(401).json({msg: error.message})
    }
    
    next() // Dice que va ejecutar el siguiente middleware
}

export default checkAuth