const { Router } = require("express");
const usersRouter = require("./users");
const eventsRouter = require("./events");
const salesRouter = require("./sales");
const suppliersRouter = require("./suppliers");
const productsRouter = require("./products");
const router = Router();

router.use(usersRouter);
router.use(eventsRouter);
router.use(salesRouter);
router.use(suppliersRouter);
router.use(productsRouter);

module.exports = router;