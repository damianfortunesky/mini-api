const express = require("express");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, ()=>{
    console.log(`App escuchando en http://localhost:${port}`);
});


/* -------------------------------------------------- Rutas -------------------------------------------------- */

app.get("/", (req, res) => {
    res.send("Ruta Raiz");
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await ListarUsuariosDB();
    res.send(usuarios)
});

app.post("/usuarios", (req, res) => {
    
    const userData = req.body;

    guardarUsuariosDB(
        userData.nombre, 
        userData.apellido, 
        userData.edad, 
        userData.contraseña
    )

    req.send();
});


/* -------------------------------------------------- Controladores -------------------------------------------------- */

async function guardarUsuariosDB(nombre, apellido, edad, contraseña ){
    debugger;

    try {
        const client = new Client({
            user: "dbuser",
            host:"database.server.com",
            database: "mydb",
            password: "password",
            port: 3221,
            ssl: {
                rejectUnauthorized: false,
            }
        });

        await client.connect();

        const insertUser = "INSERT INTO users VALUES ('"+ nombre +"','"+ apellido +"','"+ edad +"','"+ contraseña +"')";

        console.log("Se ejecuto:", insertUser);

        const res = await client.query(insertUser);

        await client.end();

    } catch (error) {
        console.log(error)
    }
}


async function ListarUsuariosDB(){
    debugger;

    try {
        const client = new Client({
            user: "dbuser",
            host:"database.server.com",
            database: "mydb",
            password: "password",
            port: 3221,
            ssl: {
                rejectUnauthorized: false,
            }
        });

        await client.connect();

        const res = await client.query("SELECT * FROM usuarios");

        await client.end();

        return res.rows;

    } catch (error) {
        console.log(error)
    }
}