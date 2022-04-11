import  express  from "express"
import dotenv from "dotenv"
import cors from 'cors' 
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";

const app=express();
app.use(express.json());
dotenv.config();
conectarDB();

//configurar CORS
const whitelist = [process.env.FRONTEND_URL];
console.log(whitelist)
//const whitelist = "http://localhost:3000"
const corsOptions = {
    origin: function(origin,callback){
        if(!origin){ 
            return callback(null, true)
        }

        else if( whitelist.includes(origin)){
            callback(null,true)
        } else {
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions))

//Routing, definimos diferente endpoint y agrupamos en ruta
// las rutas agrupan controladores y modelos
app.use("/api/usuarios",usuarioRoutes);
app.use("/api/proyectos",proyectoRoutes);
app.use("/api/tareas",tareaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(4000,()=>{
    console.log(`Servidor corrre ${PORT}`)
});

