require("dotenv").config();

const cors = require("cors");
const express = require("express");
const indexRouter = require("./routes/index-router");
const { sendError } = require("./services/errors.js");

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  sendError(res, err);
});

app.listen(PORT, () => {
  console.log(`Server iniciado en el puerto ${PORT}...`);
});
