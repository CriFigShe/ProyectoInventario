const express = require("express");
const app = express();
app.listen(3000);

app.get("/hola", (req, res) => {
    res.send("hola que tal");
})