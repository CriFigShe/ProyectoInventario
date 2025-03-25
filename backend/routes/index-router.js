//Todas las rutas en un unico index
const { Router } = require("express");
const usersRouter = require("./users");
const router = Router();

router.use(usersRouter);

module.exports = router;