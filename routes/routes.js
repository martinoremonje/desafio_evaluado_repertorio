import express from "express";

import {agregar, editar, eliminar, home, mostrar} from "../controllers/controllers.js"

const router = express.Router();

router.get("/", home);

router.post("/cancion", agregar)

router.get("/canciones", mostrar);

router.delete("/cancion", eliminar);

router.put("/cancion/:id", editar);

export default router