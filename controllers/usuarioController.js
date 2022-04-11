import Usuario from "../models/Usuario.js";
import generarId from '../helpers/generarId.js'
import {emailOlvidePassword, emailRegistro} from '../helpers/email.js'

const registrar = async (req,res) => {
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email})
    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg:error.message})
    }
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save()
        //enviar el email de confirmación
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg:'Usuario Creado Correctamente, revisa tu Email para confirmar tu cuenta'})
    } catch (error) {
        console.log(error);
    }  
};
const autenticar = async(req,res) => {                                                                                                                                                                            
    //existe,confirmado,pass
    const {email,password}=req.body;
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json ({msg:error.message});
    }
    //Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json ({msg:error.message});
    }
    //Comprobando password
    if(await usuario.comprobarPassword(password)){
        //se fabrica un objeto mas ordenado
        res.json({
            _id: usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token: generarId()
        })
    } else {
        const error = new Error("El password está incorrecto");
        return res.status(403).json ({msg:error.message});
    }
}

const confirmar = async(req,res) => {
 const {token} =req.params
 const usuarioConfirmar = await Usuario.findOne({token}) // se usa una entrada pq nombre param=var
 //findOne es un objeto del array.
 if(!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json ({msg:error.message});
 }
    try {
        
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({msg:'Usuario Confirmado Correctamente'})
        
    } catch (error) {
        console.log(error);
    } 
 }

const olvidePassword = async  (req,res) =>  {
    const {email} = req.body;
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(400).json({msg:error.message})
    }
    try {
        usuario.token = generarId()
        await usuario.save()
        //Enviar email
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token

        })


        res.json({msg:'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(error);
    }  
 }
 const comprobarToken = async  (req,res) =>  {
    console.log("Comprobando...")
    const {token}=req.params; //para url, body para formulario
    const tokenValido = await Usuario.findOne({token});
    console.log(tokenValido)

    if(tokenValido) {
        res.json({msg:'Token valido y usuario existe'})
    } else {
        const error = new Error('Token no valido')
        return res.status(400).json({msg:error.message})
    }

 }

 const nuevoPassword = async  (req,res) =>  {
     const {token} = req.params;
     const {password}= req.body;
     const usuario = await Usuario.findOne({token});
     if (usuario) {
        usuario.password=password;
        usuario.token=""
        try {
        await usuario.save();
        res.json({msg:"Password Modificado Correctamente"})
        } catch (error) {
            console.log(error)
        }
        
     } else {
        const error = new Error('Token no valido')
        return res.status(400).json({msg:error.message})
     }
    
 }

 const perfil = async  (req,res) =>  {
     const {usuario} = req
     res.json(usuario)
}

export {registrar,autenticar,confirmar,olvidePassword,comprobarToken,nuevoPassword,perfil};