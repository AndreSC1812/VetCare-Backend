//Rutas de autenticacion
import { Router } from "express";

//importamos las funciones de los controllers
import { login, register, logout } from "../controllers/auth.controller.js";

const router = Router();

//cuando se haga una peticion register se ejecutara la funcion register del controller
router.post("/register", register);

//cuando se haga una peticion login se ejecutara la funcion login del controller
router.post("/login", login);

//cuando se haga una peticion de logout se ejecutara la funcion logout del controller
router.post("/logout", logout);

//exportamos las rutas
export default router;
