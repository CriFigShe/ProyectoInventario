require("dotenv").config();

const cors = require("cors");
const express = require("express");
const indexRouter = require("./routes/index-router");
const { sendError } = require("./services/errors.js");
const { validateToken } = require("./middleware/validate-token.js");

////////////////////////////////////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path");

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/inventario/dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}...`);
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://inventariio.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


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
