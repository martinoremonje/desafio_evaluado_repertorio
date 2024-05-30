import {pool} from "../config/db.js";

//funcion agregar
async function agregarCancion(titulo, artista, tono) {

  try {
      const sql = {
        text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)',
        values: [titulo, artista, tono]
      }
      const res = await pool.query(sql);
      console.log(`Cancion: ${res.rowCount} agregado con exito`);
  } catch (err) {
      console.error('Error al agregar cancion:', err);
      throw err;
  }
};

//funcion obetener todos

async function obtenerCanciones() {

  try {
    const sql = {
      text: 'SELECT * FROM canciones',
    } 
      const response = await pool.query(sql);
      return response.rows
  } catch (err) {
      console.error('Error al obtener repertorio', err);
      throw err;
  }
};

//funcion para editar
const editarCancion = async(titulo, artista, tono, id) => {
  console.log({id, titulo, artista, tono})
  try {
      const sql = {
          text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 returning *",
          values: [titulo, artista, tono, id],
      }
      const response = await pool.query(sql);
      if(response.rowCount > 0){
          return response.rows[0];
      }else{
          return new Error("No se actualizo la cancion");
      }
  } catch (error) {
      console.log("Query Error Code: ", error.code, "message: ", error.message);
  }
}

//funcion para eliminar
const eliminarCancion = async (id) => {
  try {
      const sql = {
          text: "DELETE FROM canciones WHERE id = $1 returning *",
          values: [id],
      }
      const response = await pool.query(sql)
      if (response.rowCount > 0) {
          return response.rows
      } else {
          return new Error("No se elimino la canción")
      }
  } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
  }
}

export {agregarCancion, obtenerCanciones, editarCancion, eliminarCancion}