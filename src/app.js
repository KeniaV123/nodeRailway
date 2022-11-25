import express from "express";

import { createPool } from "mysql2/promise";

const pool = createPool({
  user: "root",

  password: "G8begJ40hJHtJbYScDAx",

  host: "containers-us-west-100.railway.app",

  port: 6704,

  database: "railway",
});

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a este servidor..");
});

app.get("/usuarios", async (req, res) => {
  const [result] = await pool.query("select * from usuarioFly");

  res.json(result);
});

app.get("/agregarusuario", async (req, res) => {
  const nombre = req.query.nombre;

  const contrasena = req.query.contrasena;

  const correo = req.query.correo;

  const [result] = await pool.query(
    `INSERT INTO usuarioFly (nombre, contrasena, correo) VALUES ('${nombre}', '${contrasena}', '${correo}')`
  );

  res.json(result[0]);
});

app.get("/login", async (req, res) => {
  const nombre = req.query.nombre;
  const contrasena = req.query.contrasena;
  const [result] = await pool.query(
    `SELECT * FROM usuarioFly WHERE nombre = '${nombre}' AND contrasena = '${contrasena}'`
  );
  if (result.length > 0) {
    res.json({ status: "ok" });
  } else {
    res.json({ status: "error" });
  }
});

app.listen(process.env.PORT || 3000);

console.log("Servidor corriendo en el puerto 3000");
