import express from "express";

const router = express.Router();

import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js";

//Autentificacion, Registro y Confirmacion
router.post('/',registrar);
router.post('/login',autenticar)
router.get('/confirmar/:token',confirmar) //es dinamico pq envias != valores
router.post('/olvide-password',olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
// Hasta aqui pertenecen al area pública=================================

router.get("/perfil",checkAuth,perfil); //midleware personalizado |*|


export default router;