require("dotenv").config();

const express = require("express");
const indexRouter = require("./routes/index-router")
const { sendError } = require("./services/errors.js");
const {validateToken} = require("./middleware/validate-token.js")

////////////////////////////////////////////////////////////////////////////////////
const app = express();
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server iniciado en el puerto ${PORT}...`);
});

app.use(validateToken);
app.use(indexRouter);

/////////////////////MANEJO DE ERRORES EN LOS ENDPOINTS////////////////////////////
app.use((err, req, res, next) => {
    console.error(err);
    sendError(res, err);
});

app.use((req, res, next) => {
    sendError(res, {
        status: 404,
        code: "UNKNOWN_ENDPOINT",
        message: `Endpoint desconocido: ${req.method} ${req.path}`,
    });
});

