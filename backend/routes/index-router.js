//Todas las rutas en un unico index
const { Router } = require("express");
const usersRouter = require("./users");
const eventsRouter = require("./events");
const salesRouter = require("./sales");
const router = Router();

router.use(usersRouter);
router.use(eventsRouter);
router.use(salesRouter);

module.exports = router;