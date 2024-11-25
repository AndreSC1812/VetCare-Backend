//Rutas de autenticacion
import { Router } from "express";

//importamos las funciones de los controllers
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//cuando se haga una peticion register se ejecutara la funcion register del controller
router.post("/register", register);

//cuando se haga una peticion login se ejecutara la funcion login del controller
router.post("/login", login);

//cuando se haga una peticion de logout se ejecutara la funcion logout del controller
router.post("/logout", logout);

//cuando se haga una peticion de profile se ejecutara la funcion profile del controller
router.get("/profile", authRequired, profile);

//exportamos las rutas
export default router;
