import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    
    const {email, nombre,token} =datos;
    
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e60f8ec5447b61",
          pass: "7989d1c2eef911"
        }
       });

       const info = await transport.sendMail({
           from: '"UpTask - Administrador de proyectos" <cuentas@upstask.com>',
           to: email,
           subject: "UpTask-Comprueba tu cuenta",
           text: "Comprueba tu cuenta en UpTask",
           html : `<p> Hola: ${nombre}  Comprueba tu cuenta en UpTask </p>
           <p> Tu cuenta ya esta lista, solo debes comprobarla en los siguientes enlaces:
           <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta<a/>
           <p> Si tu no creaste esta cuenta , puedes ignorar el mensaje</p>
           `,  
       })
}

export const emailOlvidePassword = async (datos) => {
    
    const {email, nombre,token} =datos;
    
    //Todo: Mover hacia variables de entorno

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e60f8ec5447b61",
          pass: "7989d1c2eef911"
        }
       });

       //informacion del email
       const info = await transport.sendMail({
           from: '"UpTask - Administrador de proyectos" <cuentas@upstask.com>',
           to: email,
           subject: "Restablece tu password",
           text: "Restablece tu password",
           html : `<p> Hola: ${nombre}  has solicitado restablecer tu password </p>
           <p> Sigue el siguiente enlace para generar un nuevo password:
           <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablece password<a/>
           <p> Si tu no solicitaste este mail , puedes ignorar el mensaje</p>
           `,
           
       })

 
}