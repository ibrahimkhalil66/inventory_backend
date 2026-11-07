const express = require("express");
const app = express();
const path = require("node:path");

{/* Middlwares */}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {inventoryRouter} = require("./routes/inventoryRouter.js")

app.use("/inventory", inventoryRouter)

const PORT = 3001;

app.listen(PORT)
console.log("\" Ctrl + C \" to shutdown the server");
