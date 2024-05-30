import path from "path";
import { agregarCancion, editarCancion, eliminarCancion, obtenerCanciones } from "../models/queries.js";

const __dirname = path.resolve();

export const home = (req, res) =>{
    res.sendFile(__dirname + "/views/index.html")
};


export const agregar = async (req, res)=>{
    try {
        const {titulo, artista, tono} = req.body;
        await agregarCancion(titulo, artista, tono)
        res.send("cancion agregada con exito")
    } catch (error) {
        console.log(error)
    }
    
}

export const mostrar = async(req,res)=>{
    try {
        const response = await obtenerCanciones();
        res.json(response);
    } catch (error) {
        console.log(error)
    }
};

export const editar = async(req, res)=>{
    const {id} = req.params;
    const {titulo, artista, tono} = req.body
    const cancion = await editarCancion(titulo, artista, tono, id);
    res.send(cancion)
}

export const eliminar = async(req, res)=>{
    try {
        const {id} = req.query
        const response = await eliminarCancion(id);
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}